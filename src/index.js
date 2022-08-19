import './styles/main.scss';

// date-fns library
// import { fromUnixTime } from 'date-fns'


// Date API
// import { formatInTimeZone } from 'date-fns-tz'

// DOM elements
const time = document.querySelector('.time');
const skyInfo = document.querySelector('.sky');
const skyImg = document.querySelector('.sky-icon');

const city = document.querySelector('.city-name');
const date = document.querySelector('.date');
const temperature = document.querySelector('.temperature');

const humidity = document.querySelector('.humi');
const feelsLike = document.querySelector('.feel');
const wind = document.querySelector('.wind');

const searchBtn = document.getElementById('search-city');
const searchText = document.getElementById('city');
const form = document.querySelector('search-bar');

const clouds = document.getElementById('cloud-div');


searchBtn.addEventListener('click', handleSearchBtn);
searchText.addEventListener('submit', handleSearchBtn);


// Search Button for Location
function handleSearchBtn(e) {
    e.preventDefault();
    userLocation();
}

// API Weather Function
async function weatherAPI(location) {
    try {
        const url = `http://api.weatherapi.com/v1/forecast.json?key=ec40df2a2eb44808bf6211459221508&q=${location}&days=5&aqi=no&alerts=no`;
        const response = await fetch(url, {mode: 'cors'});
        const weatherData = await response.json();
        // const currentData = getWeatherData(weatherData);
        // const display = displayData(currentData);
        displayData(weatherData);
        timeZone(weatherData);
        console.log(weatherData);
        // reset();
    }
    catch (error) { 
        console.error(error);
    }
}

// Local Time Zone Function
// function timeZone(localTime) {
//     const date = new Date()
// }

// Updates for live time
setInterval(() => {
    const dates = new Date();
    const month = dates.getMonth();
    const day = dates.getDate();
    const minute = dates.getMinutes();
    const hour = dates.getHours();
    const hour12Format = hour >= 13 ? hour - 12 : hour;
    const am_pm = hour >= 12 ? "PM" : "AM";
    const minuteFormat = minute < 10 ? "0" + minute : minute;

    time.textContent = `${hour12Format}:${minuteFormat} ${am_pm}`;
}, 1000)



// DOM manipulation
function displayData(data) {
    skyInfo.textContent = data.current.condition.text;
    skyImg.src = data.current.condition.icon;
    
    city.textContent = data.location.name + ", " + data.location.region;
    temperature.textContent = data.current.temp_f + "\u00B0 F";

    humidity.textContent = data.current.humidity + "%";
    feelsLike.textContent = data.current.feelslike_f;
    wind.textContent = data.current.wind_mph;

    // Change background based on sky and time
    if (data.current.condition.text == "Sunny" ||
        data.current.condition.text == "Clear") {
            document.body.style.backgroundColor = "#87CEEB";
            clouds.style.display = 'none';
        }
    else if (data.current.condition.text == "Partly cloudy") {
        document.body.style.backgroundColor = "#9dbbce";
        clouds.style.display = null;
    }

}

function reset() {
    form.reset();
}

// Get User Input for Location
function userLocation() {
    const input = document.getElementById('city');
    const userLoc = input.value;
    console.log(userLoc);

    // Sets interval of 30sec to get correct data.
    // setInterval(weatherAPI(userLoc), 30000);
    weatherAPI(userLoc);
}

weatherAPI('long beach, ca, us');
