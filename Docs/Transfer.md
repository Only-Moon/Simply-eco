# Transfer

Transfer Amount from one user to another. | `Transfer`

### Usage

```js
client.eco.Transfer(GuildID, User1ID, User2ID, Amt)
```

### Example

```js

let user = message.mentions.users.first()

let data = await client.eco.Transfer(message.guild.id, message.author.id, user.id, 100)
```

- ## Returns `GuildData`

### Options

- no options ;(
