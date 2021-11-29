# RemoveJob

Removes User's Job. | `RemoveJob`

### Usage

```js
client.eco.RemoveJob(GuildID, UserID) 
```

### Example

```js

let user = message.author

let data = await client.eco.RemoveJob(message.guild.id, user.id) 
```

- ## Return `NO_JOB` when user dont have job
- ## Returns `SUCCESS` on success

 - ### Options

- no options ;(
