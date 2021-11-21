# Deposit

Deposit Money into Bank. | `Deposit`

### Usage

```js
client.eco.Deposit(UserID, GuildID, Amt) 
```

### Example

```js

let user = message.author

let data = await client.eco.Deposit(user.id, message.guild.id, 100) 
```

- ## Return `<Object>`
 
```js
{ 
 wallet = user.wallet,
 Bank = user.bank
}
```

- ## Returns `NOT_ENOUGH_CASH` when wallet amt is less than amt provided
  
- ## Returns `NO_CASH_IN_WALLET` when no data

 - ### Options

- **Amt** - `Can be any number` or `max`
