/**
 * Teague command "rhum"
 * @author Claro Sebastien
 */
module.exports = {
	name: 'rhum',
	description: 'Le rhum, le fuel des Pirates !',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send('Et une bouteille de Rhum!');
	},
};