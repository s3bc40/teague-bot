/**
 * Teague command "user-info"
 * @author Claro Sebastien
 */
module.exports = {
    name: 'user-info',
    description: 'Permet de connaître les informations de l\'expéditeur',
    execute(message, args) {
        const response = `Ton nom : ${message.author.username}\nTon ID : ${message.author.id}`;
        message.channel.send(response);
    }
}