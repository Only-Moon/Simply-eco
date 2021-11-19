const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "daily",
  category: "Economy",
  aliases: ["Daily"],
  cooldown: 2,
  usage: "Daily",
  description: "Claim your daily bonus",
  run: async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    let data = await client.eco.Daily(user.id, message.guild.id)
    console.log(data)
    if (data.error === 'ALREADY_USED') {
      return message.channel.send({ embeds: [new MessageEmbed()
        .setTitle(`You've already claimed your daily today`)
        .setDescription(`Wait for ${data.timeout} hours to claim again`)
        .setFooter(' 👍 ')
        .setTimestamp()
      ] })
    } else {
      let embed = new MessageEmbed()
        .setTitle(`Here are your daily coins, ${message.author.username}`)
        .setDescription(`Your daily bonus was placed in your wallet \n\nYou can get more coin by voting the bot(!vote for more info)`)
        .setFooter(' 👍 ')
        .setTimestamp();
      message.reply({ embeds: [ embed ]})
    }
  }
}