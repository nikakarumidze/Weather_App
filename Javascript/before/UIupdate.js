const weatherContent = document.querySelector("#weather_content_1");
// Update the First Carousel
function updateUI (data, location, active, activeTrue) {
    let metricScore = data[0].Temperature.Metric.Value;
    if (localStorage.getItem("metric") == "F") {
        metricScore = data[0].Temperature.Imperial.Value
    }
    
    let textColor = "text-dark";
    if (window.localStorage.getItem("theme") === "dark") {
        textColor = "text-light";
    }

    var newDiv = document.createElement("div");
    newDiv.classList.add("carousel-item");
    newDiv.setAttribute("data-bs-slide-to", weatherContent.childElementCount);
    newDiv.innerHTML =`
    <div class="carousel-caption ${textColor}">
        <h1 class="CtoF">&deg;<span>${metricScore}</span></h1>
        <p> ${location} </p>
    </div>
    <img src="icons/${data[0].WeatherIcon}.svg">
    `;
    weatherContent.appendChild(newDiv);

    var newbutton = document.createElement("button");
    newbutton.setAttribute("type", "button");
    newbutton.setAttribute("data-bs-target", "#carouselFirst");
    newbutton.setAttribute("data-bs-slide-to", weatherContent.childElementCount);
    if (active == "active") {
        if (document.querySelector("#carouselFirst .carousel-indicators .active") !== null) {
            document.querySelector("#carouselFirst .carousel-indicators .active").classList.remove("active");
        }
        newbutton.setAttribute("aria-current", `${activeTrue}`);
        newbutton.setAttribute("class", `${active}`);
        newDiv.classList.add("active");
    }
    document.querySelector("#carouselFirst .carousel-indicators").appendChild(newbutton);
}


// Daily forecast Load for Second Carousel
const secondCarousel = document.querySelector("#carousel_second_content");

function dailyUI (data, active) {
    let metricScore2;
    let metricScore3;
    if (localStorage.getItem("metric") == "F") {
        metricScore2 = data.DailyForecasts[0].Temperature.Minimum.Value;
        metricScore3 = data.DailyForecasts[0].Temperature.Maximum.Value;
    }else {
        metricScore2 = Math.round((data.DailyForecasts[0].Temperature.Minimum.Value-32)*5/9 * 10) / 10;
        metricScore3 = Math.round((data.DailyForecasts[0].Temperature.Maximum.Value-32)*5/9 * 10) / 10;
    };

    let createDiv = document.createElement("div");
    createDiv.classList.add("carousel-item");
    let textColor1 = "text-dark";
    if (window.localStorage.getItem("theme") === "dark") {
        textColor1 = "text-light";
    }
    if (active === "active") {
        createDiv.classList.add("active");
    }
    createDiv.innerHTML = `
    <div class="d-flex justify-content-around pt-2">
        <div>
            <h6 class="${textColor1}">Day</h6>
            <img src="icons/${data.DailyForecasts[0].Day.Icon}.svg" alt="weather-icon-day">
            <p>${data.DailyForecasts[0].Day.IconPhrase}</p>
            <p class="CtoF">&deg;<span>${metricScore3}</span> </p>
        </div>
        <div>
            <h6 class="${textColor1}">Night</h6>
            <img src="icons/${data.DailyForecasts[0].Night.Icon}.svg" alt="weather-icon-night">
            <p>${data.DailyForecasts[0].Night.IconPhrase}</p>
            <p class="CtoF">&deg;<span>${metricScore2}</span> </p>
        </div>
    </div>
    <div>
        <h5 class="${textColor1} p-2"> ${data.Headline.Text} </h5>
    </div>
    `;
    secondCarousel.appendChild(createDiv);
}


// Updating Location List Group
const locations = document.querySelector('#locations');

function addLocations (element) {
    let createLi = document.createElement('li');
    createLi.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    createLi.innerHTML= `
    <span>${element}</span>
    <div>
        <i class="far fa-trash-alt delete"></i>
    </div>
    `;
    locations.appendChild(createLi);
}