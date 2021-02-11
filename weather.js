const weather = document.querySelector(".js-weather");

const API_KEY = "8ff27289c517ee8092eea9f9a74b3207";
const COORDS = "coords";

function getWeather(lat, log) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric
    `)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const name = json.name;
      weather.innerText = `${temperature}° | ${name}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getCoordsSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  getWeather(latitude, longitude);
  saveCoords(coordsObj);
}
function getCoordsErros() {
  console.log("can't access geolocation.!");
}
function askForCoords() {
  const coords = navigator.geolocation.getCurrentPosition(
    getCoordsSuccess,
    getCoordsErros
  );
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    const latitude = parsedCoords.latitude;
    const longitude = parsedCoords.longitude;
    getWeather(latitude, longitude);
  }
}

function init() {
  loadCoords();
}

init();
