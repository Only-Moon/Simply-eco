const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "add-item",
  category: "Economy",
  aliases: ["add-item"],
  cooldown: 2,
  usage: "add-item",
  description: "Gives An Item To The Shop",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        `You dont have Permission to use this Command`
      );
    var user = message.mentions.users.first() || message.author;

    let data = await client.eco.AddItem(message.guild.id, args[0], args[1], args[2])

    message.channel.send({embeds: [new MessageEmbed()
      .setTitle(`${args[0]} Has Been Added To The Shop`)
      .setDescription(`Users can now buy ${args[0]} for ${args[1]} from the shop`)
      .setFooter(' 👍 ')
      .setTimestamp()
    ] })
  }
}