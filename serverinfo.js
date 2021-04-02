module.exports = {
    commands: ['serverinfo'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.reply((`
TS: 173.234.27.145:10070
ARMA: 172.96.164.74 Port: 2307 Password: ADG1 `))

    },
    requiredRoles: ['Member'],
}