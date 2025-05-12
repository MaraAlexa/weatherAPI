// window.onload = function () {
//     document.querySelector('#getWeather').addEventListener('click', function () {
//         getWeather();
//     });
// }

const API_KEY = '9ccabe21e06695561b5fe43b81c805b3'; // Replace with your real key

function getWeather() {
  // update the getWeather function to use a dynamic city input 
  const city = document.getElementById('cityInput').value.trim();

  if (!city) {
    document.getElementById('result').textContent = 'Please enter a city name.';
    return;
  }

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
