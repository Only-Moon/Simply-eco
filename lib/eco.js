const mongoose = require('mongoose');
const guildUserData = require('../models/nonGlobal/users');
const guildData = require('../models/nonGlobal/guild');
const globalShop = require('../models/global/global-shop');
const globalUserData = require('../models/global/global-users');

const jobs = require('./data/jobs.js');
const { Client } = require('discord.js');
class SimplyEco {
	/**
	 * Connecting To The Database
	 *@param dbUrl
	 *@param {{ global?: boolean, notify?: boolean }} options
	 *@param {Client} client
	 */
	constructor(client, dbUrl, options = {}) {
		if (!client) throw new TypeError("No client provided.")
		if (!(client instanceof Client)) throw new TypeError("No right discord.js client provided")
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
				throw new Error(`An Error Just Occurred. ${e}`);
			});
	}
	/**
	 * SetWeekly
	 * @description Set a weekly amount for a guild or global.
	 * @param {{ GuildID?: boolean, Amt: number }}
	 * @example SetWeekly({ GuildID: "881789379553656872", Amt: 10000 })
	 */

	async SetWeekly({ GuildID, Amt }) {
		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A GuildID must be specified');
			if (!Amt) throw new TypeError('A Amount to exchange must be specified.');
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
			return GuildData;
		} else {
			if (!Amt) throw new TypeError('A Amount to exchange must be specified.');
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
			return globalData;
		}
	}

	/**
	 * SetDaily
	 * @description Set a daily amount for a guild or global.
	 * @param {{ GuildID?: boolean, Amt: number }}
	 * @example SetDaily({ GuildID: "881789379553656872", Amt: 10000 })
	 */
	async SetDaily({ GuildID, Amt }) {
		if (this.options?.global) {
			if (!GuildID) throw new TypeError('A GuildID must be specified');
			if (!Amt) throw new TypeError('A Amount to exchange must be specified.');
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
			return GuildData;
		} else {
			if (!Amt) throw new TypeError('A Amount to exchange must be specified.');
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
			return globalData;
		}
	}

	/**
	 * Transfer
	 * @description Transfer money over 2 people. GuildID property is not needed for global use.
	 * @param {{ GuildID?: string, User1ID: string, User2ID: string, Amt: number }}
	 * @example Transfer({ GuildID: "881789379553656872", Amt: 10000, User1ID: "777474453114191882", User2ID: "753974636508741673" })
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
				return { USER1: User1Data, USER2: User2Data };
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
				return { USER1: User1Data, USER2: User2Data };
			}
		}

	}

	/**
	 * RemoveItem
	 * @description Remove an item from the shop. 
	 * @param {{ GuildID?: string, Item: string | number }}
	 * @example Transfer({ GuildID: "881789379553656872", Amt: 10000, User1ID: "777474453114191882", User2ID: "753974636508741673" })
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

			Global.shopItems = Global.shopItems.filter(
				item => item.id !== Item || item.Name !== Item
			);

			await Global.save();
			return Global;
		} else if (!this.options?.global || this.options?.global === false) {
			if (!GuildID) throw new TypeError('A GuildID must be specified');
			let GuildData = await guildData.findOne({
				gid: GuildID
			});
			if (!GuildData) {
				return 'NO_ITEMS';
			}

			GuildData.shopItems = GuildData.shopItems.filter(
				item => item.id !== Item || item.Name !== Item
			);

			await GuildData.save();
			return GuildData;
		}
	}

	/**
	 * AddItem
	 * @param {{GuildID?: string, ItemName: string, Price: number, SellPrice: number }} 
	 * @description Add an item to a user. GuildID is not needed for global use. 
	 * @example AddItem({ GuildID: "881789379553656872", ItemName: "very expensive pancakes", Price: 10000, SellPrice: 1000 })
	 */
	async AddItem({ GuildID, ItemName, Price, SellPrice }) {
		if (!ItemName) throw new TypeError('A Item Name must be specified.');
		if (!Price) throw new TypeError('A Price must be specified');
		if (!SellPrice) throw new TypeError('A SellPrice  must be specified.');
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
			return Global;
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
			return GuildData;
		}
	}

	/**
	 * BuyItem
	 * @param {{GuildID?: string, Item: string | number, UserID: string }} 
	 * @description Buy an item to a user. GuildID is not needed for global use.
	 * @example BuyItem({ GuildID: "881789379553656872", ItemName: "very expensive pancakes", user: "753974636508741673" })
	 */
	async BuyItem({ UserID, GuildID, Item }) {
		if (!UserID) throw new TypeError('A user ID must be specified');


		if (this.options?.global === true) {
			let Global = await globalShop.findOne({
				Id: this.Client.user.id
			});
			if (!Global) {
				return false;
			}
			let item = await Global.shopItems.filter(item => _checkItem(item, Item));

			let UserData = await guildUserData.findOne({
				gid: GuildID,
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
	 * SellItem
	 * @param {{GuildID?: string, Item: string | number, UserID: string }} 
	 * @description Sell an item. GuildID is not needed for global use.
	 * @example SellItem({ GuildID: "881789379553656872", ItemName: "very expensive pancakes", user: "753974636508741673" })
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
			} else if (itemName == "[]") {
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
			//console.log(item2.Name)

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
	 * Daily
	 * @param {{GuildID?: string, UserID: string }} 
	 * @description Collect the daily amount for an user. GuildID is not needed for global use.
	 * @example Daily({ GuildID: "881789379553656872", UserID: "753974636508741673" })
	 */
	async Daily({ UserID, GuildID }) {
		if (!this.options?.global) {
			if (!UserID) throw new TypeError('A member ID must be specified');
			if (!GuildID) throw new TypeError('A Item ID must be specified');

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
			}
			if (GuildData) {
				AMT = GuildData.dailyAmt;
			}
			let timeout = 86400000;
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
			if (!GuildID) throw new TypeError('A Item ID must be specified');

			let UserData = await globalUserData.findOne({
				userID: UserID,
			});
			let globalData = await globalShop.findOne({
				Id: this.Client.user.id
			});
			let AMT;
			if (!globalData) {
				AMT = 2000;
			}
			if (globalData) {
				AMT = globalData.dailyAmt;
			}
			let timeout = 86400000;
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
	 * Weekly
	 * @param {{GuildID?: string, UserID: string }} 
	 * @description Collect the weekly amount for an user. GuildID is not needed for global use.
	 * @example Daily({ GuildID: "881789379553656872", UserID: "753974636508741673" })
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
			let timeout = 604800000;
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
			let timeout = 604800000;
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
	* GetInv
	* @param {{GuildID?: string, UserID: string }} 
	* @description Get an inventory of an user. GuildID is not needed for global use.
	* @example GetInv({ GuildID: "881789379553656872", UserID: "753974636508741673" })
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
	* GetInv
	* @param {{GuildID?: string, UserID: string }} 
	* @description Get an user data of an user. GuildID is not needed for global use.
	* @example GetInv({ GuildID: "881789379553656872", UserID: "753974636508741673" })
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
	* GetBal
	* @param {{GuildID?: string, UserID: string }} 
	* @description Get an balance of an user. GuildID is not needed for global use.
	* @example GetBal({ GuildID: "881789379553656872", UserID: "753974636508741673" })
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
	* GetItem
	* @param {{GuildID?: string, Item: string }} 
	* @description Get an item data. GuildID is not needed for global use.
	* @example GetItem({ GuildID: "881789379553656872", Item: "pancakes" })
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
	* GetBankBal
	* @param {{GuildID?: string, UserID: string }} 
	* @description Get bank balance of an user. GuildID is not needed for global use.
	* @example GetBankBal({ GuildID: "881789379553656872", UserID: "753974636508741673" })
	*/
	async GetBankBal({ UserID, GuildID }) {
		// Required Parameters
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
	* AddMoney
	* @param {{GuildID?: string, Amt: number, UserID: string }} 
	* @description Add money to an user. GuildID is not needed for global use.
	* @example AddMoney({ GuildID: "881789379553656872", UserID: "753974636508741673" })
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
	* RemoveMoney
	* @param {{GuildID?: string, UserID: string, Amt: number }} 
	* @description Remove money to an user. GuildID is not needed for global use.
	* @example AddMoney({ GuildID: "881789379553656872", UserID: "753974636508741673", Amt: 1000 })
	*/
	async RemoveMoney({ UserID, GuildID, Amt }) {
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
			//If None Is Found
			if (!UserData) {
				return;
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
	* RemoveMoney
	* @param {{GuildID?: string }} 
	* @description Get the richest people. GuildID is not needed for global use.
	* @example GetRich({ GuildID: "881789379553656872" })
	*/
	async GetRich({ GuildID }) {
		if (!this.options?.global) {
			if (!GuildID) throw new TypeError('A guild id must be specified.');

			let lb = await guildUserData
				.find({
					gid: GuildID
				})
				.sort([['wallet' + 'bank', 'descending']])
				.exec()
				.catch(e => {
					throw new TypeError(`An Error Just Occurred. ${e}`);
				});
			if (lb.length == 0) {
				return 'NO_RICH_PEOPLE';
			}
			return lb;
		}
	}

	/**
	* GetProfile
	* @param {{GuildID?: string, UserID: string }} 
	* @description Get a profile data of an user. GuildID is not needed for global use.
	* @example GetProfile({ GuildID: "881789379553656872", UserID: "753974636508741673" })
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
	 * Deposit
	 * @param {{UserID: string, GuildID?: string, Amt: number | "max"}}
	 * @description Deposit money to an bank. GuildID is not needed for global use.
	 * @example Deposit({ GuildID: "881789379553656872", Amt: 10, UserID: "753974636508741673" })
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
			if (Amt === 'max') {
				amt = Balance.wallet;
			} else {
				amt = Amt;
			}
			Balance.bank += Number(amt);
			Balance.wallet -= Number(amt);

			await Balance.save();

			return { wallet: Balance.wallet, Bank: Balance.bank };
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
			if (Amt === 'max') {
				amt = Balance.wallet;
			} else {
				amt = Amt;
			}
			Balance.bank += Number(amt);
			Balance.wallet -= Number(amt);

			await Balance.save();

			return { wallet: Balance.wallet, Bank: Balance.bank };
		}
	}
	/**
	 * Withdraw
	 * @param {{UserID: string, GuildID?: string, Amt: number | "max"}}
	 * @description Withdraw money from a bank. GuildID is not needed for global use.
	 * @example Withdraw({ GuildID: "881789379553656872", Amt: 10, UserID: "753974636508741673" })
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
			if (Amt == 'max') {
				amt = Balance.bank;
			} else {
				amt = Amt;
			}
			Balance.bank -= Number(amt);
			Balance.wallet += Number(amt);

			await Balance.save();

			return { wallet: Balance.wallet, Bank: Balance.bank };
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
			if (Amt == 'max') {
				amt = Balance.bank;
			} else {
				amt = Amt;
			}
			Balance.bank -= Number(amt);
			Balance.wallet += Number(amt);

			await Balance.save();

			return { wallet: Balance.wallet, Bank: Balance.bank };
		}
	}

	/**
	 * GetShop
	 * @param {{ GuildID?: string}}
	 * @description Get shop items. GuildID is not needed for global use.
	 * @example GetShop({ GuildID: "881789379553656872" })
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
	 * ReassignJob
	 * @param {{ GuildID?: string, Job: string, userId: string}}
	 * @description Reassign a job. GuildID is not needed for global use.
	 * @example GetShop({ GuildID: "881789379553656872", userId: "753974636508741673", Job: "Doctor" })
	 */
	async ReassignJob({ userId, GuildID, Job }) {
		if (!userId) throw new TypeError('A user ID must be specified.');
		if (!Job) throw new TypeError('A job must be specified.');
		if (!this.options?.global) {
			if (!GuildID) throw new SyntaxError('A guild ID must be specified.');
			const user = await guildUserData.findOne({
				userID: userId,
				gid: GuildID
			});
			if (!user) {
				const newUser = new guildUserData({
					userID: userId,
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
				userID: userId,
			});
			if (!user) {
				const newUser = new globalUserData({
					userID: userId,
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
	 * RemoveJob
	 * @param {{ GuildID?: string,  userId: string}}
	 * @description Remove a job. GuildID is not needed for global use.
	 * @example RemoveJob({ GuildID: "881789379553656872", userId: "753974636508741673"})
	 */

	async RemoveJob({ GuildID, userId }) {
		if (!userId) throw new SyntaxError('A user ID must be specified.');

		if (!this.options?.global) {
			if (!GuildID) throw new SyntaxError('A guild ID must be specified.');
			const user = await guildUserData.findOne({ userID: userId, gid: GuildID });
			if (!user) {
				const newUser = new guildUserData({ userID: userId, gid: GuildID });
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
			const user = await globalUserData.findOne({ userID: userId });
			if (!user) {
				const newUser = new globalUserData({ userID: userId, gid: GuildID });
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
	 * SetJob
	 * @param {{ GuildID?: string,  userId: string, Job: string}}
	 * @description Set a job. GuildID is not needed for global use.
	 * @example SetJob({ GuildID: "881789379553656872", userId: "753974636508741673", Job: "gamer"})
	 */

	async SetJob({ userId, GuildID, Job }) {
		if (!userId) throw new SyntaxError('A user ID must be specified.');
		if (!Job) throw new SyntaxError('An amount must be specified.');
		if (!this.options?.global) {
			if (!GuildID) throw new SyntaxError('A guild ID must be specified.');
			const user = await guildUserData.findOne({
				userID: userId,
				gid: GuildID
			});
			if (!user) {
				const aa = new guildUserData({
					userID: userId,
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
				userID: userId,
			});
			if (!user) {
				const newUser = new globalUserData({
					userID: userId,
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
	 * Work
	 * @param {{ GuildID?: string,  UserID: string}}
	 * @description Work for an user. GuildID is not needed for global use.
	 * @example Work({ GuildID: "881789379553656872", UserID: "753974636508741673" })
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

			let timeout = 7200000;
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

			let timeout = 7200000;
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
