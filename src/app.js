const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode.js')
const forecast= require('./utils/forecast.js')

const app=express()

const pubpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(pubpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Jainag'
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'Radhamma Krishnayya',
        name:'Jainag'
    })
})
app.get('/help',(req,res)=>{

    res.render('help',{
        title:'If you need any help...',
        name:'Jainag'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'Give location to search'})
    }
    
    geocode (req.query.address,(error,{lat,lon}={})=>{
        if(error){
             return res.send({error:'You must provide address!'})
        }
            console.log(lat,lon)
           forecast(lat,lon,(error,forecast)=>{
       
               if(error){
                 return res.send({error})
               }
               res.send({
                   location:req.query.address,
                  forecast,
                  
               })
           })
        
       })
    
})

app.get('/help/*',(req,res)=>{

    res.render('4o4',{
        title:'Try more..',
        errmsg:'No article found!',
        name:'Jainag'
    })
})

app.get('*',(req,res)=>{

    res.render('4o4',{
        title:'404 ERROR',
        errmsg:'page empty',
        name:'Jainag'
    })
})

app.listen(3000,()=>{
    console.log('Server is up')
})