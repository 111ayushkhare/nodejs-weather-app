// Importing required external package
const express = require("express");
const hbs = require("hbs");

// Importing node internal package
const path = require('path');

// Importing custom modules
const weatherForacst = require("./network-utils/weather-stack");
const geocoder = require("./network-utils/geocode");

// Defining path used by express
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../views/main-views');
const partialsDirPath = path.join(__dirname, '../views/partials'); 

const app = express();

// Declaring port number
const PORT = process.env.PORT || 3000;

// Setting up handlebars and views
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirPath));

// Route for home page 
app.get('', (req, res) => {
    res.render('home', {
        title: 'Weather',
        name: 'Ayush Khare'
    });
});

// Route for about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ayush Khare'
    });
});

// Route for help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Section',
        name: 'Ayush Khare'
    })
});

// Route for fetching weather data from the API
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Your must provide a location'
        });
    }

    geocoder(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error });
        } else {
            weatherForacst(latitude, longitude, (forecastError, {
                temperature,
                feelsLike,
                weatherDesc,
                windSpeed,
                windDir,
                precipitation,
                humidity,
            }) => {
                if (forecastError) {
                    return res.send({
                        error: forecastError
                    });
                } else {
                    res.send({
                        infoTag: `Weather information for ${location}`,
                        temperature,
                        feelsLike,
                        weatherDesc,
                        windSpeed,
                        windDir,
                        precipitation,
                        humidity,
                    });
                }
            }
            );
        }
    });
});

// All other anonymous routes returnig an error page
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'Ayush Khare'
    });
});

app.listen(PORT, () => {
    console.log("Server is up and running at -> http://localhost:" + PORT);
});