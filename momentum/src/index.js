import { showTimeDate, nameElement } from "./dateTime";
import { setBg, getSlideNext, getSliderPrev } from "./slider";
import { getWeather, cityElement } from "./weather";
import { getQuotes, changeQuote } from "./quotes";
import { settings, hideElement, setLang, hideCheckbox } from "./settings";
const optionElemet = document.querySelector(".option");
const optionBurgerElement = document.querySelector(".option-burger");
const addTagElement = document.querySelector(".add-tags");
const tagInputElement = document.querySelector(".tag-input");
const currentTagSpanElement = document.querySelector(".current-tags-span");
const slideNextElement = document.querySelector(".slide-next");
const slidePrevElement = document.querySelector(".slide-prev");
const changeQuoteElement = document.querySelector(".change-quote");
const volumeBtn = document.querySelector(".volume-button");
const volumeSliderElement = document.querySelector(".volume-slider");
const songElement = document.querySelector(".song-wrapper");
const playNextElement = document.querySelector(".play-next");
const playPrevElement = document.querySelector(".play-prev");
const ruElement = document.querySelector(".ru");
const enElement = document.querySelector(".en");
const githubSourceElement = document.querySelector(".github");
const unplashSourceElement = document.querySelector(".unplash");
const flickrSourceElement = document.querySelector(".flickr");

//Date Time and Greeting

showTimeDate();

//Local Storage

function setLocalStorage() {
  localStorage.setItem("name", nameElement.value);
  localStorage.setItem("city", cityElement.value);
  localStorage.setItem("settings-elements", settings.elements);
  localStorage.setItem("settings-lang", settings.language);
  localStorage.setItem("settings-photo-source", settings.photoSource);
  localStorage.setItem("settings-tags-photo", settings.tagsPhoto);
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
  if (localStorage.getItem("settings-elements")) {
    settings.elements = localStorage.getItem("settings-elements").split(",");
    hideElement();
    hideCheckbox();
  }
  if (localStorage.getItem("settings-lang")) {
    settings.language = localStorage.getItem("settings-lang");
    document.querySelector(
      `.${localStorage.getItem("settings-lang")}`
    ).checked = true;
    setLang();
    getQuotes();
  }
  if (localStorage.getItem("settings-tags-photo", settings.tagsPhoto)) {
    settings.tagsPhoto = localStorage.getItem("settings-tags-photo");
    currentTagSpanElement.textContent = localStorage.getItem(
      "settings-tags-photo"
    );
    startTags();
  }
  if (localStorage.getItem("settings-photo-source")) {
    settings.photoSource = localStorage.getItem("settings-photo-source");
    document.querySelector(
      `.${localStorage.getItem("settings-photo-source")}`
    ).checked = true;
    setBg();
    hideTags();
  }
}
window.addEventListener("load", getLocalStorage);

//Slider

setBg();

slideNextElement.addEventListener("click", getSlideNext);
slidePrevElement.addEventListener("click", getSliderPrev);

//Weather
getWeather();

cityElement.addEventListener("change", getWeather);

//Quotes
getQuotes();

changeQuoteElement.addEventListener("click", changeQuote);

//AUDIO

import {
  startTrack,
  createPlayList,
  audio,
  lengthElement,
  timeline,
  secToMin,
  playBtn,
  playPauseElement,
  nextTrack,
  prevTrack,
} from "./audio";

createPlayList();
startTrack();

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

playNextElement.addEventListener("click", nextTrack);
playPrevElement.addEventListener("click", prevTrack);

audio.addEventListener("ended", nextTrack);

//OPTION

//show hide elements

hideElement();
hideCheckbox();

settings.elements.forEach(function (e) {
  const el = document.querySelector(`.${e}-inp`);
  el.addEventListener("click", function () {
    if (!el.checked) {
      let x = [];
      settings.elements.forEach(function (elem) {
        if (!el.classList.contains(`${elem}-inp`)) {
          x.push(elem);
        }
      });
      settings.elements = x;
      hideElement();
    } else {
      settings.elements.push(`${el.getAttribute("name")}`);
      el.checked = true;
      hideElement();
    }
  });
});

//Language

enElement.addEventListener("click", function () {
  if (enElement.checked) settings.language = "en";
  setLang();
  getWeather();
  getQuotes();
});

ruElement.addEventListener("click", function () {
  if (ruElement.checked) settings.language = "ru";
  setLang();
  getWeather();
  getQuotes();
});

//SETTINGS

githubSourceElement.addEventListener("click", function () {
  if (githubSourceElement.checked) settings.photoSource = "github";
  setBg();
  hideTags();
});

unplashSourceElement.addEventListener("click", function () {
  if (unplashSourceElement.checked) settings.photoSource = "unplash";
  setBg();
  hideTags();
});

flickrSourceElement.addEventListener("click", function () {
  if (flickrSourceElement.checked) settings.photoSource = "flickr";
  setBg();
  hideTags();
});

const hideTags = function () {
  if (!githubSourceElement.checked) {
    document.querySelector(".tags").style.display = "block";
  } else {
    document.querySelector(".tags").style.display = "none";
  }
};
hideTags();

const startTags = function () {
  currentTagSpanElement.textContent = settings.tagsPhoto;
};

const setTags = function () {
  currentTagSpanElement.textContent = tagInputElement.value;
  settings.tagsPhoto = tagInputElement.value.toLowerCase();
};

addTagElement.addEventListener("click", function () {
  setTags();
  setBg();
});

optionElemet.addEventListener("click", function () {
  optionBurgerElement.classList.toggle("invis");
});

optionBurgerElement.addEventListener("mouseleave", function () {
  optionBurgerElement.classList.add("invis");
});
