const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "rich",
  category: "Economy",
  aliases: ["lb"],
  cooldown: 2,
  usage: "lb",
  description: "Gives you your server lb",
  run: async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    let data = await client.eco.GetRich(message.guild.id)
    let embed = new MessageEmbed()
      .setTitle(`${message.guild.name}'s Leaderboard`)
      .setFooter(' 👍 ')
      .setTimestamp()

    const emojis = ["🥇", "🥈", "🥉"]; 
    data = data.map( 
      (x, i) => 
`${emojis[i] || "🔹"} ${x.wallet + x.bank} - ${client.users.cache.find(user => user.id === x.userID)}`
    )
    
embed.setDescription(`${data.join("\n")}`)
    
    message.channel.send({embeds: [ embed ] })
  }
}