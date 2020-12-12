// Get init config
const {prefix, token} = require('./config.json');
// Init Discord module
const Discord = require('discord.js');
// Create a new Discord client
const client = new Discord.Client();

// When client is ready, do something
client.once('ready', () => {
    console.log('Ready!');
})
// Listening for messages where bot has access
client.on('message', (message) => {
    // Command to execute and send back message
    if(message.content.startsWith(`${prefix}pourparler`)) {
        message.channel.send('C\'est la loi, parle!');
    } else if (message.content.startsWith(`${prefix}rhum`)) {
        message.channel.send('Et une bouteille de Rhum!')
    }
    console.log(message.content)
})
// Bot Token login
client.login(token)