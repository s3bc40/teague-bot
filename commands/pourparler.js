/**
 * Teague command "pourparler"
 * @author Claro Sebastien
 */
module.exports = {
	name: 'pourparler',
	description: 'Pourparler des pirates !',
	cooldown: 5,
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send('C\'est la loi, parle!');
	},
};