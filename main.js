require("dotenv").config();

const fs = require("fs");
const Discord = require("discord.js");
const prefix = "-";
const client = new Discord.Client();
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

client.commands = new Discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("GitCord Bot is online");
});

// taking in the commands
client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    // Message and Command logging
    console.log("Message is:", message.content);
    console.log("Command is:", command);

    if (!client.commands.has(command)) {
        console.log("Command does not exist.");
        return;
    }

    try {
        client.commands.get(command).execute(command, message, args);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command. Please try again.");
    }
});

// bot token
client.login(process.env.DISCORD_TOKEN);