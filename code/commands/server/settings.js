const Database = require("@replit/database");
const db = new Database();

module.exports = {
    name: 'settings',
    description: 'UNFINISHED: View the configurations for this server.',
    usage: '<argA> <argB>',

    guildOnly: true,

    execute(message, args, guildSettings) {
        var ret = '**SETTINGS:**';
        ret += printSettings(guildSettings, 0);
        message.channel.send(ret);
    },
};

function printSettings(base, layers) {
    var ret = '';
    for(const key in base) {
        ret += `\n`;
        for(var i = 0; i < layers; i++) ret += " ";
        ret += `${key}: `;
        //recurse to cover nested objects
        if(typeof base[key] === "object") {
            ret += `${printSettings(base[key], layers + 1)}`;
        } else {
            ret += base[key];
        }
    }
    return ret;
}