import { addToLocalStorage, getFromLocalStorage } from "./localstorage.js";

const shoppingBasketResults = document.querySelector(".shopping-basket-results");
const totalPrice = document.querySelectorAll(".card .total-price");
const totalItems = document.querySelector("#shoppingBasket .total-items");
const cardForm = document.querySelector(".card-form");
const cardName = document.getElementById("cardName");
const cardNumber = document.getElementById("cardNumber");
const cardExpDate = document.getElementById("expDate");
const cardCvv = document.getElementById("cvv");
const checkOut = document.querySelector(".card .checkout");
const successAlert = document.querySelector("#successAlert .success-alert");
let basket = [];


function initialApp() {
  basket = getFromLocalStorage("basket");
  displayShoppingBasket(basket);
  calcTotalPrice();
}
initialApp();

function displayShoppingBasket(theBasket) {
  let shoppingBasketHtmlContent = theBasket.map((order) => {
    return `<div
        class="order-row d-flex align-items-center justify-content-between p-2 border rounded"
      >
        <div class="box d-flex flex-column flex-md-row align-items-center gap-2">
          <div class="image">
            <img
              class=""
              src="${order.image}"
              alt=""
            />
          </div>
          <div class="order-name text-center w-100">
            <span>${order.name}</span>
          </div>
        </div>
            <div class="box d-flex align-items-center justify-content-center gap-2">
            <span class="counter  fs-5">${order.quantity}</span>
            <div class="counter-icons d-flex flex-column">
            <i
                class="fa-solid fa-caret-up d-flex align-items-center justify-content-center fs-4"
                data-id="${order.id}"
            ></i>
            <i
                class="fa-solid fa-caret-down d-flex align-items-center justify-content-center fs-4"
                data-id="${order.id}"
            ></i>
            </div>
        </div>
        <div
          class="box d-flex flex-column align-items-center gap-2"
        >
          <span class="price"> ${order.price} EGP </span>
          <i class="remove fa-solid fa-trash-can" data-id="${order.id}"></i>
        </div>
      </div>`
  })
  shoppingBasketResults.innerHTML = shoppingBasketHtmlContent.join("");
  addEvents();
  increaseShoppingBasketTotalItems();
}

function addEvents() {
  let removeBtn = document.querySelectorAll(".shopping-basket-results .remove");
  let decreamentBtn = document.querySelectorAll(".shopping-basket-results .fa-caret-down ");
  let increamentBtn = document.querySelectorAll(".shopping-basket-results .fa-caret-up ");

  removeBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      removeOrderFromLocalStorage(this);
    })
  })

  decreamentBtn.forEach((btn) => {
    let changeQuantity = decreaseQuantity();
    btn.addEventListener("click", function () {
      let counter = this.closest(".box").querySelector(".counter");
      counter.innerHTML = changeQuantity(counter.innerHTML);
      addQuantityToLocalStorage(this.dataset.id, parseInt(counter.innerHTML));
      calcTotalPrice();
    })
  })

  increamentBtn.forEach((btn) => {
    let changeQuantity = increaseQuantity();
    btn.addEventListener("click", function () {
      let counter = this.closest(".box").querySelector(".counter");
      counter.innerHTML = changeQuantity(counter.innerHTML);
      addQuantityToLocalStorage(this.dataset.id, parseInt(counter.innerHTML));
      calcTotalPrice();
    })
  })

  cardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkOutOrders();
  })

}

function removeOrderFromLocalStorage(delOrder) {
  basket = basket.filter((order) => {
    return order.id != delOrder.dataset.id;
  })
  addToLocalStorage("basket", basket);
  displayShoppingBasket(basket);
  calcTotalPrice();
}

function decreaseQuantity() {
  let count = 1;
  return function (currentQuantity) {
    count = parseInt(currentQuantity);
    if (count > 1) count--;
    let quantity = count;
    return quantity;
  }
}

function increaseQuantity() {
  let count = 1;
  return function (currentQuantity) {
    count = parseInt(currentQuantity);
    count++;
    let quantity = count;
    return quantity;
  }
}

function addQuantityToLocalStorage(id, currentQuantity) {
  let orderObj = basket.find((order) => {
    return order.id == id
  })
  orderObj.quantity = currentQuantity;
  addToLocalStorage("basket", basket);
}

function calcTotalPrice() {
  totalPrice.forEach((price) => {
    price.innerHTML = basket.reduce((acc, order) => {
      return acc + (order.price * order.quantity);
    }, 0) + " EGP";
  })
}

function increaseShoppingBasketTotalItems() {
  totalItems.textContent = basket.length;
}

// Card Function

function checkOutOrders() {
  checkCardNumber();
  checkCardName();
  checkCardExpDate();
  checkCardCVV();
  checkAllFieldsAreTure();
}

function checkCardName() {
  const cardNameSpan = cardName.closest(".input-parent").querySelector("span");
  const trueIcon = cardName.closest(".input-parent").querySelector(".fa-circle-check");
  const falseIcon = cardName.closest(".input-parent").querySelector(".fa-circle-xmark");
  let cardNameValue = cardName.value;
  const pattern = /^[A-Za-z\s]+$/;
  if (!pattern.test(cardNameValue)) {
    cardNameSpan.innerHTML = "Must be a valid credit card name";
    falseIcon.classList.add("active-mark");
    trueIcon.classList.remove("active-mark");
    return false;
  } else {
    cardNameSpan.innerHTML = "";
    trueIcon.classList.add("active-mark");
    falseIcon.classList.remove("active-mark");
    return true;
  }
}

function checkCardNumber() {
  const cardNumberSpan = cardNumber.closest(".input-parent").querySelector("span");
  const trueIcon = cardNumber.closest(".input-parent").querySelector(".fa-circle-check");
  const falseIcon = cardNumber.closest(".input-parent").querySelector(".fa-circle-xmark");
  let cardNumberValue = cardNumber.value;
  const pattern = /^\d{16}$/;
  if (!pattern.test(cardNumberValue)) {
    cardNumberSpan.innerHTML = "Must be a valid credit card number";
    falseIcon.classList.add("active-mark");
    trueIcon.classList.remove("active-mark");
    return false;
  } else {
    cardNumberSpan.innerHTML = "";
    trueIcon.classList.add("active-mark");
    falseIcon.classList.remove("active-mark");
    return true;
  }
}

function checkCardExpDate() {
  let cardExpSpan = cardExpDate.closest(".input-parent").querySelector("span");
  const trueIcon = cardExpDate.closest(".input-parent").querySelector(".fa-circle-check");
  const falseIcon = cardExpDate.closest(".input-parent").querySelector(".fa-circle-xmark");
  let cardExpDateValue = cardExpDate.value;
  const pattern = /^(0[1-9]|1[0-2])\/(2[0-9]|3[0-9])$/;
  if (!pattern.test(cardExpDateValue)) {
    cardExpSpan.innerHTML = "Invalid exp date";
    falseIcon.classList.add("active-mark");
    trueIcon.classList.remove("active-mark");
    return false;
  } else {
    cardExpSpan.innerHTML = "";
    trueIcon.classList.add("active-mark");
    falseIcon.classList.remove("active-mark");
    return true;
  }
}

function checkCardCVV() {
  let cardCvvSpan = cardCvv.closest(".input-parent").querySelector("span");
  const trueIcon = cardCvv.closest(".input-parent").querySelector(".fa-circle-check");
  const falseIcon = cardCvv.closest(".input-parent").querySelector(".fa-circle-xmark");
  let cardCvvValue = cardCvv.value;
  const pattern = /^\d{3}$/;
  if (!pattern.test(cardCvvValue)) {
    cardCvvSpan.innerHTML = "Invalid cvv";
    falseIcon.classList.add("active-mark");
    trueIcon.classList.remove("active-mark");
    return false;
  } else {
    cardCvvSpan.innerHTML = "";
    trueIcon.classList.add("active-mark");
    falseIcon.classList.remove("active-mark");
    return true;
  }
}

function checkAllFieldsAreTure() {
  if (checkCardName() && checkCardNumber() && checkCardExpDate() && checkCardCVV()) {
    displaySuccessAlert();
    removeSuccessAlert();
  }
}

function displaySuccessAlert() {
  successAlert.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
  <symbol
    id="check-circle-fill"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
    />
  </symbol>
</svg>
<div
  class="alert alert-success d-flex align-items-center"
  role="alert"
>
  <svg
    class="bi flex-shrink-0 me-2"
    width="24"
    height="24"
    role="img"
    aria-label="Success:"
  >
    <use xlink:href="#check-circle-fill" />
  </svg>
  <div>Thank you for shopping with Vox. Your payment for [${basket.reduce((acc, order) => {
    return acc + (order.price * order.quantity);
  }, 0) + " EGP"}] has been verified. 
  </div>
</div>`
}

function removeSuccessAlert() {
  setTimeout(() => {
    successAlert.innerHTML = "";
  }, 5000);
}

