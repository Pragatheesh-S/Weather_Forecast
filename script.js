let lon;
let lat;

const city = document.querySelector('.city');
const errorMessage = document.querySelector('.error-message');
const temperature = document.querySelector('.temp');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const cloudiness = document.querySelector('.cloudiness')
const windDirection = document.querySelector('.wind-direction');
const feel = document.querySelector('.feel');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const icon = document.querySelector('.icon');

const kelvin = 273;



window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((showPosition) => {
            console.log(showPosition);
            lon = showPosition.coords.longitude;
            lat = showPosition.coords.latitude;

            const apiId = '0f35c925e701c48ea020c7b9220df9ce';

            const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                `lon=${lon}&appid=0f35c925e701c48ea020c7b9220df9ce`;

            fetch(apiUrl)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    console.log(data.base);

                    errorMessage.textContent = '';
                    city.textContent = 'Weather in ' + data.name;
                    temperature.textContent = (data.main.temp - kelvin).toFixed(2) + '°C';
                    description.textContent = data.weather[0].description;
                    humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
                    cloudiness.textContent = 'Cloudiness: ' + data.clouds.all + '%';
                    wind.textContent = 'Wind speed: ' + data.wind.speed + ' Km/Hr';
                    windDirection.textContent = 'Meteorological Wind direction: ' + data.wind.deg + '°';
                    feel.textContent = 'Temperature feels like ' + Math.floor(data.main.feels_like - kelvin) + '°C';
                    sunrise.textContent = 'Sunrise: ' + format_time(data.sys.sunrise);
                    sunset.textContent = 'Sunset: ' + format_time(data.sys.sunset);

                    let icons = data.weather[0].icon;
                    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icons}.png" style= 'height:3rem'/>`;
                });
        });
    }
    else {
        errorMessage.innerHTML = 'Geolocation is not supported by this browser.';
    };
});

//Converting Unix timestamp to time

function format_time(sys) {

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.

    var date = new Date(sys * 1000);

    // Hours part from the timestamp

    var hours = date.getHours();

    // Minutes part from the timestamp

    var minutes = "0" + date.getMinutes();

    // Seconds part from the timestamp

    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format

    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
};