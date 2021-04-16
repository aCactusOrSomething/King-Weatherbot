const Discord = require('discord.js');
const Database = require("@replit/database");
const db = new Database();
const defaultSettings = require('../../defaultSettings.json');

module.exports = {
    name: 'defaults', //name displayed in help text
    description: 'Sets up the default roles, channels, and settings.', //description displayed in help text
    
    args: false, //set to true if this command requires arguments
    guildOnly: true, //set to true if this command is locked to guilds
    cooldown: 5, //cooldown time in seconds before this user can use this command again
    permissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'], //restricts command to set users with specific permissions

    async execute(message, args, guildSettings, client) {
        const guild = message.guild;

        if(args.length != 1 && args[0] != "confirm") {
            message.channel.send(`This will restore my settings to the default, create 4 new channels, and 3 new roles. If you've used this bot before, be sure to clean up beforehand!\n**type \`12!defaults confirm\` to confirm.**`);
            return false;
        }
        
        const ignRole = await guild.roles.create({
            data: {
                name: 'Igneous',
                color: 'RED',
            },
            reason: 'CORY bot',
        }).catch(console.error);

        const sedRole = await guild.roles.create({
            data: {
                name: 'Sedimentary',
                color: 'GREEN',
            },
            reason: 'CORY bot',
        }).catch(console.error);
        
        const metRole = await guild.roles.create({
            data: {
                name: 'Metamorphic',
                color: 'BLUE',
            },
            reason: 'CORY bot',
        }).catch(console.error);


        const ignChannel = await guild.channels.create( 'model-volcano', {
            type: 'text',
            reason: 'CORY bot',
        }).catch(console.error);

        const sedChannel = await guild.channels.create( 'petrified-forest', {
            type: 'text',
            reason: 'CORY bot',
        }).catch(console.error);

        const metChannel = await guild.channels.create( 'ocean-ridge', {
            type: 'text',
            reason: 'CORY bot', //todo figure out permission overrides
        }).catch(console.error);

        const wallChannel = await guild.channels.create( 'rock-wall', {
            type: 'text',
            topic: 'SURVEY RESULTS. THANK YOU FOR. YOUR INPUT.',
            reason: 'CORY bot',
        }).catch(console.error);

        const umbrellas = guildSettings.umbrellaHolders;


        if(!guild.available) {
            message.channel.send("oops. i can't access the server. :(")
            return false;
        }
        const id = guild.id;

        guildSettings = JSON.parse(JSON.stringify(defaultSettings));
        guildSettings.weathers.igneous.forecast = true;
        guildSettings.weathers.igneous.locations = [ignChannel.id];
        guildSettings.weathers.igneous.role = ignRole.id;
        guildSettings.weathers.sedimentary.forecast = true;
        guildSettings.weathers.sedimentary.locations = [sedChannel.id];
        guildSettings.weathers.sedimentary.role = sedRole.id;
        guildSettings.weathers.metamorphic.forecast = true;
        guildSettings.weathers.metamorphic.locations = [metChannel.id];
        guildSettings.weathers.metamorphic.role = metRole.id;
        guildSettings.rockwall = wallChannel.id;
        guildSettings.umbrellaHolders = umbrellas;


        //update db
        var retJson = JSON.stringify(guildSettings);
        db.set(id, retJson);
    },
};