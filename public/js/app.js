
let coords = {}
let date = ''


displayWeather = ()=> {
    let location = document.getElementById('fname').value;
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


let updatePosition = (position)=> {
    coords = position.coords;
    // displayWeather();
}


let  getLocation = ()=> {
    // updateDateTime();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updatePosition);
    } else { 
      return false;
    }
  }


  const weatherForm = document.querySelector('form')

  weatherForm.addEventListener('submit', (e)=> {
    displayWeather();
    e.preventDefault();
  })

