
const request = require('request')
const displayWeather = (lat, lon, units, callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=5fef5af234eb0d058e3f9c36c135584c'
    const locationParam = lat.toString() + ',' +lon.toString();
    // url = `${url}&query=${locationParam}&units=${units}`
    url = url + '&query=' + locationParam + (units ? ('&units=' + units) : '')
    request({url, json: true}, callback)
}

module.exports = displayWeather