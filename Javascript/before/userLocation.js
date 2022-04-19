// Current Location API
const currentLocation = () => {
    fetch('http://ip-api.com/json?fields=8192')
        .catch(() => {
            navigator.geolocation.getCurrentPosition(geoLocationCoords)
        })
    .then(response => response.json())
    .then(response => response.query)
    .then(response => {
        fetch(`https://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${weatherKey}&q=${response}`)
        .then(e => e.json())
        .then(data => {
        const HereIam = `${data.EnglishName}, ${data.Country.EnglishName}`;
        return [
            getWeather(data.Key)
                .then(e => updateUI(e, HereIam, "active", "true")) ,
            dailyWeather(data.Key)
                .then(e => dailyUI(e, "active"))
            ];
        });
    });
};

// in case http request is blocked, we use geolocation API
const geoLocationCoords = position => {
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${weatherKey}&q=${position.coords.latitude}, ${position.coords.longitude}`)
    .then(e => e.json())
    .then( data => {
        const HereIam = `${data.EnglishName}, ${data.Country.EnglishName}`;
        return [
            getWeather(data.Key)
                .then(e => updateUI(e, HereIam, "active", "true")) ,
            dailyWeather(data.Key)
                .then(e => dailyUI(e, "active"))
            ];
        });
}