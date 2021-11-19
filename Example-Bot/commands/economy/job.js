const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "job",
  category: "Economy",
  aliases: ["Daily"],
  cooldown: 2,
  usage: "Daily",
  description: "Claim your daily bonus",
  run: async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    let data = await client.eco.setJob(user.id, message.guild.id, args[1])
        if (!args[0])
      return message.channel.send(
        "Please mention an option `assign, re-assign, un-assign`"
      );
     console.log(data)
    switch (args[0].toLowerCase()) {
      case "assign":
        if (data === "ALREADY_WORKING") {
          message.channel.send(
            "Hey you already have a job instead of using assign use reassign!"
          );
        } else {
          if (data === "SUCESS") {
            message.channel.send(`Your job is now ${args[1]}`);
          } else {
            const e = new MessageEmbed().setColor(`BLUE`);
           await client.eco.setJob(user.id, message.guild.id, args[1]).then(board => {
            board.forEach((job) => {
              e.addField(`${job.Job}`, "|| ||");
            });
          })
            message.channel.send({embeds: [e]});
          }
        }
        break;
      case "re-assign":
      case "reassign":
        if (data === "SUCCESS") {
          message.channel.send(
            `You have re-assigned, your job is now ${args[1]}`
          );
        } else {
          const e = new MessageEmbed().setColor(`BLUE`);
          await client.eco.setJob(user.id, message.guild.id, args[1]).then(board => {
          board.forEach((Job) => {
            e.addField(`${Job}`, "|| ||");
          });
        })
          message.channel.send({embeds: 
[e] });
        }
        break;
      case "un-assign":
await client.eco.removeJob(message.author.id, message.guild.id, null);
        message.channel.send("Now you dont have a job anymore");
    }
  }
}