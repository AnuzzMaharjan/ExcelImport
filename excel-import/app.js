const express = require('express');
const app = express();
const excel = require('./excelRoute');
const cors = require('cors');


const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/excelImport");


app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Adjust the origin as needed
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/', excel);

app.listen(3001, function () {
    console.log("server running successfully!!");
});


