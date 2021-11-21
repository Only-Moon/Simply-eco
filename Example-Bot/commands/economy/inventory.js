const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "inv",
  category: "Economy",
  aliases: ["Daily"],
  cooldown: 2,
  usage: "Daily",
  description: "Gives you your Inv",
  run: async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    let data = await client.eco.GetInv(user.id, message.guild.id)
    let embed = new MessageEmbed()
      .setTitle(`${message.author.username}'s Inv'`)
      .setFooter(' 👍 ')
      .setTimestamp()

    data.forEach(item => {
      embed.addField(`${item.Name}`, `Selling Price - ${item.Sell}`)
    })


    message.channel.send({embeds: [ embed] })


  }
}