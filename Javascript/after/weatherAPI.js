"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Accuweather API Key
var weatherKey = 'UsuAZ3eMlHEmkT98G0SD8wUHvb1UwYjA'; // Getting current weather of given location

var getWeather = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
    var linkk, response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            linkk = "https://dataservice.accuweather.com/currentconditions/v1/".concat(id, "?apikey=").concat(weatherKey);
            _context.next = 3;
            return fetch(linkk);

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getWeather(_x) {
    return _ref.apply(this, arguments);
  };
}(); // Getting Weather forecast - 1 day


var dailyWeather = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dataKey) {
    var hourlyLink, hourlyResponse, hourlyData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            hourlyLink = "https://dataservice.accuweather.com/forecasts/v1/daily/1day/".concat(dataKey, "?apikey=").concat(weatherKey);
            _context2.next = 3;
            return fetch(hourlyLink);

          case 3:
            hourlyResponse = _context2.sent;
            _context2.next = 6;
            return hourlyResponse.json();

          case 6:
            hourlyData = _context2.sent;
            return _context2.abrupt("return", hourlyData);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function dailyWeather(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); // City Information


var getCity = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(city) {
    var baseplusApiKey, responseApi, responsejson;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            baseplusApiKey = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey=".concat(weatherKey, "&q=").concat(city);
            _context3.next = 3;
            return fetch(baseplusApiKey);

          case 3:
            responseApi = _context3.sent;
            _context3.next = 6;
            return responseApi.json();

          case 6:
            responsejson = _context3.sent;
            return _context3.abrupt("return", responsejson[0]);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getCity(_x3) {
    return _ref3.apply(this, arguments);
  };
}();