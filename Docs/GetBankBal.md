# GetBankBal

Get User's Bank Balance  | `GetBank`

### Usage

```js
client.eco.GetBankBal(UserID, GuildID) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.GetBankBal(user.id, message.guild.id) 
```

- ## Returns `Bank`

 - ### Options

- no options ;(
