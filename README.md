# Node.Js Weather-App

This is a simple weather fetching app built using node.js. Two of the API's used in this app are - 
* https://www.mapbox.com/ - This is used to get the latitude and longitude of the location provided by the user either in the form of city, country, region, postcode, famous spot, etc.
* https://weatherstack.com/ - This uses latitute and longitute provided by the Mapbox API and return the weather information of the loaction.

The focus of the project was on backend so the frontend (UI) is quite simple, the website has 3 pages - Home page, Abouts Page, Help page. As of now only Home page is working, other two of them are just added in navigation, no useful information is displayed in these. Home page has a search bar where user can input the desires location and fetch the info. The location can be in any of the following form - 
* country
* region
* postcode
* district
* place (city, village, etc.)
* locality
* neighbourhood
* address
* point of interest (any famous spot/monument)

The Mapbox API will take care of all these inputs and provide the latitude and longitude for any form of the above inputs which will be further used by the Weather-Stack API to get the weather info.

## Screenshot
![ss](https://user-images.githubusercontent.com/46900324/120635613-4cec0800-c48a-11eb-93cb-b7110c53e152.jpg)

## Node (npm) packages used 
```
* express (version: ^4.17.1)
* hbs (version: ^4.1.2)
* postman-request (version: ^2.88.1-postman.30)
* nodemon (version: ^2.0.7)
```

## Project Structure

```sh
weather-app
    |- controller
    |   |- network-utils
    |   |   |- geocode.js
    |   |   `- weather-stack.js
    |   |- app.js
    |   `- nodemon.json
    |- node_modules
    |   |- ..
    |   |- ..
    |   :  ..
    |   :  ..
    |   |- ..
    |   |- ..
    |   `- ..
    |- public
    |   |- css
    |   |   `- style.css
    |   |- images
    |   |   `- weather.png
    |   `- javascript
    |       `- client-form.js
    |- views
    |   |- main-views
    |   |   |- about.hbs
    |   |   |- error.hbs
    |   |   |- help.hbs
    |   |   `- home.hbs
    |   `- partials
    |       |- footer.hbs
    |       `- header.hbs
    |- .gitignore
    |- package-lock.json
    |- package.json
    `- README.md
```

The 'nodemon.json' file constains API Access keys/tokens hence has been added to .gitignore file. One has to add it manually with same name with code as under -
```sh
{
    "env" : {
        "WEATHER_STACK_ACCESS_KEY": "<your_access_key>",
        "MAPBOX_ACCESS_TOKEN": "<your_access_token>"
    }
}
```