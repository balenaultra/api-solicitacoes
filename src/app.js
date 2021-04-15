'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');

const app = express();
const router = express.Router();

const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');
const requestTypeRoute = require('./routes/request_type');
const requestRoute = require('./routes/request');


const Stream = require('./express-eventstream');
const stream = new Stream();

app.use(stream.enable());

app.get('/stream/:cnpj', function(request, response) {
  console.log(`cnpj ${request.method}`);
  let  cnpj = request.params.cnpj;

  stream.add(request, response);
  stream.push_sse(cnpj, "opened", { msg: 'connection opened!' });
});

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

requestRoute.stream = stream;

app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/requesttypes', requestTypeRoute);
app.use('/requests', requestRoute);


module.exports = app;
