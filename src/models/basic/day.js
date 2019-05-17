import mongoose, { Schema } from 'mongoose';



const DaySchema = new Schema(
	{
		"title": String,
		"type": String,
		"key": String, 
		"value": String,
		"text": String,
		"active": { type: Boolean, default: false },
		"meals": [{ 
			"title" : String,
			"procent" : { type: Number, default: 20 },
			"meal" : [{
				"main": Boolean,
				"type": { type: String },
				"image": String,
				"dishs": [{
					"id": String,
					"dish": { type: Schema.Types.ObjectId, ref: 'Dish' },
					"procent" : { type: Number, default: 100 },
				}]
			}]
		}] 
	}
);

const Day = mongoose.model('Day', DaySchema);

export default Day;