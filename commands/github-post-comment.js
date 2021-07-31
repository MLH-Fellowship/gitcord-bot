module.exports = {
	name: "github-post-comment",
	description: 'Post a comment on GitHub Issue or PR',
	execute(command, message, args) {
        // Intialise GitHub API
        const github = require("octonode");
        let githubToken= null;
        let client = github.client(githubToken);
        const scopes = {
        scopes: ["user", "repo"],
        note: "admin script",
        };

        // GitHub API Methods
        const ghme = client.me();
        const ghsearch = client.search();

        // TODO: Refactor var content to variables - array? class? or just use content instead of client
        const repo = "MLH-Fellowship/pod-3.1.3-team-4";
        let issue = null;
        const ghuser = client.user("Inoxia25");
        const ghrepo = client.repo("MLH-Fellowship/pod-3.1.3-team-4");

        // -github-post-comment: Posts desired comment on previously specified issue/PR
        if (command === "github-post-comment") {
            let comment = args[0];
            postComment(issue, comment);
        }

        // Post Comment function
        async function postComment(issue, comment) { 
            await client.issue(repo, issue).createCommentAsync({
                body: comment,
            }).then(result => {
                return message.reply("Your comment: " + result[0].body + " has been posted.");
            }).catch(error => console.log(error));
        }
    }
}