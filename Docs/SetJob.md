# SetJob

Sets User's Job from the List of Jobs. | `SetJob`

### Usage

```js
client.eco.SetJob(GuildID, UserID, Job) 
```

### Example

```js

let user = message.author

let data = await client.eco.SetJob(user.id, message.guild.id, job) 
```

- ## Return `<Array of Jobs>` on error - if job name is invalid

```js
[
 {
   Name: job name,
   Salary: job salary
 }
]
```
- ## Returns `SUCCESS` on success

 - ### Options

- no options ;(
