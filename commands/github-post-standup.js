const fs = require("fs");

module.exports = {
    name: "github-post-standup",
    description: "Post a comment on a GitHub discussion",
    execute(command, message, args) {
        // -github-post-standup: Posts desired comment on a GitHub Discussion
        if (command === "github-post-standup") {
            postComment(args);
        }

        function readToken() {
            try {
                const data = fs.readFileSync("./github-token.txt", "utf8");
                return data;
            } catch (err) {
                console.error(err);
                return message.reply(
                    "Your GitHub Personal Access Token could not been read. Please set it again using -github-info."
                );
            }
        }

        // Post Comment function
        async function postComment(args) {
            // GitHub Variables
            let githubToken = readToken();

            // Intialise GitHub API
            const { Octokit } = require("@octokit/core");
            const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
            const MyOctokit = Octokit.plugin(restEndpointMethods);
            let octokit = new MyOctokit({ auth: githubToken });

            // Post Discussion Comment
            await octokit.rest.teams
                .createDiscussionCommentInOrg({
                    org: args[0],
                    team_slug: args[1],
                    discussion_number: args[2],
                    body: args[3],
                })
                .then((result) => {
                    return message.reply(
                        "Your comment '" +
                            args[3] +
                            "' has been posted on " +
                            args[1] +
                            "'s discussion #" +
                            args[2] +
                            "."
                    );
                })
                .catch((error) => {
                    console.info(error);
                    return message.reply(
                        "Posting your comment was unsuccessful. Please ensure you have set your GitHub token using -github and entered the information in the correct order of organisation name, team name, discussion number and comment and then try again."
                    );
                });
        }
    },
};
