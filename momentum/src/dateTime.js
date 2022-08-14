const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const greetingElement = document.querySelector(".greeting");
export const nameElement = document.querySelector(".username");
import { currentlanguage, settings } from "./settings";

export const getTimeOfDay = function () {
  const hours = new Date().getHours();
  const timeOfDay =
    currentlanguage === "en" ? settings.timeOfDayEn : settings.timeOfDayRu;
  return timeOfDay[Math.floor(hours / 6)];
};

const showGreeteng = function () {
  greetingElement.textContent = `${getTimeOfDay()},`;
};

export const showTimeDate = function () {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = date.toLocaleDateString(
    `${currentlanguage === "en" ? "en-US" : "ru-RU"}`,
    options
  );
  timeElement.textContent = `${currentTime}`;
  dateElement.textContent = `${currentDate.slice()}`;
  showGreeteng();
  setTimeout(showTimeDate, 1000);
};
