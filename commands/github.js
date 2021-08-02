module.exports = {
	name: "github",
	description: 'DMs user to prompt for GitHub Personal Access Token',
	execute(command, message) {
  // -github: Enter personal token
    if (command === "github") {
      return message.author.send("use -github-info with your personal Github token to continue.");
    }
  }
} 
