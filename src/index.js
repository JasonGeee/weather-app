import './styles/main.scss';

const temp = document.querySelector('.temperature');

console.log("Hello World");

function getTemperature(data) {
    document.querySelector('.temperature').innerHTML = data['main']['temp'];
}

// API Weather Function
async function weatherAPI() {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=long beach, us&appid=bc71a4a9ff59b7a45207d5b8012b790d&units=imperial', {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
    }
    catch (error) {
        console.error(error);
    }
}

weatherAPI();

