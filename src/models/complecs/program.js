import mongoose, { Schema } from 'mongoose';



const ProgramSchema = new Schema(
	{
		"title": String,
		"type": String,
		"image": String,
		"price": String,
		"key": String, 
		"value": String,
		"text": String,
		"options": { type : Array , "default" : [] },
		"settings": { type : Array , "default" : [] },
		"portions": { type : Array , "default" : [] }
	}
);

const Program = mongoose.model('Program', ProgramSchema);

export default Program;