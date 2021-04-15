const Database = require("@replit/database");

module.exports = {
    name: 'settings',
    description: 'UNFINISHED: View the configurations for this server.',
    usage: '<argA> <argB>',

    guildOnly: true,

    execute(message, args) {
        message.channel.send('Pong.');
    },
};