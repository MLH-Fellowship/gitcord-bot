const fs = require("fs");

module.exports = {
    name: "github-post-comment",
    description: "Post a comment on GitHub Issue or PR",
    execute(command, message, args) {
        // -github-post-comment: Posts desired comment on previously specified issue/PR
        if (command === "github-post-comment") {
            comment = args.slice(3);
            comment = comment.join(" ");
            readToken();
            postComment(comment, args);
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
        async function postComment(comment) {
            // GitHub Variables
            let githubToken = readToken();

            // Intialise GitHub API
            const { Octokit } = require("@octokit/core");
            const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
            const MyOctokit = Octokit.plugin(restEndpointMethods);
            let octokit = new MyOctokit({ auth: githubToken });

            await octokit.rest.issues
                .createComment({
                    owner: args[0],
                    repo: args[1],
                    issue_number: args[2],
                    body: comment,
                })
                .then((result) => {
                    return message.reply(
                        "Your comment '" +
                            comment +
                            "' has been posted on " +
                            args[0] +
                            "'s repo, " +
                            args[1] +
                            " in issue/PR " +
                            "#" +
                            args[2] +
                            "."
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
