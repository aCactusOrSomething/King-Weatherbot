const {prefix} = require('../../config.json');

module.exports = {
    name: 'help',
    description: 'Lists the commands, or information about specific commands.',
    aliases: ['commands', '?'],
    usage: '<command name>',
    cooldown: 5,

    execute(message, args, guildSettings) {
        const data = [];
        const {commands} = message.client;

        //generic use case
        if(!args.length) {
            data.push("Here's a list of all my commands:");
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nUse \`${prefix}${this.name} ${this.usage}\` to get info on a specific command!`);

            return message.channel.send(data, {split: true});
        }

        //specific asks
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command) {
            return message.reply("that's not a command I know!");
        }

        data.push(`**Name:** ${command.name}`);
        if(command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if(command.description) data.push(`**Description:** ${command.description}`);
        if(command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown} seconds`);

        return message.channel.send(data, {split: true});

    },
};