const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoieXNvdWwiLCJhIjoiY2s4cmJlaHRzMDg1ODNlbXN2dWhwcWJrYSJ9.DmC7fGPEmF-c2Z7enCPgfQ&limit=1'

    request({url, json: true}, (err, { body }) => {
        if(err){
            callback('Unable to connect location services! check your internet connection and try again.', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find the location :(', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;