# GetRich

Shows Top 10 Rich User of The Guild. | `GetRich`

### Usage

```js
client.eco.GetRich({GuildID}) 
```

### Example

```js

let user = message.mentions.users.first || message.author

let data = await client.eco.GetRich({GuildID: message.guild.id}) 

let embed = new MessageEmbed()
   .setTitle(`${user.username}'s Inv'`)
  .setTimestamp()

    const emojis = ["🥇", "🥈", "🥉"]; 
    data = data.map( 
      (x, i) => 
`${emojis[i] || "🔹"} ${x.wallet + x.bank} - ${client.users.cache.find(user => user.id === x.userID)}`
    )
    
embed.setDescription(`${data.join("\n")}`)

```

- ## Return 'NO_RICH_PEOPLE' - if no user data

- ## Return `<Array of Objects>` on success 
 
```js
[
 { 
 UserID: user id
 wallet: wallet bal
 bank: bank balance
 id: item id
}
]
```

 - ### Options

- no options ;(
