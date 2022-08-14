import { getTimeOfDay } from "./dateTime";
import { currentlanguage, settings } from "./settings";
const body = document.querySelector("body");

let timeOfDay, randomNum;

const getRandomNum = function () {
  return Math.floor(Math.random() * 20) + 1;
};

randomNum = getRandomNum();

export const setBg = function () {
  const x = ["night", "morning", "afternoon", "evening"];
  timeOfDay = getTimeOfDay();
  let y;
  if (currentlanguage === "en") {
    y = settings.timeOfDayEn.indexOf(timeOfDay);
  } else {
    y = settings.timeOfDayRu.indexOf(timeOfDay);
  }
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Arclett/stage1-tasks/assets/images/${
    x[y]
  }/${randomNum.toString().padStart(2, "0")}.jpg`;
  img.addEventListener("load", function () {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/Arclett/stage1-tasks/assets/images/${
      x[y]
    }/${randomNum.toString().padStart(2, "0")}.jpg')`;
  });
};

export const getSlideNext = function () {
  if (randomNum < 20) {
    randomNum++;
    setBg();
  } else {
    randomNum = 0;
    setBg();
  }
};

export const getSliderPrev = function () {
  if (randomNum > 0) {
    randomNum--;
    setBg();
  } else {
    randomNum = 20;
    setBg();
  }
};
