const goods = [
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 },
  { price: 250 },
  { title: "Broken Shoes" },
];

const $goodsList = document.querySelector(".goods-list");

const renderGoodsItem = ({ title = "Undefined good", price = 0 }) => {
  return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list = goods) => {
  let goodsList = list.map((item) => renderGoodsItem(item)).join("");

  $goodsList.insertAdjacentHTML("beforeend", goodsList);
};

renderGoodsList();
