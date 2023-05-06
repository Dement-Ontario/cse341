const express = require('express');
const dotenv = require("dotenv");
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');

dotenv.config();
const port = process.env.port || 3000;
const app = express();

// app and mongodb.initDb code from solution

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

mongodb.initDb((err, mongodb ) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
    }
    });
console.log('Web Server is listening at port '+ (port));