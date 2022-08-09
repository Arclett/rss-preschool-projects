const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const greetingElement = document.querySelector(".greeting");
const nameElement = document.querySelector(".username");

const getTimeOfDay = function () {
  const hours = new Date().getHours();
  const timeOfDay = ["Night", "Morning", "Day", "Evening"];
  return timeOfDay[Math.floor(hours / 6)];
};

const showGreeteng = function () {
  greetingElement.textContent = `Good ${getTimeOfDay()},`;
};

function setLocalStorage() {
  localStorage.setItem("name", nameElement.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    nameElement.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

export const showTimeDate = function () {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = date.toLocaleDateString("en-US", options);
  timeElement.textContent = `${currentTime}`;
  dateElement.textContent = `${currentDate.slice()}`;
  showGreeteng();
  setTimeout(showTimeDate, 1000);
};
