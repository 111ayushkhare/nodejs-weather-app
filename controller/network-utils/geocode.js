// Importing 'postman-request' package to fetch data from the API
const request = require('postman-request');

// Importing custom module to access environment variables
const processVar = require('../nodemon.json');

// Constants making up the URL
const BASE_URL = "https://api.mapbox.com/geocoding/v5/";
const END_POINT = "mapbox.places/";
const EXTRA_QUERY = "&limit=1"

// Defining method to obtain latitude, longitude and location of the given address
// It fetches Mapbox Geocoding - API and returns the response
// Input address can be postcode, city name, country, any famous point of interest, etc
const getGeocode = ((address, callback) => {

    // Setting up the URL
    const url = BASE_URL + END_POINT + encodeURIComponent(address) + ".json?access_token=" + processVar.env.MAPBOX_ACCESS_TOKEN + EXTRA_QUERY;

    request({ url: url }, (err, res) => {
        if (err) {
            callback("Unable to connect with weather services. Check your network connection once!", { undefined });
        } else {
            const data = JSON.parse(res.body);

            if (data.message) {
                callback("Invalid request " + data.message, { undefined });
            } else {
                callback(
                    undefined, 
                    {
                        latitude: data.features[0].center[1],
                        longitude: data.features[0].center[0],
                        location: data.features[0].place_name
                    }
                );
            }
        }
    });
});

// Exporting 'getGeocode' method
module.exports = getGeocode;