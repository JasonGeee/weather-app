import './styles/main.scss';

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
        console.log(weatherData);
        // reset();
    }
    catch (error) { 
        console.error(error);
    }
}

// Updates for live time
setInterval(() => {
    const dates = new Date();
    const month = dates.getMonth();
    const day = dates.getDate();
    const minute = dates.getMinutes();
    const hour = dates.getHours();
    const hour12Format = hour >= 13 ? hour - 12 : hour;
    const am_pm = hour >= 12 ? "PM" : "AM";

    time.textContent = `${hour12Format}:${minute} ${am_pm}`;
}, 1000)



// DOM manipulation
function displayData(data) {
    let date_time = new Date();
    // time.textContent = date_time.toLocaleTimeString();
    skyInfo.textContent = data.current.condition.text;
    skyImg.src = data.current.condition.icon;
    
    city.textContent = data.location.name + ", " + data.location.region;
    // date.textContent = date_time.toDateString();
    temperature.textContent = data.current.temp_f;

    humidity.textContent = data.current.humidity;
    feelsLike.textContent = data.current.feelslike_f;
    wind.textContent = data.current.wind_mph;

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

weatherAPI('new york');
