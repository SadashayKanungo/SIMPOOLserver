const datadictmin = require('./resources/datadictmin.json')
const counter = require('./src/counter.js')
const getCdc = require('./src/cdcs.js')
const generateTables = require('./src/generator.js')

const express = require('express')
const app = express()

const port = process.env.PORT || 2000

app.use(express.json())

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '')
    res.set('Access-Control-Allow-Headers', '')
    res.set('Access-Control-Allow-Methods', '*')
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    next()
})

app.get('/', (req,res) => {
    res.status(200).send('Welcome to Simpool Timetables')
})

app.get('/data', (req,res) => {
    counter.incrementCount(1,0)
    res.status(200).send(datadictmin)
})

app.get('/count', (req,res) => {
    res.status(200).send(counter.getCount())
})

app.get('/cdc/:bitsid', (req,res) => {
    res.status(200).send(getCdc(req.params.bitsid))
})

app.post('/generate', (req,res) =>{
    var tables = generateTables(req.body);
    counter.incrementCount(0,tables.length);
    res.status(200).send(tables);
})

app.listen(port, ()=>{
    console.log("Listening on port"+port);
})