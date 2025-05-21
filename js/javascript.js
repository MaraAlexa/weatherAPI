// window.onload = function () {
//     document.querySelector('#getWeather').addEventListener('click', function () {
//         getWeather();
//     });
// }

const API_KEY = '9ccabe21e06695561b5fe43b81c805b3'; // Replace with your real key

// Function 1: Current Weather
function getWeather() {
  //  use a dynamic city input 
  const city = document.getElementById('cityInput').value.trim();
  console.log('new city', city); 


  if (!city) {
    document.getElementById('result').textContent = 'Please enter a city name.';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('new console',data); // See full API response in the console
      const temp = data.main.temp;
      const windspeed = data.wind.speed;
      // no rain data is found
      const weather = data.weather[0].description;
      document.getElementById('temperature').textContent =
        `${temp}°C`;
      document.getElementById('windspeed').textContent =
        `${windspeed}`;
      document.getElementById('weather').textContent =
        `Weather: ${weather}`;
        
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('result').textContent = 'Failed to load weather data.';
    });
    
}

// Function 2: Forecast every 3 hours ( 5 cards)
function getForecast() {
  const city = document.getElementById('cityInput').value.trim();

  if (!city) {
    document.getElementById('forecastResult').textContent = 'Please enter a city name.';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log('new console', data); // See full API response in the console
      const forecastList = data.list.slice(0, 8); // slice the first 5 from list
      const output = forecastList.map(item => {
        const date = item.dt_txt;
        const temp = item.main.temp;
        const desc = item.weather[0].description;
        const icon = item.weather[0].icon;

        return `
          <div class="col">
            <div class="card shadow-sm h-100">
              <div class="card-body text-center">
                <h6 class="card-title">${date}</h6>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
                <p class="card-text">${temp}°C</p>
                <p class="text-muted small">${desc}</p>
              </div>
            </div>
          </div>
        `;
      }).join('');
      document.getElementById('forecastResult').innerHTML = output;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('forecastResult').textContent = 'Error loading forecast.';
    });
}

// only for PAID subscription. https://openweathermap.org/full-price#current
async function getForecastByDay() {
  const city = document.getElementById('cityInputByDay').value.trim();
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  try {
    // Step 1: Get city coordinates
    const geoRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const geoData = await geoRes.json();
    const lat = geoData.coord.lat;
    const lon = geoData.coord.lon;

    // Step 2: Call One Call 3.0 for daily forecast (16 days)
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=metric&appid=${API_KEY}`
    );
    const forecastData = await forecastRes.json();
    console.log('forecast16days', forecastData);

    // Step 3: Show next 16 days of forecast
    const output = forecastData.daily.slice(0, 16).map(day => {
      const date = new Date(day.dt * 1000).toLocaleDateString();
      const tempDay = day.temp.day;
      const weatherDesc = day.weather[0].description;
      const icon = day.weather[0].icon;

      return `
        <div class="col-md-3 mb-3">
          <div class="card text-center shadow-sm">
            <div class="card-body">
              <h6>${date}</h6>
              <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDesc}" />
              <p>${tempDay}°C</p>
              <p class="text-muted">${weatherDesc}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('forecast5day').innerHTML = output;

  } catch (error) {
    console.error('Failed to fetch 16-day forecast:', error);
    document.getElementById('forecast5day').textContent = 'Error loading forecast.';
  }
}



// Function 3: Weather Tips
function getWeatherTips() {
  const city = document.getElementById('cityInput').value.trim();

  if (!city) {
    document.getElementById('result').textContent = 'Please enter a city name.';
    document.getElementById('tip').textContent = ''; // empty the tip
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const description = data.weather[0].description;

      let tip = '';
      if (temp < 5) tip = 'Wear a heavy coat and scarf!';
      else if (temp < 15) tip = 'Light jacket recommended.';
      else if (temp < 25) tip = 'Perfect for outdoor activities!';
      else tip = 'It’s hot! Stay hydrated and wear sunscreen.';

      document.getElementById('result').textContent =
        `Temperature in ${city}: ${temp}°C, Weather: ${description}`;
      document.getElementById('tip').textContent = tip;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('result').textContent = 'Failed to load weather data.';
      document.getElementById('tip').textContent = '';
    });
}