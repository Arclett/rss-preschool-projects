const songNameElement = document.querySelector(".song-name");
const playListElement = document.querySelector(".play-list");
let isPlay = false;
let playTime = 0;
export const lengthElement = document.querySelector(".length");
export const playElement = document.querySelector(".play");
export const timeline = document.querySelector(".timeline");
export const audio = new Audio();
export const playPauseElement = document.querySelector(
  ".player-icon:nth-child(2)"
);

import { playList } from "./playlist";

export const secToMin = function (sec) {
  return new Date(sec * 1000).toISOString().slice(15, 19);
};

export const startTrack = function () {
  if (songNameElement.textContent === "")
    songNameElement.textContent = `${playList[0].title}`;
  lengthElement.textContent = `${playList[0].duration}`;
};

export const playBtn = function () {
  if (isPlay === false) {
    audio.src = `../assets/sounds/${songNameElement.textContent}.mp3`;
    audio.currentTime = playTime;
    audio.play();
    playPauseElement.classList.remove("play");
    playPauseElement.classList.add("pause");
    isPlay = true;
  } else {
    playPauseElement.classList.add("play");
    playPauseElement.classList.remove("pause");
    audio.pause();
    playTime = audio.currentTime;
    isPlay = false;
  }
};

export const playAudio = function () {
  isPlay = false;
  playTime = 0;
  playBtn();
};

export const createPlayList = function () {
  playList.forEach(function (el) {
    const li = document.createElement("li");
    playListElement.append(li);
    document.querySelector(
      `li:nth-child(${playList.indexOf(el) + 1})`
    ).textContent = `${el.title}`;
    document
      .querySelector(`li:nth-child(${playList.indexOf(el) + 1})`)
      .addEventListener("click", function () {
        songNameElement.textContent = `${el.title}`;
        lengthElement.textContent = `${el.duration}`;
        playAudio();
      });
  });
};
