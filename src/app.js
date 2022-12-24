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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="WeatherForecastPreview">
          <div class="forecast-time">${day}</div>
          <img src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="100"
          height="100"
          />
          <div class="forecast-temperature">
            <span class="forecast-temperature-max">11°</span>
            <span class="forecast-temperature-min">8°</span>
          </div>
        </div>
      </div> 
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//searchCity
function searchCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#search-input");
  let newCity = document.querySelector("currentCity");
  newCity.innerHTML = currentCity.value;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

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
  console.log(response);
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
  celsiusTemperature = response.data.main.temp;
}

//units conversion
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();

//weatherforecast preview
