const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('For Falling Rocks', {type: 'WATCHING'});
});

client.login(process.env.TOKEN);

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(`My invite link is: https://discord.com/oauth2/authorize?client_id=829469503762595871&scope=bot \nFor every message sent in your server, I may decide to Incinerate the sender. \nIf you create a role labelled "Incinerated" (with the first letter capitalized), and give me permission to manage roles, I will apply it to any user I incinerate. (This also makes incineration permanent - I cannot incinerate someone with the Incinerated role). \nIf you have questions please direct them to discord user @heroguy15#9469 !\nHave fun!~\n\nCREDIT:\nDelapouite of Game-Icons.net: Icon, Licensed under https://creativecommons.org/licenses/by/3.0/\nThe Game Band: Inspiration, and Blaseball.com\nBoston Flowers Captains: Development`);
});
server.listen(3000);