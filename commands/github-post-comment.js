const fs = require("fs");

module.exports = {
    name: "github-post-comment",
    description: "Post a comment on GitHub Issue or PR",
    execute(command, message, args) {
        // -github-post-comment: Posts desired comment on previously specified issue/PR
        if (command === "github-post-comment") {
            let comment = args[0];
            readToken();
            postComment(comment);
        }

        function readToken() {
            try {
                const data = fs.readFileSync("./github-token.txt", "utf8");
                return data;
            } catch (err) {
                console.error(err);
            }
        }

        // Post Comment function
        async function postComment(comment) {
            // GitHub Variables
            const owner = "MLH-Fellowship";
            const repo = "pod-3.1.3-team-4";
            let issue = "4";
            let githubToken = readToken();

            // Intialise GitHub API
            const { Octokit } = require("@octokit/core");
            const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
            const MyOctokit = Octokit.plugin(restEndpointMethods);
            let octokit = new MyOctokit({ auth: githubToken });

            await octokit.rest.issues
                .createComment({
                    owner: owner,
                    repo: repo,
                    issue_number: issue,
                    body: comment,
                })
                .then((result) => {
                    console.log(result);
                    return message.reply("Your comment: " + comment + " has been posted.");
                })
                .catch((error) => console.log(error));
        }
    },
};
