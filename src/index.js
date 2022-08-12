import './styles/main.scss';

const temp = document.querySelector('.temperature');

console.log("Hello World");


// API Weather Function
async function weatherAPI() {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=long beach, us&appid=bc71a4a9ff59b7a45207d5b8012b790d&units=imperial', {mode: 'cors'});
        const weatherData = await response.json();
        // let data = weatherData['main']['temp'];
        let data = weatherData.main.temp;
        temp.innerHTML = data;
        console.log(weatherData);
    }
    catch (error) { 
        console.error(error);
    }
}

weatherAPI();

function getWeatherData() {
    /*
        Data we need from weather API: -> (example)
        data.name -> "Long Beach"

        data.main.feels_like -> 83.32
        data.main.humidity -> 64
        data.main.temp -> 80.76

        data.main.temp_max -> 101.77
        data.main.temp_min -> 71.92

        data.weather.0.description -> "clear sky"

    */
}