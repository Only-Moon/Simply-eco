const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'add-money',
	category: 'Economy',
	aliases: ['add-money'],
	cooldown: 2,
	usage: 'add-money',
	description: "Add Money To A User's Acc",
	run: async (client, message, args) => {
		if (!message.member.permissions.has('MANAGE_MESSAGES'))
			return message.channel.send(
				`You dont have Permission to use this Command`
			);
		var user = message.mentions.users.first();
		if (!user) {
			return message.channel.send(`PLEASE MENTION A USER TO ADD MONEY`);
		}
		let data = await client.eco.AddMoney(user.id, message.guild.id, args[1]);
		message.channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle(`${args[1]} Has Been Added To ${user.tag}'s Account'`)
					.setFooter(' 👍 ')
					.setTimestamp()
			]
		});
	}
};
