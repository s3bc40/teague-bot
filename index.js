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
    // If no prefix or the message is from the bot exit
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    // Command to execute and send back message
    if (message.content.startsWith(`${prefix}pourparler`)) {
        message.channel.send('C\'est la loi, parle!');
    } 
    else if (message.content.startsWith(`${prefix}rhum`)) {
        message.channel.send('Et une bouteille de Rhum!')
    } 
    else if (message.content === `${prefix}server`) {
        const response = `Le nom du serveur où je réside est : ${message.guild.name}\nEquipage à bord : ${message.guild.memberCount}`; 
        message.channel.send(response);
    }
    else if (message.content === `${prefix}user-info`) {
        const response = `Ton nom : ${message.author.username}\nTon ID : ${message.author.id}`;
        message.channel.send(response);
    }
    else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`Pas d\arguments ? SUS ${message.author.username} !`);
        }

        message.channel.send(`Commande : ${command}\nArguments : ${args}`);
    }
    console.log(message.content)
})
// Bot Token login
client.login(token)