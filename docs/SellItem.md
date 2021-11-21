# SellItem

Sell Item from Inventory. | `SellItem`

### Usage

```js
client.eco.SellItem(UserID, GuildID, ItemN) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.SellItem(user.id, message.guild.id, Car) 
```

- ## Returns `false` - If no shop available 
- ## Returns `NO_ITEM_IN_INVENTORY` - If item not available in user's inventory
- ## Returns `item[0]` - Once purchased successfully 

### Options

- **item[0]** - `{item.Name, item.Price,  item.Sell, item.id}`
