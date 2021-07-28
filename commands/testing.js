const Discord = require('discord.js');
const func= {
    botMessage: function(message) {
        if(message==="ping")
      return this.channel.send("pong!");
      else if (message === 'works') {
        return this.channel.send('kinda');
    }
  }
}
module.exports=func;