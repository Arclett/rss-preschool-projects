const songNameElement = document.querySelector(".song-name");
const playListElement = document.querySelector(".play-list");
let isPlay = false;
export let playTime = 0;
export const lengthElement = document.querySelector(".length");
export const playElement = document.querySelector(".play");
export const timeline = document.querySelector(".timeline");
export const audio = new Audio();
export const playPauseElement = document.querySelector(
  ".player-icon:nth-child(2)"
);

import { playList } from "./playlist";

// переводит секунды в минуты

export const secToMin = function (sec) {
  return new Date(sec * 1000).toISOString().slice(15, 19);
};

//Назначает начальный трек

export const startTrack = function () {
  if (songNameElement.textContent === "")
    songNameElement.textContent = `${playList[0].title}`;
  lengthElement.textContent = `${playList[0].duration}`;
  document.querySelector("li:nth-child(1) .play-list-name").style.color =
    "white";
  document.querySelector("li:nth-child(1) .play-list-name").style.fontWeight =
    "bold";
};

//Функция для работы главной кнопки воспроизведения

export const playBtn = function () {
  const current = getTrackNumber();
  if (isPlay === false) {
    audio.src = `../assets/sounds/${songNameElement.textContent}.mp3`;
    audio.currentTime = playTime;
    audio.play();
    highLiteTrack();
    playPauseElement.classList.remove("play");
    playPauseElement.classList.add("pause");
    resetBtn();
    document.querySelector(
      `.button-${current + 1}`
    ).style.background = `url("../assets/svg/pause(1).svg") no-repeat`;
    isPlay = true;
  } else {
    audio.pause();
    playTime = audio.currentTime;
    playPauseElement.classList.add("play");
    playPauseElement.classList.remove("pause");
    resetBtn();
    document.querySelector(
      `.button-${current + 1}`
    ).style.background = `url("../assets/svg/play(1).svg") no-repeat`;
    isPlay = false;
  }
};

//Функция для запуска аудио пр нажатии на элемент в списке треков

export const playAudio = function () {
  isPlay = false;
  playTime = 0;
  playBtn();
};

//Функция создающая треклист на основе файла playList.js

export const createPlayList = function () {
  playList.forEach(function (el) {
    const li = document.createElement("li");
    li.classList.add("play-item");
    playListElement.append(li);
    const liBtn = document.createElement("button");
    liBtn.classList.add(
      "play-list-button",
      `button-${playList.indexOf(el) + 1}`
    );
    const liName = document.createElement("span");
    liName.classList.add("play-list-name");
    document
      .querySelector(`li:nth-child(${playList.indexOf(el) + 1})`)
      .append(liBtn);
    document
      .querySelector(`li:nth-child(${playList.indexOf(el) + 1})`)
      .append(liName);
    document.querySelector(
      `li:nth-child(${playList.indexOf(el) + 1}) .play-list-name`
    ).textContent = `${el.title}`;
    document
      .querySelector(
        `li:nth-child(${playList.indexOf(el) + 1}) .play-list-name`
      )
      .addEventListener("click", function () {
        songNameElement.textContent = `${el.title}`;
        lengthElement.textContent = `${el.duration}`;
        playAudio();
        console.log("kok");
      });
    document
      .querySelector(
        `li:nth-child(${playList.indexOf(el) + 1}) .play-list-button`
      )
      .addEventListener("click", function () {
        sideButton(
          document.querySelector(
            `li:nth-child(${playList.indexOf(el) + 1}) .play-list-button`
          )
        );
      });
  });
};

//Функция для получения номера текущего трека, начиная с нулевого

const getTrackNumber = function () {
  return playList
    .map(function (e) {
      return e.title;
    })
    .indexOf(songNameElement.textContent);
};

//Функция дя переключения на следующий трек

export const nextTrack = function () {
  const currentTrack = getTrackNumber();
  if (currentTrack === playList.length - 1) {
    songNameElement.textContent = `${playList[0].title}`;
    playAudio();
  } else {
    songNameElement.textContent = `${playList[currentTrack + 1].title}`;
    playAudio();
  }
};

//Функция для переключения на предыдущий трек

export const prevTrack = function () {
  const currentTrack = getTrackNumber();
  if (currentTrack === 0) {
    songNameElement.textContent = `${playList[playList.length - 1].title}`;
    playAudio();
  } else {
    songNameElement.textContent = `${playList[currentTrack - 1].title}`;
    playAudio();
  }
};

//Функция для выделения текущего трека

const highLiteTrack = function () {
  const currentTrack = getTrackNumber();
  playList.forEach(function (e) {
    document.querySelector(
      `li:nth-child(${playList.indexOf(e) + 1}) .play-list-name`
    ).style.color = "lightgrey";
    document.querySelector(
      `li:nth-child(${playList.indexOf(e) + 1}) .play-list-name`
    ).style.fontWeight = "normal";
  });
  document.querySelector(
    `li:nth-child(${currentTrack + 1}) .play-list-name`
  ).style.color = "white";
  document.querySelector(
    `li:nth-child(${currentTrack + 1}) .play-list-name`
  ).style.fontWeight = "bold";
};

//Функция для работы боковых кнопок в плейлитсе

const sideButton = function (elem) {
  const current = getTrackNumber();
  if (isPlay === false) {
    if (elem.classList.contains(`button-${current + 1}`)) {
      audio.src = `../assets/sounds/${songNameElement.textContent}.mp3`;
      audio.currentTime = playTime;
      audio.play();
      highLiteTrack();
      console.log("play old");
      playPauseElement.classList.remove("play");
      playPauseElement.classList.add("pause");
      document.querySelector(
        `.button-${current + 1}`
      ).style.background = `url("../assets/svg/pause(1).svg") no-repeat`;
      isPlay = true;
    } else {
      resetBtn();
      songNameElement.textContent = `${
        playList[elem.classList[1].slice(-1) - 1].title
      }`;
      audio.src = `../assets/sounds/${
        playList[elem.classList[1].slice(-1) - 1].title
      }.mp3`;
      audio.currentTime = playTime;
      audio.play();
      highLiteTrack();
      console.log("play new");
      playPauseElement.classList.remove("play");
      playPauseElement.classList.add("pause");
      document.querySelector(
        `.button-${elem.classList[1].slice(-1)}`
      ).style.background = `url("../assets/svg/pause(1).svg") no-repeat`;
      isPlay = true;
    }
  } else {
    if (elem.classList.contains(`button-${current + 1}`)) {
      audio.pause();
      console.log("pause old");
      playTime = audio.currentTime;
      isPlay = false;
      playPauseElement.classList.add("play");
      playPauseElement.classList.remove("pause");
      document.querySelector(
        `.button-${current + 1}`
      ).style.background = `url("../assets/svg/play(1).svg") no-repeat`;
    } else {
      console.log(current);
      audio.pause();
      resetBtn();
      songNameElement.textContent = `${
        playList[elem.classList[1].slice(-1) - 1].title
      }`;
      audio.src = `../assets/sounds/${
        playList[elem.classList[1].slice(-1) - 1].title
      }.mp3`;
      audio.currentTime = 0;
      audio.play();
      highLiteTrack();
      console.log("play");
      elem.style.background = `url("../assets/svg/pause(1).svg") no-repeat`;
      playPauseElement.classList.remove("play");
      playPauseElement.classList.add("pause");
      isPlay = true;
    }
  }
};

//Функция для обновления иконок боковых кнопок плейлиста

const resetBtn = function () {
  playList.forEach(function (e) {
    document.querySelector(
      `.button-${playList.indexOf(e) + 1}`
    ).style.background = `url("../assets/svg/play(1).svg") no-repeat`;
  });
};
