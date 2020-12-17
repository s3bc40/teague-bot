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
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
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

    // Get args and commandName
    const args = message.content.slice(prefix.length).trim().split(/ +/); // Regex
    const commandName = args.shift().toLowerCase();
    
    if (!client.commands.has(commandName)) {
        return message.reply('t\'es drunk ou quoi ?! Je connais pas cette commande !');   
    }
    
    const command = client.commands.get(commandName);
    
    if (command.args && !args.length) {
        let reply = `Pas d\arguments ? SUS ${message.author.username} !`;
        if (command.usage) {
            reply += `\nSelon le code, tu dois faire comme ça : \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // Execute the command 
    try {
        command.execute(message, args)
    } catch (error) {
        console.error(error);
        message.reply('la commande a des erreurs, mais c\'est pas mon problème !');
    }

    console.log(message.content);
})
// Bot Token login
client.login(token)