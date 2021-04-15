const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const defaultSettings = require('./defaultSettings.json');

const token = process.env.TOKEN;
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./code/commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./code/commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        console.log(command.name);
    }
}

const Database = require("@replit/database");
const db = new Database();

client.cooldowns = new Discord.Collection();

//send console alert & set status once ready
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('For Falling Rocks', { type: 'WATCHING' });
});

//listen for messages
client.on('message', message => {
    const settings = getSettings(message);
    commandHandler(message, settings);
});

//log in!
client.login(token);

//build info website
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`My invite link is: https://discord.com/oauth2/authorize?client_id=829469503762595871&scope=bot \nFor every message sent in your server, I may decide to Incinerate the sender. \nIf you create a role labelled "Incinerated" (with the first letter capitalized), and give me permission to manage roles, I will apply it to any user I incinerate. (This also makes incineration permanent - I cannot incinerate someone with the Incinerated role). \nIf you have questions please direct them to discord user @heroguy15#9469 !\nHave fun!~\n\nCREDIT:\nDelapouite of Game-Icons.net: Icon, Licensed under https://creativecommons.org/licenses/by/3.0/\nThe Game Band: Inspiration, and Blaseball.com\nBoston Flowers Captains: Development`);
});
server.listen(3000);

//this parses commands. it returns "true" if the user attempted a command (even if the command was invalid), and false otherwise.
function commandHandler(message, settings) {
    if (!message.content.startsWith(prefix) || message.author.bot) return false;
    //might need to look at the bot clause in case it confuses pluralkit - can poke Astrid about how PK specifically works?
    //ok the PK FAQ helped a bunch. it uses webhooks, which i think count as bot commands. really more an issue for weather than commands.

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if(!command) return;

    //lock to discord servers and not DMs.
    if(command.guildOnly && message.channel.type === 'dm') {
        return message.reply("This command can only be used in servers!");
    }

    //restrict to users with the right permissions
    if(command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if(!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply(`This command is restricted based on your permissions!`);
        }
    }

    //handling for commands that do not have arguments
    if(command.args && !args.length) {
        let reply = `This command requires some arguments!`;
        if (command.usage) {
            reply += `\nThe proper usage is: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    
    //cooldowns
    const { cooldowns } = client;
    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if(timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if(now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`You cannot send this command again for ${timeLeft.toFixed(1)} more seconds!`);
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    
    //attempt to execute the command.
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
    return true;
}


//returns the settings for the guild a message is sent in. 
//if a guild DOESNT have settings, it will make them & comment about it.
function getSettings(message) {
    const guild = message.guild;
    var ret = null;
    if(guild.available) {
        const id = guild.id;

        db.get(id).then(value => {
            if(value === null) { //you're none settings? so like. you dont have any settings???
                console.log(`couldn't find settings for server ID ${id}`);
                var defJson = JSON.stringify(defaultSettings);
                ret = defaultSettings;
                db.set(id,defJson);
            } else {
                ret = JSON.parse(value);
                console.log(value);
            }
            return ret;
        });
    } else {
        return defaultSettings;
    }
}