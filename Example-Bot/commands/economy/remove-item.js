const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "remove-item",
  category: "Economy",
  aliases: ["remove-item"],
  cooldown: 2,
  usage: "add-item",
  description: "Remove Item From Shop",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        `You dont have Permission to use this Command`
      );
    var user = message.mentions.users.first() || message.author;
    console.log(args)
    let data = await client.eco.RemoveItem(message.guild.id, args[0])

    message.channel.send({embeds: [ new MessageEmbed()
      .setTitle(`Product With Id ${args[0]} Has Been Removed From The Shop`)
      .setDescription(`Users can no more buy the item from the shop`)
      .setFooter(' 👍 ')
      .setTimestamp()
    ] })
  }
}