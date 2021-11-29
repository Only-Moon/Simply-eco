# RemoveMoney

Remove Money from User. | `RemoveMoney`

### Usage

```js
client.eco.RemoveMoney(UserID, GuildID, Amt) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.RemoveMoney(user.id, message.guild.id, 100) 
```

- ## Returns `Wallet`

 - ### Options

- no options ;(
