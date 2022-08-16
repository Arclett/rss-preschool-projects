export const settings = {
  language: "en",
  photoSource: "github",
  elements: ["player", "time", "date", "greetings", "quotes", "weather"],
  tagsPhoto: "nature",
  timeOfDayEn: ["Good Night", "Good Morning", "Good Afternoon", "Good Evening"],
  timeOfDayRu: ["Доброй ночи", "Доброе утро", "Добрый день", "Добрый вечер"],
};

export const allElements = [
  "player",
  "time",
  "date",
  "greetings",
  "quotes",
  "weather",
];

export const allElementsRu = {
  player: "Музыка",
  time: "Время",
  date: "Дата",
  greetings: "Приветствие",
  quotes: "Цитата",
  weather: "Погода",
};

export const allElementsEn = new Map([
  ["Музыка", "player"],
  ["Время", "time"],
  ["Дата", "date"],
  ["Приветствие", "greetings"],
  ["Цитата", "quotes"],
  ["Погода", "weather"],
]);

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

export const hideCheckbox = function () {
  allElements.forEach(function (e) {
    if (!settings.elements.includes(e)) {
      document.querySelector(`.${e}-inp`).checked = false;
    } else {
      document.querySelector(`.${e}-inp`).checked = true;
    }
  });
};

const elemLabels = document.querySelectorAll(".elem-label");
export let currentlanguage = settings.language;

export const setLang = function () {
  currentlanguage = settings.language;
  document.querySelector(".username").placeholder = `${
    currentlanguage === "en" ? "[Enter name]" : "[Введите имя]"
  }`;
  document.querySelector(".city").placeholder = `${
    currentlanguage === "en" ? "[Enter city]" : "[Введите город]"
  }`;
  [...elemLabels].forEach(function (el) {
    if (currentlanguage === "en") {
      const x = el.textContent;
      const y = allElementsEn.get(x) || el.textContent;
      el.textContent = `${y.replace(y[0], y[0].toUpperCase())}`;
    } else {
      const x = el.textContent.toLowerCase();
      el.textContent = `${allElementsRu[x]}`;
    }
  });
  document.querySelector(".current-tags").textContent = `${
    currentlanguage === "en" ? "Tag:" : "Тег:"
  }`;
  document.querySelector(".add-tags").value = `${
    currentlanguage === "en" ? "Add tag" : "Добавить тег"
  }`;
  document.querySelector(".en-set").textContent = `${
    currentlanguage === "en" ? "English" : "Английский"
  }`;
  document.querySelector(".ru-set").textContent = `${
    currentlanguage === "en" ? "Russian" : "Русский"
  }`;
};

export const elements = document.querySelectorAll(".element");
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
