import mongoose, { Schema } from 'mongoose';



const DaySchema = new Schema(
	{
		"title": String,
		"type": String,
		"active": Number,
		"key": String, 
		"value": String,
		"text": String,
		"meals": { type : Array , "default" : [] }
	}
);

const Day = mongoose.model('Day', DaySchema);

export default Day;