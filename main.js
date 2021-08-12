require("dotenv").config();

const fs = require("fs");
const Discord = require("discord.js");
const prefix = "-";
const client = new Discord.Client();
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

client.commands = new Discord.Collection();

const db = require("./database");
const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const MyOctokit = Octokit.plugin(restEndpointMethods);

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
        db.fetchGit(message.author.id).then((result) => { // fetch GitHub token and initialize Octokit
            let octokit = new MyOctokit({ auth: result });
            client.commands.get(command).execute(command, message, args, octokit);
        }).catch((err) => {
            console.error(err);
            return message.reply("Your GitHub token isn't on file. Run -github-info, specifying your GitHub token (and then try this again)");
        });
    } catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command. Please try again.");
    }
});

// bot token
client.login(process.env.DISCORD_TOKEN);