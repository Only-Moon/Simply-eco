# GetUser

Get User from Database.  | `GetUser`

### Usage

```js
client.eco.GetUser(UserID, GuildID) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.GetUser(user.id, message.guild.id) 
```

- ## Returns `User`

 - ### Options

- no options ;(
