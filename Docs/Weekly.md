# Weekly

Gets Weekly money(*timeout included) | `Weekly`

### Usage

```js
client.eco.Weekly({UserID, GuildID}) 
```

### Example

```js

let user = message.author

let data = await client.eco.Weekly({UserID: user.id, GuildID: message.guild.id});
```

- ## Return `<Object>`
 
```js
{ 
 error = "ALREADY_USED",
 timeout = "remaining time"
}
```

- ## Returns `UserData.wallet`

 - ### Options

- no options ;(

## Global shop

```js
await client.eco.Weekly({ UserID: user.id });
```