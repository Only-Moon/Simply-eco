# AddMoney

Add Money to User. | `AddMoney`

### Usage

```js
client.eco.AddMoney({UserID, GuildID, Amt}) 
```

### Example

```js

let user = message.mentions.users.first || message.author;

let data = await client.eco.AddMoney({UserID: user.id, GuildID: message.guild.id, Amt: 100}) 
```

- ## Returns `Wallet`

 - ### Options

- no options ;(

### Global shop
## Note: Your Simply-eco constructor needs to have global option specified!

### Example
```js
let user = message.mentions.users.first || message.author;
  
client.eco.AddItem({UserID: user.id, Amt: 100})
```