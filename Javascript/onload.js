window.onload = () => {
    if (window.localStorage.getItem("theme") === "dark") {
        darkTheme();
    }
    if (localStorage.getItem("metric") === "F") {
        switchMetrics.checked = true;
    }
    currentLocation();
    if (localStorage.getItem("locations") !== null){
        for (let x of JSON.parse(localStorage.getItem("locations"))) {
            addLocations (x);
            getCity (x)
            .then(data => { 
                return [ 
                    getWeather(data.Key)
                        .then(data => updateUI(data,x)) ,
                    dailyWeather(data.Key)
                        .then(e => dailyUI(e))
                ]
            });
        }
    }
};