window.onload = function () {
    document.querySelector('#getWeather').addEventListener('click', function () {
        getWeather();
    });
}

function getWeathr() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '2de294d55572f40565e1c6160867cea0';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // try{
        
    // }

    
}

