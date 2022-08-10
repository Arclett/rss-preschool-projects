import { showTimeDate, nameElement } from "./dateTime";
import { setBg, getSlideNext, getSliderPrev } from "./slider";
import { getWeather, cityElement } from "./weather";
import { getQuotes, changeQuote } from "./quotes";

//Date Time and Greeting

showTimeDate();

//Local Storage

function setLocalStorage() {
  localStorage.setItem("name", nameElement.value);
  localStorage.setItem("city", cityElement.value);
}

window.addEventListener("beforeunload", setLocalStorage);
nameElement.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    setLocalStorage();
    nameElement.blur();
  }
});

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    nameElement.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    cityElement.value = localStorage.getItem("city");
    getWeather();
  }
}
window.addEventListener("load", getLocalStorage);

//Slider

setBg();

const slideNextElement = document.querySelector(".slide-next");
const slidePrevElement = document.querySelector(".slide-prev");

slideNextElement.addEventListener("click", getSlideNext);
slidePrevElement.addEventListener("click", getSliderPrev);

//Weather
getWeather();

cityElement.addEventListener("change", getWeather);

//Quotes
getQuotes();

const changeQuoteElement = document.querySelector(".change-quote");
changeQuoteElement.addEventListener("click", changeQuote);
