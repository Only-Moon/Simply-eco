# AddMoney

Add Money to User. | `AddMoney`

### Usage

```js
client.eco.AddMoney(UserID, GuildID, Amt) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.AddMoney(user.id, message.guild.id, 100) 
```

- ## Returns `Wallet`

 - ### Options

- no options ;(
