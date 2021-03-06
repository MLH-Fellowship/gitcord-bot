const db = require("../database");
const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const MyOctokit = Octokit.plugin(restEndpointMethods);

module.exports = {
    name: "github-post-comment",
    description: "Post a comment on GitHub Issue or PR",
    usage: "-github-post-comment <organization-name> <repo-name> <issue-number> <your-comment>",
    example: "-github-post-comment MLH-Fellowship gitcord-bot 32 your comment",
    execute(command, message, args, octokit) {
        // -github-post-comment: Posts desired comment on previously specified issue/PR
        if (command === "github-post-comment") {
            let comment = args.slice(3);
            comment = comment.join(" ");
            postComment(comment, octokit);
        }

        // Post Comment function
        async function postComment(comment, octokit) {
            await octokit.rest.issues
                .createComment({
                    owner: args[0],
                    repo: args[1],
                    issue_number: args[2],
                    body: comment,
                })
                .then(() => {
                    return message.reply(
                        `Your comment, "${comment}" has been posted on ${args[0]}'s repo, ${args[1]} in issue/PR #${args[2]}.`
                    );
                })
                .catch((error) => {
                    console.info(error);
                    return message.reply(
                        "Posting your comment was unsuccessful. Please ensure you have set your GitHub token using -github and entered the information in the correct order of organisation name, repo name, issue/PR number and comment and then try again."
                    );
                });
        }
    },
};
