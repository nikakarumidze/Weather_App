window.onload = () => {
    var theme = window.localStorage.getItem("theme");
        if (theme === "dark") {
            darkTheme()
        }

    let metric = localStorage.getItem("metric");
        if (metric === "F") {
            switchMetrics.checked = true;
        }
        
    currentLocation();
    
    if (localStorage.getItem("locations") !== null){
        for (let x of JSON.parse(localStorage.getItem("locations"))) {
            addLocations(x);
            getCity(x)
            .then(data => { 
                return [ 
                    getWeather(data.Key)
                        .then(data => UpdateUI(data,x)),
                    dailyWeather(data.Key)
                        .then(e => DailyUI(e))
                ]})
        }
    }
    getAllCities();
};

// Current Location API
const accessKey = "405cb4fd829fc269e3257a0d36a82ae2";
var HereIam;
const currentLocation = () => {
    fetch('http://ip-api.com/json?fields=8192')
    .then(response => response.json())
    .then(response => response.query)
    .then(response => {
        fetch(`https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${weatherKey}&q=${response}`)
        .then(e => e.json())
        .then(data => {HereIam = `${data.EnglishName}, ${data.Country.EnglishName}`;
        return [getWeather(data.Key)
            .then(e => UpdateUI(e, HereIam, "active", "true")),
        dailyWeather(data.Key)
            .then(e => DailyUI(e, "active"))
    ];})
    })
}



const weatherContent = document.querySelector("#weather_content_1");
function UpdateUI (data, location, active, activeTrue) {
    let metricScore;
    if(localStorage.getItem("metric") == "F") {metricScore = data[0].Temperature.Imperial.Value}
    else {metricScore = data[0].Temperature.Metric.Value}
    let textColor = "text-dark";
    if(window.localStorage.getItem("theme") === "dark"){textColor = "text-light"};

    var newDiv = document.createElement("div");
    newDiv.classList.add("carousel-item");
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
        if (document.querySelector("#carouselFirst .carousel-indicators .active") !== null){
            document.querySelector("#carouselFirst .carousel-indicators .active").classList.remove("active");
        }
        newbutton.setAttribute("aria-current", `${activeTrue}`);
        newbutton.setAttribute("class", `${active}`);
        newDiv.classList.add("active");
    }
    document.querySelector("#carouselFirst .carousel-indicators").appendChild(newbutton);
}

// Get Cities
function getAllCities(){
fetch("top-1000-cities.json")
.then(e => e.json())
.then(data => {
    for (x of data) {
        addOptions(x.name);
    }
})
}

// Add Options (Tagname)
const addOptions = element => {
    var createOption = document.createElement("option");
    createOption.value = element;
    if (element !== undefined) {
        document.getElementById("array_locations").appendChild(createOption);
    }
}

var allTextLight = document.querySelectorAll(".text-dark");

const darkTheme = () => {
    document.querySelectorAll(".text-dark").forEach(item => {
        item.classList.remove("text-dark");
        item.classList.add("text-light");
        document.body.classList.remove("bg-light");
        document.body.classList.add("bg-dark");
        checkbox.checked = true;
    })
    localStorage.setItem("theme", "dark");
}

const lightTheme = () => {
    document.querySelectorAll(".text-light").forEach(item => {
        item.classList.remove("text-light");
        item.classList.add("text-dark");
        document.body.classList.remove("bg-dark");
        document.body.classList.add("bg-light");
    })
    localStorage.setItem("theme", "light");
}

// Switch Modes
const checkbox = document.querySelector("#switch");
checkbox.addEventListener('change', () => {
    let theme = localStorage.getItem('theme');
    if (theme ==='dark'){
        lightTheme()
    }
    else{
        darkTheme()
    }   
});

// Switch Metrics
const switchMetrics = document.querySelector("#switchMetrics");
switchMetrics.addEventListener("change", () => {
    if (switchMetrics.checked){
        localStorage.setItem("metric","F");
        document.querySelectorAll(".CtoF span").forEach(e => e.innerHTML= Math.round((e.innerHTML*9/5+32) * 10) / 10)
    }
    else {
        localStorage.setItem("metric","C")
        document.querySelectorAll(".CtoF span").forEach(e => e.innerHTML= Math.round((e.innerHTML-32)*5/9 * 10) / 10)
    }
})

// Add Location
const locations = document.querySelector("#locations");
const searchBar = document.querySelector("#search");

function addLocations (element) {
    var createLi = document.createElement("li");
    createLi.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    createLi.innerHTML= `
    <span>${element}</span>
    <div>
        <i class="far fa-trash-alt delete"></i>
    </div>
    `;
    locations.appendChild(createLi);
}

// Add new Location with Search Array of Cities
var localArr;

searchBar.addEventListener("submit", e => {
    e.preventDefault();

    if (searchBar.search_add.value.trim()){
        getCity(searchBar.search_add.value.trim())
        .then(data => {addLocations(`${data.EnglishName}, ${data.Country.EnglishName}`);
        return [
            getWeather(data.Key)
                .then(data => {
                    for (x of weatherContent.children) {
                        x.classList.remove("active")
                    }
                    UpdateUI(data, locations.lastChild.firstChild.nextSibling.innerHTML, "active", "true");
                    var saveLocations = document.querySelectorAll(".locations span");
                    localArr =[];
                    saveLocations.forEach((e, index) => {
                        if(index > 0) {
                            localArr.push(e.textContent);
                        }
                    })
                    localStorage.setItem("locations", JSON.stringify(localArr));})
                .then(() => searchBar.reset())
                ,
            dailyWeather(data.Key)
                .then(e => {
                    for (let x of secondCarousel.children) {
                        x.classList.remove("active")
                    };
                    DailyUI(e, "active")
                })   
        ]})
        
        ;
        }
})

// Delete Location
locations.addEventListener("click", e => {
    if(e.target.classList.contains("fa-trash-alt")){
        var filterThis = e.target.parentElement.previousElementSibling.innerHTML;
        
        // Remove From Carousel
        document.querySelectorAll("#weather_content_1 div div p").forEach(e => {
            if(e.innerHTML.trim() == filterThis.trim()) {
                // Removing active elements
                if ( e.parentElement.parentElement.classList.contains("active")){ 
                    // Case to avoid when element has not next sibling, we use previous one
                    if (e.parentElement.parentElement.nextSibling !== null) {
                        e.parentElement.parentElement.nextSibling.classList.add("active");
                    } else {
                        e.parentElement.parentElement.previousSibling.classList.add("active");
                    }
                }
                let removeTarget = document.querySelector("#carouselFirst .carousel-indicators .active"); 
                let targetButton = document.querySelector("#carouselFirst .carousel-indicators");
                // while removing first child, class "active" does not change
                if (!targetButton.firstElementChild.classList.contains("active")) {
                    removeTarget.previousSibling.classList.add("active");
                    removeTarget.classList.remove("active");
                }
                targetButton.lastChild.remove();
                e.parentElement.parentElement.remove();
            }
        })

        // Remove From Local Storage
        var filtered = JSON.parse(localStorage.getItem("locations")).filter(e => e !== filterThis);
        localStorage.setItem("locations", JSON.stringify(filtered));
        // Remove Element
        e.target.parentElement.parentElement.remove();
    }
})

// Weather Information
const weatherKey = "UsuAZ3eMlHEmkT98G0SD8wUHvb1UwYjA";

const getWeather = async id => {
    const linkk = `http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${weatherKey}`;
    const response = await fetch(linkk);
    const data = await response.json();
    return data;
}

// Getting Weather forecast - 1 day
const dailyWeather = async dataKey => {
    const hourlyLink = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${dataKey}?apikey=${weatherKey}`;
    const hourlyResponse = await fetch(hourlyLink);
    const hourlyData = await hourlyResponse.json();
    return hourlyData;
}

// City Information
const getCity = async city => {
    const baseplusApiKey = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${weatherKey}&q=${city}`;
    const responseApi = await fetch(baseplusApiKey);
    const responsejson = await responseApi.json();
    return responsejson[0];
}

// Next Button on First Carousel
document.querySelector("#carouselFirst .carousel-control-next").addEventListener("click", e => {
    // Finds Where we are now
    let carouselRowNum = document.querySelector("#carouselFirst .carousel-indicators .active").getAttribute("data-bs-slide-to");

    // Removes all active Classes needed
    for (x of weatherContent.children) {
        x.classList.remove("active")
    }
    document.querySelector("#carouselFirst .carousel-indicators .active").classList.remove("active");

    // Change Slide
    if (carouselRowNum < document.querySelector("#carouselFirst .carousel-indicators").childElementCount) {
        weatherContent.children.item(carouselRowNum).classList.add("active");
        document.querySelector("#carouselFirst .carousel-indicators").children.item(carouselRowNum).classList.add("active");
    } else {
        weatherContent.children.item(0).classList.add("active");
        document.querySelector("#carouselFirst .carousel-indicators").children.item(0).classList.add("active");
       
    }
} )

// Same Operation But On Previous Button
document.querySelector("#carouselFirst .carousel-control-prev").addEventListener("click", e => {
    let carouselRowNum = document.querySelector("#carouselFirst .carousel-indicators .active").getAttribute("data-bs-slide-to");

    for (x of weatherContent.children) {
        x.classList.remove("active")
    }
    document.querySelector("#carouselFirst .carousel-indicators .active").classList.remove("active");

    if (carouselRowNum < 2) {
        weatherContent.children.item(weatherContent.children.length-1).classList.add("active");
        document.querySelector("#carouselFirst .carousel-indicators").children.item(document.querySelector("#carouselFirst .carousel-indicators").children.length-1).classList.add("active");
        
    } else {
        weatherContent.children.item(carouselRowNum-2).classList.add("active");
        document.querySelector("#carouselFirst .carousel-indicators").children.item(carouselRowNum-2).classList.add("active");
       
    }
} )

const secondCarousel = document.querySelector("#carousel_second_content");

// Daily forecast HTML
function DailyUI (data, active) {
    let metricScore2;
    let metricScore3;
    if(localStorage.getItem("metric") == "C") {metricScore2 = Math.round((data.DailyForecasts[0].Temperature.Minimum.Value-32)*5/9 * 10) / 10; metricScore3 = Math.round((data.DailyForecasts[0].Temperature.Maximum.Value-32)*5/9 * 10) / 10}
    else {metricScore2 = data.DailyForecasts[0].Temperature.Minimum.Value; metricScore3 = data.DailyForecasts[0].Temperature.Maximum.Value }

    let createDiv = document.createElement("div");
    createDiv.classList.add("carousel-item");
    let textColor1 = "text-dark";
    if(window.localStorage.getItem("theme") === "dark"){textColor1 = "text-light"};

    if (active == "active") {createDiv.classList.add("active")}

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
