const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "dice",
  description: "Roll a dice",
  category: "economy",
  cooldown: 5,
  run: async (client, message, args) => {
    const roll = Math.floor(Math.random() * 6) + 1;
    const price = 200;

    const embed = new MessageEmbed()
      .setTitle("🎲 You landed on: " + roll)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    if (roll === 6) {
      embed.setDescription(`🎉 Congrats! You won a price of **${price}coins**`);
      await client.eco.AddMoney(message.author.id, message.guild.id, prize) 
    } else {
      embed.setDescription(
        `You need to land a **6** to get a price of **${price}coins**`
      );
    }

    message.channel.send({embeds: [embed]});
  },
};
