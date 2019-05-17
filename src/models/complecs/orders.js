import mongoose, { Schema } from 'mongoose';



const OrderSchema = new Schema(
	{
		"client": { type: Schema.Types.ObjectId, ref: 'Client' },
		"date": String,
		"totalprice": Number,
		"totalsale": Number,
		"bonuses": Number,
		"status": String,
		"ended": Number,
		"cart": [{ 
			"program" : { type: Schema.Types.ObjectId, ref: 'Program' },
			"option": Number,
			"name": String,
			"price": Number,
			"quanity": Number,
			"days": [Date]
		}]
	}
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;