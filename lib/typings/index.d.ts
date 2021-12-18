declare module "simply-eco" {

    export type wallet = number | null;
    export type bankWallet = number | null;
    export type weeklyAmt = string | 10000;
    export type job = { Job: string };

    export type Item = { Name: string, Price: string, Sell: string, id: 0 | number };

    export interface Profile {
        user: string,
        wallet: wallet,
        job: string | null,
        bank: bankWallet,
        inventory: Item[] | [];
    }
    export interface GuildData {
        gid: string | null;
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
        notify: boolean;
        global: boolean;
    }

    export class eco {
        constructor(dbUrl: string, options?: optionsInterface);
        public SetWeekly(GuildID: string, Amt: number): Promise<GuildData>;
        public SetDaily(GuildID: string, Amt: number): Promise<GuildData>;
        public Transfer(GuildID: string, User1ID: string, User2ID: string, Amt: number): Promise<{ USER1: Profile, USER2: Profile } | Profile | 'NOT_ENOUGH_CASH'>;
        public RemoveItem(GuildID: string, ItemID: string): Promise<GuildData | 'NO_ITEMS'>;
        public AddItem(GuildID: string, ItemName: string, Price: number, SellPrice: number): Promise<GuildData>;
        public BuyItem(UserID: string, GuildID: string, ItemN: string): Promise<false | 'ITEM_NOT_FOUND' | 'NOT_ENOUGH_CASH' | 'ALREADY_PURCHASED' | Item>;
        public SellItem(UserID: string, GuildID: string, ItemN: string): Promise<false | 'TRY_AGAIN' | 'NO_ITEM_IN_INVENTORY' | 'NOT_PURCHASED' | Item>;
        public Daily(UserID: string, GuildID: string): Promise<wallet | { error: 'ALREADY_USED', timeOut: string }>;
        public Weekly(UserID: string, GuildID: string): Promise<wallet | { error: 'ALREADY_USED', timeOut: string }>;
        public GetInv(UserID: string, GuildID: string): Promise<Item[] | []>;
        public GetUser(UserID: string, GuildID: string): Promise<User>;
        public GetBal(UserID: string, GuildID: string): Promise<wallet>
        public GetBankBal(UserID: string, GuildID: string): Promise<bankWallet>;
        public AddMoney(UserID: string, GuildID: string, Amt: number): Promise<wallet>;
        public RemoveMoney(UserID: string, GuildID: string, Amt: number): Promise<wallet>;
        public GetRich(GuildID: string): Promise<"NO_RICH_PEOPLE" | User[]>;
        public GetProfile(GuildID: string, UserID: string): Promise<Profile[]>;
        public Deposit(UserID: string, GuildID: string, Amt: number | "max"): Promise<'CASH_IN_WALLET' | 'NO_CASH_IN_WALLET' | { wallet: wallet, Bank: bankWallet }>;
        public Withdraw(UserID: string, GuildID: string, Amt: number | "max"): Promise<'CASH_IN_BANK' | { wallet: wallet, Bank: bankWallet }>;
        public GetShop(GuildID: string): Promise<Item[] | []>;
        public GetItem(guildId: string, itemName: string | number): Promise<Item | null>
        public ReassignJob(userId: string, guildId: string, Job: string): Promise<'NOT_WORKING' | 'SUCCESS' | job[]>;
        public RemoveJob(guildId: string, userId: string): Promise<User | "SUCCESS">;
        public SetJob(userId: string, guildId: string, Job: string): Promise<'ALREADY_WORKING' | 'SUCCESS' | job[]>;
        public Work(UserID: string, GuildID: string): Promise<wallet | { wallet: wallet, timeout: string, job: string, money: number }>;
        private msToTime(duration: number): string;
    }
}