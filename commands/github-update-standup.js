const db = require("../database");
const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const MyOctokit = Octokit.plugin(restEndpointMethods);

module.exports = {
    name: "github-update-standup",
    description: "Update a comment on a GitHub discussion",
    usage: "-github-update-standup <organization-name> <team-name> <discussion-number> <comment-number> <your-updated-comment>",
    example: "\n -github-update-standup MLH-Fellowship pod-3-1-3 8 15 \n" +
        "**What did you achieve in the last 24 hours?**:\n" +
        " - updated note \n" +
        "\n" +
        "**What are your priorities for the next 24 hours?**:\n" +
        " - updated note\n" +
        "\n" +
        "**Blockers**:\n" +
        " -\n" +
        "\n" +
        "**Shoutouts**:\n" +
        " - @username for x",
    execute(command, message, args, octokit) {
        // -github-update-standup: Updates desired comment on a GitHub Discussion
        if (command === "github-update-standup") {
            let comment = args.slice(4);
            comment = comment.join(" ");
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
                        `Your comment \n"${comment}"\n has been updated on ${args[1]}'s discussion #${args[2]}.`
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
