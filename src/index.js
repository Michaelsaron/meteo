function refreshWeather(response) {
  const cityElement = document.querySelector("#city");
  const descriptionElement = document.querySelector("#description");
  const humidityElement = document.querySelector("#humidity");
  const windSpeedElement = document.querySelector("#wind-speed");
  const temperatureElement = document.querySelector("#temperature");
  const timeElement = document.querySelector("#time");
  const iconElement = document.querySelector("#icon");

  const data = response.data;

  cityElement.innerHTML = data.city;
  descriptionElement.innerHTML = data.condition.description;
  humidityElement.innerHTML = `${data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(data.temperature.current);
  timeElement.innerHTML = formatDate(new Date(data.time * 1000));
  iconElement.innerHTML = `<img src="${data.condition.icon_url}" class="weather-app-icon" alt="Weather icon"/>`;
}

function formatDate(date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  const apiKey = "b2a5adcct04b33178913oc335f405433";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather).catch(() => {
    alert("City not found. Please try again.");
  });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

document.querySelector("#search-form").addEventListener("submit", handleSearchSubmit);

// Default city on load
searchCity("Paris");
