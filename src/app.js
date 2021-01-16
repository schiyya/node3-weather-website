const express = require('express')
const log = console.log
const app = express()
const fs = require('fs')
const port = process.env.PORT || 4201

const { send } = require('process')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode.js')
const displayweather = require('./utils/displayWeather.js')

const publiCDirec = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const title = "Admiral General Website"
let date;
//Setup handlebars engine and views location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


// Set up static directory to load all files
app.use(express.static(publiCDirec))


// All API methods are described here
app.get('', (req, res)=> {
    res.render('index', {
        title,
        name: "Sumanth",
        date
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title,
        name: "Sumanth",
        date
    })
})

app.get('/news', (req, res)=> {
    res.render('news', {
        title,
        message: "News",
        date
    })
})

app.get('/weather', (req, res)=> {
    res.render('weather', {
        title,
        name: "Sumanth",
        date
    })
})

app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'Provide a searh string'
        })
    }

    res.send({
        products: []
    })
})

app.get('/getWeather', (req, res)=> {
    console.log(req.query);
    if (req.query.address) {
        let units = req.query.units || 'f';
        debugger
        return geoCode(req.query.address, (error, response)=> {
            if (error) {
                return res.render('404', {
                    title,
                    name: "Sumanth",
                    date
                })
            }
            const {lat, lon} = response
            displayweather (lat, lon, units, (err, resp)=> {
                if (err || resp.body.success === false) {
                    return console.log('There is an error')
                }
                res.send({
                    title,
                    name: "Sumanth",
                    date,
                    location : `Weather in ${resp.body.location.name}, ${resp.body.location.region}, ${resp.body.location.country} is`,
                    weather: `${resp.body.current.temperature} F and it feels like ${resp.body.current.feelslike}`,
                    icon: resp.body.current.weather_icons[0],
                    resp: resp.body
                })
            })
        })
    } else {
        res.render('weather', {
            title,
            name: "Sumanth",
            date
        })
    }
    
})

app.get('/getWeather2', (req, res)=> {
    console.log(req.query);
    if (req.query.address) {
        let units = req.query.units || 'f';
        debugger
        return geoCode(req.query.address, (error, response)=> {
            if (error) {
                return res.render('404', {
                    title,
                    name: "Sumanth",
                    date
                })
            }
            const {lat, lon} = response
            displayweather (lat, lon, units, (err, resp)=> {
                if (err || resp.body.success === false) {
                    return console.log('There is an error')
                }
                res.send({
                    title,
                    name: "Sumanth",
                    date,
                    location : `${resp.body.location.region}, ${resp.body.location.country}`,
                    weather: `Now ${resp.body.current.temperature} F <br> Feels like ${resp.body.current.feelslike}`,
                    icon: resp.body.current.weather_icons[0],
                    resp: resp.body
                })
            })
        })
    } else {
        res.render('weather', {
            title,
            name: "Sumanth",
            date
        })
    }
    
})

app.get('*', (req, res)=> {
    res.render('404', {
        title,
        name: "Sumanth",
        date
    })
    // res.send('404 Page not found')
})


// Set up port and start server
app.listen(port, ()=> {
    console.log('Serer is up on port ' + port)
})


let updateDateTime = () => {
    date = new Date();
    var n = date.toDateString();
    var time = date.toLocaleTimeString();
    date = n + ' ' + time;
    // setTimeout(()=> {
    //     updateDateTime();
    // }, 1000)
  }

 updateDateTime()


