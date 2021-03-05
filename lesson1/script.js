const api = () => [
  { id: 1, title: "Shirt", price: 150, stockQuantity: 5 },
  { id: 2, title: "Socks", price: 50, stockQuantity: 5 },
  { id: 3, title: "Jacket", price: 350, stockQuantity: 5 },
  { id: 4, title: "Shoes", price: 250, stockQuantity: 7 },
];

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

  getHtml() {
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
  }
}

class GoodList {
  constructor(basket) {
    this.fetchApi = api;
    this.basket = basket;

    this.goods = this.fetch();
  }

  fetch() {
    return this.fetchApi().map((item) => new GoodItem(item, this.basket));
  }

  getSum = () =>
    this.goods.reduce(
      (acc, { price, stockQuantity }) => acc + price * stockQuantity,
      0
    );

  render() {
    const root = document.querySelector(".goods-list");

    this.goods.forEach((good) => {
      root.append(good.getHtml());
    });
  }
}

class Basket {
  constructor() {
    this.sum = 0;
    this.totalGoods = 0;
    this.goods = [];
    this.root = document.querySelector(".basket");
    this.buttonSumEl = document.querySelector("#basketSum");
    this.basketTable = document.createElement("table");
    this.basketSumEl = document.createElement("span");
    this.basketTotalGoodsEl = document.createElement("span");
  }

  add(good) {
    if (!this.goods.length) this.render();

    const basketItem = this.goods.find(({ id }) => id === good.id);

    if (basketItem) {
      basketItem.updateQuantity(1);
    } else {
      const newBasketItem = new BasketGoodItem(good, this, 1);
      this.goods.push(newBasketItem);
      this.basketTable.append(newBasketItem.getHtml());
    }

    this.sum = this.goods.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0
    );

    this.totalGoods = this.goods.reduce(
      (acc, { quantity }) => acc + quantity,
      0
    );

    this.updateSum();
  }

  remove(item) {
    // удаление товаров из корзины
  }

  drop() {
    // очистить корзину
    this.sum = 0;
    this.goods = [];
  }

  updateSum() {
    this.buttonSumEl.innerText = this.sum;
    this.basketSumEl.innerText = this.sum;
    this.basketTotalGoodsEl.innerText = this.totalGoods;
  }

  render() {
    this.basketTable = document.createElement("table");
    const tr = document.createElement("tr");

    tr.insertAdjacentHTML(
      "beforeend",
      "<td>Название</td><td>Цена</td><td>Количество</td><td>Сумма</td>"
    );

    this.basketTable.append(tr);

    this.root.append(this.basketTable);

    const tableSummary = document.createElement("p");
    const totalString = document.createTextNode(
      "Количество товаров в корзине: "
    );
    const sumString = document.createTextNode(". Сумма: ");
    tableSummary.append(
      totalString,
      this.basketTotalGoodsEl,
      sumString,
      this.basketSumEl
    );

    this.root.append(tableSummary);
  }
}

class BasketGoodItem extends GoodItem {
  constructor(item, basket, quantity) {
    super(item, basket);
    this.quantity = quantity;
    this.row = document.createElement("tr");
    this.quantityTd = document.createElement("td");
    this.sumTd = document.createElement("td");
  }

  updateQuantity(quantity) {
    if (this.quantity + quantity <= this.stockQuantity)
      this.quantity += quantity;

    this.quantityTd.innerText = this.quantity;
    this.sumTd.innerText = this.quantity * this.price;
  }

  getHtml() {
    const titleTd = document.createElement("td");
    titleTd.innerText = this.title;

    const priceTd = document.createElement("td");
    priceTd.innerText = this.price;

    this.quantityTd.innerText = this.quantity;

    this.sumTd.innerText = this.price * this.quantity;

    this.row.append(titleTd, priceTd, this.quantityTd, this.sumTd);

    return this.row;
  }
}

const basket = new Basket();
const goods = new GoodList(basket);

console.log("goods sum: ", goods.getSum());
goods.render();
