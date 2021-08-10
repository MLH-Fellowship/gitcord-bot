const db = require("../database");

module.exports = {
    name: "github-info",
    description: "Get GitHub Personal Access Token",
    execute(command, message, args) {
        if (!args.length) {
        db.fetchGit(message.author.id).then((result) => {
            return message.reply(`Your GitHub token is on file: ${result}`);
        }).catch((err) => {
            console.error(err);
            return message.reply("Your GitHub token isn't on file. Try again, specifying your GitHub token (once you do it, we'll store it securely)");
        });

        } else {
            let githubToken = args[0];
            db.insertGitHubToken(message.author.id, githubToken).then(result => {
                return message.reply(
                    "GitHub auth was successful. Use -help to see what actions you can now take."
                );
            }).catch((err) => {
                console.error(err);
            });
        }
    }
};
