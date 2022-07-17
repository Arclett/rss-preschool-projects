"use strict";
//Variable
//burger
const burgerEl = document.querySelector(".burger");
const modalEl = document.querySelector(".modal-nav");
const crossEl = document.querySelector(".cross");
const overlayEl = document.querySelector(".overlay");
const navEl = document.querySelectorAll(".nav-piece");

//slider
let gal, ellipseType, translate, delay, animationTime;

const galImgZeroEl = document.querySelector("#destination-img-pos-0");
const galImgFirstEl = document.querySelector("#destination-img-pos-1");
const galImgSecondEl = document.querySelector("#destination-img-pos-2");
const galImgThirdEl = document.querySelector("#destination-img-pos-3");
const galImgFourEl = document.querySelector("#destination-img-pos-4");

const galCaptZeroEl = document.querySelector("#destination-capt-pos-0");
const galCaptFirstEl = document.querySelector("#destination-capt-pos-1");
const galCaptSecondEl = document.querySelector("#destination-capt-pos-2");
const galCaptThirdEl = document.querySelector("#destination-capt-pos-3");
const galCaptFourEl = document.querySelector("#destination-capt-pos-4");

const galWrapperEl = document.querySelector(".destination-gallery");
const fwd = document.getElementById("#fwd");

const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");

let window_size = window.matchMedia("(max-width: 390px)");

//ellipse

const firstEllipse = document.querySelector(".ellipse:nth-child(1)");
const secondEllipse = document.querySelector(".ellipse:nth-child(2)");
const thirdEllipse = document.querySelector(".ellipse:nth-child(3)");

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

//SLIDER

function assignDeskGal() {
  galImgZeroEl.src = `assets/img/${gal[0]}.jpg`;
  galImgFirstEl.src = `assets/img/${gal[1]}.jpg`;
  galImgSecondEl.src = `assets/img/${gal[2]}.jpg`;
  galImgThirdEl.src = `assets/img/${gal[3]}.jpg`;
  galImgFourEl.src = `assets/img/${gal[4]}.jpg`;

  //caption

  galCaptZeroEl.textContent = `${gal[0]}`;
  galCaptFirstEl.textContent = `${gal[1]}`;
  galCaptSecondEl.textContent = `${gal[2]}`;
  galCaptThirdEl.textContent = `${gal[3]}`;
  galCaptFourEl.textContent = `${gal[4]}`;
}

//ellipses block
function assignEllipse() {
  if (window_size.matches) {
    ellipseType = gal[1];
  } else {
    ellipseType = gal[2];
  }
  if (ellipseType === "Japan") {
    firstEllipse.style.background = "";
    secondEllipse.style.background = "#f2785c";
    thirdEllipse.style.background = "";
  } else if (ellipseType === "Spain") {
    firstEllipse.style.background = "#f2785c";
    secondEllipse.style.background = "";
    thirdEllipse.style.background = "";
  } else if (ellipseType === "Usa") {
    firstEllipse.style.background = "";
    secondEllipse.style.background = "";
    thirdEllipse.style.background = "#f2785c";
  }
}

function assignMobGal() {
  galImgFirstEl.src = `assets/img/${gal[0]}Mob.jpg`;
  galImgSecondEl.src = `assets/img/${gal[1]}Mob.jpg`;
  galImgThirdEl.src = `assets/img/${gal[2]}Mob.jpg`;
  galCaptFirstEl.textContent = `${gal[0]}`;
  galCaptSecondEl.textContent = `${gal[1]}`;
  galCaptThirdEl.textContent = `${gal[2]}`;
}

function initDesk() {
  gal = ["Usa", "Spain", "Japan", "Usa", "Spain", "Japan"];
  ellipseType = gal[2];
  animationTime = "300";
  delay = 300;
  translate = "20.37";
  assignDeskGal();
  assignEllipse();
}

function initMobile() {
  gal = ["Usa", "Spain", "Japan"];
  ellipseType = gal[1];
  translate = "100";
  animationTime = "600";
  delay = 100;
  assignMobGal();
  assignEllipse();
}

function init() {
  if (window_size.matches) {
    initMobile();
  } else {
    initDesk();
  }
}
init();

function assignGal() {
  if (window_size.matches) {
    assignMobGal();
    assignEllipse();
  } else {
    assignDeskGal();
    assignEllipse();
  }
}

window.addEventListener("resize", init);

function forward() {
  galWrapperEl.style.transition = `${animationTime}ms`;
  galWrapperEl.style.transform = `translateX(${translate}%)`;
  let galFwd = gal.splice(-1, 1);
  gal.unshift(galFwd[0]);
  setTimeout(function () {
    galWrapperEl.style.transition = "0s";
    assignGal();
    galWrapperEl.style.transform = "translateX(0%)";
  }, delay);
}

function backward() {
  galWrapperEl.style.transition = `${animationTime}ms`;
  galWrapperEl.style.transform = `translateX(-${translate}%)`;
  let galFwd = gal.splice(0, 1);
  gal.push(galFwd[0]);
  setTimeout(function () {
    galWrapperEl.style.transition = "0s";
    assignGal();
    galWrapperEl.style.transform = "translateX(0%)";
  }, delay);
}

galImgThirdEl.addEventListener("click", backward);
galImgFirstEl.addEventListener("click", forward);
arrowLeft.addEventListener("click", forward);
arrowRight.addEventListener("click", backward);

firstEllipse.addEventListener("click", function () {
  if (ellipseType === "Japan") {
    forward();
  } else if (ellipseType === "Usa") {
    forward();
    setTimeout(assignGal(), 300);
    setTimeout(forward(), 300);
  }
});

secondEllipse.addEventListener("click", function () {
  if (ellipseType === "Spain") {
    backward();
  } else if (ellipseType === "Usa") {
    forward();
  }
});

thirdEllipse.addEventListener("click", function () {
  if (ellipseType === "Japan") {
    backward();
  } else if (ellipseType === "Spain") {
    backward();
    setTimeout(assignGal(), 300);
    setTimeout(backward(), 300);
  }
});
