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

//AUDIO

import {
  startTrack,
  createPlayList,
  audio,
  playAudio,
  lengthElement,
  playElement,
  timeline,
  secToMin,
  playBtn,
  playPauseElement,
} from "./audio";

startTrack();
createPlayList();

audio.addEventListener("loadeddata", function () {
  const audioLength = Math.floor(audio.duration);
  lengthElement.textContent = `${secToMin(audioLength)}`;
});

playPauseElement.addEventListener("click", playBtn);

timeline.addEventListener("click", (e) => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
  audio.currentTime = timeToSeek;
});

setInterval(() => {
  const progress = document.querySelector(".progress");
  progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  document.querySelector(".current").textContent = secToMin(audio.currentTime);
}, 500);

const volumeBtn = document.querySelector(".volume-button");
const volumeSliderElement = document.querySelector(".volume-slider");
const songElement = document.querySelector(".song-wrapper");

volumeBtn.addEventListener("mouseover", function () {
  volumeSliderElement.style.display = "block";
});

volumeSliderElement.addEventListener("mouseleave", function () {
  volumeSliderElement.style.display = "none";
});

songElement.addEventListener("mouseleave", function () {
  volumeSliderElement.style.display = "none";
});

const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener("click", (e) => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  document.querySelector(".volume-percentage").style.width =
    newVolume * 100 + "%";
});

volumeBtn.addEventListener("click", function () {
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeBtn.style.backgroundImage = 'url("../assets/svg/mute.svg")';
  } else {
    volumeBtn.style.backgroundImage = 'url("../assets/svg/volume.svg")';
  }
});
