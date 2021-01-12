
let coords = {}
let date = ''
// displayWeather = function() {
//     let zip = document.getElementById('fname').value;
//     zip = zip || `${coords.latitude},${coords.longitude}`;
//     let output = document.getElementById('weather');
//         console.log(zip);
//         if (zip) {
//             let url = 'http://api.weatherstack.com/current?access_key=5fef5af234eb0d058e3f9c36c135584c&query=' + zip + '&units=f';
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
             

//              if (this.responseText && JSON.parse(this.responseText)) {
//                 document.getElementById('response').style.display = 'block';
//                 var x = JSON.parse(this.responseText);
//                 if (x.error) {
//                     document.getElementById("location").innerHTML = 'Error: ' + x.error.code
//                     return;
//                 }
//                 var location = x.location;
//                 var current = x.current;
//                 document.getElementById("location").innerHTML = 'Weather at ' + location.name + ', ' + location.region + ', ' + location.country + '<br><br>';
//                 document.getElementById("weather").innerHTML = '<br>Temperature: ' + current.temperature + 'F  &nbsp; &nbsp;' + 'Feels like : ' + current.feelslike + 'F<br><br>';
//                 document.getElementById('weatherIcon').src = current.weather_icons[0];
//                 document.getElementById('fname').value =  location.name;
//              }
//             }
//         };
//         xhttp.open("GET", url, true);
//         xhttp.send();
//         }
        
// }


displayWeather = ()=> {
    let location = document.getElementById('fname').value;
    fetch('http://localhost:4201/getWeather?address=' + location).then((response)=> {
      response.json().then((data)=> {
        console.log(data);
        document.getElementById('response').style.display = 'block';
        document.getElementById("location").innerHTML = data.location;
        document.getElementById("weather").innerHTML = data.weather;
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