const Discord = require("discord.js");
const client = new Discord.Client();
const { Collection } = require('discord.js')
const voiceCollection = new Collection();

client.once("ready", () => {
  console.log("Ready!");
  client.user.setPresence({
    activity: {
      type: "PLAYING",
      name: "code by hafiz573"
    },
    status: "dnd"
  });
})

require("http").createServer((req, res) => res.end("alive")).listen();

client.on("voiceStateUpdate", async (oldState, newState) => {
  const user = await client.users.fetch(newState.id);
  const member = newState.guild.member(user);
  
  if (!oldState.channel && newState.channel.id === "your id voice here") {
    const channel = await newState.guild.channels.create(user.tag, {
      type: "voice",
      parent: newState.channel.parent,
    });
    member.voice.setChannel(channel);
    voiceCollection.set(user.id, channel.id);
  } else if (!newState.channel) {
    if (oldState.channelID === voiceCollection.get(newState.id))
    return oldState.channel.delete();
  }
});

client.login("your token bot here");
