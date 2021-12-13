# RemoveItem

Remove Item from shop. | `RemoveItem`

### Usage

```js
client.eco.RemoveItem(client, GuildID, ItemName)
```

### Example

```js

let data = await client.eco.RemoveItem(client, message.guild.id, car)
```

- ## Returns `GuildData`

### Options

- no options ;(

### Global Shop

```js
client.eco.RemoveItem(client, GuildID, ItemName, {
 global: true
})
```