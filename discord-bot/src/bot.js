require('dotenv').config();

const { Client, GatewayIntentBits, Partials, WebhookClient } = require('discord.js');

const PREFIX = "$"

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  });

client.on('ready',()=>{
        console.log(`${client.user.tag} has logged in`)
});



client.on('message',async (message)=>{
    if(message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
          .trim()
          .substring(PREFIX.length)
          .split(/\s+/);
        if (CMD_NAME === 'kick') {
            if(!message.member.hasPermisson('KICK_MEMBERS'))
                return message.reply('you do not have perrmisons')

                if(args.length === 0) return message.reply('enter an ID')
                 const member = message.guild.members.cache.get(args[0]);
                 if(member){
                    member
                    .kick()
                    .then((member)=>message.channel.send(`${member} is kicked`))
                    .catch((err)=> message.channel.send('I can not kick that user'))
                 } else{
                    message.channel.send('member is not found')
                 }
        }else if(CMD_NAME==='ban'){
            if(!message.member.hasPermisson('BAN_MEMBERS'))
                return message.reply('you do not have perrmisons')
            if(args.length === 0) return message.reply('enter an ID')
            try{
              const  user= await message.guild.members.ban(args[0])
              message.channel.send('User is banned successfully');
        }catch(err){
            console.log(err);
            message.channel.send('error');
        }
        }else if (CMD_NAME === 'announce') {
            console.log(args);
            const msg = args.join(' ');
            console.log(msg);
            webhookClient.send(msg);
          }
}})


client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '738666523408990258') {
      switch (name) {
        case '🍎':
          member.roles.add('738664659103776818');
          break;
        case '🍌':
          member.roles.add('738664632838782998');
          break;
        case '🍇':
          member.roles.add('738664618511171634');
          break;
        case '🍑':
          member.roles.add('738664590178779167');
          break;
      }
    }
  });
  
  client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '738666523408990258') {
      switch (name) {
        case '🍎':
          member.roles.remove('738664659103776818');
          break;
        case '🍌':
          member.roles.remove('738664632838782998');
          break;
        case '🍇':
          member.roles.remove('738664618511171634');
          break;
        case '🍑':
          member.roles.remove('738664590178779167');
          break;
      }
    }
  });




client.login(process.env.DISCORDJS_BOT_TOKEN);