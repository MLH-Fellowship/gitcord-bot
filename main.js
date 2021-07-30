require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const tester = require("./commands/testing");
const githubCommands = require("./commands/github");
const prefix = "-";

// checking if bot is ready
client.once("ready", () => {
    console.log("Encourage Bot is online");
});

// taking in the commands
client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command.includes("github")) { 
        githubCommands.botMessage.call(message, command, args);
    } else {
        tester.botMessage.call(message, command, args);
    }
});

// bot token
client.login(process.env.DISCORD_TOKEN);