const weatherForm = document.querySelector('form')
const worldLocations = document.querySelector('#worldLocations')
const countryDoms = null
let coords = {}
let date = ''
let listItem =0;
let complete = false;

const cities = {
  0: 'Delhi',
  1: 'New York',
  2: 'Beijing',
  3: 'Birmingham',
  4: 'California',
  5: 'Dubai',
  6: 'Mexico City',
  7: 'Sydney',
  8: 'Seattle'
}

displayWeather = (location)=> {
  document.getElementById('response').style.display = 'block';
  document.getElementById("location").innerHTML = '';
  document.getElementById("weatherText").innerHTML = 'Loading...!!!';
  document.getElementById('weatherIcon').src = '';
    fetch('/getWeather?address=' + location).then((response)=> {
      response.json().then((data)=> {
        console.log(data);
        document.getElementById("location").innerHTML = data.location;
        document.getElementById("weatherText").innerHTML = data.weather;
        document.getElementById('weatherIcon').src = data.icon;
      });
    
    })
}

  weatherForm.addEventListener('submit', (e)=> {
    let location = document.getElementById('fname').value;
    displayWeather(location);
    e.preventDefault();
  })


let updateWorldWeather = (id)=> {
  let cityWeatherInfoDiv = document.querySelector('#city-weather-info-text' + id)
  cityWeatherInfoDiv.innerHTML = 'Fetching local weather.......'
  fetcher(cities[id]).then((resultList)=> {
    resultList.json().then((data)=> {
      let cityTextDiv = document.querySelector('#city-weather-text' + id)
      cityTextDiv.innerHTML = '<b>' + data.location + '</b>' + '<br>' + data.weather;
      let cityImageDiv = document.querySelector('#city-weather-image' + id)
      cityImageDiv.src = data.icon
      
      let weatherInfo = data.weatherData
      cityWeatherInfoDiv.innerHTML = `Cloud Cover:${weatherInfo.cloudcover} <br> Humidity:${weatherInfo.humidity} <br> UV-Index:${weatherInfo.uv_index}  <br> Visibility:${weatherInfo.visibility}`
    })
  })

}

let fetcher = (location) => {
  return new Promise((resolve)=> {
    let response = fetch('/getWeather2?address=' + location);
    resolve(response);
  });
}

let builder = (id) => {
  let letters = '9ABCDEF'.split('');
  let color = '#F';
  for (var i = 0; i < 5; i++ ) {
      color += letters[Math.floor(Math.random() * 7)];
  }
  // color = color + 'DD'
  let weatherdiv = document.createElement("div");
  weatherdiv.setAttribute('id', 'city-weather' + id)
  weatherdiv.countryId = id
  let weatherdivImg = document.createElement("img")
  weatherdivImg.setAttribute('id', 'city-weather-image' + id)
  let weatherdivText = document.createElement('div')
  weatherdivText.setAttribute('id', 'city-weather-text' + id)
  weatherdivText.setAttribute('class', 'city-weather-text')
  weatherdivText.innerHTML = cities[id]
  let weatherInfoText = document.createElement('div')
  weatherInfoText.setAttribute('id', 'city-weather-info-text' + id)
  weatherInfoText.setAttribute('class', 'city-weather-info-text')
  let cityImage = document.createElement('img')
  cityImage.src = '../images/' + id + '.jpeg'
  cityImage.setAttribute('class', 'city')
  weatherdiv.appendChild(weatherdivImg)
  weatherdiv.appendChild(weatherInfoText)
  weatherdiv.appendChild(weatherdivText)
  weatherdiv.appendChild(cityImage)
  weatherdiv.style.backgroundColor = color
  weatherdiv.addEventListener('click', clickFunction)
  worldLocations.appendChild(weatherdiv)
}

let buildCountryDoms = () => {
  for (var i=0; i<9; i++) {
    builder(i)
  }
}

let clickFunction = (e) => {
  console.log(e);
  if (!e.currentTarget) {
    return;
  }
  let currentTarget = e.currentTarget.countryId;
  updateWorldWeather(currentTarget)
}

window.onload = function() {
  buildCountryDoms()
};

