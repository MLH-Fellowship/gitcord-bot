const getToken = require("../github");
const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const MyOctokit = Octokit.plugin(restEndpointMethods);

module.exports = {
    name: "github-update-standup",
    description: "Update a comment on a GitHub discussion",
    usage: "-github-update-standup <your-updated-comment>",
    execute(command, message, args) {
        // -github-update-standup: Updates desired comment on a GitHub Discussion
        if (command === "github-update-standup") {
            let comment = args.slice(4);
            comment = comment.join(" ");
            let octokit = new MyOctokit({ auth: getToken.readToken() });
            postComment(comment, octokit);
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
