import axios from 'axios';
import * as cheerio from 'cheerio';
import { Client, GatewayIntentBits } from 'discord.js';
import { getResponses } from './tools/response.js';
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

const CHANNEL_ID = '1289958028560568411';
const SERVER_IP = '15.235.218.24:444 - SG, AS';
let isPaused = false;

client.once('ready', () => {
  console.log('Bot is online!');
  checkScores();
  setInterval(() => {
    if (!isPaused) {
      checkScores();
    }
  }, 600000); //10min
});

async function checkScores() {
  try {
    const { data } = await axios.get('https://ntl-slither.com/ss/');
    const $ = cheerio.load(data);

    let serverFound = false;
    let scoreFound = false;

    let serverIP = '';
    let score = '';
    let player = '';

    const targetNames = ['smt', 'dino', 'fsg', 'rekt', 'vn', 'tos'];

    let matchFound = false;
    let matchFound2 = false;
    let matchFound3 = false;

    $('tr').each((i, el) => {
      if ($(el).find('th').text().trim() === SERVER_IP) {
        serverIP = $(el).find('th').text().trim();

        serverFound = true;
      }

      if (serverFound) {
        player = $(el).find('.tdnick').text().trim();
        score = parseInt($(el).find('.tdscore').text().trim());

        if (score) {
          serverFound = false;
          scoreFound = true;
          console.log(player, score, serverIP);

          const extractedStrings =
            player
              .match(/\[([^\]]+)\]/g)
              ?.map(str => str.slice(1, -1).replace(/\s+/g, '')) || [];
          matchFound = extractedStrings.some(extracted =>
            targetNames.some(
              name => name.toLowerCase() === extracted.toLowerCase()
            )
          );

          const words = player.split(/\s+/);
          matchFound2 = words.some(word =>
            targetNames.some(name => name.toLowerCase() === word.toLowerCase())
          );

          const modifiedPlayer = player.replace(/\s+/g, '');
          matchFound3 = targetNames.some(
            name => name.toLowerCase() === modifiedPlayer.toLowerCase()
          );
        }
      }

      if (
        scoreFound &&
        score >= 50000 &&
        (matchFound || matchFound2 || matchFound3)
      ) {
        scoreFound = false;
        sendAlert(serverIP, player, score);
      }
    });
  } catch (error) {
    console.error('Error fetching score data:', error);
  }
}

async function sendAlert(serverIP, player, score) {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);

    if (!channel) {
      console.error(`Channel with ID ${CHANNEL_ID} not found`);
      return;
    }

    const link = 'https://ntl-slither.com/ss/?reg=as';

    if (player.toLowerCase().includes('smt')) {
      await channel.send(
        `🟢 Help the player! 🟢\n\nThe player "**${player}**" is scoring over "**${score}**" on this server "**${serverIP}**"! \n\n
        || @everyone || [NTL Leaderboard Link](${link})`
      );
    } else {
      await channel.send(
        `🔴 Kill the player! 🔴\n\nThe player called "**${player}**" is scoring over "**${score}**" on this server "**${serverIP}**"\n\n|| @everyone || [NTL Leaderboard Link](${link})`
      );
    }

    console.log(`Alert sent for player ${player} with score ${score}`);
    isPaused = true;
    setTimeout(() => {
      isPaused = false;
    }, 1680000); //28 mins
  } catch (error) {
    console.error('Error sending alert:', error);
  }
}

getResponses(client);

client.login(process.env.BOT_TOKEN);
