const request = require('request')

const forecast= (lat,lon,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=0f9c720bdf7ea270300e2f1b99caa8e0&query='+lat+','+lon
    request({url:url , json:true}, (error,response) =>{
        if(error){
            callback('Unable to connect with weather services!',undefined)
        }
        else if(response.body.error){
            callback('Unable to find location!',undefined)
        }
        else{
        callback(undefined,'The current temperature in '+response.body.location.name+' is '+response.body.current.temperature+' degrees celcius and there is '+response.body.current.precip+'% chance of rain')
        }
    })
}

module.exports= forecast