import mongoose from 'mongoose';

/**
  * @type {mongoose.Schema<{ Id: string | null, shopItems: {Name: string, Price:string, Sell: string, id: 0}[]  | [], weeklyAmy: number | 10000, dailyAmt: number | 2000}>}
*/ 
type Item = { Name: string, Price: number, Sell: number, id: 0 | number };
export interface GlobalShopData {
	Id: string | null;
	shopItems: Array<Item>;
	weeklyAmt: number | 10000;
	dailyAmt: number | 2000;
}
const GlobalShop = new mongoose.Schema<GlobalShopData>({
	Id: {
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

export default mongoose.model<GlobalShopData>('GlobalShop', GlobalShop);
