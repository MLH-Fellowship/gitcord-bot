//GitHub Token
const fs = require("fs");

function readToken() {
    try {
        const data = fs.readFileSync("./.github-token.txt", "utf8");
        return data;
    } catch (err) {
        console.error(err);
        //return message.reply(
        //    "Your GitHub Personal Access Token could not been read. Please set it again using -github-info."
        // );
    }
}

module.exports = { readToken };
