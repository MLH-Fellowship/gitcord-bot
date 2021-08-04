const fs = require("fs");

module.exports = {
    name: "github-projects",
    description: "GitHub Project Functionality",
    execute(command, message, args) {
        // -github-projects: Selects GitHub Project Fnctionality
        if (command === "github-projects") {
            // TODO: Refactor into Switch Statement - see Code Freeze PR Notes
            if (!args[0]) {
            return message.reply(
                "add create (-github-projects create) to create a new project or select (-github-projects select) to select an existing project."
            );
            // Create Project
            } else if (args[0] === "create" && !args[1]) {
                return message.reply(
                    "to create a new GitHub Project, add create followed by the owner, repo and project title (-github-project create repo-owner repo-name project-title)."
                )
            } else if (args[0] === "create" && args[1]) {
                let projectTitle = args.slice(3);
                projectTitle = projectTitle.join(" ");
                createProject(projectTitle, args);
                // Select Project
            } else if (args[0] === "select" && !args[1]) {
                return message.reply(
                    "please provide your GitHub Project ID in order to select a project."
                )
            } else if (args[0] === "select" && args[1]) {
                //getCard(58322796);
                getProject(args[1]);
            }
        }

        function readToken() {
            try {
                const data = fs.readFileSync("./github-token.txt", "utf8");
                return data;
            } catch (err) {
                console.error(err);
                return message.reply(
                    "your GitHub Personal Access Token could not been read. Please set it again using -github-info."
                );
            }
        }

        // Create Project function
        async function createProject (projectTitle, args) {
            // GitHub Variables
            let githubToken = readToken();

            // Intialise GitHub API
            const { Octokit } = require("@octokit/core");
            const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
            const MyOctokit = Octokit.plugin(restEndpointMethods);
            let octokit = new MyOctokit({ auth: githubToken });

            octokit.rest.projects.createForRepo({
                owner: args[1],
                repo: args[2],
                name: projectTitle,
              })
                .then((result) => {
                    return message.reply(
                        "your new project '" +
                            projectTitle +
                            "' has been created in " +
                            args[1] +
                            "'s repo, " +
                            args[2] +
                            "."
                    );
                })
                .catch((error) => {
                    console.error(error);
                    return message.reply(
                        "creating your project was unsuccessful. Please ensure you have set your GitHub token using -github and entered the information in the correct order of organisation name, repo name and project title and then try again."
                    );
                });
        }

        // Create Project function
        async function getProject (projectID, args) {
            // GitHub Variables
            let githubToken = readToken();

            // Intialise GitHub API
            const { Octokit } = require("@octokit/core");
            const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
            const MyOctokit = Octokit.plugin(restEndpointMethods);
            let octokit = new MyOctokit({ auth: githubToken });

            octokit.rest.projects.get({
                project_id: projectID,
              })
                .then((result) => {
                    return message.reply(
                            "your project #" + projectID + ", '" + result.data.name +
                                "' has been retrieved."
                    );
                })
                .catch((error) => {
                    console.error(error);
                    return message.reply(
                        "retrieving your project was unsuccessful. Please ensure you have set your GitHub token using -github and provided the correct project ID and then try again."
                    );
                });
        }

        // Get Card Function
        async function getCard (cardID, args) {
            // GitHub Variables
            let githubToken = readToken();

            // Intialise GitHub API
            const { Octokit } = require("@octokit/core");
            const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
            const MyOctokit = Octokit.plugin(restEndpointMethods);
            let octokit = new MyOctokit({ auth: githubToken });

            octokit.rest.projects.getCard({
                card_id: cardID,
              })
                .then((result) => {
                    console.info(result.data);
                    return message.reply(
                        "Card #" + cardID + " has been successfully retrieved" 
                    );
                })
                .catch((error) => {
                    console.error(error);
                    return message.reply(
                        "Retrieving your project was unsuccessful. Please ensure you have set your GitHub token using -github and provided the correct project ID and then try again."
                    );
                });
        }


    },
};
