require("dotenv").config();
const { REST, SlashCommandBuilder, Routes } = require("discord.js");

const token = process.env.BOT_TOKEN;
const clientID = process.env.CLIENT_ID;

const commands = [
    // Add commands
    new SlashCommandBuilder()
        .setName("github")
        .setDescription("Set up GitHub authentication")
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands(clientID), {
            body: commands,
        });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();