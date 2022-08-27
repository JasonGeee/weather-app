import './styles/main.scss';
import { getDay } from 'date-fns'

// DOM elements
const mainCard = document.querySelector('.main-card');

const time = document.querySelector('.time');
const skyInfo = document.querySelector('.sky');
const skyImg = document.querySelector('.sky-icon');

const city = document.querySelector('.city-name');
const date = document.querySelector('.date');
const weekDay = document.querySelector('.week-day');
const temperature = document.querySelector('.temperature');

const humidity = document.querySelector('.humi');
const feelsLike = document.querySelector('.feel');
const wind = document.querySelector('.wind');

const searchBtn = document.getElementById('search-city');
const searchText = document.getElementById('city');
const form = document.querySelector('.search-bar');

const clouds = document.querySelector('.cloud-div');
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');

const humidityTitle = document.querySelector('.humidity');
const feelsTitle = document.querySelector('.feels-like');
const windTitle = document.querySelector('.wind-speed');

searchBtn.addEventListener('click', handleSearchBtn);
searchText.addEventListener('submit', handleSearchBtn);

// URLs must use https NOT http

// Search Button for Location
function handleSearchBtn(e) {
    e.preventDefault();
    userLocation();
}

// API Weather Function
async function weatherAPI(location) {
    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=ec40df2a2eb44808bf6211459221508&q=${location}&days=7&aqi=no&alerts=no`;
        const response = await fetch(url, {mode: 'cors'});
        const weatherData = await response.json();

        const time_zone = weatherData.location.tz_id;
        
        firstInitialTime(time_zone, weatherData);
        localTimeAPI(time_zone);
        loadScreen();
        
        console.log(weatherData);
    }
    catch (error) {
        alert("No matching city/location found! Please re-enter a valid location.");
        console.error(error);
    }
}

async function firstInitialTime(timeZoneID, weatherData) {
    try {
        const response = await fetch(`https://timezoneapi.io/api/timezone/?${timeZoneID}&token=aYGfeIuRrzGMtxwmUmjo`);
        const data = await response.json();
        initialHelper(data);
        displayData(weatherData, data);
        getDate(weatherData);
        loadScreen();
    }
    catch (error) {
        console.error(error);
    }
}

// Helper function for firstInitialTime func
function initialHelper (timeData) {
    let hour = timeData.data.datetime.hour_12_wolz;
    let minutes = timeData.data.datetime.minutes;
    let am_pm = timeData.data.datetime.hour_am_pm.toUpperCase();
    
    time.textContent = `${hour}:${minutes} ${am_pm}`;
}

// function to call API time after time has been set
function localTimeAPI(timeZoneID) {
    setInterval(function () {
        fetch(`https://timezoneapi.io/api/timezone/?${timeZoneID}&token=aYGfeIuRrzGMtxwmUmjo`)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            initialHelper(data);
        }).catch(function (error) {
            console.error(error);
        });
    }, 60000);
}

// DOM manipulation
function displayData(data, calcTime) {
    const sky_blue = '#87CEEB';
    const sky_blue_shadow1 = '#73afc8';
    const sky_blue_shadow2 = '#9bedff';

    const partly_cloudy = '#9dbbce';
    const partly_cloudy_shadow1 = '#859faf';
    const partly_cloudy_shadow2 = '#b5d7ed';

    const night_sky = '#2e4482';
    const night_sky_shadow1 = '#273a6f';
    const night_sky_shadow2 = '#354e96';

    const hour = calcTime.data.datetime.hour_24_wolz;

    let skyText = data.current.condition.text;
    skyInfo.textContent = skyText;
    skyImg.src = data.current.condition.icon;
    
    city.textContent = data.location.name + ", " + data.location.region;
    temperature.textContent = data.current.temp_f + "\u00B0 F";

    humidity.textContent = data.current.humidity + "%";
    feelsLike.textContent = data.current.feelslike_f;
    wind.textContent = data.current.wind_mph;


    // Change background based on sky and time
    // 1. Sun Out and Sky blue
    if ((hour >= 6 && hour < 19) && 
        (skyText == "Sunny" || skyText == "Clear")) {
            sun.style.display = null; // Sun is out
            moon.style.display = 'none'; // No moon
            clouds.style.display = 'none'; // No cloud
            document.body.style.color = '#ffffff';
            document.body.style.backgroundColor = sky_blue;
            mainCard.style.backgroundColor = sky_blue;
            mainCard.style.boxShadow = `20px 20px 60px ${sky_blue_shadow1}, 
                                    -20px -20px 60px ${sky_blue_shadow2}`;
            
    }
    // 2. Sun Out w/ Clouds and Sky Blue
    else if ((hour >= 6 && hour < 19) && 
        (skyText.toLowerCase().includes("cloud"))) {
            sun.style.display = null;
            moon.style.display = 'none';
            clouds.style.display = null;
            document.body.style.color = '#ffffff';
            document.body.style.backgroundColor = sky_blue;
            mainCard.style.backgroundColor = sky_blue;
            mainCard.style.boxShadow = `20px 20px 60px ${sky_blue_shadow1}, 
                                    -20px -20px 60px ${sky_blue_shadow2}`;
    }
    // 3. Day Time w/ Rain and Grey Sky
    else if ((hour >= 6 && hour < 19) && 
        (skyText.toLowerCase().includes("rain"))) {
            sun.style.display = 'none';
            moon.style.display = 'none';
            clouds.style.display = null;
            document.body.style.color = '#ffffff';
            document.body.style.backgroundColor = partly_cloudy;
            mainCard.style.backgroundColor = partly_cloudy;
            mainCard.style.boxShadow = `20px 20px 60px ${partly_cloudy_shadow1}, 
                                    -20px -20px 60px ${partly_cloudy_shadow2}`;
    }
    // 4. Sun out w/ Overcast
    else if ((hour >= 6 && hour < 19) && 
        (skyText.toLowerCase().includes("overcast"))) {
            sun.style.display = 'none';
            moon.style.display = 'none';
            clouds.style.display = null;
            document.body.style.color = '#ffffff';
            document.body.style.backgroundColor = partly_cloudy;
            mainCard.style.backgroundColor = partly_cloudy;
            mainCard.style.boxShadow = `20px 20px 60px ${partly_cloudy_shadow1}, 
                                    -20px -20px 60px ${partly_cloudy_shadow2}`;
    }

    //  5. Moon Out w/ Clouds and Night Sky
    else if ((hour < 6 || hour >= 19) && (skyText == "Partly cloudy")) {
        sun.style.display = 'none';
        clouds.style.display = null;
        moon.style.display = null;
        document.body.style.color = 'white';
        document.body.style.backgroundColor = night_sky;
        mainCard.style.backgroundColor = night_sky;
        mainCard.style.boxShadow = `20px 20px 60px ${night_sky_shadow1}, 
                                    -20px -20px 60px ${night_sky_shadow2}`;
    }

    // 6. Moon Out w/ Night Sky
    else if ((hour < 6 || hour >= 19) && skyText == "Clear") {
        
        sun.style.display = 'none';
        clouds.style.display = 'none';
        moon.style.display = null;
        document.body.style.color = 'white';
        document.body.style.backgroundColor = night_sky;
        mainCard.style.backgroundColor = night_sky;
        mainCard.style.boxShadow = `20px 20px 60px ${night_sky_shadow1}, 
                                    -20px -20px 60px ${night_sky_shadow2}`;
    }
}

// Function to display correct time and date
function getDate(dateData) {
    const date = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    }
    // Gets only the date of the string
    const time_date = dateData.location.localtime.substr(0, 10);
    let calcDate = time_date.replaceAll('-', ',');
    let result = getDay(new Date(calcDate));
    
    switch (result) {
        case 0:
            weekDay.textContent = date[0];
            break;
        case 1:
            weekDay.textContent = date[1];
            break;
        case 2:
            weekDay.textContent = date[2];
            break;
        case 3:
            weekDay.textContent = date[3];
            break;
        case 4:
            weekDay.textContent = date[4];
            break;
        case 5:
            weekDay.textContent = date[5];
            break;
        case 6:
            weekDay.textContent = date[6];
            break;
        default:
            break;
    }
}

function reset() {
    form.reset();
}

// Updates for live time
// setInterval(() => {
//     const dates = new Date();
//     const month = dates.getMonth();
//     const day = dates.getDate();
//     const minute = dates.getMinutes();
//     const hour = dates.getHours();
//     const hour12Format = hour >= 13 ? hour - 12 : 
//                         hour == 0 ? hour + 12 : hour;
//     const am_pm = hour >= 12 ? 'PM' : 'AM';
//     const minuteFormat = minute < 10 ? '0' + minute : minute;
//     time.textContent = `${hour12Format}:${minuteFormat} ${am_pm}`;
//     // console.log(`${hour12Format}:${minuteFormat} ${am_pm}`);
// }, 1000);

// Function that displays a loader screen
function loadScreen() {
    
    if (humidity.innerHTML == "" && feelsLike.innerHTML == "" && wind.innerHTML == "") {
        humidityTitle.style.display = 'none';
        feelsTitle.style.display = 'none';
        windTitle.style.display = 'none';
        skyImg.style.display = 'none';
    } 
    else {
        humidityTitle.style.display = null;
        feelsTitle.style.display = null;
        windTitle.style.display = null;
        skyImg.style.display = null;
    }
}

// Get User Input for Location
function userLocation() {
    const input = document.getElementById('city');
    const userLoc = input.value;
    console.log(userLoc);

    weatherAPI(userLoc);
}

loadScreen();