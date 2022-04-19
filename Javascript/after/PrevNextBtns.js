"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Next Button on First Carousel
document.querySelector('#carouselFirst .carousel-control-next').addEventListener('click', function (e) {
  // Finds Where we are now
  var carouselRowNum = document.querySelector('#carouselFirst .carousel-indicators .active').getAttribute('data-bs-slide-to'); // Removes all active Classes needed

  var _iterator = _createForOfIteratorHelper(weatherContent.children),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var i = _step.value;
      i.classList.remove('active');
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  document.querySelector("#carouselFirst .carousel-indicators .active").classList.remove('active');
  document.querySelector("#carousel_second_content .active").classList.remove('active'); // Change Slide

  if (carouselRowNum < document.querySelector("#carouselFirst .carousel-indicators").childElementCount) {
    weatherContent.children.item(carouselRowNum).classList.add('active');
    document.querySelector("#carouselFirst .carousel-indicators").children.item(carouselRowNum).classList.add('active');
    secondCarousel.children.item(carouselRowNum).classList.add('active');
  } else {
    weatherContent.children.item(0).classList.add('active');
    document.querySelector("#carouselFirst .carousel-indicators").children.item(0).classList.add('active');
    secondCarousel.children.item(0).classList.add('active');
  }
}); // Same Operation But On Previous Button

document.querySelector("#carouselFirst .carousel-control-prev").addEventListener("click", function (e) {
  var carouselRowNum = document.querySelector("#carouselFirst .carousel-indicators .active").getAttribute("data-bs-slide-to");

  var _iterator2 = _createForOfIteratorHelper(weatherContent.children),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var x = _step2.value;
      x.classList.remove("active");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  document.querySelector("#carouselFirst .carousel-indicators .active").classList.remove('active');
  document.querySelector("#carousel_second_content .active").classList.remove('active');

  if (carouselRowNum < 2) {
    weatherContent.children.item(weatherContent.children.length - 1).classList.add('active');
    document.querySelector("#carouselFirst .carousel-indicators").children.item(document.querySelector("#carouselFirst .carousel-indicators").children.length - 1).classList.add("active");
    secondCarousel.children.item(weatherContent.children.length - 1).classList.add('active');
  } else {
    weatherContent.children.item(carouselRowNum - 2).classList.add('active');
    document.querySelector("#carouselFirst .carousel-indicators").children.item(carouselRowNum - 2).classList.add("active");
    secondCarousel.children.item(carouselRowNum - 2).classList.add('active');
  }
});