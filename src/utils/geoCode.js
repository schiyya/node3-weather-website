
const request = require('request')
const geoCode = (place, callback) => {   
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  place +
    '.json?access_token=pk.eyJ1Ijoic3VtYW50aGNoIiwiYSI6ImNraXcybG1vcTBpYXcycnAycjdoYWE5M3cifQ.__b9HYWUGk5LOSE7vTbsYA&limit=1'
    
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {lat: response.body.features[0].center[1], lon: response.body.features[0].center[0]})
        }
    })
}



module.exports = geoCode