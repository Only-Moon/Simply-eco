import mongoose from 'mongoose';

/**
  * @type {mongoose.Schema<{ gid: string, shopItems: ({Name: string, Price:string, Sell: string, id: 0})[], weeklyAmt: string, dailyAmt: string}>}
*/ 
type Item = { Name: string, Price: number, Sell: number, id: 0 | number };

export interface GuildDataInterface {
	gid: string | null
	shopItems: Item[];
	weeklyAmt: number | 10000
	dailyAmt: number | 2000
}

const GuildData = new mongoose.Schema<GuildDataInterface>({
	gid: {
		type: String,
		default: null
	},
	shopItems: {
		type: Array,
		default: []
	},
	weeklyAmt: {
		type: Number,
		default: 10000
	},
	dailyAmt: {
		type: Number,
		default: 2000
	}
});

export default mongoose.model<GuildDataInterface>('GuildData', GuildData);
