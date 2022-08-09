const hours = new Date().getHours();
const greetingElement = document.querySelector(".greeting");

const getTimeOfDay = function () {
  const timeOfDay = ["Night", "Morning", "Day", "Evening"];
  return timeOfDay[Math.floor(hours / 6)];
};

export const showGreeteng = function () {
  greetingElement.textContent = `Good ${getTimeOfDay()},`;
};
