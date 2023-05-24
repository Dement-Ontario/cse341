const express = require('express');
const dotenv = require("dotenv");
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

dotenv.config();
const port = process.env.port || 3000;
const app = express();

// app and mongodb.initDb code from solution
// Everything to do with Swagger gotten from
// https://www.npmjs.com/package/swagger-autogen
// and https://www.npmjs.com/package/swagger-ui-express

app
    .use(cors())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'))

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, mongodb ) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
    }
    });
console.log('Web Server is listening at port '+ (port));