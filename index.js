//importing the files
const eco = require("./lib/eco");
/**
  * @name SimplyEco
  * @description SimplyEco extender
  * @param {string} token - Mongo URL string}
  * @param {Object[]} options - the options for constructor
	 * @param {boolean} options[].notify - notification toggle for simplyeco
	 * @param {boolean} options[].global - global toggle for simplyeco
 */
function SimplyEco(token, options = {}) {
    return new eco(token, options);
}
//add Options to it
SimplyEco.eco = eco;
SimplyEco.version = require("./package.json").version;

//exporting this meme
module.exports = SimplyEco;