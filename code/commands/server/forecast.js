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
            //handling for invalid arg lengths
            return false;
        }
        
        if(guildSettings.weathers[args[0]] === undefined) {
            //handling for weather that isn't real
            return false;
        }

        if(!forecasts.includes(args[1])) {
            //handling for forecasts that aren't real
            return false;
        }

        const guild = message.guild;
        if(!guild.available) {
            //handling for no guild available
        }
        const id = guild.id;

        message.channel.send(`Changing the **${args[0]}** forecast from **${guildSettings.weathers[args[0]].forecast}** to **${args[1]}**`);
        guildSettings.weathers[args[0]].forecast = args[1];

        //update db
        var retJson = JSON.stringify(guildSettings);
        db.set(id, retJson);
    },
};