import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import ProductControler from './controlers/basic/ProductControler';
const Product = new ProductControler();

import DishControler from './controlers/basic/DIshControler';
const Dish = new DishControler();

import DayControler from './controlers/basic/DayControler';
const Day = new DayControler();

import ProgramControler from './controlers/complecs/ProgramControler';
const Program = new ProgramControler();

import ClientControler from './controlers/basic/ClientControler';
const Client = new ClientControler();

import OrderControler from './controlers/complecs/OrderControler';
const Order = new OrderControler();

import WorkDataControler from './controlers/heavy/WorkDataControler';
const WorkData = new WorkDataControler();

const app = express();

mongoose.connect('mongodb://localhost/ezserver');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors())

app.post('/API/products', Product.create);
app.get('/API/products', Product.index);
app.put('/API/products/:id', Product.update);
app.delete('/API/products/:id', Product.delete);

app.post('/API/dishs', Dish.create);
app.get('/API/dishs', Dish.index);
app.put('/API/dishs/:id', Dish.update);
app.delete('/API/dishs/:id', Dish.delete);

app.post('/API/days', Day.create);
app.get('/API/days', Day.index);
app.put('/API/days/:id', Day.update);
app.delete('/API/days/:id', Day.delete);

app.post('/API/programs', Program.create);
app.get('/API/programs', Program.index);
app.put('/API/programs/:id', Program.update);
app.delete('/API/programs/:id', Program.delete);

app.post('/API/orders', Order.create);
app.get('/API/orders', Order.index);
app.put('/API/orders/:id', Order.update);
app.delete('/API/orders/:id', Order.delete);

app.post('/API/clients', Client.create);
app.get('/API/clients', Client.index);
app.put('/API/clients/:id', Client.update);
app.delete('/API/clients/:id', Client.delete);

app.get('/API/workdata/:count', WorkData.index);

app.listen(3333, () => {
	console.log('SERVER STARTED!');
});


