/* eslint-disable no-inline-comments */
/* eslint-disable no-unused-vars */
/**
 * Teague command "avatar"
 * @author Claro Sebastien
 */
module.exports = {
	name: 'avatar',
	description: 'Affiche les avatars des pirates recherchés ou toi !',
	aliases: ['icon', 'pfp'],
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Ton avatar pirate : <${
				message.author.displayAvatarURL({ format: 'png', dynamic: true }) // Dynamic : Gif
			}>`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `L'avatar de ${user.username} : <${
				user.displayAvatarURL({ format: 'png', dynamic: true })
			}>`;
		});
		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);
	},
};