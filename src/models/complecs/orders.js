import mongoose, { Schema } from 'mongoose';



const OrderSchema = new Schema(
	{
		"client": String,
		"date": String,
		"time": String,
		"totalprice": Number,
		"totalsale": Number,
		"bonuses": Number,
		"status": String,
		"ended": Number,
		"cart": { type : Array , "default" : [] }
	}
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;