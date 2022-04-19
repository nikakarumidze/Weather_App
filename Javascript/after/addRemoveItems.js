"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Add new Location with Search Array of Cities
var searchBar = document.querySelector('#search');
searchBar.addEventListener('submit', function (e) {
  e.preventDefault();

  if (searchBar.search_add.value.trim()) {
    getCity(searchBar.search_add.value.trim()).then(function (data) {
      addLocations("".concat(data.EnglishName, ", ").concat(data.Country.EnglishName));
      return [getWeather(data.Key).then(function (data) {
        var _iterator = _createForOfIteratorHelper(weatherContent.children),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var x = _step.value;
            x.classList.remove('active');
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        updateUI(data, locations.lastChild.firstChild.nextSibling.innerHTML, "active", "true");
        var localArr = [];
        document.querySelectorAll(".locations span").forEach(function (e, index) {
          if (index > 0) {
            localArr.push(e.textContent);
          }
        });
        localStorage.setItem('locations', JSON.stringify(localArr));
      }).then(function () {
        return searchBar.reset();
      }), dailyWeather(data.Key).then(function (e) {
        var _iterator2 = _createForOfIteratorHelper(secondCarousel.children),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var x = _step2.value;
            x.classList.remove('active');
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        dailyUI(e, 'active');
      })];
    });
  }

  ;
}); // Delete Location

locations.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-trash-alt')) {
    var filterThis = e.target.parentElement.previousElementSibling.innerHTML;
    var carouselNum = document.querySelector('#carouselFirst .carousel-indicators .active').getAttribute('data-bs-slide-to'); // Remove From Carousels

    document.querySelectorAll('#weather_content_1 div div p').forEach(function (e) {
      if (e.innerHTML.trim() == filterThis.trim()) {
        // Removing active elements
        var removingElement = e.parentElement.parentElement;

        if (removingElement.classList.contains('active')) {
          // Case to avoid when element has not next sibling, we use previous one
          if (removingElement.nextSibling !== null) {
            removingElement.nextSibling.classList.add('active');
            secondCarousel.children.item(carouselNum).classList.add('active');
          } else {
            removingElement.previousSibling.classList.add('active');
            secondCarousel.children.item(carouselNum - 2).classList.add('active');
          }
        }

        secondCarousel.children.item(removingElement.getAttribute('data-bs-slide-to')).remove();
        var removeTarget = document.querySelector('#carouselFirst .carousel-indicators .active');
        var targetButton = document.querySelector('#carouselFirst .carousel-indicators'); // while removing first child, class "active" does not change

        if (!targetButton.firstElementChild.classList.contains('active')) {
          removeTarget.previousSibling.classList.add('active');
          removeTarget.classList.remove('active');
        }

        targetButton.lastChild.remove();
        removingElement.remove();
      }
    }); // Remove From Local Storage

    var filtered = JSON.parse(localStorage.getItem('locations')).filter(function (e) {
      return e !== filterThis;
    });
    localStorage.setItem('locations', JSON.stringify(filtered)); // Remove Element

    e.target.parentElement.parentElement.remove();
  }
});