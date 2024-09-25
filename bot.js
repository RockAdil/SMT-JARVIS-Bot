// const { Client, GatewayIntentBits } = require('discord.js');

// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent, // Allows the bot to read message content
//   ],
// });

// const token =
//   'MTI4NzAzMDU1NjY5Mjk3MTU4MQ.G6EjeF.H5YHOGXHwBy0XvrhmMq0X35es6bdM5eSRYNFg0'; // Replace with your bot's token

// client.once('ready', () => {
//   console.log('Bot is online!');
// });

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// client.on('messageCreate', async message => {
//   if (message.content.startsWith('!count')) {
//     const parts = message.content.split(' ');
//     const startNumber = parseInt(parts[1]) || 2244;
//     const endNumber = 3;

//     for (let i = startNumber; i <= endNumber; i++) {
//       await message.channel.send(i.toString());
//       await sleep(1000);
//     }
//   }
// });

// client.login(token);

// --------------- START -----------------
import { getResponses } from './tools/response.js';

import { Client, GatewayIntentBits } from 'discord.js';
import keep_alive from './keep_alive.js';
import 'dotenv/config';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', () => {
  console.log('Bot is online!');
});

getResponses(client);

client.login(process.env.BOT_TOKEN);
