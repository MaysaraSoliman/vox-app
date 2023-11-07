import { getMenuByApi, getMenuByTypeWithApi } from "./api.js";
import { addActiveClass, removeActiveClass } from "./global.js";
import { addToLocalStorage, getFromLocalStorage } from "./localstorage.js";

const leftArrow = document.querySelectorAll(".menu-slider-wrapper .fa-angle-left");
const rightArrow = document.querySelectorAll(".menu-slider-wrapper .fa-angle-right");
const softDrinksMenu = document.querySelector("#softDrinks .menu-slider");
const popCornMenu = document.querySelector("#popCorn .menu-slider");
const nachosMenu = document.querySelector("#nachos .menu-slider");
const sweetsMenu = document.querySelector("#sweets .menu-slider");
const hotFoodMenu = document.querySelector("#hotFood .menu-slider");
const juicesMenu = document.querySelector("#juices .menu-slider");
const hotDrinksMenu = document.querySelector("#hotDrinks .menu-slider");
const menuTabs = document.querySelectorAll("#menuTabs .menu-list li");
const basketSection = document.querySelector("#basket");
const menuListLi = document.querySelectorAll(".menu-list li");
let basket = [];
let allMenu = [];



async function intialApp() {
    basket = getFromLocalStorage("basket");
    getMenu();
    await getMenuByType("SOFT DRINKS", softDrinksMenu);
    await getMenuByType("POPCORN", popCornMenu);
    await getMenuByType("NACHOS", nachosMenu);
    await getMenuByType("SWEETS", sweetsMenu);
    await getMenuByType("HOT FOOD", hotFoodMenu);
    await getMenuByType("JUICE", juicesMenu);
    await getMenuByType("HOT DRINK", hotDrinksMenu);
    addEvents();
    increaseBasketTotalQuantity();
    increaseBasketTotalPrice();
    scrollToCategory();
}

intialApp();

async function getMenu() {
    allMenu = await getMenuByApi()
}

async function getMenuByType(type, section) {
    let menu = await getMenuByTypeWithApi(type);
    displayMenuProducts(menu, section)
}

function displayMenuProducts(theMenu, typeOfMenu) {
    let menuSliderContent = theMenu.map((menu) => {
        return `<div class="card  col-md-4 col-lg-3">
        <div class="image">
            <img class="w-100 h-100" src="${menu.image}" alt="">
        </div>
        <h3 class="fs-6 fw-bold p-2">${menu.name}</h3>
      <div class="mt-auto">
        <div class="price p-2 "><strong>${menu.price} EGP</strong></div>
        <div class="add-to-basket-parent">
        ${basket.find((ele) => ele.id == menu.id) ?
                `<button class="addToBasket py-2 text-dark bg-secondary fw-bold fs-6 border-0  w-100" style="cursor: no-drop;">
                    Added To Basket
                </button>`
                :
                `<button class="addToBasket py-2 text-white fw-bold fs-6 border-0  w-100" data-id="${menu.id}">
                Add To Basket
            </button>`
            }
            </div>
        </div>
    </div>`
    })
    typeOfMenu.innerHTML = menuSliderContent.join("");

}

function addEvents() {
    leftArrow.forEach((btn) => {
        btn.addEventListener("click", function () {
            menuSliderScrollToLeft(this);
        })
    })
    rightArrow.forEach((btn) => {
        btn.addEventListener("click", function () {
            menuSliderScrollToRight(this);
        })
    })

    menuTabs.forEach((btn) => {
        btn.addEventListener("click", function () {
            removeActiveClass(menuTabs);
            addActiveClass(this);
        })
    })

    let addToBasketBtn = document.querySelectorAll(".addToBasket");
    addToBasketBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
            addToBasket(this);
            this.closest(".add-to-basket-parent").innerHTML = `<button class="addToBasket py-2 text-dark bg-secondary fw-bold fs-6 border-0  w-100" style="cursor: no-drop;">
            Added To Basket
        </button>`;
            increaseBasketTotalQuantity();
            increaseBasketTotalPrice();
        })
    })
}

// slider function
function menuSliderScrollToLeft(arrow) {
    let menuSlider = arrow.closest(".menu-slider-wrapper").querySelector(".menu-slider");
    let menuSliderCard = menuSlider.querySelector(".card");
    menuSlider.scrollLeft -= menuSliderCard.clientWidth + 10;
}
function menuSliderScrollToRight(arrow) {
    let menuSlider = arrow.closest(".menu-slider-wrapper").querySelector(".menu-slider");
    let menuSliderCard = menuSlider.querySelector(".card");
    menuSlider.scrollLeft += menuSliderCard.clientWidth + 10;
}

// Add To Basket
function addToBasket(btn) {
    getOrderByIdAndAddToLocalstorage(btn);
}

function getOrderByIdAndAddToLocalstorage(btnBasket) {
    let order = allMenu.find((theOrder) => {
        return theOrder.id == btnBasket.dataset.id;
    })
    basket.push({ ...order, quantity: 1 });
    addToLocalStorage("basket", basket);
}

function increaseBasketTotalQuantity() {
    let basketQuantity = document.querySelector("#basket .quantity");
    basketQuantity.textContent = basket.length;
    if (basket.length == 0) {
        basketSection.classList.remove("basket-num-active");
    } else {
        basketSection.classList.add("basket-num-active");
    }
}

function increaseBasketTotalPrice() {
    let totalPriceAmount = document.querySelector("#basket .price");
    totalPriceAmount.innerHTML = basket.reduce((acc, order) => {
        return acc + (order.price * order.quantity);
    }, 0) + " EGP";
}

function scrollToCategory() {
    menuListLi.forEach((li) => {
        li.addEventListener("click", function () {
            let element = document.getElementById(li.getAttribute("data-link"));
            element.scrollIntoView({ behavior: "smooth", block: "center" })
        })
    })
}


