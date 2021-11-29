const mongoose = require('mongoose');

/**
 * @type {mongoose.Schema<{ userId: string, gid: string, wallet: number, bank: number, dailyAmt: number, lastUsedDaily:  date, lastUsedWekly: date, inventory: ({Name: string, Price:string, Sell: string, id: 0})[], job: string, lastUsedWork: date }>
 */

const MemberData = new mongoose.Schema({
	userID: {
		type: String,
		default: null
	},
	gid: {
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

module.exports = mongoose.model('MemberData', MemberData);
