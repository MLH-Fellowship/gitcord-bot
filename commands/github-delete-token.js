const db = require("../database");

module.exports = {
    name: "github-delete-token",
    description: "Deletes Your GitHub Token From Our Database Permanently",
    usage: "-github-delete-token",
    execute(command, message, args) {
        if (!args.length) {
        db.deleteGitHubToken(message.author.id).then((result) => {
            if (result === 1) {
                return message.reply(`Your GitHub token has been permanently deleted.`);
            } else {
                return message.reply(`Your GitHub token has not been deleted. This could only mean we don't have your token on file.`)
            }

        }).catch((err) => {
            console.error(err);
            return message.reply("Your GitHub token isn't on file. Try again, specifying your GitHub token (once you do it, we'll store it securely)");
        });
        }
    }
};
