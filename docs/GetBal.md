# GetBal

Get User's Wallet Balance. | `GetBal`

### Usage

```js
client.eco.GetBal(UserID, GuildID) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.GetBal(user.id, message.guild.id) 
```

- ## Returns `Wallet`

 - ### Options

- no options ;(
