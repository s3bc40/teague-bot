/* eslint-disable no-inline-comments */
/**
 * Teague Bot for Discord. Live on Heroku 24/7.
 * Bot status : In development.
 * @author Sebastien G.CLARO
 */


/*
	###############
	CONSTANTS
	###############
*/
// Constant config from Heroku (local : .env)
const PREFIX = process.env.PREFIX;
const TOKEN = process.env.TOKEN;

/*
	###############
	REQUIREMENTS
	###############
*/
// Reading file system
const fs = require('fs');
// Init Discord module
const Discord = require('discord.js');

/*
	###############
	BOT INIT
	###############
*/
// Create a new Discord client
const client = new Discord.Client();
// Init Command Collection
client.commands = new Discord.Collection();
// Cooldowns
const cooldowns = new Discord.Collection();
// Retrieve dynamically all comands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

/*
	###############
	ON READY
	###############
*/
// When client is ready, do something
client.once('ready', () => {
	console.log('Ready!');
});

/*
	###############
	ON MESSAGE
	###############
*/
// Listening for messages where bot has access
client.on('message', (message) => {
	// If no prefix or the message is from the bot exit
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	/*
		****************
		GET COMMAND AND ARGS
		****************
	*/
	// Get args and commandName
	const args = message.content.slice(PREFIX.length).trim().split(/ +/); // Regex
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) {
		return message.reply('t\'es drunk ou quoi ?! Je connais pas cette commande !');
	}

	/*
		****************
		ARGS COMMAND
		****************
	*/
	// Check args if true and needed
	if (command.args && !args.length) {
		let reply = `Pas d'arguments ? SUS ${message.author.username} !`;
		if (command.usage) {
			reply += `\nSelon le code, tu dois faire comme ça : \`${PREFIX}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
	/*
		****************
		MODERATOR COMMAND
		****************
	*/
	// Guild only command
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	/*
		****************
		COOLDOWN COMMAND
		****************
	*/
	// Cooldown handling command to avoid spam
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`je n'aime pas les spammers, je serai toi j'attendrai ${timeLeft.toFixed(1)} secondes avant de me demander \`${PREFIX}${command.name}\` `);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	/*
		****************
		EXE COMMAND
		****************
	*/
	// Execute the command
	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('la commande a des erreurs, mais c\'est pas mon problème !');
	}

	console.log(message.content);
});

/*
	###############
	ON MEMBER ADD
	###############
*/
client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
	if (!channel) return;
	channel.send(`Bienvenue Pirate !\nTe voici membre de l'équipage de "${channel.guild.name}", ${member} !`);
});

/*
	###############
	BOT LOGIN
	###############
*/
// Bot Token login
client.login(TOKEN);