/**
 * Teague command "args-info"
 * @author Claro Sebastien
 */
module.exports = {
    name: 'args-info',
    description: 'Permet de connaître les arguments d\'une commande',
    execute(message, args) {
        const response = `Ton nom : ${message.author.username}\nTon ID : ${message.author.id}`;
        message.channel.send(response);
    }
}