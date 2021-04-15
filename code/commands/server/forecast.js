const Database = require("@replit/database");
const db = new Database();

const forecasts = [
    "off",
    "cycle",
    "endless"
]; //todo move this to somewhere else

module.exports = {
    name: 'forecast', //name displayed in help text
    description: 'decide how, or if, a particular weather activates.', //description displayed in help text
    
    args: true, //set to true if this command requires arguments
    usage: '<weather> <forecast>\navailable forecasts:\n*off:* disables this weather.\n*cycle:* may become active or inactive at random.\n*endless:* the weather is always on.', //if you have args, list their names here.
    guildOnly: true, //set to true if this command is locked to guilds
    cooldown: 5, //cooldown time in seconds before this user can use this command again
    aliases: ['fc'], //alternate names that work when using this command
    permissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'], //restricts command to set users with specific permissions

    execute(message, args, guildSettings) {
        //message.channel.send('Pong.');

        if(args.length != 2) {
            message.channel.send(`Arguments are wrong. Proper arguments are \`${usage}\``);
            return false;
        }
        
        if(guildSettings.weathers[args[0]] === undefined) {
            message.channel.send(`That weather does not exist!`);
            return false;
        }

        if(!forecasts.includes(args[1])) {
            message.channel.send(`that is not a valid weather forecast! the options are: ${forecasts}`);
            return false;
        }

        const guild = message.guild;
        if(!guild.available) {
            message.channel.send("oops. i can't access the server. :(")
            return false;
        }
        const id = guild.id;

        message.channel.send(`Changing the **${args[0]}** forecast from **${guildSettings.weathers[args[0]].forecast}** to **${args[1]}**`);
        guildSettings.weathers[args[0]].forecast = args[1];

        //update db
        var retJson = JSON.stringify(guildSettings);
        db.set(id, retJson);
    },
};