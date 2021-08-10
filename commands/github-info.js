const fs = require("fs");

module.exports = {
    name: "github-info",
    description: "Get GitHub Personal Access Token",
    execute(command, message, args) {
        if (!args.length) {

            const fetchGit = async () => {
                let newToken = await fetchGitHubToken(message.author.id);
                if (newToken) {
                return message.reply(`Your GitHub token is on file: ${newToken}`);
            } else {
                return message.reply("Your GitHub token isn't on file. Try again, specifying your GitHub token (once you do it, we'll store it securely)")
            }
        }

        fetchGit();

        } else {
            let githubToken = args[0];
            insertGitHubToken(message.author.id, githubToken).then(result => {
                console.log(result);
            });
            return message.reply(
                "GitHub auth was successful. Use -help to see what actions you can now take."
            );
        }
    }
};

// CockroachDB Implementation

const Sequelize = require("sequelize-cockroachdb");

// For sensitive information
require("dotenv").config();

// Connect to CockroachDB through Sequelize.
var sequelize = new Sequelize({
    dialect: "postgres",
    username: "damir",
    password: process.env.COCKROACH_DB_PASSWORD,
    host: process.env.COCKROACH_DB_HOST,
    port: 26257,
    database: process.env.COCKROACH_DB_DATABASE,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
            // For secure connection:
            ca: fs.readFileSync("certs/cc-ca.crt").toString(),
        },
    },
    logging: false,
});

// Define the Tokens model for the "defaultdb" table.
const Tokens = sequelize.define("defaultdb", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING,
    },
});

// Get a token with user Discord ID
async function fetchGitHubToken(discord_id) {
    return await Tokens.findAll({
        where: {
            id: discord_id,
        },
    }).then((result) => {
       return result[0].token;
    });
}

// Insert new a token with user Discord ID and passed argument
async function insertGitHubToken(discord_id, github_token) {
    return await Tokens.create({
        id: discord_id,
        token: github_token,
    });
}
