const db = require("../database");
const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const MyOctokit = Octokit.plugin(restEndpointMethods);

module.exports = {
    name: "github-post-standup",
    description: "Post a comment on a GitHub discussion",
    usage: "github-post-standup <your-comment-for-github-discussion>",
    execute(command, message, args) {
        // -github-post-standup: Posts desired comment on a GitHub Discussion
        if (command === "github-post-standup") {
            let comment = args.slice(3);
            comment = comment.join(" ");
            db.fetchGit(message.author.id).then((result) => {
                let octokit = new MyOctokit({ auth: result });
                postComment(comment, octokit);
            }).catch((err) => {
                console.error(err);
                return message.reply("Your GitHub token isn't on file. Run -github-info, specifying your GitHub token (and then try this again)");
            });
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
