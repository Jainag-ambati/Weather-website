const request = require('request')

const geocode= (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiamFpbmFnLTIwMDEiLCJhIjoiY2ttcnFpanVhMGE5NjJxcnN5b3U2dWZ6dCJ9.MPMOczYtZX5pPkq32HHfiA&limit=1'
    request({url:url , json:true}, (error,response)=>{
       if(error){
           callback('Unable to connect with weather services!',undefined)
       }
       else if(response.body.features.length===0){
           callback('Unable to find location!',undefined)
       }
       else{
       const lat=response.body.features[0].center[1]
       const lon=response.body.features[0].center[0]
       callback(undefined,{lat:lat,lon:lon})
       }
    })
   }

   module.exports=geocode