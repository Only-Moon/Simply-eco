const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "job",
  category: "Economy",
  aliases: ["Daily"],
  cooldown: 2,
  usage: "Daily",
  description: "Claim your daily bonus",
  run: async (bot, message, args) => {
    var user = message.mentions.users.first() || message.author;

        if (!args[0])
      return message.channel.send(
        "Please mention an option `assign, re-assign, un-assign`"
      );
    switch (args[0].toLowerCase()) {
      case "assign":
        let data = await bot.eco.SetJob(user.id, message.guild.id, args[1])
        if (data === "ALREADY_WORKING") {
          message.channel.send(
            "Hey you already have a job instead of using assign use reassign!"
          );
        } else {
          if (data === "SUCCESS") {
            message.channel.send(`Your job is now ${args[1]}`);
          } else {
            const e = new MessageEmbed().setColor(`BLUE`);
           data.forEach((job) => {
              e.addField(`${job.Job}`, "|| ||");
            });
            message.channel.send({embeds: [e]});
          }
        }
        break;
      case "re-assign":
      case "reassign":
      let data2 = await bot.eco.ReassignJob(user.id, message.guild.id, args[1])
        console.log(data2)
        if (data2 === "SUCCESS") {
          message.channel.send(
            `You have re-assigned, your job is now ${args[1]}`
          );
        } else {
          const e = new MessageEmbed().setColor(`BLUE`);
          let data2 = await bot.eco.SetJob(user.id, message.guild.id, args[1])
          data2.forEach((Job) => {
            e.addField(`${Job}`, "|| ||");
          });
          message.channel.send({embeds: 
[e] });
        }
        break;
      case "un-assign":
await bot.eco.RemoveJob(message.guild.id, message.author.id);
        message.channel.send("Now you dont have a job anymore");
    }
  }
}