# Work

Work for Earning Money. | `Work`

### Usage

```js
client.eco.Work(UserID, GuildID) 
```

### Example

```js

let user = message.author

let data = await client.eco.Work(user.id, message.guild.id) 
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
  wallet: user.wallet,
  timeout: time untill next use(1 min),
  job: user.job,
  money: amt earned by working
}
```

 - ### Options

- no options ;(
