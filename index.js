 const Discord = require("discord.js")
 const client = new Discord.Client(
     {intents:["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] }
 )

 client.login(process.env.token)

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

client.on("messageCreate", message => {
    if(message.member.roles.cache.has(885834646921826334)) return
     var bestemmie =["porco dio", "dio cane", "porca madonna", "Porco dio", "Dio cane", "Porca madonnna"]
     var trovata = false
     var testo = message.content;

     bestemmie.forEach(parola =>  {
         if (message.content.includes (parola)) {
             trovata = true
             testo = testo.replace(parola, "****")
         }
     })

     if (trovata) {
         message.delete();
         var embed = new Discord.MessageEmbed()
             .setTitle ("Hai detto una bestemmia")
             .setDescription ("Hai detto una bestemmia, ora rinvierò il messagio correto. Attento   " + testo)

            message.channel.send ({ embeds: [embed] })
     }
    })
    client.on("messageCreate", message => {
        if (message.content == "l/serverinfo") {
            var server = message.member.guild;
            var botCount = server.members.cache.filter(member => member.user.bot).size;
            var utentiCount = server.memberCount - botCount;
            var categoryCount = server.channels.cache.filter(c => c.type == "GUILD_CATEGORY").size
            var textCount = server.channels.cache.filter(c => c.type == "GUILD_TEXT").size
            var voiceCount = server.channels.cache.filter(c => c.type == "GUILD_VOICE").size
            const owner = server.members.cache.find(member => member.id === message.guild.ownerId);
            var embed = new Discord.MessageEmbed()
                .setTitle(server.name)
                .setDescription("Tutte le info su questo server")
                .setThumbnail(server.iconURL())
                .addField("Owner", owner.user.username, true)
                .addField("Server id", server.id.toString(), true)
                .addField("Members", "Total: " + server.memberCount.toString() + " - Users: " + utentiCount.toString() + " - Bots: " + botCount.toString(), false)
                .addField("Channels", "Category: " + categoryCount.toString() + " - Text: " + textCount.toString() + " - Voice: " + voiceCount.toString(), false)
                .addField("Server created", server.createdAt.toDateString(), true)
                .addField("Boost level", "Level " + server.premiumTier + " (Boost: " + server.premiumSubscriptionCount + ")", true)
            message.channel.send({embeds: [embed]})
        }
    })