const weatherIconElement = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature");
const windElement = document.querySelector(".wind");
const humidityElement = document.querySelector(".humidity");
const weatherErrorElement = document.querySelector(".weather-error");
const weatherDescriptionElement = document.querySelector(
  ".weather-description"
);
export const cityElement = document.querySelector(".city");

export async function getWeather() {
  if (!cityElement.value) {
    cityElement.value = "Moscow";
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${
    cityElement.value || "Moscow"
  }&lang=en&appid=5f83aa5f50e6d674b9b8a3881a9f7bac&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === "404") {
    weatherErrorElement.textContent = `Error! City not found for "${cityElement.value}"`;
    weatherIconElement.className = "weather-icon owf";
    temperatureElement.textContent = "";
    weatherDescriptionElement.textContent = "";
    windElement.textContent = "";
    humidityElement.textContent = "";
  } else {
    weatherErrorElement.textContent = "";
    weatherIconElement.className = "weather-icon owf";
    weatherIconElement.classList.add(`owf-${data.weather[0].id}`);
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescriptionElement.textContent = `${data.weather[0].description}`;
    windElement.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}`;
  }
}
