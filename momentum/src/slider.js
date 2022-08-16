import { getTimeOfDay } from "./dateTime";
import { currentlanguage, settings } from "./settings";
const body = document.querySelector("body");

let timeOfDay, randomNum;

const getRandomNum = function () {
  return Math.floor(Math.random() * 20) + 1;
};

randomNum = getRandomNum();

const getGitImageLink = function () {
  const x = ["night", "morning", "afternoon", "evening"];
  timeOfDay = getTimeOfDay();
  let y;
  if (currentlanguage === "en") {
    y = settings.timeOfDayEn.indexOf(timeOfDay);
  } else {
    y = settings.timeOfDayRu.indexOf(timeOfDay);
  }
  return `https://raw.githubusercontent.com/Arclett/stage1-tasks/assets/images/${
    x[y]
  }/${randomNum.toString().padStart(2, "0")}.jpg`;
};

export async function setBg() {
  let imageLinkGen;
  if (settings.photoSource === "github") {
    imageLinkGen = getGitImageLink();
  } else if (settings.photoSource === "flickr") {
    imageLinkGen = await getImageLink();
  } else if (settings.photoSource === "unplash") {
    imageLinkGen = await getImageLink();
  }
  const img = new Image();
  img.src = `${imageLinkGen}`;
  img.addEventListener("load", function () {
    body.style.backgroundImage = `url('${imageLinkGen}')`;
  });
}

export const getSlideNext = function () {
  if (settings.photoSource === "github") {
    if (randomNum < 20) {
      randomNum++;
      setBg();
    } else {
      randomNum = 0;
      setBg();
    }
  } else {
    setBg();
  }
};

export const getSliderPrev = function () {
  if (settings.photoSource === "github") {
    if (randomNum > 0) {
      randomNum--;
      setBg();
    } else {
      randomNum = 20;
      setBg();
    }
  } else {
    setBg();
  }
};

export async function getImageLink() {
  if (settings.photoSource === "unplash") {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${settings.tagsPhoto}&client_id=n--SK77UqCI2ztzPFUUgJKS4GEwIgThxk3MK1623O5c`;
    const res = await fetch(url);
    const data = await res.json();
    return data.urls.regular;
  }
  if (settings.photoSource === "flickr") {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2742857064cb37d47617e3ebf4edc0fc&tags=${settings.tagsPhoto}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    return data.photos.photo[Math.floor(Math.random() * 100) + 1].url_l;
  }
}
