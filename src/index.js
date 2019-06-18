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

if (config.https) {
	http.createServer(options, app).listen(config.port);
} else {
	https.createServer(options, app).listen(config.port);
    https.keepAliveTimeout = 60000 * 2;
}
