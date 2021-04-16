const Database = require("@replit/database");
const db = new Database();

module.exports = {
    name: 'role', //name displayed in help text
    description: 'Sets what role a weather interacts with.', //description displayed in help text
    
    args: true, //set to true if this command requires arguments
    usage: '<weather> <role>', //if you have args, list their names here.
    guildOnly: true, //set to true if this command is locked to guilds
    cooldown: 5, //cooldown time in seconds before this user can use this command again
    permissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'], //restricts command to set users with specific permissions

    execute(message, args, guildSettings) {
        //message.channel.send('Pong.');

        if(args.length != 2) {
            message.channel.send(`Arguments are wrong. Proper arguments are \`<weather> <role>\``);
            return false;
        }
        
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

        //get the role
        const role = guild.roles.cache.find(role => role.name === args[1]);
        if(role === undefined) {
            message.channel.send(`Error: I was unable to find the role ${args[1]}.`)
            return false;
        }

        message.channel.send(`changing the **${args[0]}** role to **${args[1]}**`);
        guildSettings.weathers[args[0]].role = role.id;

        //update db
        var retJson = JSON.stringify(guildSettings);
        db.set(id, retJson);
    },
};