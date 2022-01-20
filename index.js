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
        .addField("Commando 2", "l/ServerInfo", false)
        .addField("Commando 3", "l/UserInfo")
        .addField("Commando 4", "l/Say", false)
        message.channel.send({ embeds: [embed] })
    }
    
    if (message.content == "l/youtube") {
         message.channel.send ("Iscrivetevi al canale di Nico che porta contenuti su questo server https://www.youtube.com/channel/UCXc_L2UunACJSY5PqdAbWGg")
     }

     if(message.content == "l/ue") {
         message.channel.send ("Video figo https://www.youtube.com/watch?v=cLjXsVkPUPc")
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
    if (message.content == "l/ServerInfo") {
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
    if (message.content.startsWith("l/Say")) {
        var args = message.content.split(/\s+/);
        var testo;
        testo = args.slice(1).join(" ");
        if (!testo) {
            return message.channel.send("Inserire un messaggio");
        }
        if (message.content.includes("@everyone") || message.content.includes("@here")) {
            return message.channel.send("Non taggare everyone o here");
        }
        message.delete()

        //Messaggio classico
        message.channel.send(testo)

        //Embed
        var embed = new Discord.MessageEmbed()
            .setTitle("Say")
            .setDescription(testo)

        message.channel.send({embeds: [embed]})
    }
})
client.on("messageCreate", message => {
    if (message.content.startsWith("l/UserInfo")) {
        if (message.content == "l/UserInfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }
        if (!utente) {
            return message.channel.send("Non ho trovato questo utente")
        }
        var elencoPermessi = "";
        if (utente.permissions.has("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS_AND_STICKERS", "USE_APPLICATION_COMMANDS", "REQUEST_TO_SPEAK", "MANAGE_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "USE_EXTERNAL_STICKERS", "SEND_MESSAGES_IN_THREADS", "START_EMBEDDED_ACTIVITIES"]
            for (var i = 0; i < permessi.length; i++)
                if (utente.permissions.has(permessi[i]))
                    elencoPermessi += `- ${permessi[i]}\r`
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.displayAvatarURL())
            .addField("User id", utente.user.id, true)
            .addField("Status", utente.presence ? utente.presence.status : "offline", true)
            .addField("Is a bot?", utente.user.bot ? "Yes" : "No", true)
            .addField("Account created", utente.user.createdAt.toDateString(), true)
            .addField("Joined this server", utente.joinedAt.toDateString(), true)
            .addField("Permissions", elencoPermessi, false)
            .addField("Roles", utente.roles.cache.map(ruolo => ruolo.name).join("\r"), false)
        message.channel.send({ embeds: [embed] })
    }
})