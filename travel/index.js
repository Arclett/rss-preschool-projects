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

console.log(
  "Ваша оценка - 85 баллов\nОтзыв по пунктам ТЗ:\nВыполненные пункты:\n1) Блок header\n2) Секция preview\n3) Секция steps\n4) Секция destinations\n5) Секция stories\n6) Блок footer\n7) нет полосы прокрутки при ширине страницы от 1440рх до 390px\n8) нет полосы прокрутки при ширине страницы от 390px до 320рх\n9) при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка\n10) при нажатии на бургер-иконку плавно появляется адаптивное меню\n11) адаптивное меню соответствует макету\n12) при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран\n13) ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям (все, кроме Account, она пока просто закрывает меню)\n14) при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна\n"
);
