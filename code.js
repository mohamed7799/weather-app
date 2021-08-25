"use strict";

// functions
let buildContainerElement = (body) => {
  containerElmenet.innerHTML = `<h2 class="location">Weather in ${body.name}</h2>
      <h1 class="temp">${body.main.temp} &#8451;</h1>
      <ul>
        <li class="clouds"><img src="https://openweathermap.org/img/wn/${body.weather[0].icon}@2x.png">  ${body.weather[0].description}</li>
        <li class="humidity">humidity : ${body.main.humidity} %</li>
        <li class="wind">wind: ${body.wind.speed} km/h</li>
      </ul>`;
};

let fetchWeather = (url) => {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("sorry the city does not exist");
      }
      return res.json();
    })
    .then((body) => {
      buildContainerElement(body);
      searchInput.value = "";
      document.body.style.backgroundImage = `url("https://source.unsplash.com/${width}x${height}/?${body.name}")`;
    })
    .catch((err) => alert(err));
};

let success = (postion) => {
  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?lat=${postion.coords.latitude}&lon=${postion.coords.longitude}&units=metric&appid=30860c0b9720377fd81553d6dc70f540`
  );
};

let fail = (err) => {
  console.error(err);
};

//dom elements

let searchForm = document.querySelector("form");
let searchInput = document.querySelector("input");
let containerElmenet = document.querySelector(".data");
let width = document.body.clientWidth;
let height = document.body.clientHeight;
//main

navigator.geolocation.getCurrentPosition(success, fail);

//event listners

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=30860c0b9720377fd81553d6dc70f540`
  );
});
