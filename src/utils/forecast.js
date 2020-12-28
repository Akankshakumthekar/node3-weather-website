const request = require('request');
const forcast =(latitude, longitude, callback) =>{
const url ='http://api.weatherstack.com/current?access_key=5a87490086eda04504469eaa2eae24ed&query='+ latitude +','+ longitude
request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to conncet to weather services!', undefined)
        } else if(body.error){
            callback('unable to find location', undefined)
        } else{
            callback(undefined,
                body.current.weather_descriptions[0] +' it is current ' + body.current.temperature +' degrees out. it fills like ' +body.current.feelslike +' degrees out'
            )
        }
     })
}


module.exports = forcast