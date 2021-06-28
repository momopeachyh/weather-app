let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[date.getDay()];
let currentHour = date.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinute = date.getMinutes();
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
  windHeading.innerHTML = `Wind: ${windSpeed} km/h`;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

function formatUnix(timestamp) {
  date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let forecastTempCelsius = null;

function showForecast(response) {
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = null;
  let forecastData = null;

  for (let index = 0; index < 5; index++) {
    forecastData = response.data.list[index];
    forecast.innerHTML += ` 
             <div class="col">
            <h3>${formatUnix(forecastData.dt * 1000)}</h3>
             <img src="http://openweathermap.org/img/wn/${
               forecastData.weather[0].icon
             }@2x.png" id="weather-icon" class="forecast">
            <h3 id="forecast-temp">${Math.round(
              forecastData.main.temp_max
            )}°</h3>
        </div>`;
  }
  forecastTempCelsius = forecastData.main.temp_max;
}

function getTemp(city) {
  let apiKey = "343320b5e251ee7c39260263367d8fb5";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
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

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
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

  // let forecastTempFahrenheit = (forecastTempCelsius * 9) / 5 + 32;
  // let forecastTemp = document.querySelector("#forecast-temp");
  // forecastTemp.innerHTML = `${Math.round(forecastTempFahrenheit)}°`;

  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}

let fahrenheit = document.querySelector("#fahrenheit-converter");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#todays-temp");
  tempElement.innerHTML = `${Math.round(celsiusTemp)}°`;

  // let forecastTemp = document.querySelector("#forecast-temp");
  // forecastTemp.innerHTML = `${Math.round(forecastTempCelsius)}°`;

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celsius = document.querySelector("#celsius-converter");
celsius.addEventListener("click", convertToCelsius);

getTemp("new york");
