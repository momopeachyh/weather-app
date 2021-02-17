let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentDate.getDay()];
let currentHour = currentDate.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinute = currentDate.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let weekday = document.querySelector("#day-of-week");
weekday.innerHTML = `${currentDay}`;

let time = document.querySelector("#current-time");
time.innerHTML = `${currentHour}:${currentMinute}`;

let celsiusTemp = null;

function showWeather(response) {
  let cityDisplayed = document.querySelector("h1");
  let city = response.data.name;
  city = city.trim();
  city = city.charAt(0).toUpperCase() + city.substring(1);
  cityDisplayed.innerHTML = city;

  let temperature = Math.round(response.data.main.temp);
  let tempHeading = document.querySelector("#todays-temp");
  tempHeading.innerHTML = `${temperature}°`;
  celsiusTemp = response.data.main.temp;

  let weatherDescription = response.data.weather[0].description;
  weatherDescription =
    weatherDescription.charAt(0).toUpperCase() +
    weatherDescription.substring(1);
  let weatherDescriptionHeading = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionHeading.innerHTML = weatherDescription;

  let humidity = response.data.main.humidity;
  let humidityHeading = document.querySelector("#humidity");
  humidityHeading.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = response.data.wind.speed;
  let windHeading = document.querySelector("#windspeed");
  windHeading.innerHTML = `Wind: ${windSpeed}km/h`;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function getTemp(city) {
  let apiKey = "343320b5e251ee7c39260263367d8fb5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-bar");
  getTemp(cityInput.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

function showPosition(position) {
  let apiKey = "343320b5e251ee7c39260263367d8fb5";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", getPosition);

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = (celsiusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#todays-temp");
  tempElement.innerHTML = `${Math.round(tempFahrenheit)}°`;
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}

let fahrenheit = document.querySelector("#fahrenheit-converter");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#todays-temp");
  tempElement.innerHTML = `${Math.round(celsiusTemp)}°`;
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celsius = document.querySelector("#celsius-converter");
celsius.addEventListener("click", convertToCelsius);
