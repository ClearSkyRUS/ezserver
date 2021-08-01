import mongoose, { Schema } from 'mongoose';

const DishTypeSchema = new Schema(
	{
		"title": String,
		"unit": String,
		"max": String,
		"min": String,
		"portions": []
	} 
);

const DishType = mongoose.model('DishType', DishTypeSchema);

export default DishType;