const mongoose = require('mongoose');

/**
  * @type {mongoose.Schema<{ Id: string, shopItems: ({Name: string, Price:string, Sell: string, id: 0})[]}>}
*/ 


const GlobalShop = new mongoose.Schema({
	Id: {
		type: String,
		default: null
	},
	shopItems: {
		type: Array,
		default: []
	}

});

module.exports = mongoose.model('GlobalShop', GlobalShop);