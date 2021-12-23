# Work

Work for Earning Money. | `Work`

### Usage

```js
client.eco.Work({UserID, GuildID}) 
```

### Example

```js

let user = message.author

let data = await client.eco.Work({UserID: user.id, GuildID: message.guild.id}) 
```

- ## Return `<Objects>` on error
 
```js
{ 
 error = "ALREADY_WORKED",
 timeout = "remaining time"
}
```

- ## Returns `<Objects>` on success 

```js
{
  wallet: user wallet,
  timeout: time untill next use(2 hrs),
  job: user job,
  salary: user salary
}
```

 - ### Options

- no options ;(

## Global shop

```js
await client.eco.Work({UserID: user.id, Amt: 100}) 
```