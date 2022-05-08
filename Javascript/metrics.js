const switchMetrics = document.querySelector('#switchMetrics');

// Convert Metrics while switching
switchMetrics.addEventListener('change', () => {
  if (switchMetrics.checked) {
    localStorage.setItem('metric', 'F');
    document.querySelectorAll('.CtoF span')
      .forEach(
        (e) =>
          (e.innerHTML = Math.round(((e.innerHTML * 9) / 5 + 32) * 10) / 10)
      );
  } else {
    localStorage.setItem('metric', 'C');
    document.querySelectorAll('.CtoF span')
      .forEach(
        (e) =>
          (e.innerHTML = Math.round((((e.innerHTML - 32) * 5) / 9) * 10) / 10)
      );
  }
});
