const mongoose = require('mongoose');

/**
  * @type {mongoose.Schema<{ Id: string | null, shopItems: {Name: string, Price:string, Sell: string, id: 0}[]  | [], weeklyAmy: number | 10000, dailyAmt: number | 2000}>}
*/ 


const GlobalShop = new mongoose.Schema({
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

module.exports = mongoose.model('GlobalShop', GlobalShop);
