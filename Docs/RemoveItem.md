# RemoveItem

Remove Item from shop. | `RemoveItem`

### Usage

```js
client.eco.RemoveItem({ GuildID, Item})
```

### Example

```js

let data = await client.eco.RemoveItem({GuildID: message.guild.id, Item: "car"})
```

- ## Returns `GuildData`

### Options

- no options ;(

### Global Shop

```js
client.eco.RemoveItem({Item: "car"});
```