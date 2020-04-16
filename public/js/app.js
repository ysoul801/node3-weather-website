console.log('Client side Javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const sunrise = document.querySelector('#sunrise')
const sunset = document.querySelector('#sunset')
const ir = document.querySelector('.ir')


weatherForm.addEventListener('submit', (e) =>{
    p1.textContent      = ''
    p2.textContent      = ''
    sunrise.textContent = ''
    sunset.textContent  = ''
    ir.textContent      = ''
    e.preventDefault()
    const location = search.value
    p1.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + location).then( (res) => {
    res.json().then((data) => {
        if(data.error){
            return p1.textContent = data.error
        }
        search.value = ''
        p1.textContent      = data.location
        p2.textContent      = data.forecastData.state        
        sunrise.textContent = 'SUNRISE: ' + data.forecastData.sunrise
        sunset.textContent  = 'SUNSET: ' + data.forecastData.sunset
        ir.textContent      = "The times above are in Iran , Islamic Republic's timeline."
    })
})
})