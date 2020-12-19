/**
 * Teague command "args-info"
 * @author Claro Sebastien
 */
module.exports = {
	name: 'args-info',
	description: 'Permet de connaître les arguments de la commande',
	args: true,
	execute(message, args) {
		message.channel.send(`Arguments : ${args}\nNombre : ${args.length}`);
	},
};