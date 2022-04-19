"use strict";

var checkbox = document.querySelector('#switch');

var lightTheme = function lightTheme() {
  document.querySelectorAll(".text-light").forEach(function (item) {
    item.classList.remove("text-light");
    item.classList.add("text-dark");
    document.body.classList.remove("bg-dark");
    document.body.classList.add("bg-light");
  });
  localStorage.setItem("theme", "light");
};

var darkTheme = function darkTheme() {
  document.querySelectorAll(".text-dark").forEach(function (item) {
    item.classList.remove("text-dark");
    item.classList.add("text-light");
    document.body.classList.remove("bg-light");
    document.body.classList.add("bg-dark");
    checkbox.checked = true;
  });
  localStorage.setItem("theme", "dark");
}; // Switch Modes


checkbox.addEventListener('change', function () {
  if (localStorage.getItem('theme') === 'dark') {
    lightTheme();
  } else {
    darkTheme();
  }
});