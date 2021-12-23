# AddItem

Add Item to Shop. | `AddItem`

### Usage

```js
client.eco.AddItem({GuildID, ItemName, Price, SellPrice})
```

### Example

```js

let data = await client.eco.AddItem({GuildID: message.guild.id, ItemName: Car, Price: 500, SellPrice: 250})
```

- ## Returns `guildData`

### Options

- No options :(

## Global shop
### Note: Your Simply-eco constructor needs to have global option specified!
```js
  
client.eco.AddItem({ ItemName, Price, SellPrice })
```
