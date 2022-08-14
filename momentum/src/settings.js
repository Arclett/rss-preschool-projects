export const settings = {
  language: "en",
  photoSource: "github",
  elements: ["player", "time", "date", "greetings", "quotes", "weather"],
  tagsPhoto: [],
  timeOfDayEn: ["Good Night", "Good Morning", "Good Afternoon", "Good Evening"],
  timeOfDayRu: ["Доброй ночи", "Доброу утро", "Добрый день", "Добрый вечер"],
};

export const allElements = [
  "player",
  "time",
  "date",
  "greetings",
  "quotes",
  "weather",
];
const elements = document.querySelectorAll(".element");
[...elements].forEach((el) =>
  el.addEventListener("click", function () {
    if (el.checked) {
      const x = settings.elements.filter(function (elem) {
        if (elem !== el) return elem;
      });
      settings.elements = x;
    }
  })
);

export const hideElement = function () {
  allElements.forEach(function (e) {
    if (!settings.elements.includes(e)) {
      document.querySelector(`.${e}`).classList.remove("visible");
      document.querySelector(`.${e}`).classList.add("hidden");
    } else {
      document.querySelector(`.${e}`).classList.remove("hidden");
      document.querySelector(`.${e}`).classList.add("visible");
    }
  });
};

export let currentlanguage = settings.language;
export const setLang = function () {
  currentlanguage = settings.language;
  document.querySelector(".username").placeholder = `${
    currentlanguage === "en" ? "[Enter name]" : "[Введите имя]"
  }`;
  document.querySelector(".city").placeholder = `${
    currentlanguage === "en" ? "[Enter name]" : "[Введите город]"
  }`;
};
