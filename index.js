 const Discord = require("discord.js")
 const client = new Discord.Client(
     {intents:["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] }
 )

 client.login("OTI0OTMzODQxNDM1NjIzNDI0.YclxxA.qU0t0MAdqWO9Prc-NQM73x8oPvw")

client.on("ready", () => {
      console.log("Bot Onine")
})

 client.on("messageCreate", (message) => {
    if (message.content == "l/HelpCommand") {
        var embed = new Discord.MessageEmbed()
        .setTitle("I Commandi Del Bot")
        .setDescription("Per ora questi sono i miei commandi")
        .addField("I commandi", "l/youtube", false)
        message.channel.send({ embeds: [embed] })
    }
    
    if (message.content == "l/youtube") {
         message.channel.send ("Iscrivetevi al canale di Nico che porta contenuti su questo server https://www.youtube.com/channel/UCXc_L2UunACJSY5PqdAbWGg")
     }
 })
