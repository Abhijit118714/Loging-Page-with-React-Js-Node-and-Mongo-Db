const express=require('express')

const mongo = require('./mongo.js')

const Router=express()

const bodyparser=require('body-parser')

//const core=require('cors')

var morgan = require('morgan')

Router.use(bodyparser.urlencoded({extended:false}))
Router.use(bodyparser.json())
Router.use(morgan('dev'))
Router.post('/',(req,res)=>
{
    console.log(req.body)
    const data = mongo.sendData(req.body)
    data.then(i=>{res.send("")})
})
Router.post('/:phone',(req,res)=>
{
    console.log(req.params.phone)
    var data = mongo.getData(req.params.phone)
    data.then(i=>{res.send(i)})
})
 

Router.listen(8000)