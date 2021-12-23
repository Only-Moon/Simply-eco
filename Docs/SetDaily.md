# SetDaily

Sets amount to give user per day | `setDaily`

### Usage

```js
client.eco.SetDaily({GuildID, Amt})
```

### Example

```js
let data = await client.eco.SetDaily({GuildID: message.guild.id, Amt: 2000})
```

- ## Returns `GuildData`

### Options

- no options ;(

## Global shop

```js
await client.eco.SetDaily({ Amt: 2000 })
```