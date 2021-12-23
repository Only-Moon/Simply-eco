# GetItem

Get item by name or id. 

### Usage

```js
client.eco.GetItem({ GuildID, item }) 
```

### Example

```js

// 0 is the item id, it can be the item name also!
let data = await client.eco.GetItem({GuildID: message.guild.id, Item: 0}) 

let embed = new MessageEmbed()
  .setTitle(`Item "${data.Name}"`)
  .addField("Price", data.Price.toString())
  .addField("Selling price", data.Sell.toString())
  .addField("ID", data.id.toString())
  .setTimestamp()

```

- ## Returns `Item` on success
 
```js
{ Name: string, Price: string, Sell: string, id: 0 | number };
```

 - ## Returns `null` on error - if no item in inv

### Options

- no options ;(

### Global Shop

```js
client.eco.GetItem({ Item: 0 }) 
```