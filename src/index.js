import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ontime from 'ontime';
import config from './config'
import https from 'https';
import http from 'http';


// This line is from the Node.js HTTPS documentation.
var options = config.options;

const app = express();
mongoose.connect(config.mongoConnection, config.mongoAuth);

app.use(bodyParser.urlencoded({ extended: true }, {limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors())
import api from './pathController/mainPath';
app.use('/API', api);

import bot from './core/telegram';
import AdminInit from './telegramFunctions/init';

bot.onText(/подчинись бот, я (.+)/, AdminInit);

import daysQuery from './controlers/looped/daysQuery';
const Query = new daysQuery();
import everyDayAction from './controlers/looped/everyDay';

ontime({
    cycle: [ '12:00:00' ]
}, function (ot) {
    everyDayAction();
    ot.done();
    return;
})

ontime({
    cycle: [ 'Sunday 10:00:00' ]
}, function (ot) {
    Query.create();
    ot.done()
    return
})

var server = null;

if (config.https)
	server = http.createServer(options, app);
else 
	server = https.createServer(options, app);

if (server) {
    server.keepAliveTimeout = 60000 * 2;
    server.listen(config.port);
}