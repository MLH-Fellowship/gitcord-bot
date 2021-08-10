//GitHub Token
const fs = require("fs");

function readToken() {
    try {
        const data = fs.readFileSync("./.github-token.txt", "utf8");
        return data;
    } catch (err) {
        console.error(err);
    }
}

module.exports = { readToken };
