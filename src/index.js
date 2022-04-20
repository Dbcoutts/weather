let fruits = [
  "src/img/snow.jpg",
  "src/img/rain.jpg",
  "src/img/sun.jpg",
  "src/img/cloudy.jpg",
];

let now = new Date();
function formatDate(date) {
  let currentDay = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay];
  let currentMonth = now.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentMonth];
  let year = now.getFullYear();
  let dateToday = now.getDate();
  return `${day}, ${month} ${dateToday}, ${year}`;
}
let currentDate = document.querySelector("#date-now");
currentDate.innerHTML = formatDate(now);

function formatTime(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let currentTime = document.querySelector("#time");
currentTime.innerHTML = formatTime(now);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#citySearch");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
function displayWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = `${response.data.name}`;
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = `  Humidity: ${response.data.main.humidity}%`;
  let weather = document.querySelector("#description");
  let changeImage = document.querySelector("#picture");
  weather.innerHTML = `Currently: ${response.data.weather[0].main}`;
  if (`${response.data.weather[0].main}` === "Snow") {
    changeImage.setAttribute("src", fruits[0]);
  }
  if (`${response.data.weather[0].main}` === "Rain") {
    changeImage.setAttribute("src", fruits[1]);
  }
  if (`${response.data.weather[0].main}` === "Clear") {
    changeImage.setAttribute("src", fruits[2]);
  }
  if (`${response.data.weather[0].main}` === "Clouds") {
    changeImage.setAttribute("src", fruits[3]);
  }
  let temp = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}`;

  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `  Wind Speed: ${windSpeed}km/h`;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getSearchedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch").value;
  searchCity(city);
}

let currentLocationbutton = document.querySelector("#current-city-button");
currentLocationbutton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getSearchedCity);
