const path      = require('path')
const express   = require('express')
const app       = express();
const hbs       = require('hbs');
const geoCode   = require('./utils/geoCode');
const forecast  = require('./utils/forecast');
const port      = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ysoul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        body: "Here is some guide for using 'SUNRISE' and 'SUNSET'.",
        name: 'Ysoul',
        webPageTitle: 'Help'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ysoul',
        webPageTitle: 'About'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }
    const address = req.query.address;
    geoCode(address, (err, {latitude, longitude, location} = {}) => {
        if(err){
            return res.send({
                error: err
            })
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if(err) {
                return res.send({err})
            }
            res.send({
                forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        err: 'Help article not found.',
        name: 'Ysoul',
        webPageTitle: 'ERROR'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        err: 'Page not found.',
        name: 'Ysoul',
        webPageTitle: 'ERROR'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port + '.')
})