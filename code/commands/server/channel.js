const Database = require("@replit/database");
const db = new Database();

module.exports = {
    name: 'setchannel', //name displayed in help text
    description: 'Toggle whether specific weathers happen in this channel.', //description displayed in help text
    
    args: true, //set to true if this command requires arguments
    usage: '<weather>', //if you have args, list their names here.
    guildOnly: true, //set to true if this command is locked to guilds
    cooldown: 5, //cooldown time in seconds before this user can use this command again
    aliases: ['wih', 'sunroof', 'channel', 'location'], //alternate names that work when using this command
    permissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'], //restricts command to set users with specific permissions

    execute(message, args, guildSettings) {
        //message.channel.send('Pong.');
        const channel = message.channel;

        if(guildSettings.weathers[args[0]] === undefined) {
            message.channel.send(`That weather does not exist!`);
            return false;
        }


        const guild = message.guild;
        if(!guild.available) {
            message.channel.send("oops. i can't access the server. :(")
            return false;
        }
        const id = guild.id;

        if(guildSettings.weathers[args[0]].locations.includes(channel.id)) {
            message.channel.send(`${channel} is no longer susceptible to **${args[0]}**.`);
            for(var i = 0; i < guildSettings.weathers[args[0]].locations.length; i++){ 
                if ( guildSettings.weathers[args[0]].locations[i] === channel.id) { 
                    guildSettings.weathers[args[0]].locations.splice(i, 1); 
                }            
            }
        } else {
            message.channel.send(`${channel} is now under a **${args[0]}** watch.`);
            guildSettings.weathers[args[0]].locations.push(channel.id);
        }


        //update db
        var retJson = JSON.stringify(guildSettings);
        db.set(id, retJson);
    },
};