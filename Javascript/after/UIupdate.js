"use strict";

var weatherContent = document.querySelector("#weather_content_1"); // Update the First Carousel

function updateUI(data, location, active, activeTrue) {
  var metricScore = data[0].Temperature.Metric.Value;

  if (localStorage.getItem("metric") == "F") {
    metricScore = data[0].Temperature.Imperial.Value;
  }

  var textColor = "text-dark";

  if (window.localStorage.getItem("theme") === "dark") {
    textColor = "text-light";
  }

  var newDiv = document.createElement("div");
  newDiv.classList.add("carousel-item");
  newDiv.setAttribute("data-bs-slide-to", weatherContent.childElementCount);
  newDiv.innerHTML = "\n    <div class=\"carousel-caption ".concat(textColor, "\">\n        <h1 class=\"CtoF\">&deg;<span>").concat(metricScore, "</span></h1>\n        <p> ").concat(location, " </p>\n    </div>\n    <img src=\"icons/").concat(data[0].WeatherIcon, ".svg\">\n    ");
  weatherContent.appendChild(newDiv);
  var newbutton = document.createElement("button");
  newbutton.setAttribute("type", "button");
  newbutton.setAttribute("data-bs-target", "#carouselFirst");
  newbutton.setAttribute("data-bs-slide-to", weatherContent.childElementCount);

  if (active == "active") {
    if (document.querySelector("#carouselFirst .carousel-indicators .active") !== null) {
      document.querySelector("#carouselFirst .carousel-indicators .active").classList.remove("active");
    }

    newbutton.setAttribute("aria-current", "".concat(activeTrue));
    newbutton.setAttribute("class", "".concat(active));
    newDiv.classList.add("active");
  }

  document.querySelector("#carouselFirst .carousel-indicators").appendChild(newbutton);
} // Daily forecast Load for Second Carousel


var secondCarousel = document.querySelector("#carousel_second_content");

function dailyUI(data, active) {
  var metricScore2;
  var metricScore3;

  if (localStorage.getItem("metric") == "F") {
    metricScore2 = data.DailyForecasts[0].Temperature.Minimum.Value;
    metricScore3 = data.DailyForecasts[0].Temperature.Maximum.Value;
  } else {
    metricScore2 = Math.round((data.DailyForecasts[0].Temperature.Minimum.Value - 32) * 5 / 9 * 10) / 10;
    metricScore3 = Math.round((data.DailyForecasts[0].Temperature.Maximum.Value - 32) * 5 / 9 * 10) / 10;
  }

  ;
  var createDiv = document.createElement("div");
  createDiv.classList.add("carousel-item");
  var textColor1 = "text-dark";

  if (window.localStorage.getItem("theme") === "dark") {
    textColor1 = "text-light";
  }

  if (active === "active") {
    createDiv.classList.add("active");
  }

  createDiv.innerHTML = "\n    <div class=\"d-flex justify-content-around pt-2\">\n        <div>\n            <h6 class=\"".concat(textColor1, "\">Day</h6>\n            <img src=\"icons/").concat(data.DailyForecasts[0].Day.Icon, ".svg\" alt=\"weather-icon-day\">\n            <p>").concat(data.DailyForecasts[0].Day.IconPhrase, "</p>\n            <p class=\"CtoF\">&deg;<span>").concat(metricScore3, "</span> </p>\n        </div>\n        <div>\n            <h6 class=\"").concat(textColor1, "\">Night</h6>\n            <img src=\"icons/").concat(data.DailyForecasts[0].Night.Icon, ".svg\" alt=\"weather-icon-night\">\n            <p>").concat(data.DailyForecasts[0].Night.IconPhrase, "</p>\n            <p class=\"CtoF\">&deg;<span>").concat(metricScore2, "</span> </p>\n        </div>\n    </div>\n    <div>\n        <h5 class=\"").concat(textColor1, " p-2\"> ").concat(data.Headline.Text, " </h5>\n    </div>\n    ");
  secondCarousel.appendChild(createDiv);
} // Updating Location List Group


var locations = document.querySelector('#locations');

function addLocations(element) {
  var createLi = document.createElement('li');
  createLi.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
  createLi.innerHTML = "\n    <span>".concat(element, "</span>\n    <div>\n        <i class=\"far fa-trash-alt delete\"></i>\n    </div>\n    ");
  locations.appendChild(createLi);
}