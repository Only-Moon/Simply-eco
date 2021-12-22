const mongoose = require('mongoose');

/**
 * @type {mongoose.Schema<{ userId: string, Id: string, wallet: number, bank: number, dailyAmt: number, lastUsedDaily:  Date, lastUsedWekly: Date, inventory: ({Name: string, Price:string, Sell: string, id: 0})[], job: string, lastUsedWork: Date }>}
 */

const GMemberData = new mongoose.Schema({
	userID: {
		type: String,
		default: null
	},
	Id: {
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

module.exports = mongoose.model('GlobalMemberData', GMemberData);
