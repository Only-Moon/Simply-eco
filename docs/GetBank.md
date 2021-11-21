# GetBank

Get User's Bank Balance  | `GetBank`

### Usage

```js
client.eco.GetBank(UserID, GuildID) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.GetBank(user.id, message.guild.id) 
```

- ## Returns `Bank`

 - ### Options

- no options ;(
