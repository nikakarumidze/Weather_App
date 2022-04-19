"use strict";

// Current Location API
var currentLocation = function currentLocation() {
  fetch('http://ip-api.com/json?fields=8192')["catch"](function () {
    navigator.geolocation.getCurrentPosition(geoLocationCoords);
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    return response.query;
  }).then(function (response) {
    fetch("https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=".concat(weatherKey, "&q=").concat(response)).then(function (e) {
      return e.json();
    }).then(function (data) {
      var HereIam = "".concat(data.EnglishName, ", ").concat(data.Country.EnglishName);
      return [getWeather(data.Key).then(function (e) {
        return updateUI(e, HereIam, "active", "true");
      }), dailyWeather(data.Key).then(function (e) {
        return dailyUI(e, "active");
      })];
    });
  });
}; // in case http request is blocked, we use geolocation API


var geoLocationCoords = function geoLocationCoords(position) {
  fetch("https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=".concat(weatherKey, "&q=").concat(position.coords.latitude, ", ").concat(position.coords.longitude)).then(function (e) {
    return e.json();
  }).then(function (data) {
    var HereIam = "".concat(data.EnglishName, ", ").concat(data.Country.EnglishName);
    return [getWeather(data.Key).then(function (e) {
      return updateUI(e, HereIam, "active", "true");
    }), dailyWeather(data.Key).then(function (e) {
      return dailyUI(e, "active");
    })];
  });
};