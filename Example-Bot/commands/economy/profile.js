const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'profile',
	description: 'See the full profile of a user',
	category: 'economy',
	run: async (client, message, args) => {
		const user = message.mentions.users.first() || message.author;
		const userId = user.id;
		const guildId = message.guild.id;

		let data = await client.eco.GetProfile(guildId, userId);

		const Profile = data.map(item => {
			const money = item.wallet || 0;
			const bank = item.bank || 0;
			const inventory = item.inventory || [];
			const job = item.job;
			const salary = item.salary || 0;

			const embed = new MessageEmbed()
				.setTitle(`${user.username}'s profile`)
				.addField('**Money**', `${money}`, true)
				.addField('**Job**', `${job}`, true)
				.addField('**Salary**', `${salary}`)
				.addField('**Bank**', `${bank}`, true)
				.addField('**Inventory Items**', `${inventory}`, true)
				.setDescription(`Use \ .inv <user>\` to view their inventory items.`)
				.setColor('BLUE')
				.setFooter(user.username)
				.setTimestamp();

			message.channel.send({ embeds: [embed] });
		});
	}
};
