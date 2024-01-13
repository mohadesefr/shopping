const listArray = [
  {
    id: 1,
    title: "Album 1",
    src: "Images/jumpman-two-trey-mens-shoes-bGfWN1.png",
    price: 12.99,
    count: 1
  },
  {
    id: 2,
    title: "Album 2",
    src: "Images/in-season-tr-13-workout-shoes-BDTlPf.jpeg",
    price: 236,
    count: 1
  },
  {
    id: 3,
    title: "Album 3",
    src: "Images/jordan-stay-loyal-3-mens-shoes-4n9P1r.png",
    price: 122.99,
    count: 1
  },
  {
    id: 4,
    title: "Album 4",
    src: "Images/jumpman-two-trey-mens-shoes-bGfWN1.png",
    price: 190,
    count: 1
  },
  {
    id: 5,
    title: "Album 5",
    src: "Images/jordan-stay-loyal-3-mens-shoes-4n9P1r.png",
    price: 180.99,
    count: 1
  },
  {
    id: 6,
    title: "Album 6",
    src: "Images/in-season-tr-13-workout-shoes-BDTlPf.jpeg",
    price: 193,
    count: 1
  },
];
const shopItemsContainer = document.querySelector(".shop-items");
const cartItemsContainer = document.querySelector(".cart-items");
let userCard = [];
const removeBtn = document.querySelector(".btn-danger");
const btnPurchase = document.querySelector('.btn-purchase');
const cartTotalPrice = document.querySelector('.cart-total-price');
let itemFragment = document.createDocumentFragment();

function createItem(item) {

  shopItemsContainer.insertAdjacentHTML('beforeend', `<div class="shop-item">
  <span class="shop-item-title">${item.title}</span>
  <img class="shop-item-image" src="${item.src}" />
  <div class="shop-item-details">
    <span class="shop-item-price">${item.price}</span>
    <button class="btn btn-primary shop-item-button" type="button" onclick="addItemToCart(${item.id})">
      ADD TO CART
    </button>
  </div>
</div>`);

};


function addItemToCart(itemId) {

  let mainItem = listArray.find(function (item) {
    return item.id === itemId;
  });

  let checkItemIsInCart = userCard.some(function (product) {
    return product.id === itemId;
  });

  if (checkItemIsInCart) {
    alert("it's already on your list");
  } else {
    userCard.push(mainItem);
    itemsOfCard();
    calcTotalPrice();
  };

};


function changeInputValue(itemId) {

  const input = document.getElementById(`product-${itemId}`);
  const newCount = input.value;

  userCard.forEach(function (item) {
    if (itemId === item.id) {
      item.count = newCount;
    };
  });
  
  calcTotalPrice();
};


function itemsOfCard() {
  cartItemsContainer.innerHTML = "";

  userCard.forEach(function (item) {

    cartItemsContainer.insertAdjacentHTML('beforeend', `<div class="cart-row">
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${item.src}" width="100" height="100">
          <span class="cart-item-title">${item.title}</span>
      </div>
      <span class="cart-price cart-column">${item.price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" id="product-${item.id}" type="number" value="1" 
          onchange="changeInputValue(${item.id})">
          <button class="btn btn-danger" type="button" onclick="removeProductFromCart(${item.id})">REMOVE</button>
      </div>
    </div>`);

  });

};


function removeProductFromCart(itemId) {

  userCard = userCard.filter(function (item) {
    return item.id !== itemId;
  });
  calcTotalPrice();
  itemsOfCard(userCard);
};


listArray.forEach((item) => {
  createItem(item);
});


btnPurchase.addEventListener('click', function () {
  userCard = [];
  itemsOfCard(userCard);
  calcTotalPrice();
});


function calcTotalPrice() {
  let totalCost = 0;

  userCard.forEach(function (item) {
    totalCost += item.price * item.count;
  });
  cartTotalPrice.innerHTML = '$' + totalCost.toFixed(2);
};

