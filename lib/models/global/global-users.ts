import mongoose from 'mongoose';

/**
 * @type {mongoose.Schema<{ userId: string, Id: string, wallet: number, bank: number, dailyAmt: number, lastUsedDaily:  Date, lastUsedWekly: Date, inventory: ({Name: string, Price:string, Sell: string, id: 0})[], job: string, lastUsedWork: Date }>}
 */

 type Item = { Name: string, Price: number, Sell: number, id: 0 | number };

export interface GlobalMemberDataInterface {
	userID: string | null;
	wallet: number | null
	bank: number | null
	lastUsedDaily: Date;
	lastUsedWeekly: Date;
	inventory: Array<Item>;
	Job: string | null;
	salary: number | null;
	lastUsedWork: Date;
}

const GMemberData = new mongoose.Schema<GlobalMemberDataInterface>({
	userID: {
		type: String,
		default: null
	},
	wallet: {
		type: Number,
		default: 0
	},
	bank: {
		type: Number,
		default: 0
	},
	lastUsedDaily: {
		type: Date
	},
	lastUsedWeekly: {
		type: Date
	},
	inventory: {
		type: Array,
		default: []
	},
	job: {
		type: String,
		default: null
	},
	salary: {
		type: Number,
		default: 0
	},
	lastUsedWork: {
		type: Date
	}
});

export default mongoose.model<GlobalMemberDataInterface>('GlobalMemberData', GMemberData);
