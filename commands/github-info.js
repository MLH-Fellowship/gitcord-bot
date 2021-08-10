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
            if (!args.length) {
                fetchGitHubToken(message.author.id).then(token => {
                    if (token.length !== 0){
                        return message.reply("Your GitHub token is on file: " + token[0].dataValues.token);
                    } else {
                        return message.reply("Your GitHub token isn't on file. Try again, specifying your GitHub token (once you do it, we'll store it securely)")
                    }
                });
            } else {
                githubToken = args[0];
                insertGitHubToken(message.author.id, githubToken).then(result => {
                    console.log(result);
                })
                writeToken(githubToken);
                return message.reply(
                    "GitHub auth was successful. Use -github-issue-number with the number of the issue you'd like to comment on."
                );
            }
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
      ca: fs.readFileSync('certs/cc-ca.crt')
                 .toString()
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
    }
  });
}

// Insert new a token with user Discord ID and passed argument
async function insertGitHubToken(discord_id, github_token){
    return await Tokens.create({
        id: discord_id,
        token: github_token,
    })
}

