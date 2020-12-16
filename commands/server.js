/**
 * Teague command "server"
 * @author Claro Sebastien
 */
module.exports = {
    name: 'server',
    description: 'Permet de connaître l\'équipage de la Roue Libre',
    execute(message, args) {
        const response = `Le nom du serveur où je réside est : ${message.guild.name}\nEquipage à bord : ${message.guild.memberCount}`; 
        message.channel.send(response);
    }
}