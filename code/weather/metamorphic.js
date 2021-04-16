module.exports = {
    name: 'metamorphic', //name displayed in help text
    description: 'Formed through the cooling and solidification of magma or lava.', //description displayed in help text
    guildOnly: true, //set to true if this command is locked to guilds
    cooldown: 5, //cooldown time in seconds before this user can use this command again

    execute(message, guildSettings) {
        const target = message.author;
        const settings = guildSettings.weathers.igneous;
        const wall = message.guild.channels.resolve(guildSettings.rockwall);

        const rock = message.guild.roles.fetch(settings.role);
        
        const otherRocks = [guildSettings.weathers.igneous.role, guildSettings.weathers.sedimentary.role];

        if (target.roles.cache.some(role  === otherRocks[0]) || target.roles.cache.some(role  === otherRocks[1])) {
            target.roles.add(rock);
            target.removeRole(otherRocks[0]).catch();
            target.removeRole(otherRocks[1]).catch();
            message.reply('Thank you for your input! Your comments will be added to The Wall.\n*METAMORPHASIS: Your rocks have transformed!*');
            wall.send(transcribe(target, message));
        }
    },
};

function transcribe(author, message) {
    const ret = new Discord.MessageEmbed()
	.setColor('#FF00FF')
	.setTitle('Survey Response')
	.setAuthor(author.username, author.defaultAvatarURL, message.url)
	.setDescription(message.content)
    .setFooter('Metamporphasizing...')
	.setTimestamp();

    return ret;
}