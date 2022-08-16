const quoteElement = document.querySelector(".quote");
const authorElement = document.querySelector(".author");

import { currentlanguage } from "./settings";

let quoteNum, dataLength;

export async function getQuotes() {
  const quotes = `${currentlanguage === "en" ? "dataEn.json" : "dataRu.json"}`;
  const res = await fetch(quotes);
  const data = await res.json();
  dataLength = data.length;
  if (quoteNum === undefined)
    quoteNum = Math.round(Math.random() * (dataLength - 1));
  quoteElement.textContent = `${data[quoteNum].text}`;
  authorElement.textContent = `${data[quoteNum].author}`;
}

export const changeQuote = function () {
  let newQuoteNum = Math.round(Math.random() * (dataLength - 1));
  while (quoteNum === newQuoteNum) {
    newQuoteNum = Math.round(Math.random() * (dataLength - 1));
  }
  quoteNum = newQuoteNum;
  getQuotes();
};
