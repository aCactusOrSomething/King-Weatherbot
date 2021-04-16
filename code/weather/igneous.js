module.exports = {
    name: 'igneous', //name displayed in help text
    description: 'Formed through the cooling and solidification of magma or lava.', //description displayed in help text
    guildOnly: true, //set to true if this command is locked to guilds
    cooldown: 5, //cooldown time in seconds before this user can use this command again

    execute(message, guildSettings) {
        const target = message.author;
        const settings = guildSettings.weathers.igneous;
        const wall = message.guild.channels.resolve(guildSettings.rockwall);

        const rock = message.guild.roles.fetch(settings.role);
        if (target.roles.cache.some(role  === rock)) {
            console.log("cannot give a rock to someone who already has one!");
        } else {
            target.roles.add(rock);
            message.channel.bulkDelete(1);
            message.reply('Thank you for your input! Your comments will be added to The Wall.\n*INCINERATION: You have gained 1 Igneous Rock!*');
            //todo delete a random Wall message
            wall.send(transcribe(target, message));
        }
    },
};

function transcribe(author, message) {
    const ret = new Discord.MessageEmbed()
	.setColor('#FF0000')
	.setTitle('Survey Response')
	.setAuthor(author.username, author.defaultAvatarURL, message.url)
	.setDescription(message.content)
    .setFooter('1 igneous rock delivered.')
	.setTimestamp();

    return ret;
}