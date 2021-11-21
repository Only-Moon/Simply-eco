# GetProfile

Get User' Profile | `GetProfile`

### Usage

```js
client.eco.GetProfile(GuildID) 
```

### Example

```js

    const user = message.mentions.users.first() || message.author;
    const userId = user.id;
    const guildId = message.guild.id;

   let data = await client.eco.GetProfile(guildId, userId)
    
   const Profile = data.map((item) => {

    const money = (item.wallet) || 0;
    const bank = (item.bank) || 0;
    const inventory = (item.inventory) || [];
    const job = (item.job) || null;

    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s profile`)
      .addField("**Money**", `${money}`, true)
      .addField("**Job**", `${job}`, true)
      .addField("**Bank**", `${bank}`, true)
      .addField("**Inventory Items**", `${inventory}`, true)
      .setDescription(
        `Use \ !inv <user>\` to view their inventory items.`
      )
      .setColor("BLUE")
      .setFooter(user.username)
      .setTimestamp();
```

- ## Return `<Array of Objects>` on success
 
```js
[
 { 
 user: user id,
 wallet: wallet bal,
 job: user job,
 bank: bank balance,
 inventory: no. of item in user inventory
}
]
```

 - ### Options

- no options ;(
