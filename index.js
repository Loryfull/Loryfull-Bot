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
        .addField("Commando 1", "l/youtube", false)
        .addField("Commando 2", "l/serverinfo", false)
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
client.on("messageCreate", message => {
    if (message.content.startsWith("l/userinfo")) {
        if (message.content == "l/userinfo") {
            var utente = message.member;
        }
        else{
            var utente = message.mentions.member.first();
        }
        if (!utente){
            message.channel.send("Non ho trovato l'utente richiesto") 
            return
        }

        var elencoPermessi = "";
        if(utente.hasPermission("Administrator")){
            elencoPermessi = ":crown: Administrator";
        }
        else{
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD-REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES","MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

            for(var i = 0; i < permessi.length; i++ )
                if(utente.hasPermission(permessi[i])){
                    elencoPermessi += "- " + permessi[i] + "\r"; 
                }
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di codesto utente")
            .setThumbnail(utente.user.avatarURL())
            .addField("User ID", utente.user.id, true)
            .addField("Status", utente.user.presence.status, true)
            .addField("Is a bot?", utente.user.bot ? "Yes" : "Nope", true)
            .addField("Accuont created", utente.user.createdAt.toDateString(), true)
            .addField("When joined in this server", utente.joinedAt.toDateString(), true)
            .addField("Permission", elencoPermessi, false)
            .addField("Roles", utente.roles.cache.map(ruolo => ruolo.name).join("\r"), false)
        
        message.channel.send ({embeds: [embed]})
    }
})