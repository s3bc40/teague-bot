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
		const user = message.author;
		const avatar = user.displayAvatarURL({ format: 'png', dynamic: true });
		const embed = new MessageEmbed()
			.setColor('GOLD')
			.setAuthor(user.username, avatar)
			.setThumbnail(avatar)
			.setTitle('Pirate ID')
			.setDescription('Marin d\'eau douce ! Que le Kraken t\'emporte dans les abysses !')
			.addFields(
				{ name: 'A savoir', value: 'Ne sais pas nager' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Experience', value: 'Over 9000', inline: true },
				{ name: 'Statut', value: 'Mercenaire', inline: true },
				{ name: 'Moto', value: 'Pour Narnia !', inline: true },
			)
			.setImage('https://i.imgur.com/76oAXmW.jpeg')
			.setTimestamp()
			.setFooter('Carte en cours de production', 'https://i.imgur.com/8adu0Cf.jpeg');
		message.channel.send(embed);
	},
};