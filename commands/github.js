module.exports = {
	name: "github",
	description: 'Introduce user to GitHub commands',
	execute(command, message, args) {
    console.log("Command is" + command);
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

    // -github: Enter personal token
    if (command === "github") {
      return message.reply("use -github-info with your personal Github token to continue.");
    }
  }
} 