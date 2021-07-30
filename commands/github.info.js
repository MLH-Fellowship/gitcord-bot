module.exports = {
	name: "github-info",
	description: 'GitHub bot command 2',
	execute(command, message, args) {
		// Intialise GitHub API
        console.log("Executed");
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

    // -github-info: Get contents of personal token
    if (command === "github-info") {
      if (!args.length) {
        return message.reply("you didn't provide a GitHub Personal Token.");
      } else {
      githubToken = args[0];
      client = github.client(githubToken);
      return message.reply("GitHub auth was successful. Use -github-issue-number with the number of the issue you'd like to comment on.");
      }
    }
}
}