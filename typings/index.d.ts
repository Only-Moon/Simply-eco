import { Client } from "discord.js";
import mongoose from "mongoose";
export interface optionsInterface {
    notify?: boolean;
    global?: boolean;
}
declare module "simply-eco" {
    
    export type wallet = number | null;
    export type bankWallet = number | null;
    export type weeklyAmt = string | 10000;
    export type job = { Job: string };
    export type Item = { Name: string, Price: number, Sell: number, id: 0 | number };
    export interface GlobalShopData {
        Id: string | null;
        shopItems: Array<Item>;
        weeklyAmt: number | 10000;
        dailyAmt: number | 2000;
    }
    export interface GlobalMemberDataInterface {
        userID: string | null;
        wallet: number | null
        bank: number | null
        lastUsedDaily: Date;
        lastUsedWeekly: Date;
        inventory: Array<Item>;
        Job: string | null;
        salary: number | null;
        lastUsedWork: Date;
    }
    export interface GuildDataInterface {
        gid: string | null
        shopItems: Array<Item>;
        weeklyAmt: number | 10000
        dailyAmt: number | 2000
    }
    export interface MemberDataInterface {
        userID: string | null;
        gid: string | null;
        wallet: number | null;
        bank: number | null;
        lastUsedDaily: Date;
        lastUsedWeekly: Date;
        Job: string | null;
        inventory: Array<{ Name: string, Price: number, Sell: number, id: 0 | number }>;
        salary: number | null;
        lastUsedWork: Date;
    }
    export interface Options {
        GuildID?: string;
    }
    export interface Profile {
        user: string,
        wallet: wallet,
        job: string | null,
        bank: bankWallet,
        inventory: Item[] | [];
    }
    export interface guildData {
        gid: string | null;
        shopItems: Item[] | [];
        weeklyAmt: string | 10000;
        dailyAmt: string | 2000;
    }
    export interface globalData {
        Id: string | null;
        shopItems: Item[] | [];
        weeklyAmt: string | 10000;
        dailyAmt: string | 2000;
    }
    export interface User {
        userID: string | null;
        gid: string | null;
        wallet: number | null;
        bank: number | null;
        lastUsedDaily: Date
        lastUsedWeekly: Date
        inventory: Item[] | [];
        job: string | null;
        lastUsedWork: Date;
    }
    export interface optionsInterface {
        notify?: boolean;
        global?: boolean;
    }
    declare class SimplyEco {
        /**
         * Connecting To The Database
         *@param {string} dbUrl
         *@param {{ global?: boolean, notify?: boolean }} options
         *@param {Client} client
         */
        options: optionsInterface;
        Client: Client;
        connected: boolean;
        version: number;
        mongoClient: typeof mongoose;
        constructor(client: Client, dbUrl: string, options?: optionsInterface);
        /**
         * SetWeekly
         * @description Set a weekly amount for a guild or global.
         * @param {{ GuildID?: string, Amt: number }}
         * @example SetWeekly({ GuildID: "881789379553656872", Amt: 10000 })
         */
        SetWeekly({ GuildID, Amt }?: {
            GuildID?: string;
            Amt: number;
        }): Promise<(GuildDataInterface & mongoose.Document<any, any, GuildDataInterface>) | (GlobalShopData & mongoose.Document<any, any, GlobalShopData>)>;
        /**
         * SetDaily
         * @description Set a daily amount for a guild or global.
         * @param {{ GuildID?: string, Amt: number }}
         * @example SetDaily({ GuildID: "881789379553656872", Amt: 10000 })
         */
        SetDaily({ GuildID, Amt }?: {
            GuildID?: string;
            Amt: number;
        }): Promise<(GuildDataInterface & mongoose.Document<any, any, GuildDataInterface>) | (GlobalShopData & mongoose.Document<any, any, GlobalShopData>)>;
        /**
         * Transfer
         * @description Transfer money over 2 people. GuildID property is not needed for global use.
         * @param {{ GuildID?: string, User1ID: string, User2ID: string, Amt: number }}
         * @example Transfer({ GuildID: "881789379553656872", Amt: 10000, User1ID: "777474453114191882", User2ID: "753974636508741673" })
         */
        Transfer({ GuildID, User1ID, User2ID, Amt }?: {
            GuildID?: string;
            User1ID: string;
            User2ID: string;
            Amt: number;
        }): Promise<"NOT_ENOUGH_CASH" | (GlobalMemberDataInterface & mongoose.Document<any, any, GlobalMemberDataInterface>) | {
            USER1: GlobalMemberDataInterface & mongoose.Document<any, any, GlobalMemberDataInterface>;
            USER2: GlobalMemberDataInterface & mongoose.Document<any, any, GlobalMemberDataInterface>;
        }>;
        /**
         * RemoveItem
         * @description Remove an item from the shop.
         * @param {{ GuildID?: string, Item: string | number }}
         * @example RemoveItem({ GuildID: "881789379553656872", Item: "car" })
         */
        RemoveItem({ GuildID, Item }?: {
            GuildID?: string;
            Item: string | number;
        }): Promise<(GlobalShopData & mongoose.Document<any, any, GlobalShopData>) | (GuildDataInterface & mongoose.Document<any, any, GuildDataInterface>) | "NO_ITEMS">;
        /**
         * AddItem
         * @param {{GuildID?: string, ItemName: string, Price: number, SellPrice: number }}
         * @description Add an item to a user. GuildID is not needed for global use.
         * @example AddItem({ GuildID: "881789379553656872", ItemName: "very expensive pancakes", Price: 10000, SellPrice: 1000 })
         */
        AddItem({ GuildID, ItemName, Price, SellPrice }?: {
            GuildID?: string;
            ItemName: string;
            Price: number;
            SellPrice: number;
        }): Promise<(GuildDataInterface & mongoose.Document<any, any, GuildDataInterface>) | (GlobalShopData & mongoose.Document<any, any, GlobalShopData>)>;
        /**
         * BuyItem
         * @param {{GuildID?: string, Item: string | number, UserID: string }}
         * @description Buy an item to a user. GuildID is not needed for global use.
         * @example BuyItem({ GuildID: "881789379553656872", ItemName: "very expensive pancakes", UserID: "753974636508741673" })
         */
        BuyItem({ UserID, GuildID, Item }?: {
            GuildID?: string;
            Item: string | number;
            UserID: string;
        }): Promise<false | {
            Name: string;
            Price: number;
            Sell: number;
            id: number;
        } | "NOT_ENOUGH_CASH" | "ITEM_NOT_FOUND" | "ALREADY_PURCHASED">;
        /**
         * SellItem
         * @param {{GuildID?: string, Item: string | number, UserID: string }}
         * @description Sell an item. GuildID is not needed for global use.
         * @example SellItem({ GuildID: "881789379553656872", ItemName: "very expensive pancakes", user: "753974636508741673" })
         */
        SellItem({ UserID, GuildID, Item }?: {
            GuildID?: string;
            Item: string | number;
            UserID: string;
        }): Promise<false | {
            Name: string;
            Price: number;
            Sell: number;
            id: number;
        } | "TRY_AGAIN" | "NO_ITEM_IN_INVENTORY" | "NOT_PURCHASED" | "NOT_AVAILABLE_IN_SHOP">;
        /**
         * Daily
         * @param {{GuildID?: string, UserID: string }}
         * @description Collect the daily amount for an user. GuildID is not needed for global use.
         * @example Daily({ GuildID: "881789379553656872", UserID: "753974636508741673" })
         */
        Daily({ UserID, GuildID }?: {
            GuildID?: string;
            UserID: string;
        }): Promise<number | {
            error: string;
            timeout: string;
        }>;
        /**
         * Weekly
         * @param {{GuildID?: string, UserID: string }}
         * @description Collect the weekly amount for an user. GuildID is not needed for global use.
         * @example Daily({ GuildID: "881789379553656872", UserID: "753974636508741673" })
         */
        Weekly({ UserID, GuildID }?: {
            GuildID?: string;
            UserID: string;
        }): Promise<number | {
            error: string;
            timeout: string;
        }>;
        /**
        * GetInv
        * @param {{GuildID?: string, UserID: string }}
        * @description Get an inventory of an user. GuildID is not needed for global use.
        * @example GetInv({ GuildID: "881789379553656872", UserID: "753974636508741673" })
        */
        GetInv({ UserID, GuildID }?: {
            GuildID?: string;
            UserID: string;
        }): Promise<{
            Name: string;
            Price: number;
            Sell: number;
            id: number;
        }[] | "NO_ITEM">;
        /**
        * GetInv
        * @param {{GuildID?: string, UserID: string }}
        * @description Get an user data of an user. GuildID is not needed for global use.
        * @example GetInv({ GuildID: "881789379553656872", UserID: "753974636508741673" })
        */
        GetUser({ UserID, GuildID }?: {
            GuildID?: string;
            UserID: string;
        }): Promise<GlobalMemberDataInterface & mongoose.Document<any, any, GlobalMemberDataInterface>>;
        /**
       * GetBal
       * @param {{GuildID?: string, UserID: string }}
       * @description Get an balance of an user. GuildID is not needed for global use.
       * @example GetBal({ GuildID: "881789379553656872", UserID: "753974636508741673" })
       */
        GetBal({ UserID, GuildID }?: {
            GuildID?: string;
            UserID: string;
        }): Promise<number>;
        /**
        * GetItem
        * @param {{GuildID?: string, Item: string }}
        * @description Get an item data. GuildID is not needed for global use.
        * @example GetItem({ GuildID: "881789379553656872", Item: "pancakes" })
        */
        GetItem({ GuildID, Item }?: {
            GuildID?: string;
            Item: string;
        }): Promise<{
            Name: string;
            Price: number;
            Sell: number;
            id: number;
        }>;
        /**
        * GetBankBal
        * @param {{GuildID?: string, UserID: string }}
        * @description Get bank balance of an user. GuildID is not needed for global use.
        * @example GetBankBal({ GuildID: "881789379553656872", UserID: "753974636508741673" })
        */
        GetBankBal({ UserID, GuildID }?: {
            GuildID?: string;
            UserID: string;
        }): Promise<number>;
        /**
        * AddMoney
        * @param {{GuildID?: string, Amt: number, UserID: string }}
        * @description Add money to an user. GuildID is not needed for global use.
        * @example AddMoney({ GuildID: "881789379553656872", UserID: "753974636508741673" })
        */
        AddMoney({ UserID, GuildID, Amt }?: {
            GuildID?: string;
            Amt: number;
            UserID: string;
        }): Promise<number>;
        /**
        * RemoveMoney
        * @param {{GuildID?: string, UserID: string, Amt: number }}
        * @description Remove money to an user. GuildID is not needed for global use.
        * @example AddMoney({ GuildID: "881789379553656872", UserID: "753974636508741673", Amt: 1000 })
        */
        RemoveMoney({ UserID, GuildID, Amt }?: {
            GuildID?: string;
            UserID: string;
            Amt: number;
        }): Promise<number>;
        /**
        * RemoveMoney
        * @param {{GuildID?: string }}
        * @description Get the richest people. GuildID is not needed for global use.
        * @example GetRich({ GuildID: "881789379553656872" })
        */
        GetRich({ GuildID }: {
            GuildID?: string;
        }): Promise<"NO_RICH_PEOPLE" | (GlobalMemberDataInterface & mongoose.Document<any, any, GlobalMemberDataInterface>)[]>;
        /**
        * GetProfile
        * @param {{GuildID?: string, UserID: string }}
        * @description Get a profile data of an user. GuildID is not needed for global use.
        * @example GetProfile({ GuildID: "881789379553656872", UserID: "753974636508741673" })
        */
        GetProfile({ GuildID, UserID }: {
            GuildID?: string;
            UserID: string;
        }): Promise<any[]>;
        /**
         * Deposit
         * @param {{UserID: string, GuildID?: string, Amt: number | "max"}}
         * @description Deposit money to an bank. GuildID is not needed for global use.
         * @example Deposit({ GuildID: "881789379553656872", Amt: 10, UserID: "753974636508741673" })
         */
        Deposit({ UserID, GuildID, Amt }?: {
            UserID: string;
            GuildID?: string;
            Amt: number | "max";
        }): Promise<"NOT_ENOUGH_CASH" | "NO_CASH_IN_WALLET" | {
            wallet: number;
            Bank: number;
        }>;
        /**
         * Withdraw
         * @param {{UserID: string, GuildID?: string, Amt: number | "max"}}
         * @description Withdraw money from a bank. GuildID is not needed for global use.
         * @example Withdraw({ GuildID: "881789379553656872", Amt: 10, UserID: "753974636508741673" })
         */
        Withdraw({ UserID, GuildID, Amt }?: {
            UserID: string;
            GuildID?: string;
            Amt: number | "max";
        }): Promise<"NOT_ENOUGH_CASH" | "NO_CASH_IN_BANK" | {
            wallet: number;
            Bank: number;
        }>;
        /**
         * GetShop
         * @param {{ GuildID?: string}}
         * @description Get shop items. GuildID is not needed for global use.
         * @example GetShop({ GuildID: "881789379553656872" })
         */
        GetShop({ GuildID }?: {
            GuildID?: string;
        }): Promise<{
            Name: string;
            Price: number;
            Sell: number;
            id: number;
        }[] | "NO_ITEM_IN_SHOP">;
        /**
         * ReassignJob
         * @param {{ GuildID?: string, Job: string, UserID: string}}
         * @description Reassign a job. GuildID is not needed for global use.
         * @example GetShop({ GuildID: "881789379553656872", UserID: "753974636508741673", Job: "Doctor" })
         */
        ReassignJob({ UserID, GuildID, Job }?: {
            GuildID?: string;
            Job: string;
            UserID: string;
        }): Promise<any[] | (GlobalMemberDataInterface & mongoose.Document<any, any, GlobalMemberDataInterface>) | "NOT_WORKING" | "SUCCESS">;
        /**
         * RemoveJob
         * @param {{ GuildID?: string,  UserID: string}}
         * @description Remove a job. GuildID is not needed for global use.
         * @example RemoveJob({ GuildID: "881789379553656872", userId: "753974636508741673"})
         */
        RemoveJob({ GuildID, UserID }?: {
            GuildID?: string;
            UserID: string;
        }): Promise<(GlobalMemberDataInterface & mongoose.Document<any, any, GlobalMemberDataInterface>) | "SUCCESS" | "NO_JOB">;
        /**
         * SetJob
         * @param {{ GuildID?: string,  UserID: string, Job: string}}
         * @description Set a job. GuildID is not needed for global use.
         * @example SetJob({ GuildID: "881789379553656872", UserID: "753974636508741673", Job: "gamer"})
         */
        SetJob({ UserID, GuildID, Job }?: {
            GuildID?: string;
            UserID: string;
            Job: string;
        }): Promise<any[] | (GlobalMemberDataInterface & mongoose.Document<any, any, GlobalMemberDataInterface>) | "SUCCESS" | "ALREADY_WORKING">;
        /**
         * Work
         * @param {{ GuildID?: string,  UserID: string}}
         * @description Work for an user. GuildID is not needed for global use.
         * @example Work({ GuildID: "881789379553656872", UserID: "753974636508741673" })
         */
        Work({ UserID, GuildID }?: {
            GuildID?: string;
            UserID: string;
        }): Promise<number | "NO_JOB" | {
            error: string;
            timeout: string;
            wallet?: undefined;
            job?: undefined;
            salary?: undefined;
        } | {
            wallet: number;
            timeout: string;
            job: string;
            salary: number;
            error?: undefined;
        }>;
    }

}