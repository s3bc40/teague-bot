/* eslint-disable no-unused-vars */
/**
 * Teague command "kick"
 * @author Claro Sebastien
 */
module.exports = {
	name: 'kick',
	description: 'Kick un pirate à la mer !',
	guildOnly: true,
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('Tag quelqu\'un avant de me déranger !');
		}
		const taggedUser = message.mentions.users.first();

		message.channel.send(`C'est TCHAO pour ${taggedUser.username} ?`);
	},
};