import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
mongoose.connect('mongodb://localhost/ezserver');

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

setInterval(function() {
   Query.create()
}, 43200000);

app.listen(3333, () => {
	console.log('SERVER STARTED!');
});

