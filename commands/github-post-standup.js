const db = require("../database");
const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const MyOctokit = Octokit.plugin(restEndpointMethods);

module.exports = {
    name: "github-post-standup",
    description: "Post a comment on a GitHub discussion",
    usage: "github-post-standup <organization-name> <team-name> <discussion-number> <your-comment>",
    example: "\n -github-post-standup MLH-Fellowship pod-3-1-3 8 \n" +
        "**What did you achieve in the last 24 hours?**:\n" +
        " - \n" +
        "\n" +
        "**What are your priorities for the next 24 hours?**:\n" +
        " - \n" +
        "\n" +
        "**Blockers**:\n" +
        " -\n" +
        "\n" +
        "**Shoutouts**:\n" +
        " - @username for x",
    execute(command, message, args, octokit) {
        // -github-post-standup: Posts desired comment on a GitHub Discussion
        if (command === "github-post-standup") {
            let comment = args.slice(3);
            comment = comment.join(" ");
            postComment(comment, octokit);
        }

        // Post Comment function
        async function postComment(comment, octokit) {
            await octokit.rest.teams
                .createDiscussionCommentInOrg({
                    org: args[0],
                    team_slug: args[1],
                    discussion_number: args[2],
                    body: comment,
                })
                .then(() => {
                    return message.reply(
                        `Your comment ${comment} has been posted on ${args[1]}'s discussion #${args[2]}.`
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
