const datadictmin = require('./resources/datadictmin.json');
const counter = require('./src/counter.js');
const getCdc = require('./src/cdcs.js');
const generateTables = require('./src/generator.js');

const express = require('express');
const app = express();

const port = 2000;

app.get('/data', (req,res) => {
    counter.incrementCount(1,0);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.status(200).json(datadictmin);
});

app.get('/count', (req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.status(200).json(counter.getCount());
});

app.get('/cdc/:key', (req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.status(200).json(getCdc(req.params.key));  
});

app.use(express.json());
app.post('/generate', (req,res) =>{
    var tables = generateTables(req.body);
    counter.incrementCount(0,tables.length);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.status(200).json(tables);
});

app.listen(port, ()=>{
    console.log("listening at http://localhost:"+port);
});