// window.onload = function () {
//     document.querySelector('#getWeather').addEventListener('click', function () {
//         getWeather();
//     });
// }

const API_KEY = '9ccabe21e06695561b5fe43b81c805b3'; // Replace with your real key
// TODO: use 1 API key and 1 URL for all 3 functions

function getWeather() {
  // update the getWeather function to use a dynamic city input 
  const city = document.getElementById('cityInput').value.trim();

  if (!city) {
    document.getElementById('result').textContent = 'Please enter a city name.';
    return;
  }
  // finish dynamic city input

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // See full API response in the console
      const temp = data.main.temp;
      const description = data.weather[0].description;
      document.getElementById('result').textContent =
        `Temperature: ${temp}°C, Weather: ${description}`;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('result').textContent = 'Failed to load weather data.';
    });
    
}

function getForecast() {
  const city = document.getElementById('cityInput').value.trim();
  const API_KEY = '9ccabe21e06695561b5fe43b81c805b3';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const forecastList = data.list.slice(0, 5); // show 5 forecasts (every 3h)
      const output = forecastList.map(item => {
        const date = item.dt_txt;
        const temp = item.main.temp;
        const desc = item.weather[0].description;
        const icon = item.weather[0].icon;
        return `
          <div class="col-md-4 col-lg-2 mb-4">
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
      document.getElementById('forecastResult').innerHTML = `<ul>${output}</ul>`;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('forecastResult').textContent = 'Error loading forecast.';
    });
}

function getWeatherTips() {
  const city = document.getElementById('cityInput').value.trim();
  const API_KEY = '9ccabe21e06695561b5fe43b81c805b3';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const description = data.weather[0].description;
      document.getElementById('result').textContent =
        `Temperature in ${city}: ${temp}°C, Weather: ${description}`;

      // Basic clothing/activity tips based on temp
      let tip = '';
      if (temp < 5) tip = 'Wear a heavy coat and scarf!';
      else if (temp < 15) tip = 'Light jacket recommended.';
      else if (temp < 25) tip = 'Perfect for outdoor activities!';
      else tip = 'It’s hot! Stay hydrated and wear sunscreen.';

      document.getElementById('tip').textContent = tip;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('result').textContent = 'Failed to load weather data.';
      document.getElementById('tip').textContent = '';
    });
}



// const API_KEY = '9ccabe21e06695561b5fe43b81c805b3'; // Replace with your real key
// const city = 'London';

// document.addEventListener('DOMContentLoaded', () => {
//   document.getElementById('getWeather').addEventListener('click', () => {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data); // See full API response in the console
//         const temp = data.main.temp;
//         const description = data.weather[0].description;
//         document.getElementById('result').textContent =
//           `Temperature: ${temp}°C, Weather: ${description}`;
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         document.getElementById('result').textContent = 'Failed to load weather data.';
//       });
//   });
// });
