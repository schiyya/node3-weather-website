
const request = require('request')
const displayWeather = (lat, lon, units, callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=1f334a200a45f19120b73430a1e8a5e6'
    const locationParam = lat.toString() + ',' +lon.toString();
    // url = `${url}&query=${locationParam}&units=${units}`
    url = url + '&query=' + locationParam + (units ? ('&units=' + units) : '')
    request({url, json: true}, callback)
}

module.exports = displayWeather