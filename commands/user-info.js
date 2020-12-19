/**
 * Teague command "user-info"
 * @author Claro Sebastien
 */
module.exports = {
	name: 'user-info',
	description: 'Permet de connaître les informations de l\'expéditeur',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		const { MessageEmbed } = require('discord.js');
		const user = message.author || message.mentions.users.first();
		const embed = new MessageEmbed()
			.setTitle('Ta carte de pirate')
			.setAuthor(user.username, user.displayAvatarURL({ format: 'png', dynamic: true }))
			.setDescription('Marin d\'eau douce !')
			.setColor('GOLD');
		message.channel.send(embed);
	},
};