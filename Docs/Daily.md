# Daily

Gets Daily money(*timeout included) | `Daily`

### Usage

```js
client.eco.Daily({UserID, GuildID}) 
```

### Example

```js

let user = message.author;

let data = await client.eco.Daily({UserID: user.id, GuildID: message.guild.id}) 
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

## Global Shop
### Note: Your Simply-eco constructor needs to have global option specified!

```js
client.eco.Daily({ UserId: user.id }) 
```