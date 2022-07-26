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

//popup

const popupBtn = document.querySelectorAll(".popup-open");
const popupWindow = document.querySelector(".popup-wrapper");
const popupLogin = document.querySelector(".login");
const popupRegist = document.querySelector(".regist");
const popupSwitch = document.querySelectorAll(".popup-switch");
const signBtn = document.querySelector(".sign");
const inputPass = document.querySelector(".pass-sign");
const inputMail = document.querySelector(".mail-sign");
const logBtn = document.querySelector(".log-btn");
const inputPassLog = document.querySelector(".pass-log");
const inputMailLog = document.querySelector(".mail-log");

//burger function

const closeBurger = function () {
  document.querySelector("body").style.overflowY = "visible";
  modalEl.style.transform = "translateX(0%)";
  overlayEl.style.display = "none";
  popupWindow.style.transform = "translateY(0px)";
  inputMail.value = "";
  inputPass.value = "";
  inputMailLog.value = "";
  inputPassLog.value = "";
};

burgerEl.addEventListener("click", function () {
  modalEl.style.transform = "translateX(-100%)";
  overlayEl.style.display = "block";
  document.querySelector("body").style.overflowY = "hidden";
});

crossEl.addEventListener("click", closeBurger);
overlayEl.addEventListener("click", closeBurger);

[...navEl].map((nav) => nav.addEventListener("click", closeBurger));

console.log(
  'Ваша оценка - 125 баллов\nОтзыв по пунктам ТЗ:nВыполненные пункты:\n1) на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели(например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа)\n2) Три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края)\n3) Анимации плавного перемещения для слайдера\n4) логин попап соответствует верстке его закрытие происходит при клике вне попапа\n5) логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег)\n6) Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение\n'
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

//popup function

[...popupBtn].map((a) =>
  a.addEventListener("click", function () {
    popupWindow.style.transform = "translateY(750px)";
    overlayEl.style.display = "block";
    document.querySelector("body").style.overflowY = "hidden";
  })
);

[...popupSwitch].map((a) =>
  a.addEventListener("click", function () {
    popupRegist.classList.toggle("hide");
    popupLogin.classList.toggle("hide");
    inputMail.value = "";
    inputPass.value = "";
    inputMailLog.value = "";
    inputPassLog.value = "";
  })
);

signBtn.addEventListener("click", function () {
  if (inputMail.checkValidity() && inputPass.checkValidity()) {
    window.alert(`Login:${inputMail.value}\nPassword:${inputPass.value}`);
  } else if (!inputMail.checkValidity() && inputPass.checkValidity()) {
    window.alert("Your Email is not valid!");
  } else if (!inputPass.checkValidity() && inputMail.checkValidity()) {
    window.alert("Your Password is not valid!");
  } else {
    window.alert("Your Email and Password is not valid! Try again :)");
  }
});

logBtn.addEventListener("click", function () {
  if (inputMailLog.checkValidity() && inputPassLog.checkValidity()) {
    window.alert(`Login:${inputMailLog.value}\nPassword:${inputPassLog.value}`);
  } else if (!inputMailLog.checkValidity() && inputPassLog.checkValidity()) {
    window.alert("Your Email is not valid!");
  } else if (!inputPassLog.checkValidity() && inputMailLog.checkValidity()) {
    window.alert("Your Password is not valid!");
  } else {
    window.alert("Your Email and Password is not valid! Try again :)");
  }
});
