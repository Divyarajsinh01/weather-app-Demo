const request = require('request')
const geourl = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=c8aea13593d2ebf4021981b16a475804&query=${address}`

    request({url : url, json : true}, (err, {body})=>{
         if(err){
            callback('unable to connect', undefined)
         }else if(body.error){
            callback('unable to find location', undefined)
         }else{
            callback(undefined,{
                latitude: body.data[0].latitude, 
                longitude:body.data[0].longitude,
                placeName: body.data[0].locality
            })
         }
    })
}

module.exports = geourl