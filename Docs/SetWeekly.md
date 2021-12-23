# SetWeekly

Sets amount to give user per week. | `setWeekly`

### Usage

```js
client.eco.SetWeekly({GuildID, Amt})
```

### Example

```js
let data = await client.eco.SetWeekly({GuildID: message.guild.id,Amt: 20000});
```

- ## Returns `GuildData`

### Options

- no options ;(

## Global

```js
await client.eco.SetWeekly({ Amt: 20000 });
```