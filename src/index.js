import './styles/main.scss';



console.log("Hello World");

// API Weather Function
async function weatherAPI() {
    try {
        const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=Long Beach,CA,US&limit=5&appid=bc71a4a9ff59b7a45207d5b8012b790d', {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
    }
    catch (error) {
        console.error(error);
    }
}

weatherAPI();