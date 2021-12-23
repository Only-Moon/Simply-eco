# Transfer

Transfer Amount from one user to another. | `Transfer`

### Usage

```js
client.eco.Transfer({GuildID, User1ID, User2ID, Amt})
```

### Example

```js

let user = message.mentions.users.first()

let data = await client.eco.Transfer({GuildID: message.guild.id, User1ID: message.author.id, User2ID: user.id, Amt: 100})
```

- ## Returns `GuildData`

### Options

- no options ;(

## Global shop

```js
await client.eco.Transfer({ User1ID: message.author.id, User2ID: user.id, Amt: 100})
```