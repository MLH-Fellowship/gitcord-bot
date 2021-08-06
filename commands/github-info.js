const fs = require("fs");
const db = require("../database.js")

module.exports = {
    name: "github-info",
    description: "Get GitHub Personal Access Token",
    execute(command, message, args) {
        let githubToken = null;

        function writeToken(githubToken) {
            try {
                console.info("GitHub token is " + githubToken);
                const data = fs.writeFileSync("./github-token.txt", githubToken);
            } catch (err) {
                console.error(err);
                return message.reply(
                    "GitHub auth was unsuccessful. Please try again."
                );
            }
        }

        // -github-info: Get contents of personal token
        if (command === "github-info") {
            if (!args.length) {
                const github_token = db.execute(1);
                console.log("Github token is " + github_token);
                return message.reply("you didn't provide a GitHub Personal Token.");
            } else {
                githubToken = args[0];
                writeToken(githubToken);
                return message.reply(
                    "GitHub auth was successful. Use -github-issue-number with the number of the issue you'd like to comment on."
                );
            }
        }
    },
};
