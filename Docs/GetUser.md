# GetUser

Get User from Database.  | `GetUser`

### Usage

```js
client.eco.GetUser({UserID, GuildID}) 
```

### Example

```js

let user = message.mentions.users.first || message.author;

let data = await client.eco.GetUser({UserID: user.id, GuildID: message.guild.id}) 
```

- ## Returns `User`

 - ### Options

- no options ;(

## Global shop

```js
await client.eco.GetUser({ UserID: user.id }) 
```