const Database = require("@replit/database");
const db = new Database();

module.exports = {
    name: 'frequency', //name displayed in help text
    description: 'decide the random chance of each message I see activating a particular weather. Should be a decimal between 0 and 1.', //description displayed in help text
    
    args: true, //set to true if this command requires arguments
    usage: '<weather> <chance>', //if you have args, list their names here.
    guildOnly: true, //set to true if this command is locked to guilds
    cooldown: 5, //cooldown time in seconds before this user can use this command again
    aliases: ['freq', 'rate'], //alternate names that work when using this command
    permissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'], //restricts command to set users with specific permissions

    execute(message, args, guildSettings) {
        //message.channel.send('Pong.');

        if(args.length != 2) {
            message.channel.send(`Arguments are wrong. Proper arguments are \`<weather> <chance>\``);
            return false;
        }
        
        if(guildSettings.weathers[args[0]] === undefined) {
            message.channel.send(`That weather does not exist!`);
            return false;
        }

        if(typeof args[1] === "number" && args[1] >= 1 && args[1] <= 0 ) {
            message.channel.send(`The chance must be a number, and must be between 0 and 1!`);
            return false;
        }

        const guild = message.guild;
        if(!guild.available) {
            message.channel.send("oops. i can't access the server. :(")
            return false;
        }
        const id = guild.id;

        message.channel.send(`Changing the **${args[0]}** frequency from **${guildSettings.weathers[args[0]].rate}** to **${args[1]}**`);
        guildSettings.weathers[args[0]].rate = args[1];

        //update db
        var retJson = JSON.stringify(guildSettings);
        db.set(id, retJson);
    },
};