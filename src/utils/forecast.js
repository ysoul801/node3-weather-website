const request = require('request');

const dailyDetails = (body) =>{
    // making sunrise and sunrise time
    var tor = body.sys.sunrise;
    var sr = new Date(tor * 1000);
    var tos = body.sys.sunset;
    var ss = new Date(tos * 1000);
    var sunrise = sr.toLocaleTimeString(); 
    var sunset = ss.toLocaleTimeString();

    // general state
    var state = body.weather[0].description + ".It's currently " + body.main.temp + ' degrees out.';
    return {
        sunrise,
        sunset,
        state
    }
}

const forecast = (lat, lon, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=671353b6695663d00a5a13391e731a25&units=metric';
    
    
    request({url, json: true}, (err, { body }) => {
        if(err){
            callback('Unable to connect to weather service!', undefined);
        } else if(body.message){
            callback('Unable to find Location! :( ', undefined);
        } else {
            callback(undefined, dailyDetails(body))
        }
    })
}


module.exports = forecast;