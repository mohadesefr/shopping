const listArray = [
  {
    id: 1,
    title: "Album 1",
    src: "Images/jumpman-two-trey-mens-shoes-bGfWN1.png",
    price: 12.99,
    count:1
  },
  {
    id: 2,
    title: "Album 2",
    src: "Images/in-season-tr-13-workout-shoes-BDTlPf.jpeg",
    price: 236,
    count:1
  },
  {
    id: 3,
    title: "Album 3",
    src: "Images/jordan-stay-loyal-3-mens-shoes-4n9P1r.png",
    price: 122.99,
    count:1
  },
  {
    id: 4,
    title: "Album 4",
    src: "Images/jumpman-two-trey-mens-shoes-bGfWN1.png",
    price: 190,
    count:1
  },
  {
    id: 5,
    title: "Album 5",
    src: "Images/custom-nike-air-force-1-low-by-you.png",
    price: 180.99,
    count:1
  },
  {
    id: 6,
    title: "Album 6",
    src: "Images/in-season-tr-13-workout-shoes-BDTlPf.jpeg",
    price: 193,
    count:1
  },
];
const shopItemsContainer = document.querySelector(".shop-items");
const cartItemsContainer = document.querySelector(".cart-items");
let userCard = [];
const removeBtn = document.querySelector(".btn-danger");
const btnPurchase = document.querySelector('.btn-purchase');
const cartTotalPrice = document.querySelector('.cart-total-price');


function createItem(item) {
  let span = document.createElement("span");
  let img = document.createElement("img");
  let divShopDetail = document.createElement("div");
  let price = document.createElement("span");
  let button = document.createElement("button");
  let divContainer = document.createElement("div");

  span.innerHTML = item.title;
  span.classList.add("shop-item-title");

  img.src = item.src;
  img.classList.add("shop-item-image");

  price.innerHTML = item.price;
  price.classList.add("shop-item-price");

  button.innerHTML = "ADD TO CART";
  button.className = "btn btn-primary shop-item-button";

  divShopDetail.classList.add("shop-item-details");
  divContainer.classList.add("shop-item");

  divShopDetail.append(price, button);
  divContainer.append(span, img, divShopDetail);

  shopItemsContainer.appendChild(divContainer);

  button.addEventListener("click", (e) => {
      addItemToCart(item.id);
  });
};

 
function addItemToCart(itemId) {
  let mainItem = listArray.find(function (item) {
    return item.id === itemId;
  });

  userCard.push(mainItem);
  itemsOfCard();
  calcTotalPrice();
};


function changeInputValue(itemId, newCount){
  userCard.forEach(function(item){
    if (itemId === item.id){
      item.count = newCount;
    };
  });
  calcTotalPrice();
};


function itemsOfCard() {
  cartItemsContainer.innerHTML = "";

  userCard.forEach(function (item) {
    const cartImg = document.createElement("img");
    const cartTitle = document.createElement("span");
    const cartPrice = document.createElement("span");
    const cartRemove = document.createElement("button");
    const cartItem = document.createElement("div");
    const cartRow = document.createElement("div");
    const inputCart = document.createElement('input');
    const cartDiv = document.createElement("div");

    cartImg.src = item.src;
    cartImg.classList.add("cart-item-image");
    cartImg.style.width = "100";
    cartImg.setAttribute("height", "100");

    cartTitle.innerHTML = item.title;
    cartTitle.classList.add("cart-item-title");

    cartPrice.innerHTML = item.price;
    cartPrice.className = "cart-price cart-column";

    cartItem.append(cartImg, cartTitle);
    cartItem.className = "cart-item cart-column";

    inputCart.classList.add('cart-quantity-input');
    inputCart.value = 1;
    inputCart.type = 'number';
    inputCart.addEventListener('change', function(e){
      changeInputValue(item.id , e.target.value);
    })

    cartRemove.className = "btn btn-danger";
    cartRemove.innerHTML = "Remove";
    cartRemove.addEventListener("click", function () {
      removeProductFromCart(item.id);
    });

    cartDiv.className = 'cart-quantity cart-column';
    cartDiv.append(inputCart, cartRemove);

    cartRow.append(cartItem, cartPrice, cartDiv);
    cartRow.classList.add("cart-row");

    cartItemsContainer.append(cartRow);

  });
};


function removeProductFromCart(itemId) {

  userCard = userCard.filter(function (item) {
    return item.id !== itemId;
  });
  itemsOfCard(userCard)
};


listArray.forEach((item) => {
  createItem(item);
});


btnPurchase.addEventListener('click', function () {
  userCard = [];
  itemsOfCard(userCard);
});


function calcTotalPrice() {
  let totalCost = 0;

  userCard.forEach(function (item) {
    totalCost += item.price * item.count;
  });
  cartTotalPrice.innerHTML = '$' + totalCost.toFixed(2);
};

