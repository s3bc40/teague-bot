/**
 * Teague command "user-info"
 * @author Claro Sebastien
 */
module.exports = {
    name: 'user-info',
    description: 'Permet de connaître les informations de l\'expéditeur',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`Pas d\arguments ? SUS ${message.author.username} !`);
        }

        message.channel.send(`Commande : ${command}\nArguments : ${args}`);
    }
}