/**
 * Teague command "role"
 * @author Claro Sebastien
 */
module.exports = {
	name: 'role',
	description: 'Permet de connaître les arguments de la commande',
	args: true,
	usage: '<user> <role>',
	execute(message, args) {
		message.channel.send(`Pirate ${args[0]}, tu es promu '${args[1]}'`);
	},
};