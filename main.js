const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-';

// checking if bot is ready
client.once('ready', () =>{
    console.log('Encourage Bot is online');
});

// taking in the commands
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
	message.channel.send('pong!');
    } else if (command === 'works') {
	message.channel.send('kinda');
    }
	
});

// bot token (test mode - going to regenerate a new token and use an env variable instead)
client.login('ODY5NzQ1NzAyOTU4NDA3NzIx.YQCrzg.SBy99VDx3s4oFrFaTT5m5HUzzqU');
