import './styles/main.scss';

// date-fns library
// import { fromUnixTime } from 'date-fns'


// Date API
// import { formatInTimeZone } from 'date-fns-tz'

// DOM elements
const mainCard = document.querySelector('.main-card');

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
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');


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

        displayData(weatherData);
        console.log(weatherData);
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
const dates = new Date();
const month = dates.getMonth();
const day = dates.getDate();
const minute = dates.getMinutes();
const hour = dates.getHours();
setInterval(() => {
    // const dates = new Date();
    // const month = dates.getMonth();
    // const day = dates.getDate();
    // const minute = dates.getMinutes();
    // const hour = dates.getHours();
    const hour12Format = hour >= 13 ? hour - 12 : 
                                    hour == 0 ? hour + 12 : hour;
    const am_pm = hour >= 12 ? "PM" : "AM";
    const minuteFormat = minute < 10 ? "0" + minute : minute;
    time.textContent = `${hour12Format}:${minuteFormat} ${am_pm}`;
}, 1000)



// DOM manipulation
function displayData(data) {
    const sky_blue = "#87CEEB";
    const sky_blue_shadow1 = "#73afc8";
    const sky_blue_shadow2 = "#9bedff";

    const partly_cloudy = "#9dbbce";
    const partly_cloudy_shadow1 = "#859faf";
    const partly_cloudy_shadow2 = "#b5d7ed";

    const night_sky = "#2e4482";
    const night_sky_shadow1 = "#273a6f";
    const night_sky_shadow2 = "#354e96";

    let skyText = data.current.condition.text;
    skyInfo.textContent = skyText;
    skyImg.src = data.current.condition.icon;
    
    city.textContent = data.location.name + ", " + data.location.region;
    temperature.textContent = data.current.temp_f + "\u00B0 F";

    humidity.textContent = data.current.humidity + "%";
    feelsLike.textContent = data.current.feelslike_f;
    wind.textContent = data.current.wind_mph;

    // Change background based on sky and time
    /*
    1. Sun Out and Sky blue -> 
        if (hour <= 19 && minute <= 30) &&
            (skyInfo text = "Sunny" || skyInto text = "Clear")

    2. Sun Out w/ Clouds and Sky Blue
        if (hour <= 19 && minute <= 30) &&
        (skyInfo text.toLowerCase().includes("cloud")) //true?

    3. Only Clouds and Grey Sky
        if (skyInfo text.toLowerCase().includes("rain")) //true?

    3. Moon Out w/ Night Sky
        if (hour >= 19 && minute > 30) 

    4. Moon Out w/ Clouds and Night Sky
        if (hour >= 19 && minute > 30) 
        (skyInfo text.toLowerCase().includes("cloud"))

    5. 
    */

    if ((hour >= 6 && hour <= 19) && 
        (skyText == "Sunny" || skyText == "Clear")) {
            sun.style.display = null; // Sun is out
            document.body.style.backgroundColor = sky_blue;
            clouds.style.display = 'none'; // No clouds
    }
    else if ((hour >= 6 && hour <= 19) && 
        (skyText.toLowerCase().includes("cloud"))) {
            sun.style.display = null;
            document.body.style.backgroundColor = sky_blue;
            clouds.style.display = null; // clouds in sky
    }
    // else if (skyText.toLowerCase().includes("rain")) {

    // }
    else if ((skyText == "Partly cloudy")) {
        document.body.style.backgroundColor = "#9dbbce";
        clouds.style.display = null;
    }
    else if ((hour < 6 || hour >= 19) && skyText == "Clear") {
        document.body.style.color = "white";
        sun.style.display = "none";
        clouds.style.display = 'none';
        document.body.style.backgroundColor = night_sky;
        mainCard.style.backgroundColor = night_sky;
        mainCard.style.boxShadow = `20px 20px 60px ${night_sky_shadow1}, 
                                    -20px -20px 60px ${night_sky_shadow2}`;
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
