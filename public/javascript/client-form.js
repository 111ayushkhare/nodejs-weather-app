const weatherFrom = document.querySelector('form');
const searchText = document.querySelector('input');

const LOCATION_INFO = document.querySelector('#location-info');
const TEMPERATURE_INFO = document.querySelector('#temperature-info');
const WEATHER_INFO = document.querySelector('#weather-info');
const WIND_INFO = document.querySelector('#wind-info');
const PRECIPITAION_INFO = document.querySelector('#precip');
const HUMIDITY_INFO = document.querySelector('#humidity');

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchText.value;

    LOCATION_INFO.textContent = "Searching weather for " + location;
    TEMPERATURE_INFO.textContent = "Please wait till weather information is being fetched ...";
    WEATHER_INFO.textContent = "";
    WIND_INFO.textContent = "";
    PRECIPITAION_INFO.textContent = "";
    HUMIDITY_INFO.textContent = "";

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                TEMPERATURE_INFO.textContent = data.error;
            } else {
                LOCATION_INFO.textContent = data.infoTag;
                TEMPERATURE_INFO.textContent = "- The temperature outside is " + data.temperature + " degrees \& feels like " + data.feelsLike + " degrees."; 
                WEATHER_INFO.textContent = "- The weather outside seems " + data.weatherDesc;
                WIND_INFO.textContent = "- The wind is blowing in the " + data.windDir + " direction with the speed of " + data.windSpeed + " km/hr";
                PRECIPITAION_INFO.textContent = "- Precipitaion: " + data.precipitation + " mm";
                HUMIDITY_INFO.textContent = "- Humidity: " + data.humidity + " %";
            }
        });
    });
});