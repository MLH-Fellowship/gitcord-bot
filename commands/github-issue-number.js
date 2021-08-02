const fs = require("fs");

module.exports = {
    name: "github-issue-number",
    description: "Get the issue/PR number to post on from the user",
    execute(command, message, args) {
        // -github-issue-number: Get issue/PR number from user
        if (command === "github-issue-number") {
            // FIX: Can't parseInt issue number as must be string from file writing
            //issue = parseInt(args[0]);
            issue = args[0];
            //if (isNaN(issue)) {
            //    return message.reply("sorry, that isn't a valid issue number.").catch(//(error) => console.log(error));
            //} else {
            // TODO: Refactor to export issue number as function module to post-comment file or JSON array in JSON file with other GitHub info
            try {
                const data = fs.writeFileSync("./github-issue-number.txt", issue);
            } catch (err) {
                console.error(err);
                return message.reply(
                    "Your issue/PR number was not saved. Please try again."
                );
            }
            return message.reply(
                "to post a comment on issue " + issue + " , use -github-post-comment followed by your message."
            );
            // }
        }
    },
};
