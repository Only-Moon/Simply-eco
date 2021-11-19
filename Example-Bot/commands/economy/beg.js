const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "beg",
  description: "beg someone for money",
  category: "economy",
  cooldown: 10,
  run: async (client, message, args) => {
    const authors = [
      "Ariana Grande",
      "Justin Bieber",
      "Shawn Mendes",
      "Donald Trump",
      "Charlie Puth",
      "Joe Biden",
      "Tony Stark",
      "Hussain Bolt",
      "Cardi B",
      "Cristiano Rondaldo",
      "Lionel Messi",
      "The next door neighbour",
      "Tovade",
      "Potatoexe2930",
    ];
    const auth = authors[Math.floor(Math.random() * authors.length)];
    const random = Math.floor(Math.random() * 3) + 0;

    if (random === 2) {
      message.channel.send(
        `**${auth}** doesnt wanna give you money! Go beg someone else!`
      );
    } else {
      const quotes = [
        "Ahh you again, why you want money from me :/, Anyways here some cash",
        "Im too poor to give you money, but here you go keep the change",
        "Well do say more beggers to come to me I give massive cash and here some for you too",
        "I kept this money for long time I think someone else deserves it now",
        "If you ask me cash the next time i wont give you dude but here this ill give u",
        "Aye its a begger here you go take this ",
      ];
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      const min = 10; //Minimum of 10
      const max = 1000; //Maximum of 100
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      message.channel.send(
        `**${auth}**: gave you ${random} coins with the message: ${quote}`
      );
     let data = await client.eco.AddMoney(message.author.id, message.guild.id, random)
    }
  },
};
