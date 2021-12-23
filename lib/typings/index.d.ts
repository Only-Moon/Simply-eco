import { Client } from "discord.js";

declare module "simply-eco" {

    export type wallet = number | null;
    export type bankWallet = number | null;
    export type weeklyAmt = string | 10000;
    export type job = { Job: string };

    export type Item = { Name: string, Price: string, Sell: string, id: 0 | number };
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

    export class eco {
        constructor(client: Client, dbUrl: string, options?: optionsInterface);
        public SetWeekly(options: { GuildID?: boolean, Amt: number }): Promise<guildData | globalData>;
        public SetDaily(options: { GuildID?: boolean, Amt: number }): Promise<guildData | globalData>;
        public Transfer(options: { GuildID?: string, User1ID: string, User2ID: string, Amt: number }): Promise<{ USER1: Profile, USER2: Profile } | Profile | 'NOT_ENOUGH_CASH'>;
        public RemoveItem(options: { GuildID?: string, Item: string | number }): Promise<guildData | globalData | 'NO_ITEMS'>;
        public AddItem(options: {GuildID?: string, ItemName: string, Price: number, SellPrice: number }): Promise<guildData | globalData>;
        public BuyItem(options: {GuildID?: string, Item: string | number, UserID: string }): Promise<false | 'ITEM_NOT_FOUND' | 'NOT_ENOUGH_CASH' | 'ALREADY_PURCHASED' | Item>;
        public SellItem(options: {GuildID?: string, Item: string | number, UserID: string }): Promise<false | 'TRY_AGAIN' | 'NO_ITEM_IN_INVENTORY' | 'NOT_PURCHASED' | Item>;
        public Daily(options: {GuildID?: string, UserID: string }): Promise<wallet | { error: 'ALREADY_USED', timeOut: string }>;
        public Weekly(options: {GuildID?: string, UserID: string }): Promise<wallet | { error: 'ALREADY_USED', timeOut: string }>;
        public GetInv(options: {GuildID?: string, UserID: string }): Promise<Item[] | []>;
        public GetUser(options: {GuildID?: string, UserID: string }): Promise<User>;
        public GetBal(options: {GuildID?: string, UserID: string }): Promise<wallet>
        public GetBankBal(options: {GuildID?: string, UserID: string }): Promise<bankWallet>;
        public AddMoney(options: {GuildID?: string, Amt: number, UserID: string }): Promise<wallet>;
        public RemoveMoney(options: {GuildID?: string, Amt: number, UserID: string }): Promise<wallet>;
        public GetRich(options: { GuildID: string }): Promise<"NO_RICH_PEOPLE" | User[]>;
        public GetProfile(options: {GuildID?: string, UserID: string}): Promise<Profile[]>;
        public Deposit(options: {UserID: string, GuildID?: string, Amt: number | "max"}): Promise<'CASH_IN_WALLET' | 'NO_CASH_IN_WALLET' | { wallet: wallet, Bank: bankWallet }>;
        public Withdraw(options: {UserID: string, GuildID?: string, Amt: number | "max"}): Promise<'CASH_IN_BANK' | { wallet: wallet, Bank: bankWallet }>;
        public GetShop(options: { GuildID?: string}): Promise<Item[] | []>;
        public GetItem(options: {GuildID?: string, Item: string | number }): Promise<Item | null>
        public ReassignJob(options: { GuildID?: string, Job: string, userId: string}): Promise<'NOT_WORKING' | 'SUCCESS' | job[]>;
        public RemoveJob(options: { GuildID?: string,  userId: string}): Promise<User | "SUCCESS">;
        public SetJob(options: { GuildID?: string,  userId: string, Job: string}): Promise<'ALREADY_WORKING' | 'SUCCESS' | job[]>;
        public Work(options: { GuildID?: string,  UserID: string}): Promise<wallet | { wallet: wallet, timeout: string, job: string, money: number }>;
        private msToTime(duration: number): string;
    }
}