//formatDate
function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = document.querySelector("#currentDate");
  today.innerHTML = `${day} ${hours}:${minutes}`;
}
formatDate();

//searchCity
function searchCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#search-input");
  let newCity = document.querySelector("currentCity");
  newCity.innerHTML = currentCity.value;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//SearchCity
function searchCity(event) {
  event.preventDefault();
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let cityName = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//showWeather
function showWeather(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//weatherforecast preview
