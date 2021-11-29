const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'setweekly',
	category: 'Economy',
	aliases: ['setdaily'],
	cooldown: 2,
	usage: 'setdaily',
	description: 'Set Weekly Limit',
	run: async (client, message, args) => {
		if (!message.member.permissions.has('MANAGE_MESSAGES'))
			return message.channel.send(
				`You dont have Permission to use this Command`
			);
		var user = message.mentions.users.first() || message.author;
		let data = await client.eco.SetWeekly(message.guild.id, args[0]);

		message.channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle(`Changed The weekly Bonus Amount To ${data.weeklyAmt}`)
					.setColor('GREEN')
					.setFooter(' 👍 ')
					.setTimestamp()
			]
		});
	}
};
