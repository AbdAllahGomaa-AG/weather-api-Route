//Today's Card Variables
let Day = document.querySelector(".day");
let data = document.querySelector(".data");
let city = document.getElementById("city");
let degree = document.querySelector(".degree");
let textDegree = document.querySelector(".textDegree");
let iconDegree = document.getElementById("today-icon");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");
let humidty = document.getElementById("humidty");
let search = document.getElementById("search");
console.log(search);
// console.log(textDegree);

//Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay");
let nextDayCity = document.getElementsByClassName("nextDayCity");
let nextDegree = document.getElementsByClassName("nextDegree");
let nextIcon = document.getElementsByClassName("NextIconn");
let NextTextDegree = document.getElementsByClassName("NextTextDegree");

let maxDegree = document.getElementsByClassName("maxDegree");
let minDegree = document.getElementsByClassName("minDegree");
console.log(maxDegree);

let apiResponse;
let responseData;
let monthName = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Spt",
  "Oct",
  "Nov",
  "Dec",
]; //
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
async function getWeather(currentCity = "cairo") {
  apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`
  );
  responseData = await apiResponse.json();
  displayWeather();
  displayNextDayWeather();
}
getWeather();

function displayWeather() {
  let date = new Date();
  Day.innerHTML = days[date.getDay()];
  data.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
  city.innerHTML = responseData.location.name;
  degree.innerHTML = responseData.current.temp_c + " oC";
  //  console.log(responseData.current.condition.icon);
  iconDegree.setAttribute(
    "src",
    `https:${responseData.current.condition.icon}`
  );
  textDegree.innerHTML = responseData.current.condition.text;
  wind.innerHTML = responseData.current.wind_kph;
  compass.innerHTML = responseData.current.wind_dir;
  humidty.innerText = responseData.current.humidity;
}

function displayNextDayWeather() {
  for (let i = 0; i < nextDay.length; i++) {
    // day
    nextDay[i].innerHTML =
      days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()];
    // icon
    nextIcon[i].setAttribute(
      "src",
      `https:${responseData.forecast.forecastday[i + 1].day.condition.icon}`
    );
    // max
    maxDegree[i].innerHTML =
      responseData.forecast.forecastday[i + 1].day.maxtemp_c;
    // min
    minDegree[i].innerHTML =
      responseData.forecast.forecastday[i + 1].day.mintemp_c;

    NextTextDegree[i].innerHTML =
      responseData.forecast.forecastday[i + 1].day.condition.text;
  }
}

search.addEventListener("keyup", function () {
  currentCity = search.value;
  getWeather(currentCity);
});
