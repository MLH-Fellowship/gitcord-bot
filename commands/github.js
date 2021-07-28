const Discord = require('discord.js');
const func= {
    botMessage: function(message) {
        if(message==="github")
      return this.channel.send("yay works!");
  }
}
module.exports=func;