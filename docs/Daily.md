# Daily

Gets Daily money(*timeout included) | `Daily`

### Usage

```js
client.eco.Daily(UserID, GuildID) 
```

### Example

```js

let user = message.author

let data = await client.eco.Daily(user.id, message.guild.id) 
```

- ## Return `<Object>`
 
```js
{ 
 error = "ALREADY_USED",
 timeout = "remaining time"
}
```

- ## Returns `UserData.wallet`

 - ### Options

- no options ;(
