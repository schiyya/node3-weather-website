
let coords = {}
let date = ''
let listItem =0;

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


// let updatePosition = (position)=> {
//     coords = position.coords;
//     // displayWeather();
// }


// let  getLocation = ()=> {
//     // updateDateTime();
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(updatePosition);
//     } else { 
//       return false;
//     }
//   }


  const weatherForm = document.querySelector('form')
  const worldLocations = document.querySelector('#worldLocations')

  weatherForm.addEventListener('submit', (e)=> {
    let location = document.getElementById('fname').value;
    displayWeather(location);
    e.preventDefault();
  })


let updateWorldWeather = ()=> {
  listItem = 0
  let promiseList = [];
  let w1 = fetcher('Delhi', 0)
  promiseList.push(w1);
  let w2 = fetcher('new york', 1)
  promiseList.push(w2);
  let w3 = fetcher('beijing', 2)
  promiseList.push(w3);
  let w4 = fetcher('birmingham', 3)
  promiseList.push(w4);
  let w5 = fetcher('california', 4)
  promiseList.push(w5);
  let w6 = fetcher('dubai', 5)
  promiseList.push(w6);
  let w7 = fetcher('manitoba', 6)
  promiseList.push(w7);
  let w8 = fetcher('mexico city', 7)
  promiseList.push(w8);
  let w9 = fetcher('sydney', 8)
  promiseList.push(w9);
  Promise.all(promiseList).then((resultList)=> {
    for (var list in resultList) {
      resultList[list].json().then((data)=> {
        // let worldLocations = document.querySelector('#city-weather-text' + list)
        // let weatherdiv = document.createElement("div");
        // let weatherdivImg = document.createElement("img");
        // weatherdivImg.src = data.icon;
        // weatherdiv.innerHTML =  data.location + '<br>' + data.weather;
        // worldLocations.appendChild(weatherdiv);
        // weatherdiv.appendChild(weatherdivImg);
        let cityTextDiv = document.querySelector('#city-weather-text' + listItem)
        cityTextDiv.innerHTML = '<b>' + data.location + '</b>' + '<br>' + data.weather;
        let cityImageDiv = document.querySelector('#city-weather-image' + listItem)
        cityImageDiv.src = data.icon
        listItem++
      })
    }
  })

}

let fetcher = (location, id) => {
  builder(id)
  return new Promise((resolve)=> {
    let response = fetch('/getWeather2?address=' + location);
    resolve(response);
  });
}

let builder = (id) => {
  let weatherdiv = document.createElement("div");
  weatherdiv.setAttribute('id', 'city-weather' + id)
  let weatherdivImg = document.createElement("img")
  weatherdivImg.setAttribute('id', 'city-weather-image' + id)
  let weatherdivText = document.createElement('div')
  weatherdivText.setAttribute('id', 'city-weather-text' + id)
  let cityImage = document.createElement('img')
  cityImage.src = '../images/' + id + '.jpeg'
  cityImage.setAttribute('class', 'city')
  weatherdiv.appendChild(weatherdivImg)
  weatherdiv.appendChild(weatherdivText)
  weatherdiv.appendChild(cityImage)
  worldLocations.appendChild(weatherdiv)
}


updateWorldWeather()