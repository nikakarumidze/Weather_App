// Add new Location with Search Array of Cities
const searchBar = document.querySelector('#search');

searchBar.addEventListener('submit', (e) => {
  e.preventDefault();
  if (searchBar.search_add.value.trim()) {
    getCity(searchBar.search_add.value.trim()).then((data) => {
      addLocations(`${data.EnglishName}, ${data.Country.EnglishName}`);
      return [
        getWeather(data.Key)
          .then((data) => {
            for (let x of weatherContent.children) {
              x.classList.remove('active');
            }
            updateUI(
              data,
              locations.lastChild.firstChild.nextSibling.innerHTML,
              'active',
              'true'
            );
            let localArr = [];
            document.querySelectorAll('.locations span').forEach((e, index) => {
              if (index > 0) {
                localArr.push(e.textContent);
              }
            });
            localStorage.setItem('locations', JSON.stringify(localArr));
          })
          .then(() => searchBar.reset()),
        dailyWeather(data.Key).then((e) => {
          for (let x of secondCarousel.children) {
            x.classList.remove('active');
          }
          dailyUI(e, 'active');
        }),
      ];
    });
  }
});

// Delete Location
locations.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-trash-alt')) {
    let filterThis = e.target.parentElement.previousElementSibling.innerHTML;
    let carouselNum = document
      .querySelector('#carouselFirst .carousel-indicators .active')
      .getAttribute('data-bs-slide-to');
    // Remove From Carousels
    document.querySelectorAll('#weather_content_1 div div p').forEach((e) => {
      if (e.innerHTML.trim() == filterThis.trim()) {
        // Removing active elements
        let removingElement = e.parentElement.parentElement;
        if (removingElement.classList.contains('active')) {
          // Case to avoid when element has not next sibling, we use previous one
          if (removingElement.nextSibling !== null) {
            removingElement.nextSibling.classList.add('active');
            secondCarousel.children.item(carouselNum).classList.add('active');
          } else {
            removingElement.previousSibling.classList.add('active');
            secondCarousel.children
              .item(carouselNum - 2)
              .classList.add('active');
          }
        }
        secondCarousel.children
          .item(removingElement.getAttribute('data-bs-slide-to'))
          .remove();

        let removeTarget = document.querySelector(
          '#carouselFirst .carousel-indicators .active'
        );
        let targetButton = document.querySelector(
          '#carouselFirst .carousel-indicators'
        );
        // while removing first child, class "active" does not change
        if (!targetButton.firstElementChild.classList.contains('active')) {
          removeTarget.previousSibling.classList.add('active');
          removeTarget.classList.remove('active');
        }
        targetButton.lastChild.remove();
        removingElement.remove();
      }
    });
    // Remove From Local Storage
    let filtered = JSON.parse(localStorage.getItem('locations')).filter(
      (e) => e !== filterThis
    );
    localStorage.setItem('locations', JSON.stringify(filtered));
    // Remove Element
    e.target.parentElement.parentElement.remove();
  }
});
