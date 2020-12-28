const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')
const app = express()

//define path for express 
const publicDirPath =path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

//static directory to serve
app.use(express.static(publicDirPath)) 
app.get('',(req,res)=>{
    res.render('index',{
        name:'akanksha',
        title:'WEATHER'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'akanksha',
        title:'ABOUT'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'this is helpful text',
        title: 'HELP',
        name: 'Akanksha'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provice address term'
        })
    }
    else{
        geocode(req.query.address, (error, {latitude,longitude,location}={}) =>{
            if(error){
                return res.send({ error })
            }
            forcast( latitude, longitude, (error, forcastdata) =>{
                if(error){
                    return res.send({ error })
                }
                res.send({
                    address: req.query.address,
                    location,
                    forcastdata: forcastdata
               })
            })
        })
    }
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provice search term'
        })
    }
    console.log(req.query.search)
    res.send({
        prodcust:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'help page not available',
        name:'akanksha',
        errorMessage:'page is down'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title : '404',
        name: 'akanksha',
        errorMessage: 'this page not available'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})