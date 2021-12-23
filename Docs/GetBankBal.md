# GetBankBal

Get User's Bank Balance  | `GetBank`

### Usage

```js
client.eco.GetBankBal({UserID, GuildID}) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.GetBankBal({UserID: user.id, GuildID: message.guild.id}) 
```

- ## Returns `Bank`

 - ### Options

- no options ;(
    
## Global Shop
### Note: Your Simply-eco constructor needs to have global option specified!

```js
client.eco.GetBankBal({ UserID: user.id }) 
```