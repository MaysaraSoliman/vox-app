import { getFromLocalStorage } from "./localstorage.js";

const shoppingBasketResults = document.querySelector(".shopping-basket-results");
const reservationContinueLink = document.querySelector(".reservation-continue-link");
const totalPrice = document.querySelectorAll(".card .total-price");
const totalItems = document.querySelector("#shoppingBasket .total-items");
const cardForm = document.querySelector(".card-form");
const cardName = document.getElementById("cardName");
const cardNumber = document.getElementById("cardNumber");
const cardExpDate = document.getElementById("expDate");
const cardCvv = document.getElementById("cvv");
const successAlert = document.querySelector("#successAlert .success-alert");
let movieArray = [];
let seatArray = [];
let theCurrentMovie;


function initialApp() {
    addEvents();
    getTheCurrentMovieFromLocalstorage();
    increaseReservationTicketsTotalItems();
    calcTotalPrice();
    displayTickets();
}
initialApp()

function addEvents() {
    cardForm.addEventListener("submit", (e) => {
        e.preventDefault();
        checkOutOrders();
    })

    addTheMovieIdOnReservationContinue();
}

function addTheMovieIdOnReservationContinue() {
    reservationContinueLink.href = `../cinema/cinema.html?id=${getUrlParamOfMovieId()}`
}

function getUrlParamOfMovieId() {
    const querystring = window.location.search;
    let urlParam = new URLSearchParams(querystring);
    let value = urlParam.get('id');
    return value;
}

function getTheCurrentMovieFromLocalstorage() {
    movieArray = getFromLocalStorage("movieReservation");
    let theMovieId = getUrlParamOfMovieId();
    theCurrentMovie = movieArray.find((movie) => {
        return theMovieId == movie.id
    })
    seatArray = theCurrentMovie.chairs;
}

function displayTickets() {
    let shoppingBasketHtmlContent = seatArray.map((order) => {
        return ` <div class="ticket-row d-flex">
      <div
        class="order-col left-box d-none d-lg-block p-2 border border-dark rounded"
      >
        <div class="box h-100 d-flex gap-2">
          <div class="image m-auto">
            <img
              class="barcode"
              src="../assets/images/tickets/barcode_vertical_2nd-76x300.png"
              alt=""
            />
          </div>
          <div class="image">
            <img
              src="../assets/images/tickets/movies-icon.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        class="order-col w-100 right-box p-2 border border-dark rounded"
      >
        <div
          class="box d-flex align-items-center gap-2 mb-2 rounded"
        >
          <div class="image">
            <img
              class=""
              src="../assets/images/header/logo-288x92.png"
              alt=""
            />
          </div>

          <div class="image ms-auto me-3">
            <img
              class=""
              src="../assets/images/tickets/movie-clapper-open-svgrepo-com.svg"
              alt=""
            />
          </div>
        </div>
        <div class="box d-flex flex-column p-2">
          <span class="movie-name fs-4 fw-bold">${theCurrentMovie.name}</span>
          <span class="cinema-branch fs-5"
            >City Center Alexandria</span
          >
          <div>
            <span class="movie-date">${theCurrentMovie.date}</span>
            <span class="movie-time">${theCurrentMovie.time}</span>
          </div>
          <div>
            <span class="seatsCount">1x Ticket</span>
            <span class="price">${order.seatPrice} EGP</span>
          </div>
          <div>
            <div class="image">
              <img
                class=""
                src="../assets/images/tickets/barcode_horizontal_2nd-300x71.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>`
    })
    shoppingBasketResults.innerHTML = shoppingBasketHtmlContent.join("");
}

function increaseReservationTicketsTotalItems() {
    totalItems.textContent = seatArray.length;
}

function calcTotalPrice() {
    totalPrice.forEach((price) => {
        price.innerHTML = seatArray.reduce((acc, order) => {
            return acc + (order.seatPrice);
        }, 0) + " EGP";
    })
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
    <div>Thank you for shopping with Vox. Your payment for [${seatArray.reduce((acc, order) => {
        return acc + (order.seatPrice);
    }, 0) + " EGP"}] has been verified. 
    </div>
  </div>`
}

function removeSuccessAlert() {
    setTimeout(() => {
        successAlert.innerHTML = "";
    }, 5000);
}
