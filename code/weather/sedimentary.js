const Discord = require('discord.js');
module.exports = {
    name: 'sedimentary', //name displayed in help text
    description: 'Formed by the accumulation or deposition of mineral or organic particles at the Earth\'s surface.', //description displayed in help text
    guildOnly: true, //set to true if this command is locked to guilds
    cooldown: 5, //cooldown time in seconds before this user can use this command again

    execute(message, guildSettings) {
        const target = message.member;
        const settings = guildSettings.weathers.sedimentary;
        const wall = message.guild.channels.resolve(guildSettings.rockwall);

        const rock = settings.role;
        if (message.member.roles.cache.find(role => role.id  === rock)) {
            console.log("cannot give a rock to someone who already has one!");
        } else {
            target.roles.add(rock);
            message.channel.setRateLimitPerUser(message.channel.rateLimitPerUser + 5, "Petrification");
            message.reply('Thank you for your input! Your comments will be added to The Wall.\n*PETRIFICATION: You have gained 1 Sedimentary Rock!*');
            wall.send(transcribe(target.user, message));
        }
    },
};

function transcribe(author, message) {
    const ret = new Discord.MessageEmbed()
	.setColor('#669900')
	.setTitle('Survey Response')
	.setAuthor(author.username, author.defaultAvatarURL, message.url)
	.setDescription(message.content)
    .setFooter('1 sedimentary rock delivered.')
	.setTimestamp();

    return ret;
}