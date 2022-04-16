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
let currentDate = document.querySelector("h2");
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

let currentTime = document.querySelector("h3");
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
  let temperature = Math.round(response.data.main.temp);
  let weather = document.querySelector("#discription");
  weather.innerHTML = `${response.data.weather[0].main}`;

  let temp = document.querySelector("#temp");
  temp.innerHTML = `${temperature}`;
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
