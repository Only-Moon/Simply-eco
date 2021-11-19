const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "weekly",
  category: "Economy",
  aliases: ["weekly"],
  cooldown: 2,
  usage: "Daily",
  description: "Gives you your Weekly Bonus",
  run: async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    let data = await client.eco.Weekly(user.id, message.guild.id)
    console.log(data)
    if (data.error === 'ALREADY_USED') {
      return message.channel.send({ embeds: [ new MessageEmbed()
        .setTitle(`You've already claimed your weekly today`)
        .setDescription(`Wait for ${data.timeout} to claim again`)
        .setFooter(' 👍 ')
        .setTimestamp()
      ] })
    }
    else {
      message.channel.send({embeds: [new MessageEmbed()
        .setTitle(`Here are your weekly coins, ${message.author.username}`)
        .setDescription(`Your weekly bonus was placed in your wallet \n\nYou can get more coin by voting the bot(!vote for more info)`)
        .setFooter(' 👍 ')
        .setTimestamp()
                          ] })
    }
  }
}