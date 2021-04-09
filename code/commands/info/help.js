const {prefix} = require('../../config.json');

module.exports = {
    name: 'help',
    description: 'Lists the commands, or information about specific commands.',
    aliases: ['commands', '?'],
    usage: '<command name>',
    cooldown: 5,

    execute(message, args) {
        const data = [];
        const {commands} = message.client;

        if(!args.length) {
            data.push("Here's a list of all my commands:");
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nUse \`${prefix}${name} ${usage}\` to get info on a specific command!`);

            message.reply(data, {split: true});
        }
    },
};