const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const token = process.env.TOKEN;
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//send console alert & set status once ready
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('For Falling Rocks', { type: 'WATCHING' });
});

//listen for messages
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; //might need to look at the bot clause in case it confuses pluralkit - can poke Astrid about how PK specifically works?

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
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