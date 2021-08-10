const fs = require("fs");

module.exports = {
    name: "github-info",
    description: "Get GitHub Personal Access Token",
    execute(command, message, args) {
        function writeToken(githubToken) {
            try {
                console.info("GitHub token is " + githubToken);
                fs.writeFileSync("./.github-token.txt", githubToken);
            } catch (err) {
                console.error(err);
                return message.reply("GitHub auth was unsuccessful. Please try again.");
            }
        }

        // -github-info: Get contents of personal token
        if (command === "github-info") {
            const fetchGit = async () => {
                let newToken = await fetchGitHubToken(message.author.id);
                console.log(newToken);
            };
            fetchGit();
            // const fetchGit = fetchGitHubToken(message.author.id).then(//(result) => {
            //      return result;
            //  });
            // console.log(fetchGit);
        }
    },
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
        return result;
    });
}

// Insert new a token with user Discord ID and passed argument
async function insertGitHubToken(discord_id, github_token) {
    return await Tokens.create({
        id: discord_id,
        token: github_token,
    });
}
