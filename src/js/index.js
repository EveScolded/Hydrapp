import "../scss/main.scss";

// uncomment the lines below to enable PWA
import { registerSW } from "./pwa.js";
registerSW();

const buttonAdd = document.querySelector(".button-add--js");
const counterElement = document.querySelector(".glasses__counter--js");
const glass = document.querySelectorAll(".glasses__glass");
const bucket = document.querySelector(".glasses__bucket");


/* zapisywanie licznika szklanek do Local Storage */

const key = new Date().toISOString().slice(0, 10);
console.log(key);

let savedCounterValue = localStorage.getItem(key);
console.log(savedCounterValue);

/* wyświetlanie zapisanego licznika i odpowiadającej mu szklanki */

let counter = 0;

if (savedCounterValue) {
  counter = savedCounterValue;
} else {
  counter = 0;
}
counterElement.innerHTML = counter;

if (counter < 9) {
  for (let i = 0; i < 9; i++) {
    glass[i].style.display = "none";
    if (i == counter) {
      glass[i].style.display = "flex";
    }
  }
} else {
  for (let i = 0; i < 9; i++) {
    glass[i].style.display = "none";
    if (i < counter) {
      bucket.style.display = "flex";
    }
  }
}

/* zmiana napełnienia szklanki w zależności od licznika po kliknięciu w button */

let currentCounterValue;

buttonAdd.addEventListener("click", () => {
  counterElement.innerHTML = ++counter;

  if (counter < 9) {
    for (let i = 0; i < 9; i++) {
      glass[i].style.display = "none";
      if (i == counter) {
        glass[i].style.display = "flex";
      }
    }
  } else {
    for (let i = 0; i < 9; i++) {
      glass[i].style.display = "none";
      if (i < counter) {
        bucket.style.display = "flex";
      }
    }
  }
  currentCounterValue = localStorage.setItem(key, counter);
});

const buttonRemove = document.querySelector(".button-remove--js");

buttonRemove.addEventListener("click", () => {
  if (counter > 0) {
    counterElement.innerHTML = --counter;
  }
  if (0 <= counter && counter <= 8) {
    for (let i = 0; i < 9; i++) {
      glass[i].style.display = "none";
      bucket.style.display = "none";
      if (i == counter) {
        glass[i].style.display = "flex";
      }
    }
  } else {
    for (let i = 0; i < 9; i++) {
      glass[i].style.display = "none";
      if (i > counter) {
        bucket.style.display = "flex";
      }
    }
  }
  currentCounterValue = localStorage.setItem(key, counter);
});
