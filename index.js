const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')
const welcome = require('./welcome')

client.on('ready', () =>{
    console.log('Arcadian Interface V2 Online')
    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files){
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()){
                readCommands(path.join(dir, file))
            } else if (file !== baseFile){
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)

            }
        }
    }

    readCommands('commands')

    welcome(client)

    command(client, ['cc', 'clearchannel'], (message) => {
        if(message.member.hasPermission('ADMINISTRATOR')){
            message.channel.messages.fetch().then(results =>{
                message.channel.bulkDelete(results)
            })
        }
    })
    command(client, 'status', (message) => {
        const content = message.content.replace('#status ', '')
    
        client.user.setPresence({
          activity: {
            name: content,
            type: 0,
          },
        })
    })

    command(client, 'help', (message) => {
        message.channel.send(`Available Commands:
**#serverinfo** - Gives TS3 and ARMA Server Details
**#mods** - Gives a list of mods
**#help** - Opens this menu`)

    }) 
})

client.login(config.token)