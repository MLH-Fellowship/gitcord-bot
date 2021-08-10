const fs = require("fs");

module.exports = {
    name: "github-info",
    description: "Get GitHub Personal Access Token",
    usage: "-github-info <your-github-personal-access-token>",
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
                return message.reply("you didn't provide a GitHub Personal Token.");
            } else {
                let githubToken = args[0];
                writeToken(githubToken);
                return message.reply(
                    "GitHub auth was successful. Use -github-issue-number with the number of the issue you'd like to comment on."
                );
            }
        }
    },
};
