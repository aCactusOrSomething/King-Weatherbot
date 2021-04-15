const Database = require("@replit/database");
const db = new Database();

module.exports = {
    name: 'settings',
    description: 'UNFINISHED: View the configurations for this server.',
    usage: '<argA> <argB>',

    guildOnly: true,

    execute(message, args, guildSettings) {
        var ret = '**SETTINGS:**';
        ret += printSettings(guildSettings);
        message.channel.send(ret);
    },
};

function printSettings(base) {
    var ret = '';
    for(const key in base) {
        ret += `\n${key}: `;
        //recurse to cover nested objects
        if(typeof base[key] === "object") {
            ret += `${printSettings(base[key])}`;
        } else {
            ret += base[key];
        }
    }
    return ret;
}