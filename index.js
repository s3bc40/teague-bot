// Reading file system
const fs = require('fs');
// Get init config
const {prefix, token} = require('./config.json');
// Init Discord module
const Discord = require('discord.js');
// Create a new Discord client
const client = new Discord.Client();
// Init Command Collection
client.commands = new Discord.Collection();
// Retrieve dynamically all comands
const commandFiles = fs.readFileSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    let command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

// When client is ready, do something
client.once('ready', () => {
    console.log('Ready!');
})
// Listening for messages where bot has access
client.on('message', (message) => {
    // If no prefix or the message is from the bot exit
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/); // Regex
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
    // Advanced command handling
    else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`Pas d\arguments ? SUS ${message.author.username} !`);
        }

        message.channel.send(`Commande : ${command}\nArguments : ${args}`);
    }
    else if (command === 'kick') {
        if (!message.mentions.users.size){
            return message.reply('Tag quelqu\'un avant de me déranger !');
        }
        const taggedUser = message.mentions.users.first();

        message.channel.send(`C\'est TCHAO pour ${taggedUser.username} ?`);
    }
    else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Ton avatar pirate : <${
                message.author.displayAvatarURL({format: "png", dynamic: true}) // Dynamic : Gif
            }>`)
        }

        const avatarList = message.mentions.users.map( user => {
            return `L'avatar de ${user.username} : <${
                user.displayAvatarURL({format: "png", dynamic: true})
            }>`;
        });
        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    }
    console.log(message.content)
})
// Bot Token login
client.login(token)