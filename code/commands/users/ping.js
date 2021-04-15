module.exports = {
    name: 'ping', //name displayed in help text
    description: 'Ping!', //description displayed in help text
    
    args: false, //set to true if this command requires arguments
    usage: '<argA> <argB>', //if you have args, list their names here.
    guildOnly: false, //set to true if this command is locked to guilds
    cooldown: 5, //cooldown time in seconds before this user can use this command again
    aliases: ['pong', 'test'], //alternate names that work when using this command
    //permissions: 'KICK_MEMBERS', //restricts command to set users with specific permissions

    execute(message, args, guildSettings) {
        message.channel.send('Pong.');
    },
};