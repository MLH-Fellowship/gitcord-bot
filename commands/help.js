module.exports = {
	name: "help",
	description: "Help bot commands",
	execute(command, message, args) {
        const data = [];
        const listCommands =[{
            name: "github",
            description:"To get you started with posting comments on githubs issues/PR."
        },
        {
            name: "github-info",
            description:"Lets you enter your github personal token to authenticate the bot."
        },
        {
            name: "github-issue-number",
            description:"Tells the bot which issue you want to comment you."
        },
        {
            name: "github-post-comment",
            description: "Posts a comment for you on the previously specified issue."
        }];

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(listCommands.map(listCommand => listCommand.name).join(', '));
            data.push(`\nYou can send \`-help [command name]\` to get info on a specific command!`);

            return message.reply(data, { split: true })
                .then(() => {
                    // if (this.channel.type === 'dm') return;
                    // this.channel.send('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error( error);
                    return message.reply('Sorry could not fetch the help commands :(');
                });
        }

        const name = args[0].toLowerCase();
        let listCommand = null;
        listCommands.map(cmnd => 
            {
                if (cmnd.name===name)
                listCommand=cmnd;
            })
         //|| commands.find(c => c.aliases && c.aliases.includes(name));

        if (!listCommand) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${listCommand.name}`);

        //if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (listCommand.description) data.push(`**Description:** ${listCommand.description}`);
        //if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        //data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.reply(data, { split: true });
    }

  } 