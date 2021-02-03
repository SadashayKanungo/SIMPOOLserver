const counter = require('./src/counter.js');
const datadict = require('./resources/datadict.json');
const cdcdict = require('./resources/cdcdict.json');

const express = require('express');
const app = express();

const port = 2000;

app.get('/', (req,res) => {
    res.send(datadict);
});

app.get('/count', (req,res) => {
    res.send(counter.getCount());
});

app.get('/cdc/:key', (req,res) => {
    let sem = req.params.key[0],
        branch = req.params.key.slice(1);
    res.send(cdcdict[branch][sem]);
    
});

app.post('/generate', (req,res) =>{

});



app.listen(port, ()=>{
    console.log("listening at http://localhost:"+port);
});