//importing the files
const eco = require("./lib/eco");
/**
  * SimplyEco
  * @class
  * @param {string} token | Mongo URL string}
  * @param {boolean} options.notify
  * @returns {Economy Class}
 */
function SimplyEco(token, options = {}) {
    return new eco(token, options);
}
//add Options to it
SimplyEco.eco = eco;
SimplyEco.version = require("./package.json").version;

//exporting this meme
module.exports = SimplyEco;