import mongoose, { Schema } from 'mongoose';



const ProgramSchema = new Schema(
	{
		"title": String,
		"public": { type: Boolean, default: false },
		"image": String,
		"options": [{ "cal": Number, "price": Number, "public": { type: Boolean, default: false } }],
		"settings": { type : Array , "default" : [] }
	}
); 

const Program = mongoose.model('Program', ProgramSchema);

export default Program;