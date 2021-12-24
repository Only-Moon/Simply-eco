const mongoose = require('mongoose');
const guildUserData = require('../models/nonGlobal/users');
const guildData = require('../models/nonGlobal/guild');
const globalShop = require('../models/global/global-shop');
const globalUserData = require('../models/global/global-users');
const jobs = require('./data/jobs.js');
const { Client } = require('discord.js');

class SimplyEco {
	/**
   * @name SimplyEco the constructor
   * @class
   * @constructs SimplyEco
	 * @description Connecting To The Database
	 * @param {string} dbUrl - the mongoose database url
	 * @param {Object[]} options - the options for constructor
	 * @param {boolean} options[].notify - notification toggle for simplyeco
	 * @param {boolean} options[].global - global toggle for simplyeco
	 * @param {Client} client - the discord.js client
   * @throws {TypeError} Error while connection to mongoose 
   * @example new eco.eco(client, dbUrl, { global: true | false, notify: true | false })
	 */
	constructor(client, dbUrl, options = {}) {
		if (!client) throw new TypeError("No client provided.")
		if (!(client instanceof Client)) throw new TypeError("Provided discord.js client is not right")
		if (!dbUrl) throw new TypeError('dbUrl was not provided!');
		this.token = dbUrl;
		this.Client = client;
		this.options = options;
		mongoose.connect(
			this.token,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		)
			.then(connection => {
				this.connected = true;
				this.mongoClient = connection;
				if (options.notify === false) return;
				else return console.log("\x1b[32m%s\x1b[0m", "[INFO] SimplyEco connected to Database");
			})
			.catch(e => {
				throw new TypeError(`An Error Just Occurred. ${e.stack}`);
			});
	}
	/**
	 * @name SetWeekly
	 * @description Set a weekly amount for a guild or global. GuildID is not needed for global use.
	 * @param {boolean} GuildID - the guild id
   * @param {number} Amt - the weekly amount 
   * @throws {TypeError} GuildID when guild id is not provided
   * @throws {TypeError} Amt when amount is not provided
	 * @example SetWeekly({ GuildID: "881789379553656872", Amt: 10000 })
   * @returns {number} the weekly amount
	 */

	async SetWeekly({ GuildID, Amt }) {
		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A GuildID must be specified');
			if (!Amt) throw new TypeError('An Amount to give must be specified.');
			if (isNaN(Amt)) throw new TypeError("Amount must be in number")
			let GuildData = await guildData.findOne({
				gid: GuildID
			});
			if (!GuildData) {
				let Add = new guildData({
					gid: GuildID,
					weeklyAmt: Number(Amt)
				});
				await Add.save();
			}
			GuildData.weeklyAmt = Number(Amt);
			GuildData.save();
			return GuildData.weeklyAmt;
		} else {
			if (!Amt) throw new TypeError('A Amount to exchange must be specified.');
			if (isNaN(Amt)) throw new TypeError("Amount must be in number")
			let globalData = await globalShop.findOne({
				Id: this.Client.user.id,
			});
			if (!globalData) {
				let Add = new globalShop({
					gid: this.Client.user.id,
					weeklyAmt: Number(Amt)
				});
				await Add.save();
			}
			globalData.weeklyAmt = Number(Amt);
			globalData.save();
			return globalData.weeklyAmt;
		}
	}

	/**
	 * @name SetDaily
	 * @description Set a daily amount for a guild or global. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
   * @param {number} Amt - the daily amount
   * @throws {TypeError} GuildID when guild id is not provided
   * @throws {TypeError} Amt when amount is not provided
	 * @example SetDaily({ GuildID: "881789379553656872", Amt: 10000 })
   * @returns {number} the daily amt 
	 */
	async SetDaily({ GuildID, Amt }) {
		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A GuildID must be specified'); 
			if (!Amt) throw new TypeError('An Amount to give must be specified.');
			if (isNaN(Amt)) throw new TypeError("Amt must be in number")
			let GuildData = await guildData.findOne({
				gid: GuildID
			});
			if (!GuildData) {
				let Add = new guildData({
					gid: GuildID,
					dailyAmt: Number(Amt)
				});
				await Add.save();
			}
			GuildData.dailyAmt = Number(Amt);
			GuildData.save();
			return GuildData.dailyAmt;
		} else {
			if (!Amt) throw new TypeError('A Amount to exchange must be specified.');
			if (isNaN(Amt)) throw new TypeError("Amt must be in number")
			let globalData = await globalShop.findOne({
				Id: this.Client.user.id
			});
			if (!globalData) {
				let Add = new globalShop({
					Id: this.Client.user.id,
					dailyAmt: Number(Amt)
				});
				await Add.save();
			}
			globalData.dailyAmt = Number(Amt);
			globalData.save();
			return globalData.dailyAmt;
		}
	}

	/**
	 * @name Transfer
	 * @description Transfer money over 2 people. GuildID property is not needed for global use.
	 * @param {string} GuildID - guild id
   * @param {string} User1ID - user1 id
   * @param {string} User2ID - user2 id
   * @param {number} Amt - the amount to transfer
   * @throws {TypeError} User1ID when user1 id is not provided  
  * @throws {TypeError} User2ID when user2 id is not provided 
   * @throws {TypeError} Amt when amount is not provided
   * @example Transfer({ GuildID: "881789379553656872", Amt: 10000, User1ID: "777474453114191882", User2ID: "753974636508741673" })
   * @returns {(string|Object)} return NOT_ENOUGH_CASH or USER1 and USER2 wallet bal
*/
 async Transfer({ GuildID, User1ID, User2ID, Amt }) {
		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A guild id must be specified.');
			if (!User1ID) throw new TypeError('A User must be specified.');
			if (!User1ID) throw new TypeError('A User must be specified.');
			if (!Amt) throw new TypeError('A Amount to exchange  must be specified.');
			let User1Data = await guildUserData.findOne({
				gid: GuildID,
				userID: User1ID
			});
			let User2Data = await guildUserData.findOne({
				gid: GuildID,
				userID: User2ID
			});
			if (!User1Data) {
				let AddUser = new guildUserData({
					userID: User1ID,
					gid: GuildID
				});

				await AddUser.save();
				return 'NOT_ENOUGH_CASH';
			} else if (!User2Data) {
				let AddUser = new guildUserData({
					userID: User2ID,
					gid: GuildID,
					wallet: Number(Amt)
				});

				await AddUser.save();
				return AddUser;
			} else {
				if (User1Data.wallet < Amt) {
					return 'NOT_ENOUGH_CASH';
				}
				User1Data.wallet -= Number(Amt);
				User2Data.wallet += Number(Amt);
				await User1Data.save();
				await User2Data.save();
				return { USER1: User1Data.wallet, USER2: User2Data.wallet };
			}
		} else {
			if (!User1ID) throw new TypeError('A User must be specified.');
			if (!User1ID) throw new TypeError('A User must be specified.');
			if (!Amt) throw new TypeError('A Amount to exchange  must be specified.');
			let User1Data = await globalUserData.findOne({
				userID: User1ID
			});
			let User2Data = await globalUserData.findOne({
				userID: User2ID
			});
			if (!User1Data) {
				let AddUser = new globalUserData({
					userID: User1ID,
				});

				await AddUser.save();
				return 'NOT_ENOUGH_CASH';
			} else if (!User2Data) {
				let AddUser = new globalUserData({
					userID: User2ID,
					wallet: Number(Amt)
				});

				await AddUser.save();
				return AddUser;
			} else {
				if (User1Data.wallet < Amt) {
					return 'NOT_ENOUGH_CASH';
				}
				User1Data.wallet -= Number(Amt);
				User2Data.wallet += Number(Amt);
				await User1Data.save();
				await User2Data.save();
				return { USER1: User1Data.wallet, USER2: User2Data.wallet };
			}
		}

	}

	/**
	 * @name RemoveItem
	 * @description Remove an item from the shop. GuildID is not needed for global use.
	 * @param {string} GuildID? - the guild id 
	 * @param {(string|number)} Item - the item name or number
    * @throws {TypeError} GuildID when guild id is not provided
    * @throws {TypeError} Item when item is not provided
	 * @example RemoveItem({ GuildID: "881789379553656872", Item: "very expensive pancakes" | "0"})
   * @returns {(string|Array)} return NO_ITEM or ITEM_NOT_FOUND or INVALID_ITEM or array of shopItems objects
	 */
	async RemoveItem({ GuildID, Item }) {
		if (!Item) throw new TypeError('A Item Id must be specified.');

		if (this.options?.global === true) {
			let Global = await globalShop.findOne({
				Id: this.Client.user.id
			});
			if (!Global) {
				return 'NO_ITEMS';
			}

			let itemm = await Global.shopItems.filter(item => _checkItem(item, Item));
   if (isNaN(Item)){

			if (!itemm[0]) {
				return 'ITEM_NOT_FOUND';
      } else {
     
     const global = Global.shopItems.filter(item => item.Name !== Item)
      
			await Global.save();
      
      }
   } else if (Number(Item)) {

			if (!itemm[0]) {
				return 'ITEM_NOT_FOUND';
      } else {
     
     Global.shopItems.filter(item => item.id !== Item)
    await Global.save();
      }
   } else {
     return "INVALID_ITEM"
   }

			return Global.shopItems;
		} else if (!this.options?.global || this.options?.global === false) {
			if (!GuildID) throw new TypeError('A GuildID must be specified');
			let GuildData = await guildData.findOne({
				gid: GuildID
			});
			if (!GuildData) {
				return 'NO_ITEMS';
			}
			let itemm = await Global.shopItems.filter(item => _checkItem(item, Item));

      if (isNaN(Item)){

			if (itemm[0]) {
				return 'ITEM_NOT_FOUND';
      } else {
     GuildData.shopItems.filter(item => item.Name !== Item)

      }   
  } else if (Number(Item)) {

			if (!itemm[0]) {
				return 'ITEM_NOT_FOUND';
      } else {
             GuildData.shopItems.filter(item => item.id !== Item)

      }   
      } else {
     return "INVALID_ITEM";
      }

			await GuildData.save();
			return GuildData.shopItems;
		}
	}

	/**
	 * @name AddItem
	 * @description Add an item to a user. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id
	 * @param {string} ItemName - the item name
	 * @param {number} Price - the price of item
	 * @param {number} SellPrice - the selling price
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * @throws {TypeError} ItemName when item name is not provided
	 * @throws {TypeError} Price when price is not provided 
	 * throws {TypeError} SellPrice when sell price is not provided 
	 * @example AddItem({ GuildID: "881789379553656872", ItemName: "very expensive pancakes", Price: 10000, SellPrice: 1000 })
   * @returns {Array} return array of shopItems objects
	 */
	async AddItem({ GuildID, ItemName, Price, SellPrice }) {
		if (!ItemName) throw new TypeError('A Item Name must be specified.');
		if (!Price) throw new TypeError('A Price must be specified');
    if(isNaN(Price)) throw new TypeError('Price must be in number');
		if (!SellPrice) throw new TypeError('A SellPrice  must be specified.');
    if(isNaN(SellPrice)) throw new TypeError('SellPrice must be in number');

		let GuildData = await guildData.findOne({
			gid: GuildID
		});
		let Global = await globalShop.findOne({
			Id: this.Client.user.id
		});

		if (this.options.global === true) {

			if (!Global) {
				let Add2 = new globalShop({
					userID: this.Client.user.id
				});
				let Item = { Name: ItemName, Price: Price, Sell: SellPrice, id: 0 };
				Add2.shopItems.push(Item);
				await Add2.save();
				return Add2;
			}
			let Item = {
				Name: ItemName,
				Price: Price,
				Sell: SellPrice,
				id: Global.shopItems.length
			};
			Global.shopItems.push(Item);
			await Global.save();
			return Global.shopItems;
		} else if (!this.options?.global || this.options.global === false) {
			if (!GuildID) throw new TypeError('A GuildID must be specified');

			if (!GuildData) {
				let Add = new guildData({
					gid: GuildID
				});
				let Item = { Name: ItemName, Price: Price, Sell: SellPrice, id: 0 };
				Add.shopItems.push(Item);
				await Add.save();
				return Add;
			}
			let Item = {
				Name: ItemName,
				Price: Price,
				Sell: SellPrice,
				id: GuildData.shopItems.length
			};
			GuildData.shopItems.push(Item);
			await GuildData.save();
			return GuildData.shopItems;
		}
	}

	/**
	 * @name BuyItem
	 * @description Buy an item to a user. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
	 * @param {(string|number)} Item - the item name or id
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * @throws {TypeError} Item when item name or id is not provided
	 * throws {TypeError} UserID when user id is not provided 
	 * @example BuyItem({ GuildID: "881789379553656872", Item: "very expensive pancakes" | "0", user: "753974636508741673" })
   * @returns {(string|Array)} return ITEM_NOT_FOUND or NOT_ENOUGH_CASH or ALREADY_PURCHASED or array of item objects
	 */
	async BuyItem({ UserID, GuildID, Item }) {
		if (!UserID) throw new TypeError('A User ID must be specified');

		if (this.options?.global === true) {
			let Global = await globalShop.findOne({
				Id: this.Client.user.id
			});
			if (!Global) {
				return false;
			}
			let item = await Global.shopItems.filter(item => _checkItem(item, Item));
      let UserData = await globalUserData.findOne({
				userID: UserID
			});

			if (!item[0].Name) {
				return 'ITEM_NOT_FOUND';
			}

			if (UserData.wallet < item[0].Price) {
				return 'NOT_ENOUGH_CASH';
			}
			if (!UserData) {
				let AddUser = new guildUserData({
					userID: UserID,
					gid: GuildID
				});

				await AddUser.save();
				return 'NOT_ENOUGH_CASH';
			} else {
				if (UserData.inventory.length === 0) {
					UserData.inventory.push(item[0]);
					UserData.wallet -= Number(item[0].Price);
					await UserData.save();
					return item[0];
				}
				let item1 = UserData.inventory.find(item => _checkItem(item, Item));

				if (item1) {
					return 'ALREADY_PURCHASED';
				} else {
					UserData.inventory.push(item[0]);
					UserData.wallet -= Number(item[0].Price);
					await UserData.save();
					return item[0];
				}
			}
		} else if (!this.options.global || this.options.global === false) {
			if (!GuildID) throw new TypeError('A Guild ID must be specified');
			let Shop = await guildData.findOne({
				gid: GuildID
			});
			if (!Shop) {
				return false;
			}
			let item = await Shop.shopItems.filter(item => _checkItem(item, Item));
			let UserData = await guildUserData.findOne({
				gid: GuildID,
				userID: UserID
			});

			if (!item.Name) {
				return 'ITEM_NOT_FOUND';
			}

			if (UserData.wallet < item[0].Price) {
				return 'NOT_ENOUGH_CASH';
			}
			if (!UserData) {
				let AddUser = new guildUserData({
					userID: UserID,
					gid: GuildID
				});

				await AddUser.save();
				return 'NOT_ENOUGH_CASH';
			} else {
				if (UserData.inventory.length === 0) {
					UserData.inventory.push(item[0]);
					UserData.wallet -= Number(item[0].Price);
					await UserData.save();
					return item[0];
				}
				let item1 = UserData.inventory.find(item => _checkItem(item, Item));

				if (item1) {
					return 'ALREADY_PURCHASED';
				} else {
					UserData.inventory.push(item[0]);
					UserData.wallet -= Number(item[0].Price);
					await UserData.save();
					return item[0];
				}
			}
		}
	}

	/**
	 * @name SellItem
	 * @description Sell an item. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
	 * @param {(string|number)} Item - the item name or id
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * @throws {TypeError} Item when item name or id is not provided
	 * throws {TypeError} UserID when user id is not provided 
	 * @example SellItem({ GuildID: "881789379553656872", Item: "very expensive pancakes" | "0", user: "753974636508741673" })
   * @returns {(string|Array)} return TRY_AGAIN or NO_ITEM_IN_INVENTORY or NOT_PURCHASED or NOT_AVAILABLE_IN_SHOP or array of item objects
	 */
	async SellItem({ UserID, GuildID, Item }) {
		if (!UserID) throw new TypeError('A member ID must be specified');
		if (!Item) throw new TypeError('A Item Name must be specified');

		if (this.options?.global === true) {
			let Global = await globalShop.findOne({
				Id: this.Client.user.id
			});
			if (!Global) {
				return false;
			}
			let itemName = await Global.shopItems.filter(item =>
				_checkItem(item, Item)
			);
			let UserData = await globalUserData.findOne({
				gid: GuildID
			});
			if (!UserData) {
				let AddUser = new globalUserData({
					userID: UserID
				});

				await AddUser.save();
				return 'TRY_AGAIN';
			}
			if (UserData.inventory.length === 0) {
				return 'NO_ITEM_IN_INVENTORY';
			}
			let item2 = UserData.inventory.find(item => _checkItem(item, Item));

			if (!item2) {
				return 'NOT_PURCHASED';
			} else if (!itemName[0]) {
				return 'NOT_AVAILABLE_IN_SHOP';
			} else if (
				UserData.inventory.filter(item => item.Name === itemName.Name)
			) {
				UserData.inventory = UserData.inventory.filter(
					item => item.Name != Item
				);

				UserData.wallet += Number(itemName[0].Sell);
				await UserData.save();
				return itemName[0];
			}
		} else if (!this.options?.global || this.options.global === false) {
			if (!GuildID) throw new TypeError('A GuildID must be specified');
			let Shop = await guildData.findOne({
				gid: GuildID
			});
			if (!Shop) {
				return false;
			}
			let itemName = await Shop.shopItems.filter(item =>
				_checkItem(item, Item)
			);
			let UserData = await guildUserData.findOne({
				gid: GuildID,
				userID: UserID
			});
			if (!UserData) {
				let AddUser = new guildUserData({
					userID: UserID,
					gid: GuildID
				});

				await AddUser.save();
				return 'TRY_AGAIN';
			}
			if (UserData.inventory.length === 0) {
				return 'NO_ITEM_IN_INVENTORY';
			}
			let item2 = UserData.inventory.find(item => _checkItem(item, Item));

			if (!item2) {
				return 'NOT_PURCHASED';
			} else if (
				UserData.inventory.filter(item => item.Name === itemName.Name)
			) {
				UserData.inventory = UserData.inventory.filter(
					item => item.Name != Item
				);

				UserData.wallet += Number(itemName[0].Sell);
				await UserData.save();
				return itemName[0];
			}
		}
	}

	/**
	 * @name Daily 
	 * @description Collect the daily amount for an user. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * throws {TypeError} UserID when user id is not provided 
	 * @example Daily({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   * @returns {(string|number)} return ALREADY_USED or user's wallet bal
	 */
	async Daily({ UserID, GuildID }) {
		if (!this.options?.global) {
			if (!UserID) throw new TypeError('A member ID must be specified');
			if (!GuildID) throw new TypeError('A Guild ID must be specified');

			let UserData = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});
			let GuildData = await guildData.findOne({
				gid: GuildID
			});
			let AMT;
			if (!GuildData) {
				AMT = 2000;
			} else if (GuildData) {
				AMT = GuildData.dailyAmt;
			}
			
     /** 
       * @constant 
       * @type {number} 
       * @default
      */
			const timeout = 86400000;
			if (!UserData) {
				let AddUser = new guildUserData({
					userID: UserID,
					gid: GuildID,
					wallet: Number(AMT),
					lastUsedDaily: Date.now()
				});

				await AddUser.save();
				return AddUser.wallet;
			}
			let daily = UserData.lastUsedDaily;
			if (daily !== null && timeout - (Date.now() - daily) > 0) {
				return {
					error: 'ALREADY_USED',
					timeout: _msToTime(timeout - (Date.now() - daily))
				};
			} else {
				UserData.wallet += Number(AMT);
				UserData.lastUsedDaily = Date.now();
				await UserData.save();
				return UserData.wallet;
			}
		} else {

			let UserData = await globalUserData.findOne({
				userID: UserID,
			});
			let globalData = await globalShop.findOne({
				Id: this.Client.user.id
			});

			let AMT;
			if (!globalData) {
				AMT = 5000;
			} else if (globalData) {
				AMT = globalData.dailyAmt;
			}
			 /** 
       * @constant 
       * @type {number} 
       * @default
      */
			const timeout = 86400000;
			if (!UserData) {
				let AddUser = new globalUserData({
					userID: UserID,
					wallet: Number(AMT),
					lastUsedDaily: Date.now()
				});

				await AddUser.save();
				return AddUser.wallet;
			}
			let daily = UserData.lastUsedDaily;
			if (daily !== null && timeout - (Date.now() - daily) > 0) {
				return {
					error: 'ALREADY_USED',
					timeout: _msToTime(timeout - (Date.now() - daily))
				};
			} else {
				UserData.wallet += Number(AMT);
				UserData.lastUsedDaily = Date.now();
				await UserData.save();
				return UserData.wallet;
			}
		}
	}
	/**
	 * @name Weekly
	 * @description Collect the weekly amount for an user. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * throws {TypeError} UserID when user id is not provided 
	 * @example Daily({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   * @returns {(string|number)} return ALREADY_USED with timeout or user's wallet bal
	 */
	async Weekly({ UserID, GuildID }) {
		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A Item ID must be specified');
			if (!UserID) throw new TypeError('A member ID must be specified');

			let UserData = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});
			let GuildData = await guildData.findOne({
				gid: GuildID
			});
			let AMT;
			if (!GuildData) {
				AMT = 10000;
			}
			if (GuildData) {
				AMT = GuildData.weeklyAmt;
			}
     /** 
       * @constant 
       * @type {number} 
       * @default
      */
			const timeout = 604800000;
			if (!UserData) {
				let AddUser = new guildUserData({
					userID: UserID,
					gid: GuildID,
					wallet: Number(AMT),
					lastUsedWeekly: Date.now()
				});

				await AddUser.save();
				return AddUser.wallet;
			}
			let weekly = UserData.lastUsedWeekly;
			if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
				return {
					error: 'ALREADY_USED',
					timeout: _msToTime(timeout - (Date.now() - weekly))
				};
			} else {
				UserData.wallet += Number(AMT);
				UserData.lastUsedWeekly = Date.now();
				await UserData.save();
				return UserData.wallet;
			}
		} else {
			if (!UserID) throw new TypeError('A member ID must be specified');

			let UserData = await globalUserData.findOne({
				userID: UserID,
			});
			let GuildData = await globalShop.findOne({
				Id: this.Client.user.id
			});
			let AMT;
			if (!GuildData) {
				AMT = 10000;
			}
			if (GuildData) {
				AMT = GuildData.weeklyAmt;
			}
     /** 
       * @constant 
       * @type {number} 
       * @default
      */
			const timeout = 604800000;
			if (!UserData) {
				let AddUser = new globalUserData({
					userID: UserID,
					wallet: Number(AMT),
					lastUsedWeekly: Date.now()
				});

				await AddUser.save();
				return AddUser.wallet;
			}
			let weekly = UserData.lastUsedWeekly;
			if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
				return {
					error: 'ALREADY_USED',
					timeout: _msToTime(timeout - (Date.now() - weekly))
				};
			} else {
				UserData.wallet += Number(AMT);
				UserData.lastUsedWeekly = Date.now();
				await UserData.save();
				return UserData.wallet;
			}
		}
	}
	/**
	* @name GetInv
	* @description Get an inventory of an user. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * throws {TypeError} UserID when user id is not provided 
	* @example GetInv({ GuildID: "881789379553656872", UserID: "753974636508741673" })
  * @returns {(string|Array)} return NO_ITEM or array of user inventory objects
	*/
	async GetInv({ UserID, GuildID }) {
		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A guild id must be specified.');
			if (!UserID) throw new TypeError('A user ID must be specified');

			let User = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});
			if (!User) {
				let AddUser = new guildUserData({
					userID: UserID,
					gid: GuildID
				});

				await AddUser.save();

				if (!AddUser.inventory) {
					return 'NO_ITEM';
				} else {
					return AddUser.inventory;
				}
			}
			if (!User.inventory) {
				return 'NO_ITEM';
			} else {
				return User.inventory;
			}
		} else {
			if (!UserID) throw new TypeError('A user ID must be specified');

			let User = await globalUserData.findOne({
				userID: UserID,
			});
			if (!User) {
				let AddUser = new globalUserData({
					userID: UserID,
				});

				await AddUser.save();

				if (!AddUser.inventory) {
					return 'NO_ITEM';
				} else {
					return AddUser.inventory;
				}
			}
			if (!User.inventory) {
				return 'NO_ITEM';
			} else {
				return User.inventory;
			}
		}
	}

	/**
	* @name GetUser
	* @description Get an user data of an user. GuildID is not needed for global use.
	* @param {string} GuildID - the guild id 
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * throws {TypeError} UserID when user id is not provided 
	* @example GetUser({ GuildID: "881789379553656872", UserID: "753974636508741673" })
  * @returns {Array} return array of user objects
	*/
	async GetUser({ UserID, GuildID }) {
		// Required Parameters
		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A guild id must be specified.');
			if (!UserID) throw new TypeError('A user ID must be specified');

			let User = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});
			if (!User) {
				let AddUser = new guildUserData({
					userID: UserID,
					gid: GuildID
				});

				await AddUser.save();

				return AddUser;
			}
			return User;
		} else {
			if (!UserID) throw new TypeError('A user ID must be specified');

			let User = await globalUserData.findOne({
				userID: UserID,
			});
			if (!User) {
				let AddUser = new guildUserData({
					userID: UserID,
				});

				await AddUser.save();

				return AddUser;
			}
			return User;
		}
	}

	 /**
	* @name GetBal
	* @description Get an balance of an user. GuildID is not needed for global use
	 * @param {string} GuildID - the guild id 
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * throws {TypeError} UserID when user id is not provided 
	* @example GetBal({ GuildID: "881789379553656872", UserID: "753974636508741673" })
  * @returns {number} return user's wallet balance	
  */
	async GetBal({ UserID, GuildID }) {
		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A guild id must be specified.');
			if (!UserID) throw new TypeError('A member ID must be specified');

			let Bal = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});
			if (!Bal) {
				let AddUser = new guildUserData({
					userID: UserID,
					gid: GuildID
				});

				await AddUser.save();

				return AddUser.wallet;
			}
			return Bal.wallet;
		} else {
			if (!UserID) throw new TypeError('A member ID must be specified');

			let Bal = await globalUserData.findOne({
				userID: UserID,
			});
			if (!Bal) {
				let AddUser = new globalUserData({
					userID: UserID,
				});

				await AddUser.save();

				return AddUser.wallet;
			}
			return Bal.wallet;
		}
	}
	/**
	* @name GetItem
	* @description Get an item data. GuildID is not needed for global use.
	* @param {string} GuildID - the guild id
	 * @param {string} Item - the item name 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * throws {TypeError} Item when item is not provided 
	* @example GetItem({ GuildID: "881789379553656872", Item: "pancakes" })
  * @returns {Array} return array of item objects
*/
	async GetItem({ GuildID, Item }) {
		if (!Item) throw new TypeError('No item name or id specified.');
		if (this.options.global === true) {
			let Global = await globalShop.findOne({
				Id: this.Client.user.id
			});
			if (!Global) return null;

			return Global.shopItems.filter(item => _checkItem(item, Item))[0];
		} else if (!this.options.global || this.options.global === false) {
			let GuildData = await guildData.findOne({
				gid: GuildID
			});
			if (!GuildData) return null;
			return GuildData.shopItems.filter(item => _checkItem(item, Item))[0];
		}
	}
	/**
	* @name GetBankBal
	* @description Get bank balance of an user. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * throws {TypeError} UserID when user id is not provided 
	* @example GetBankBal({ GuildID: "881789379553656872", UserID: "753974636508741673" })
  * @returns {number} return user's bank bal
	*/
	async GetBankBal({ UserID, GuildID }) {

		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A guild id must be specified.');
			if (!UserID) throw new TypeError('A member ID must be specified');

			let Bal = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});
			if (!Bal) {
				let AddUser = new guildUserData({
					userID: UserID,
					gid: GuildID
				});

				await AddUser.save();

				return AddUser.bank;
			}
			return Bal.bank;
		} else {
			if (!UserID) throw new TypeError('A member ID must be specified');

			let Bal = await globalUserData.findOne({
				userID: UserID,
			});
			if (!Bal) {
				let AddUser = new globalUserData({
					userID: UserID,
				});

				await AddUser.save();

				return AddUser.bank;
			}
			return Bal.bank;
		}
	}
		/**
	* @name GetRich
	* @description Get the richest people. GuildID is not needed for global use.
	* @param {string} GuildID - the guild id
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * throws {TypeError} UserID when user id is not provided 
	* @example GetRich({ GuildID: "881789379553656872", UserID: "753974636508741673" })
  * @returns {Array} return array of user objects
	*/
	async GetRich({ GuildID, UserID }) {
		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A guild id must be specified.');

			const lb = await guildUserData
				.find({
					gid: GuildID
				})
				.sort([['wallet' + 'bank', 'descending']])
				.exec()
				.catch(e => {
					throw new TypeError(`An Error Just Occurred. ${e.stack}`);
				});
			if (lb.length === 0) {
				return 'NO_RICH_PEOPLE';
			}
			return lb;
		} else {
     if (!UserID) throw new TypeError("A user id must be specified")
			const lb = await globalUserData
				.find({
					userID: UserID
				})
				.sort([['wallet' + 'bank', 'descending']])
				.exec()
				.catch(e => {
					throw new TypeError(`An Error Just Occurred. ${e.stack}`);
				});
			if (lb.length == 0) {
				return 'NO_RICH_PEOPLE';
			}
			return lb;
    }
	}

	/**
	* @name GetProfile
	* @description Get a profile data of an user. GuildID is not needed for global use.
	* @param {string} GuildID - the guild id 
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * throws {TypeError} UserID when user id is not provided 
	* @example GetProfile({ GuildID: "881789379553656872", UserID: "753974636508741673" })
  * @returns {Array} return array of profile objects
	*/
	async GetProfile({ GuildID, UserID }) {
		if (!UserID) throw new TypeError('A user id must be specified.');
		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A guild id must be specified.');
			let User = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});

			let Profile = [];
			Profile.push({
				user: User.userID,
				wallet: User.wallet,
				job: User.job,
				bank: User.bank,
				inventory: User.inventory.length,
				salary: User.salary
			});
			return Profile;
		} else {
			let User = await globalUserData.findOne({
				userID: UserID,
			});

			let Profile = [];
			Profile.push({
				user: User.userID,
				wallet: User.wallet,
				job: User.job,
				bank: User.bank,
				inventory: User.inventory.length,
				salary: User.salary
			});
			return Profile;
		}
	}

/**
	* @name AddMoney
	* @param {string} GuildID - the guild id
	* @param {number} Amt - the amount to add
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * @throws {TypeError} Amt when amount is not provided
	 * throws {TypeError} UserID when user id is not provided 
	* @description Add money to an user. GuildID is not needed for global use.
	* @example AddMoney({ GuildID: "881789379553656872", UserID: "753974636508741673", Amt: "1000" })
  * @returns {number} return user's wallet bal
	*/
	async AddMoney({ UserID, GuildID, Amt }) {
		// Required Parameters
		if (!UserID) throw new TypeError('A user ID must be specified');
		if (!Amt) throw new TypeError('An amount of money must be specified.');

		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A guild id must be specified.');
			//Find Data In DB
			let UserData = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});
			//Create Data If None Is Found
			if (!UserData) {
				let AddUser = new guildUserData({
					userID: UserID,
					gid: GuildID,
					wallet: Number(Amt)
				});

				await AddUser.save();

				return AddUser.wallet;
			}
			// Update Wallet
			UserData.wallet += Number(Amt);

			await UserData.save();

			return UserData.wallet;
		} else {
			let UserData = await globalUserData.findOne({
				userID: UserID,
			});
			//Create Data If None Is Found
			if (!UserData) {
				let AddUser = new globalUserData({
					userID: UserID,
					wallet: Number(Amt)
				});

				await AddUser.save();

				return AddUser.wallet;
			}
			// Update Wallet
			UserData.wallet += Number(Amt);

			await UserData.save();

			return UserData.wallet;
		}
	}

	/**
	* @name RemoveMoney
	* @description Remove money to an user. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
	 * @param {number} Amt - the amount to remove
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * @throws {TypeError} Amt when amount is not provided
	 * throws {TypeError} UserID when user id is not provided 
	* @example AddMoney({ GuildID: "881789379553656872", UserID: "753974636508741673", Amt: 1000 })
  * @returns {(string|number)} return NO_MONEY or NOT_ENOUGH_CASH or user's wallet bal
	*/
	async RemoveMoney({ UserID, GuildID, Amt }) {
		// Required Parameters
		if (!UserID) throw new TypeError('A user ID must be specified');
		if (!Amt) throw new TypeError('An amount of money must be specified.');
		if (isNaN(Amt)) throw new TypeError('Amt should be in number');

		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A guild id must be specified.');
			//Find Data In DB
			let UserData = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});
			//If None Is Found
			if (!UserData) {
				return "NO_MONEY";
			}
			if (UserData.wallet < Amt) {
				return 'NOT_ENOUGH_CASH';
			}
			// Update Wallet
			UserData.wallet -= Number(Amt);

			await UserData.save();

			return UserData.wallet;
		} else {
			let UserData = await globalUserData.findOne({
				userID: UserID,
			});
			//If None Is Found
			if (!UserData) {
				return;
			}
			// Update Wallet
			UserData.wallet -= Number(Amt);

			await UserData.save();

			return UserData.wallet;
		}
	}

	/**
	 * @name Deposit
	 * @description Deposit money to an bank. GuildID is not needed for global use.
	 	 * @param {string} GuildID - the guild id 
	 * @param {(string|number)} Amt - the amount to deposit
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * @throws {TypeError} Amt when amoumt is not provided
	 * throws {TypeError} UserID when user id is not provided 
	 * @example Deposit({ GuildID: "881789379553656872", Amt: 10, UserID: "753974636508741673" })
   * @returns {(string|Object)} returns NO_CASH_IN_WALLET or NOT_ENOUGH_CASH or bank and wallet balance
	 */

	async Deposit({ UserID, GuildID, Amt }) {
		if (!UserID) throw new SyntaxError('A user ID must be specified.');
		if (!Amt) throw new SyntaxError('An amount must be specified.');
		if (!this.options?.global) {
			if (!GuildID) throw new SyntaxError('A guild ID must be specified.');
			let Balance = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});

			if (!Balance) {
				Balance = await new guildUserData({
					userID: UserID,
					gid: GuildID
				});
				await Balance.save();
				return 'NO_CASH_IN_WALLET';
			}
			if (Balance.wallet < Amt) {
				return 'NOT_ENOUGH_CASH';
			}
			let amt;
      if (Amt.toLocaleLowerCase() === 'all') {
        amt = Balance.wallet
      } else if (Amt.toLocaleLowerCase() === 'max') {
				amt = Balance.wallet;
			} else {
    if (isNaN(Amt)) throw new TypeError('Amount must be in number')
				amt = Amt;
			}
			Balance.bank += Number(amt);
			Balance.wallet -= Number(amt);

			await Balance.save();

			return { wallet: Balance.wallet, bank: Balance.bank };
		} else {
			let Balance = await globalUserData.findOne({
				userID: UserID,
			});

			if (!Balance) {
				Balance = await new globalUserData({
					userID: UserID,
				});
				await Balance.save();
				return 'NO_CASH_IN_WALLET';
			}
			if (Balance.wallet < Amt) {
				return 'NOT_ENOUGH_CASH';
			}
			let amt;
			if (Amt.toLocaleLowerCase() === 'max') {
				amt = Balance.wallet;
			} else if (Amt.toLocaleLowerCase() === "all") {
        amt = Balance.wallet
      } else {
    if (isNaN(Amt)) throw new TypeError('Amount must be in number')
				amt = Amt;
			}
			Balance.bank += Number(amt);
			Balance.wallet -= Number(amt);

			await Balance.save();

			return { wallet: Balance.wallet, bank: Balance.bank };
		}
	}
	/**
	 * @name Withdraw
	 * @description Withdraw money from a bank. GuildID is not needed for global use.
	 	* @param {string} GuildID - the guild id 
	 * @param {(string|number)} Amt - the amount to withdraw 
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * @throws {TypeError} Amt when amount is not provided 
	 * throws {TypeError} UserID when user id is not provided 
	 * @example Withdraw({ GuildID: "881789379553656872", Amt: 10, UserID: "753974636508741673" })
   * @returns {(string|Object)} return NO_CASH_IN_BANK or NOT_ENOUGH_CASH or bank and wallet balance
	 */
	async Withdraw({ UserID, GuildID, Amt }) {

		if (!UserID) throw new SyntaxError('A member ID must be specified.');
		if (!Amt) throw new SyntaxError('An amount must be specified.');
		if (!this.options?.global) {
			if (!GuildID) throw new SyntaxError('A guild ID must be specified.');
			let Balance = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});

			if (!Balance) {
				Balance = await new guildUserData({
					userID: UserID,
					gid: GuildID
				});
				await Balance.save();
				return 'NO_CASH_IN_BANK';
			}
			if (Balance.bank < Amt) {
				return 'NOT_ENOUGH_CASH';
			}

			let amt;
			if (Amt.toLocaleLowerCase() === 'max') {
				amt = Balance.bank;
			} else if (Amt.toLocaleLowerCase() === 'all') {
        amt = Balance.bank;     
      } else {
    if (isNaN(Amt)) throw new TypeError('Amount must be in number')			
      amt = Amt;
			}
			Balance.bank -= Number(amt);
			Balance.wallet += Number(amt);

			await Balance.save();

			return { wallet: Balance.wallet, bank: Balance.bank };
		} else {
			let Balance = await globalUserData.findOne({
				userID: UserID,
			});

			if (!Balance) {
				Balance = await new globalUserData({
					userID: UserID,
				});
				await Balance.save();
				return 'NO_CASH_IN_BANK';
			}
			if (Balance.bank < Amt) {
				return 'NOT_ENOUGH_CASH';
			}

			let amt;
			if (Amt.toLocaleLowerCase() === 'max') {
				amt = Balance.bank;
			} else if (Amt.toLocaleLowerCase() === 'all') {
        amt = Balance.bank;     
      } else {
    if (isNaN(Amt)) throw new TypeError('Amount must be in number')			
      amt = Amt;
			}
			Balance.bank -= Number(amt);
			Balance.wallet += Number(amt);

			await Balance.save();

			return { wallet: Balance.wallet, bank: Balance.bank };
		}
	}

	/**
	 * @name GetShop
	 * @description Get shop items. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * @example GetShop({ GuildID: "881789379553656872" })
   * @returns {(string|Array)} return NO_ITEM_IN_SHOP or array of objects in shop
	 */
	async GetShop({ GuildID }) {
		// Required Parameters
		if (this.options?.global == true) {
			let Gshop = await globalShop.findOne({
				Id: this.Client.user.id
			});
			if (!Gshop) {
				let Ggshop = new globalShop({
					Id: this.Client.user.id
				});

				await Ggshop.save();
				if (!Ggshop.shopItems) {
					return 'NO_ITEM_IN_SHOP';
				} else {
					return Ggshop.shopItems;
				}
			}
			if (!Gshop.shopItems) {
				return 'NO_ITEM_IN_SHOP';
			} else {
				return Gshop.shopItems;
			}
		} else if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A guild id must be specified.');

			let User = await guildData.findOne({
				gid: GuildID
			});
			if (!User) {
				let AddUser = new guildUserData({
					gid: GuildID
				});

				await AddUser.save();
				if (!AddUser.shopItems) {
					return 'NO_ITEM_IN_SHOP';
				} else {
					return AddUser.shopItems;
				}
			}
			if (!User.shopItems) {
				return 'NO_ITEM_IN_SHOP';
			} else {
				return User.shopItems;
			}
		}
	}

	/**
	 * @name ReassignJob
	 * @description Reassign a job. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
	 * @param {string} Job - the job name
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * @throws {TypeError} Job when job is not provided
	 * throws {TypeError} UserID when user id is not provided  
	 * @example ReassignJob({ GuildID: "881789379553656872", UserID: "753974636508741673", Job: "Doctor" })
   * @returns {(string|Array)} return SUCCESS or array of jobs
	 */
	async ReassignJob({ UserID, GuildID, Job }) {
		if (!UserID) throw new TypeError('A user ID must be specified.');
		if (!Job) throw new TypeError('A job must be specified.');
		if (!this.options?.global) {
			if (!GuildID) throw new SyntaxError('A guild ID must be specified.');
			const user = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});
			if (!user) {
				const newUser = new guildUserData({
					userID: UserID,
					gid: GuildID
				});
				return newUser.save();
			}

			let job = jobs.find(job => job.Name === Job.toLocaleLowerCase());

			let current = user.job;
			if (!current) {
				return 'NOT_WORKING';
			} else if (!job) {
				let Jobss = [];
				jobs.map(x => {
					Jobss.push({
						Name: x.Name,
						Salary: x.Salary
					});
				});
				return Jobss;
			} else if (job.Name) {
				user.job = job.Name;
				user.salary = job.Salary;

				await user.save();

				return 'SUCCESS';
			}
		} else {
			const user = await globalUserData.findOne({
				userID: UserID,
			});
			if (!user) {
				const newUser = new globalUserData({
					userID: UserID,
				});
				return newUser.save();
			}

			let job = jobs.find(job => job.Name === Job.toLocaleLowerCase());

			let current = user.job;
			if (!current) {
				return 'NOT_WORKING';
			} else if (!job) {
				let Jobss = [];
				jobs.map(x => {
					Jobss.push({
						Name: x.Name,
						Salary: x.Salary
					});
				});
				return Jobss;
			} else if (job.Name) {
				user.job = job.Name;
				user.salary = job.Salary;

				await user.save();

				return 'SUCCESS';
			}
		}
	}

	/**
	 * @name RemoveJob
	 * @description Remove a job. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * throws {TypeError} UserID when user id is not provided 
	 * @example RemoveJob({ GuildID: "881789379553656872", UserID: "753974636508741673"})
  * @returns {string} return SUCCESS or NO_JOB
	 */

	async RemoveJob({ GuildID, UserID }) {
		if (!UserID) throw new SyntaxError('A user ID must be specified.');

		if (!this.options?.global) {
			if (!GuildID) throw new SyntaxError('A guild ID must be specified.');
			const user = await guildUserData.findOne({ userID: UserID, gid: GuildID });
			if (!user) {
				const newUser = new guildUserData({ userID: UserID, gid: GuildID });
				return await newUser.save();
			}

			let current = user.job;

			if (!current) {
				return 'NO_JOB';
			} else if (current) {
				user.job = null;
				await user.save();
				return 'SUCCESS';
			}
		} else {
			const user = await globalUserData.findOne({ userID: UserID });
			if (!user) {
				const newUser = new globalUserData({ userID: UserID, gid: GuildID });
				return await newUser.save();
			}

			let current = user?.job;

			if (!current) {
				return 'NO_JOB';
			} else if (current) {
				user.job = null;
				await user.save();
				return 'SUCCESS';
			}
		}
	}

	/**
	 * @name SetJob
	 * @description Set a job. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
	 * @param {string} Job - the job name
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * @throws {TypeError} Job when job is not provided
	 * throws {TypeError} UserID when user id is not provided 
	 * @example SetJob({ GuildID: "881789379553656872", UserID: "753974636508741673", Job: "gamer"})
   * @returns {(string|Array)} return SUCCESS or array of jobs
	 */

	async SetJob({ UserID, GuildID, Job }) {
		if (!UserID) throw new SyntaxError('A user ID must be specified.');
		if (!Job) throw new SyntaxError('An amount must be specified.');
		if (!this.options?.global) {
			if (!GuildID) throw new SyntaxError('A guild ID must be specified.');
			const user = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});
			if (!user) {
				const aa = new guildUserData({
					userID: UserID,
					gid: GuildID
				});
				return aa.save();
			}

			let job = jobs.find(job => job.Name === Job);
			let current = user.job;
			if (current) {
				return 'ALREADY_WORKING';
			} else if (!job) {
				let Jobss = [];
				jobs.map(x => {
					Jobss.push({
						Name: x.Name,
						Salary: x.Salary
					});
				});
				return Jobss;
			} else if (job.Name) {
				user.job = job.Name;
				user.salary = job.Salary;

				await user.save();

				return 'SUCCESS';
			}
		} else {
			const user = await globalUserData.findOne({
				userID: UserID,
			});
			if (!user) {
				const newUser = new globalUserData({
					userID: UserID,
					gid: GuildID
				});
				return newUser.save();
			}

			let job = jobs.find(job => job.Name === Job);
			let current = user.job;
			if (current) {
				return 'ALREADY_WORKING';
			} else if (!job) {
				let Jobss = [];
				jobs.map(x => {
					Jobss.push({
						Name: x.Name,
						Salary: x.Salary
					});
				});
				return Jobss;
			} else if (job.Name) {
				user.job = job.Name;
				user.salary = job.Salary;

				await user.save();

				return 'SUCCESS';
			}
		}
	}

	/**
	 * @name Work
	 * @description Work for an user. GuildID is not needed for global use.
	 * @param {string} GuildID - the guild id 
	 * @param {string} UserID - the user id 
	 * @throws {TypeError} GuildID when guild id is not provided 
	 * throws {TypeError} UserID when user id is not provided 
	 * @example Work({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   * @returns {(string|Array)} return NO_JOB or ALREADY_WORKING with time remaining or array of object 
	 */
	async Work({ UserID, GuildID }) {
		if (!UserID) throw new TypeError('A member ID must be specified');

		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A Item ID must be specified');
			let UserData = await guildUserData.findOne({
				userID: UserID,
				gid: GuildID
			});
			let AMT = UserData.salary;
			
     /** 
       * @constant 
       * @type {number} 
       * @default
      */
			const timeout = 7200000;
			if (!UserData) {
				let AddUser = new guildUserData({
					userID: UserID,
					gid: GuildID,
					wallet: Number(AMT),
					lastUsedWork: Date.now()
				});

				await AddUser.save();
				return AddUser.wallet;
			}

			let work = UserData.lastUsedWork;
			if (!UserData.job) {
				return 'NO_JOB';
			}
			if (work !== null && timeout - (Date.now() - work) > 0) {
				return {
					error: 'ALREADY_WORKED',
					timeout: _msToTime(timeout - (Date.now() - work))
				};
			} else {
				UserData.wallet += Number(AMT);
				UserData.lastUsedWork = Date.now();
				await UserData.save();
				return {
					wallet: UserData.wallet,
					timeout: _msToTime(work),
					job: UserData.job,
					salary: AMT
				};
			}
		} else {
			let UserData = await globalUserData.findOne({
				userID: UserID,
			});
			let AMT = UserData.salary;

     /** 
       * @constant 
       * @type {number} 
       * @default
      */
			const timeout = 7200000;
			if (!UserData) {
				let AddUser = new globalUserData({
					userID: UserID,
					wallet: Number(AMT),
					lastUsedWork: Date.now()
				});

				await AddUser.save();
				return AddUser.wallet;
			}

			let work = UserData.lastUsedWork;
			if (!UserData.job) {
				return 'NO_JOB';
			}
			if (work !== null && timeout - (Date.now() - work) > 0) {
				return {
					error: 'ALREADY_WORKED',
					timeout: _msToTime(timeout - (Date.now() - work))
				};
			} else {
				UserData.wallet += Number(AMT);
				UserData.lastUsedWork = Date.now();
				await UserData.save();
				return {
					wallet: UserData.wallet,
					timeout: _msToTime(work),
					job: UserData.job,
					salary: AMT
				};
			}
		}
	}
}

function _msToTime(duration) {
	const ms = Math.floor((duration % 1000) / 100),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
		days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 30);

	const day = days < 10 ? '0' + days : days;
	const hour = hours < 10 ? '0' + hours : hours;
	const minute = minutes < 10 ? '0' + minutes : minutes;
	const second = seconds < 10 ? '0' + seconds : seconds;

	return (
		day + ' Days : ' + hour + ' Hrs : ' + minute + ' Min : ' + second + ' Sec.'
	);
}

const _checkItem = (item, testableItemIdOrName) => {
	return item.Name == testableItemIdOrName || item.id == testableItemIdOrName;
};

module.exports = SimplyEco;
