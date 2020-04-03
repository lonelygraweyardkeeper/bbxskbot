const Discord = require('discord.js');
const client = new Discord.Client();


client.on("message", message => {
  var prefix = "!";

  if (message.author.bot) return;
  // This is where we'll put our code.
  if (message.content.indexOf(prefix) !== 0) return;
 
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if(command === "help") {
    message.reply(`
  **help** <-- Príkazy \n
  **prefix** [option] <-- Nastavenie prefixu \n
  **clear** [počet] <-- Odstráni počet správ \n
  **timer** [čas v sekundách] <-- Časovač \n
  `);
  }

  if (command === "clear") {
    var amount = args[0];
    message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
    message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
    )});
  }

  if (command === "timer") {
    var text = "```";
    var time = args[0]; // Remember arrays are 0-based!.
    message.reply(`Časovač nastavený na **${time}** sekúnd.`);
    var interval = setInterval(() => {
      time = time - 1;
      if(time % 10 == 0 && time > 0) {
        message.reply(`Ostáva ti **${time}** sekúnd!`);
      } 

      if(time <= 0) {
        message.reply("Čas vypršal!");
        clearInterval(interval);
      }
      console.log(time);
    }, 1000);
  }
});

client.login(process.env.token);
