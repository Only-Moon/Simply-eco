# AddItem

Add Item to Shop. | `AddItem`

### Usage

```js
client.eco.AddItem(client, GuildID, ItemName, Price, SellPrice)
```

### Example

```js

let data = await client.eco.AddItem(client, message.guild.id, Car, 500, 250)
```

- ## Returns `GuildData`

### Options

- No options :(

### Global shop

```js
  
client.eco.AddItem(client, GuildID, ItemName, Price, SellPrice, {
 global: true
})
```
