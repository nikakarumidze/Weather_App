// Accuweather API Key
const weatherKey = 'UsuAZ3eMlHEmkT98G0SD8wUHvb1UwYjA';

// Getting current weather of given location
const getWeather = async (id) => {
  const linkk = `https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${weatherKey}`;
  const response = await fetch(linkk);
  const data = await response.json();
  return data;
};

// Getting Weather forecast - 1 day
const dailyWeather = async (dataKey) => {
  const hourlyLink = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${dataKey}?apikey=${weatherKey}`;
  const hourlyResponse = await fetch(hourlyLink);
  const hourlyData = await hourlyResponse.json();
  return hourlyData;
};

// City Information
const getCity = async (city) => {
  const baseplusApiKey = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${weatherKey}&q=${city}`;
  const responseApi = await fetch(baseplusApiKey);
  const responsejson = await responseApi.json();
  return responsejson[0];
};
