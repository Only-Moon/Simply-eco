# GetBal

Get User's Wallet Balance. | `GetBal`

### Usage

```js
client.eco.GetBal({UserID, GuildID}) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.GetBal({UserID: user.id, GuildID: message.guild.id}) 
```

- ## Returns `Wallet`

 - ### Options

- no options ;(

## Global Shop
### Note: Your Simply-eco constructor needs to have global option specified!

```js
client.eco.GetBal({ UserID: user.id }) 
```