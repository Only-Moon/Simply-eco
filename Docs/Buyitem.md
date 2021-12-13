# BuyItem

Buy item from shop. | `BuyItem`

### Usage

```js
client.eco.BuyItem(client, UserId, GuildID, ItemName)
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.BuyItem(client, user.id, message.guild.id, Car)
```

## Returns `false` // if no shop
## Returns `ITEM_NOT_FOUND` // if item not available 
## Returns `NOT_ENOUGH_CASH` // if not item cash or no user Data
## Returns `ALREADY_PURCHASED` // if item already in inventory 
## Returns `item[0]` // once purchased successfully 

### Options

- **item[0]** - `{ item.Name, item.Price,  item.Sell, item.id }`

### Global Shop

```js
client.eco.BuyItem(client, UserId, GuildId, ItemName, {
 global: true
}) 