const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'buy',
	category: 'Economy',
	aliases: ['buy'],
	cooldown: 2,
	usage: 'buy',
	description: 'buy an item from the shop',
	run: async (client, message, args) => {
		var user = message.mentions.users.first() || message.author;
		let data = await client.eco.Buyitem(user.id, message.guild.id, args[0]);
		if (data === 'ALREADY_PURCHASED') {
			return message.channel.send('YOU ALREADY OWN THIS ITEM');
		} else if (data === 'NOT_ENOUGH_CASH') {
			return message.channel.send(
				"YOU DON'T HAVE ENOUGH CASH TO OWN THIS ITEM"
			);
		} else if (data === 'ITEM_NOT_FOUND') {
			return message.channel.send('NO ITEM OF THAT NAME IN SHOP');
		}
		message.channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle(`Sucessfully Purchased ${data.Name}`)
					.setFooter(' 👍 ')
					.setTimestamp()
			]
		});
	}
};
