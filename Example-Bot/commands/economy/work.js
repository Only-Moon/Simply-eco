const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "work",
  category: "Economy",
  aliases: ["Daily"],
  cooldown: 2,
  usage: "Daily",
  description: "Claim your daily bonus",
  run: async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    let data = await client.eco.Work(user.id, message.guild.id)
if (data.error === "ALREADY_WORKED") {
      message.channel.send(
        `You have already worked recently, ${data.timeout} remaining`
      );
    } else {
      //i know how to make it affect your payment, but its such bother, simple yet a bother

      if (data.error === "NO_JOB") {
        return message.channel.send(
          "Hey there you dont have a job use the job command to get a job!"
        );
      } else {
        const embed = new MessageEmbed()
          .setTitle("Work!")
          .setDescription(
            `${user.username} worked as a **${data.job}** and earned **${data.money}**! 💰`
          )
          .setColor("BLUE");

        message.channel.send({embeds: 
[embed] });
      }
    }
  }
}