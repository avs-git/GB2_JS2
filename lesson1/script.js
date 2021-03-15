const GOODS = [
  { id: 1, title: "Shirt", price: 150, stockQuantity: 5 },
  { id: 2, title: "Socks", price: 50, stockQuantity: 5 },
  { id: 3, title: "Jacket", price: 350, stockQuantity: 5 },
  { id: 4, title: "Shoes", price: 250, stockQuantity: 7 },
];

const api = () =>
  new Promise((resolve) => {
    resolve(GOODS);
  });

class GoodItem {
  constructor({ ...args }, basket) {
    Object.entries(args).forEach(([key, value]) => {
      this[key] = value;
    });
    this.basket = basket;
  }

  addToCart = () => {
    this.basket.add(this);
  };

  getHtml = () => {
    const goodItem = document.createElement("div");
    goodItem.classList.add("goods-item");

    const goodImg = document.createElement("div");
    goodImg.classList.add("good-img");

    const goodTitle = document.createElement("h3");
    goodTitle.classList.add("good-item-title");
    goodTitle.innerText = this.title;

    const goodPrice = document.createElement("p");
    goodPrice.classList.add("good-item-price");
    goodPrice.innerText = this.price;

    const goodStock = document.createElement("p");
    goodStock.classList.add("good-item-stock");
    goodStock.innerText = `Доступно: ${this.stockQuantity}`;

    const button = document.createElement("button");
    button.classList.add("good-item-button");
    button.innerText = "Купить";
    button.onclick = this.addToCart;

    goodItem.append(goodImg, goodTitle, goodPrice, goodStock, button);

    return goodItem;
  };
}

class GoodList {
  constructor(basket) {
    this.fetchApi = api();
    this.basket = basket;
    this.goods = [];
  }

  fetch = () => {
    return this.fetchApi.then((goods) => {
      return goods.map((item) => new GoodItem(item, this.basket));
    });
  };

  getSum = () =>
    this.goods.reduce(
      (acc, { price, stockQuantity }) => acc + price * stockQuantity,
      0
    );

  render = (selector) => {
    const root = document.querySelector(selector);

    this.fetch().then((goods) => {
      this.goods = goods;
      goods.forEach((good) => {
        root.append(good.getHtml());
      });
    });
  };
}

class Basket {
  constructor({ renderRootSelector, basketButtonSelector }) {
    this.sum = 0;
    this.totalGoods = 0;
    this.goods = [];
    this.root = document.querySelector(renderRootSelector);
    this.buttonSumEl = document.querySelector(basketButtonSelector);
    this.basketTable = document.createElement("table");
    this.basketSumEl = document.createElement("span");
    this.basketTotalGoodsEl = document.createElement("span");
  }

  add = (good) => {
    if (!this.goods.length) this.render();

    const basketItem = this.goods.find(({ id }) => id === good.id);

    if (basketItem) {
      if (basketItem.quantity + 1 <= basketItem.stockQuantity)
        basketItem.quantity += 1;
    } else {
      this.goods.push({ ...new BasketGoodItem(good, this), quantity: 1 });
    }

    this.updateBasket();
  };

  decrease = (goodId) => {
    const basketItem = this.goods.find(({ id }) => id === goodId);

    basketItem.quantity -= 1;

    if (basketItem.quantity <= 0) this.remove(goodId);

    this.updateBasket();
  };

  remove = (removeId) => {
    this.goods = this.goods.filter(({ id }) => id !== removeId);

    this.updateBasket();
  };

  drop = () => {
    this.sum = 0;
    this.goods = [];

    this.updateBasket();
  };

  updateBasket = () => {
    console.log("!!!! ", !!this.goods.length);
    if (!!this.goods.length) {
      this.basketTable.innerHTML = "";

      const tr = document.createElement("tr");

      tr.insertAdjacentHTML(
        "beforeend",
        "<td>Название</td><td>Цена</td><td>Количество</td><td>Сумма</td><td></td>"
      );

      this.basketTable.append(tr);

      this.goods.forEach(({ getHtml, quantity }) => {
        this.basketTable.append(getHtml(quantity));
      });

      this.sum = this.goods.reduce(
        (acc, { price, quantity }) => acc + price * quantity,
        0
      );

      this.totalGoods = this.goods.reduce(
        (acc, { quantity }) => acc + quantity,
        0
      );

      this.updateSum();
    } else {
      this.unrender();
    }
  };

  updateSum = () => {
    this.buttonSumEl.innerText = this.sum;
    this.basketSumEl.innerText = this.sum;
    this.basketTotalGoodsEl.innerText = this.totalGoods;
  };

  getBasket = () => {
    // возвращает очищенную информацию о товарах
    return this.goods.map(({ id, quantity, price, title }) => ({
      id,
      quantity,
      price,
      title,
    }));
  };

  render = () => {
    this.root.className = "basketRoot";
    this.root.innerHTML = "";

    this.basketTable.className = "basketTable";

    this.root.append(this.basketTable);

    const basketSummary = document.createElement("p");
    const totalString = document.createTextNode(
      "Количество товаров в корзине: "
    );
    const sumString = document.createTextNode(". Сумма: ");

    const dropButton = document.createElement("button");
    dropButton.className = "basketDropButton";
    dropButton.innerText = "Очистить корзину";
    dropButton.addEventListener("click", this.drop);

    basketSummary.append(
      totalString,
      this.basketTotalGoodsEl,
      sumString,
      this.basketSumEl,
      dropButton
    );

    this.root.append(basketSummary);
  };

  unrender = () => {
    this.root.innerHTML = "<p>Корзина пуста</p>";
  };
}

class BasketGoodItem extends GoodItem {
  constructor(item, basket) {
    super(item, basket);
  }

  getHtml = (quantity) => {
    const row = document.createElement("tr");

    const quantityTd = document.createElement("td");
    const sumTd = document.createElement("td");

    const titleTd = document.createElement("td");
    titleTd.innerText = this.title;

    const priceTd = document.createElement("td");
    priceTd.innerText = this.price;

    quantityTd.innerText =
      quantity === this.stockQuantity ? `${quantity} (max)` : quantity;

    sumTd.innerText = this.price * quantity;

    const actionTd = document.createElement("td");

    const increaseButton = document.createElement("button");
    increaseButton.innerText = "+";
    increaseButton.title = "Добавить";
    increaseButton.addEventListener("click", () => {
      this.basket.add(this);
    });

    const decreaseButton = document.createElement("button");
    decreaseButton.innerText = "-";
    decreaseButton.title = "Добавить";
    decreaseButton.addEventListener("click", () => {
      this.basket.decrease(this.id);
    });

    const removeButton = document.createElement("button");
    removeButton.innerText = "X";
    removeButton.title = "Удалить";
    removeButton.addEventListener("click", () => {
      this.basket.remove(this.id);
    });

    actionTd.append(increaseButton, decreaseButton, removeButton);

    row.append(titleTd, priceTd, quantityTd, sumTd, actionTd);

    return row;
  };
}

const basket = new Basket({
  renderRootSelector: ".basket",
  basketButtonSelector: "#basketSum",
});
const goods = new GoodList(basket);

goods.render(".goods-list");
