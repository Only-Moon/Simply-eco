# ReassignJob

Sets User's Job from the List of Jobs. | `ReassignJob`

### Usage

```js
client.eco.ReassignJob(GuildID, UserID, Job) 
```

### Example

```js

let user = message.author

let data = await client.eco.ReassignJob(user.id, message.guild.id, job) 
```

- ## Return `NOT_WORKING` on error - if no job

- ## Return `<Array of Jobs>` on error - if invalid job specified 

```js
[
 {
   Job: job name
 }
]
```

- ## Returns `SUCCESS` on success

 - ### Options

- no options ;(
