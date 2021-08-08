module.exports = {
  name: "help",
  description: "Help bot commands",
  execute(command, message, args) {
    const data = [];
    const { commands } = message.client;
    if (!args.length) {
      data.push("Here's a list of all my commands:");
      data.push(commands.map((command) => command.name).join("\n"));
      data.push(
        "\nYou can send -help [command name] to get info on a specific command!"
      );

      return message
        .reply(data, { split: true })
        .then(() => {})
        .catch((error) => {
          console.error(error);
          return message.reply("Sorry could not fetch the help commands :(");
        });
    }

    const name = args[0].toLowerCase();
    let listCommand = null;
    commands.map((cmnd) => {
      if (cmnd.name === name) listCommand = cmnd;
    });
    //|| commands.find(c => c.aliases && c.aliases.includes(name));
    if (!listCommand) {
      return message.reply("that's not a valid command!");
    }
    data.push("**Name: **" + listCommand.name);
    //if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (listCommand.description)
      data.push("**Description: **" + listCommand.description);
    //if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
    message.reply(data, { split: true });
  },
};
