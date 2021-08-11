const fs = require("fs");

const fetchGit = async (discordID) => {
    let newToken = await fetchGitHubToken(discordID);
    return newToken;
}

// CockroachDB Implementation
const Sequelize = require("sequelize-cockroachdb");

require("dotenv").config();

// Connect to CockroachDB through Sequelize
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

// Update an entry with a new token if the insertGitHubToken throws an error
async function updateGitHubToken(discord_id, github_token){
    return await Tokens.update({token: github_token}, {
        where: {
            id: discord_id,
        }
    });
}

module.exports = { fetchGit, insertGitHubToken, updateGitHubToken };
