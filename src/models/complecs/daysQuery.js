import mongoose, { Schema } from 'mongoose';



const DaysQuerySchema = new Schema(
	{
		"day": { type: Schema.Types.ObjectId, ref: 'Day' },
		"date": Date
	}
);

const DaysQuery = mongoose.model('DaysQuery', DaysQuerySchema);

export default DaysQuery;