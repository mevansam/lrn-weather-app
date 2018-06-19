const WEATHER_API_KEY = "bbeb34ebf60ad50f7893e7440a1e2b0b";
const API_STEM = "http://api.openweathermap.org/data/2.5/weather?";

function _getUnitName(units) {
  switch (units) {
    case 0:
      return "imperial";
    case 1:
      return "metric";
    default:
      return "standard";
  }
}

function zipUrl(units, zip) {
  return `${API_STEM}q=${zip}&units=${_getUnitName(units)}&APPID=${WEATHER_API_KEY}`;
}

function latLonUrl(units, lat, lon) {
  return `${API_STEM}lat=${lat}&lon=${lon}&units=${_getUnitName(units)}&APPID=${WEATHER_API_KEY}`;
}

function fetchForecast(url) {
  console.log(url)
  return fetch(url)
    .then(response => response.json())
    .then(responseJSON => {
      console.log("responseJSON: ", responseJSON)
      return {
        main: responseJSON.weather[0].main,
        description: responseJSON.weather[0].description,
        temp: responseJSON.main.temp
      };
    })
    .catch(error => {
      console.error(error);
    });
}

function fetchZipForecast(units, zip) {
  return fetchForecast(zipUrl(units, zip));
}

function fetchLatLonForecast(units, lat, lon) {
  return fetchForecast(latLonUrl(units, lat, lon));
}

export default {
  fetchZipForecast: fetchZipForecast,
  fetchLatLonForecast: fetchLatLonForecast
};
