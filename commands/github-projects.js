const db = require("../database");
const { Octokit } = require("@octokit/core");
const { restEndpointMethods } = require("@octokit/plugin-rest-endpoint-methods");
const MyOctokit = Octokit.plugin(restEndpointMethods);

module.exports = {
    name: "github-projects",
    description: "GitHub Project Functionality",
    usage: "To create a new Github project, add create followed by the owner, repo and project title (-github-project create-project repo-owner repo-name project-title).\nTo create a new column, add create-column followed by project id and name (-github-project create-column project-id column-name).",
    execute(command, message, args) {
        // -github-projects: Selects GitHub Project Functionality
        if (command === "github-projects") {
            switch (args[0]) {
                case "create-project":
                    if (!args[1]) {
                        return message.reply(
                            "to create a new GitHub Project, add create followed by the owner, repo and project title (-github-project create-project repo-owner repo-name project-title)."
                        );
                    } else {
                        let projectTitle = args.slice(3);
                        projectTitle = projectTitle.join(" ");
                        db.fetchGit(message.author.id).then((result) => {
                            let octokit = new MyOctokit({ auth: result });
                            createProject(projectTitle, octokit);
                        }).catch((err) => {
                            console.error(err);
                            return message.reply("Your GitHub token isn't on file. Run -github-info, specifying your GitHub token (and then try this again)");
                        });
                    }
                    break;
                case "create-column":
                    if (!args[1]) {
                        return message.reply(
                            "to create a new column, add create-column followed by project id and name (-github-project create-column project-id column-name)."
                        );
                    } else {
                        let columnName = args.slice(2);
                        columnName = columnName.join(" ");
                        db.fetchGit(message.author.id).then((result) => {
                            let octokit = new MyOctokit({ auth: result });
                            createColumn(columnName, octokit);
                        }).catch((err) => {
                            console.error(err);
                            return message.reply("Your GitHub token isn't on file. Run -github-info, specifying your GitHub token (and then try this again)");
                        });
                    }
                    break;
                case "select-project":
                    if (!args[1]) {
                        return message.reply("please provide your GitHub Project ID in order to select a project.");
                    } else {
                        db.fetchGit(message.author.id).then((result) => {
                            let octokit = new MyOctokit({ auth: result });
                            getProject(args[1], octokit);
                        }).catch((err) => {
                            console.error(err);
                            return message.reply("Your GitHub token isn't on file. Run -github-info, specifying your GitHub token (and then try this again)");
                        });
                    }
                    break;
                case "select-column":
                    if (!args[1]) {
                        return message.reply("please provide your GitHub Column ID in order to select a column.");
                    } else {
                        db.fetchGit(message.author.id).then((result) => {
                            let octokit = new MyOctokit({ auth: result });
                            getCards(args[1]), octokit;
                        }).catch((err) => {
                            console.error(err);
                            return message.reply("Your GitHub token isn't on file. Run -github-info, specifying your GitHub token (and then try this again)");
                        });
                    }
                    break;
                default:
                    return message.reply(
                        "add create (-github-projects create-project) to create a new project or select (-github-projects select-project) to select an existing project."
                    );
            }
        }

        // Create Project function
        async function createProject(projectTitle, octokit) {
            octokit.rest.projects
                .createForRepo({
                    owner: args[1],
                    repo: args[2],
                    name: projectTitle,
                })
                .then(() => {
                    return message.reply(
                        `your new project, ${projectTitle} has been created in ${args[1]}'s repo, ${args[2]}.`
                    );
                })
                .catch((error) => {
                    console.error(error);
                    return message.reply(
                        "creating your project was unsuccessful. Please ensure you have set your GitHub token using -github and entered the information in the correct order of organisation name, repo name and project title and then try again."
                    );
                });
        }

        // Create Column function
        async function createColumn(columnName, octokit) {
            octokit.rest.projects
                .createColumn({
                    project_id: args[1],
                    name: columnName,
                })
                .then(() => {
                    return message.reply(
                        `Your new column, ${columnName} has been successfully created in project #${args[1]}.`
                    );
                })
                .catch((error) => {
                    console.error(error);
                    return message.reply(
                        "creating a column was unsuccessful. Please ensure you have set your GitHub token using -github and provided the correct project ID and a unique column name and then try again."
                    );
                });
        }

        // Get Project function
        async function getProject(projectID, octokit) {
            octokit.rest.projects
                .get({
                    project_id: projectID,
                })
                .then(() => {
                    getColumns(projectID);
                })
                .catch((error) => {
                    console.error(error);
                    return message.reply(
                        "retrieving your project was unsuccessful. Please ensure you have set your GitHub token using -github and provided the correct project ID and then try again."
                    );
                });
        }

        // Get Columns Function
        async function getColumns(projectID, octokit) {
            octokit.rest.projects
                .listColumns({
                    project_id: projectID,
                })
                .then((result) => {
                    console.info(result.data);
                    let columns = [];
                    result.data.forEach((column) => {
                        columns.push(column.name);
                    });
                    columns = columns.join("\r\n • ");
                    return message.reply(
                        `your project #${projectID} has the following columns:
                        • ${columns}`
                    );
                })
                .catch((error) => {
                    console.error(error);
                    return message.reply(
                        "Retrieving the columns for your project was unsuccessful. Please ensure you have set your GitHub token using -github and provided the correct project ID and then try again."
                    );
                });
        }

        // Get Cards Function
        async function getCards(columnID, octokit) {
            octokit.rest.projects
                .listCards({
                    column_id: columnID,
                })
                .then((result) => {
                    console.info(result.data);
                    return message.reply("Cards in column #" + columnID + " have been successfully retrieved.");
                })
                .catch((error) => {
                    console.error(error);
                    return message.reply(
                        "Retrieving the cards in this column was unsuccessful. Please ensure you have set your GitHub token using -github and provided the correct column ID and then try again."
                    );
                });
        }
    },
};
