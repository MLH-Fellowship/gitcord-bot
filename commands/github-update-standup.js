const fs = require("fs");
const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const MyOctokit = Octokit.plugin(restEndpointMethods);

module.exports = {
    name: "github-update-standup",
    description: "Update a comment on a GitHub discussion",
    execute(command, message, args) {
        // -github-post-standup: Posts desired comment on a GitHub Discussion
        if (command === "github-update-standup") {
            let comment = args.slice(4);
            comment = comment.join(" ");
            let octokit = new MyOctokit({ auth: readToken() });
            postComment(comment, octokit);
        }

        function readToken() {
            try {
                const data = fs.readFileSync("./.github-token.txt", "utf8");
                return data;
            } catch (err) {
                console.error(err);
                return message.reply(
                    "Your GitHub Personal Access Token could not been read. Please set it again using -github-info."
                );
            }
        }

        // Post Comment function
        async function postComment(comment, octokit) {
            await octokit.rest.teams
                .updateDiscussionCommentInOrg({
                    org: args[0],
                    team_slug: args[1],
                    discussion_number: args[2],
                    comment_number: args[3],
                    body: comment,
                })
                .then(() => {
                    return message.reply(
                        `Your comment "${comment}" has been updated on ${args[1]}'s discussion #${args[2]}.`
                    );
                })
                .catch((error) => {
                    console.info(error);
                    return message.reply(
                        "Updating your comment was unsuccessful. Please ensure you have set your GitHub token using -github and entered the information in the correct order of organisation name, team name, discussion number, comment number and comment and then try again."
                    );
                });
        }
    },
};
