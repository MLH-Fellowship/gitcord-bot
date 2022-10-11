require("dotenv").config();
const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
const clientID = process.env.CLIENT_ID;

// for global commands
rest.put(Routes.applicationCommands(clientID), { body: [] })
    .then(() => console.log("Successfully deleted all application commands."))
    .catch(console.error);