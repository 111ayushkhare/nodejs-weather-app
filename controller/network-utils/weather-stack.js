// Importing 'postman-request' package to fetch data from the API
const request = require('postman-request');

// Importing custom module to access environment variables
const processVar = require('../nodemon.json');

// Constants making up the URL
const BASE_URL = "http://api.weatherstack.com/";
const URL_TYPE_CURRENT = "current";

// Method to obtain weather details of specified location
// Specified location is in the form of latitide,longitude
// This method fetches the 'Weather-Stack API' and returns the response obtained
const getWeatherForecast = ((latitude, longitude, callback) => {

    // Setting up the URL
    const url = BASE_URL + URL_TYPE_CURRENT + "?access_key=" + processVar.env.WEATHER_STACK_ACCESS_KEY + "&query=" + latitude + "," + longitude;

    request({ url : url }, (err, res) => {
        if (err) {
            callback("Unable to connect with weather services. Check your network connection once!", { undefined });
        } else {
            const data = JSON.parse(res.body);

            if (data.error) {
                callback("Invalid request " + data.error.info, { undefined });
            } else {
                callback(
                    undefined,
                    {
                        temperature: data.current.temperature,
                        feelsLike: data.current.feelslike,
                        weatherDesc: data.current.weather_descriptions,
                        windSpeed: data.current.wind_speed,
                        windDir: data.current.wind_dir,
                        precipitation: data.current.precip,
                        humidity: data.current.humidity,
                    }
                );
            }            
        }
    });
});

// Exporting 'getWeatherForecast' method
module.exports = getWeatherForecast;