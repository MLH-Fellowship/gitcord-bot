require("dotenv").config();

const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const prefix = "-";

// checking if bot is ready
client.once("ready", () => {
    console.log("Encourage Bot is online");
});

// taking in the commands
client.on("message", (message) => {
    console.log("Message:" + message.content);

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    console.log("Main Command is:" + command);

    if (!client.commands.has(command)) {
        //console.log("Command does not exist in github.js");
        return;
    }

	try {
		client.commands.get(command).execute(command, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// bot token
client.login(process.env.DISCORD_TOKEN);