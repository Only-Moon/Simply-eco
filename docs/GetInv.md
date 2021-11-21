# GetInv

Get User's inventory.  | `GetInv`

### Usage

```js
client.eco.GetInv(UserID, GuildID) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.GetInv(user.id, message.guild.id) 

let embed = new MessageEmbed()
   .setTitle(`${message.author.username}'s Inv'`)
  .setTimestamp()

    data.forEach(item => {
      embed.addField(`${item.Name}`, `Selling Price - ${item.Sell}`)
    })

```

- ## Return `<Array of Objects>` on success
 
```js
[
 { 
 Name: item name
 Price: item price
 Sell: item sell price
 id: item id
}
]
```

 - ## Return `NO_ITEM` on error - if no item in inv

 - ### Options

- no options ;(
