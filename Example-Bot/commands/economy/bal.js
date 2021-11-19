const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bal",
  category: "Economy",
  aliases: ["balance"],
  cooldown: 2,
  usage: "bal",
  description: "Gives you your acc balance",
  run: async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    let wallet = await client.eco.GetBal(user.id, message.guild.id)
    let bank = await client.eco.GetBankbal(user.id, message.guild.id)
    message.channel.send({ embeds: [new MessageEmbed()
      .setTitle(`${message.author.username}'s Acc`)
      .setDescription(`💳**Wallet**: ${wallet}\n🏦**Bank**: ${bank}\n🌐**Total Net Worth**: ${ wallet + bank }`)
      .setTimestamp()
    ]})
  }
}