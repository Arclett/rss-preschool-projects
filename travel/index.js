"use strict";

const burgerEl = document.querySelector(".burger");
const modalEl = document.querySelector(".modal-nav");
const crossEl = document.querySelector(".cross");
const overlayEl = document.querySelector(".overlay");
const navEl = document.querySelectorAll(".nav-piece");

const closeBurger = function () {
  modalEl.style.transform = "translateX(0%)";
  overlayEl.style.display = "none";
};

burgerEl.addEventListener("click", function () {
  modalEl.style.transform = "translateX(-100%)";
  overlayEl.style.display = "block";
});

crossEl.addEventListener("click", closeBurger);
overlayEl.addEventListener("click", closeBurger);

[...navEl].map((nav) => nav.addEventListener("click", closeBurger));
