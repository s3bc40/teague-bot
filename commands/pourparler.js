/**
 * Teague command "pourparler"
 * @author Claro Sebastien
 */
module.exports = {
    name: 'pourparler',
    description: 'Pourparler des pirates !',
    execute(message, args) {
        message.channel.send('C\'est la loi, parle!');
    }
}