
# Weather App

A simple weather app that returns the weather data based on the user
input with the help of two APIs. 

## Demo

<img src="src/assets/WeatherApp Demo.png">


## Tech Stack

- HTML
- SASS
- Vanilla Javascript
- Webpack

### Useful npm Packages Used

- date-fns
- babel

## What I Learned On Project

- Working and calling APIs
- Async/Await functions
- Promises
- setInterval
- DOM Manipulation

### APIs Reference

- API for live timezone data
    - https://timezoneapi.io/
- API for weather data
    - https://www.weatherapi.com/

**Since the API key's are free, there is no need to get a secure key.**

## Features

- Light/dark mode based on time and or weather
- Live time depending on time zone
- Displays weather through cool CSS designs

## Problems Faced When Working On Project

There was a few problems I faced during this project and I will list them down below.

    1. Getting the correct time and time zone for the location
        - Had a hard time getting the correct data to flow through the code, but once I understood the flow
        everything turned out great.

    2. Setting the page to specific designs based on weather
        - I had to do many DOM manipulations based on the time and weather. Using the API data for time and weather data was a bit of a hastle, I had to understand how to pass parameters around in order for it to work.
        
    3. Understanding how to call an API using promises and async functions
        - Lots of trouble with calling the API, I wanted to get correct time of a certain location from the user. But when calling the timezone api, it must be called again (every 30sec or 60sec) to keep updating the time. If someone entered a location outside of the U.S, I had to gather the data from the weather API to get timezone, then pass that timezone into the time API can grab data from there. But finally got it to work!