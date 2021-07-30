const Discord = require('discord.js');
const func= {
    botMessage: function(message,args) {
        const data = [];
		//const { commands } = this.client;
        console.log(this.client);
        
        const commands =[{
            name: "github",
            description:"To get you started with posting comments on githubs issues/PR."
        },
        {
            name: "github-info",
            description:"Lets you enter your github personal token to authenticate the bot."
        },
        {
            name: "github-comment-issue",
            description:"Tells the bot to post a comment on an issue."
        },
        {
            name: "github-issue-number",
            description:"Tells the bot which issue you want to comment you."
        },
        {
            name: "github-post-comment",
            description:"Tells the bot what you want to comment on the issue."
        }];
        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`-help [command name]\` to get info on a specific command!`);
        
            return this.channel.send(data, { split: true })
                .then(() => {
                    // if (this.channel.type === 'dm') return;
                    // this.channel.send('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error( error);
                    this.channel.send('Sorry could not fetch the help commands :(');
                });
        }

        const name = args[0].toLowerCase();
        let command = null;
        commands.map(cmnd => 
            {
                if (cmnd.name===name)
                command=cmnd;
            })
         //|| commands.find(c => c.aliases && c.aliases.includes(name));
        
        if (!command) {
            return message.reply('that\'s not a valid command!');
        }
        
        data.push(`**Name:** ${command.name}`);
        
        //if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        //if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        
        //data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
        
        this.channel.send(data, { split: true });
    }
   
  }

module.exports=func;