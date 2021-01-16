const weatherForm = document.querySelector('form')
const worldLocations = document.querySelector('#worldLocations')
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
    fetch('/getWeather?address=' + location).then((response)=> {
      response.json().then((data)=> {
        console.log(data);
        document.getElementById('response').style.display = 'block';
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


let updateWorldWeather = ()=> {
  listItem = 0
  let promiseList = [];
  for (var i=0; i<9; i++) {
    let w = fetcher(cities[i], i)
    promiseList.push(w);
  }
  
  Promise.all(promiseList).then((resultList)=> {
    for (var list in resultList) {
      resultList[list].json().then((data)=> {
        let cityTextDiv = document.querySelector('#city-weather-text' + listItem)
        cityTextDiv.innerHTML = '<b>' + data.location + '</b>' + '<br>' + data.weather;
        let cityImageDiv = document.querySelector('#city-weather-image' + listItem)
        cityImageDiv.src = data.icon
        let cityWeatherInfoDiv = document.querySelector('#city-weather-info-text' + listItem)
        let weatherInfo = data.weatherData
        cityWeatherInfoDiv.innerHTML = `Cloud Cover:${weatherInfo.cloudcover} <br> Humidity:${weatherInfo.humidity} <br> UV-Index:${weatherInfo.uv_index}  <br> Visibility:${weatherInfo.visibility}`
        listItem++
        if (listItem === 9) {
          complete = true;
        }
      })
    }
  })

}

let fetcher = (location, id) => {
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
  worldLocations.appendChild(weatherdiv)
}

let buildCountryDoms = () => {
  for (var i=0; i<9; i++) {
    builder(i)
  }
}

worldLocations.addEventListener('click', (e)=> {
  if (!complete) {
    console.log('Hello')
    updateWorldWeather()
  }
  
})

buildCountryDoms()

