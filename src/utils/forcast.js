const request = require('request')


const forcast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ff82c15a786c3b2a93118f607510cc82&query=${latitude},${longtitude}&units=f`
    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('unable to connect!!!', undefined)
        } else if (body.error) {
            callback('unable to find location',undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. it is currently ${body.current.temperature} degree out. It feel like ${body.current.feelslike} degree out`)
        }
    })

}

module.exports = forcast

