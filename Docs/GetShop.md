# GetShop

Get Shop of User's Guild. | `GetShop`

### Usage

```js
client.eco.GetShop(GuildID) 
```

### Example

```js

    let user = message.mentions.users.first() || message.author;
    let data = await client.eco.GetShop(message.guild.id)
    let embed = new MessageEmbed()
      .setTitle(`SHOP`)
      .setFooter(' 👍 ')
      .setTimestamp()
      
    if (data === "NO_ITEM_IN_SHOP") {
      embed.addField("No Item", "In This Guild's Shop")
    } else {
    data.forEach(item => {
      embed.addField(`${item.Name}`, `Price: ${item.Price}\n ID: ${item.id}`)
    })
  }
```

- ## Return `<Array Of Objects>` - `User.shopItems` on success
 
```js
[
 { 
 Name: item name, 
 Price: item price,
 id: item id
 }
]
```

- ## Returns `NO_ITEM_IN_SHOP` on error - if no item in shop

 - ### Options

- no options ;(
