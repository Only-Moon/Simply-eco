# Withdraw

Withdraw Money from Bank.. | `Withdraw`

### Usage

```js
client.eco.Withdraw({UserID, GuildID, Amt}) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.Withdraw({UserID: user.id, GuildID: message.guild.id, Amt: 100});
```

- ## Return `<Object>`
 
```js
{ 
 wallet = user.wallet,
 Bank = user.bank
}
```

- ## Returns `NOT_ENOUGH_CASH` when wallet amt is less than amt provided
 
- ## Returns `NO_CASH_IN_BANK` when no data

 - ### Options

- **Amt** - `Can be any number` or `max`

## Global shop

```js
await client.eco.Withdraw({UserID: user.id, Amt: 100}) 
```