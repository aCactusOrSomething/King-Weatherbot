const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!');
  client.user.setActivity('https://King-Weatherbot.cactuseight.repl.co'); //this sets what weatherbot is currently "Playing."
});

client.on('message', message => { //weatherbot checks EVERY message sent that it could see. Usually you'd look for a command, but not with this bot.
  if (message.author.bot) return; //Do not attempt to incinerate robots.
  
  //Roll a random number and compare it to a number in the system. if it's lower, then start incinerating.
  var myChance = Math.random();
  //console.log(myChance);
  if (myChance <= process.env.EFFECT_CHANCE) {
    console.log("in channel " + message.channel.name);
    //this bit checks existing roles.
    //If a bunch more roles become relevant to this, then restructuring this code might be better. But it works fine with just 2.
    const role = message.guild.roles.cache.find(role => role.name === 'Incinerated');
    if ((message.member.roles.cache.find(role => role.name === 'Incinerated') == null)) {
      if ((message.member.roles.cache.find(role => role.name === 'Returned') != null)) {
        if(Math.random() <= 0.9) {
          message.reply("You have been permitted to stay.");
          console.log(message.author.tag + ", You have been permitted to stay.")
          return;
        }
      }
      message.reply("You have been incinerated!");
      console.log(message.author.tag + ", You have been incinerated!");
      if(role != null) {
        message.member.roles.add(role);
      }
    }
  }
});


client.login(process.env.TOKEN);

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(`My invite link is: https://discord.com/oauth2/authorize?client_id=769783799306780732&scope=bot \nFor every message sent in your server, I may decide to Incinerate the sender. \nIf you create a role labelled "Incinerated" (with the first letter capitalized), and give me permission to manage roles, I will apply it to any user I incinerate. (This also makes incineration permanent - I cannot incinerate someone with the Incinerated role). \nIf you have questions please direct them to discord user @heroguy15#9469 !\nHave fun!~\n\nCREDIT:\nDelapouite of Game-Icons.net: Icon, Licensed under https://creativecommons.org/licenses/by/3.0/\nThe Game Band: Inspiration, and Blaseball.com\nBoston Flowers Captains: Development`);
});
server.listen(3000);

/*invite:
https://discord.com/oauth2/authorize?client_id=769783799306780732&scope=bot
*/