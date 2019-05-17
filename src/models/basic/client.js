import mongoose, { Schema } from 'mongoose';



const ClientSchema = new Schema(
	{
		"name": String,
		"time": String,
		"type": String,
		"tel": Number,
		"check": Number,
		"points": Number,
		"gender": String,
		"sale": Number,
		"key": String, 
		"value": String,
		"text": String,
		"adres": { type : Array , "default" : [] }
	}
);

const Client = mongoose.model('Client', ClientSchema);

export default Client;