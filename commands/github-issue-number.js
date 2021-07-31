module.exports = {
	name: "github-issue-number",
	description: 'GitHub bot command 2',
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

    // -github-issue-number: Get issue/PR number from user
    if (command === "github-issue-number") {
        issue = parseInt(args[0]);
  
        if (isNaN(issue)) {
          return message.reply("sorry, that isn't a valid issue number.").catch(error => console.log(error));
        } else {
          return message.reply("to post a comment on issue " + issue + " , use -github-post-comment followed by your message.");
        }
      } 
    }
}