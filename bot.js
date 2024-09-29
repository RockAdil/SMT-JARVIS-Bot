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
  }, 120000); //2min
});

async function checkScores() {
  try {
    const { data } = await axios.get('https://ntl-slither.com/ss/');
    const $ = cheerio.load(data);

    let serverFound = false;
    let scoreFound = false;
    let result = false;

    let serverIP = '';
    let score = '';
    let player = '';

    const targetNames = ['smt', 'dino', 'fsg', 'rekt', 'vn', 'tos'];

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
        }
      }

      if (
        scoreFound &&
        score >= 60000 &&
        targetNames.some(name => {
          const spacedName = name.split('').join('\\s*');
          return new RegExp(`\\b${spacedName}(?!\\s*[a-zA-Z])`, 'i').test(
            player
          );
        })
      ) {
        scoreFound = false;
        result = true;
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

    if (player.toLowerCase().includes('smt')) {
      await channel.send(
        `Help the player!\n\nThe player "**${player}**" has scored over "**${score}**" on server "**${serverIP}**"! \n
  || @everyone ||`
      );
    } else {
      await channel.send(
        `Kill the player!\n\nThe player called "**${player}**" has scored over "**${score}**"! on this server "**${serverIP}**"\n 
  || @everyone ||`
      );
    }

    console.log(`Alert sent for player ${player} with score ${score}`);
    isPaused = true;
    setTimeout(() => {
      isPaused = false;
    }, 1800000); //30 mins
  } catch (error) {
    console.error('Error sending alert:', error);
  }
}

getResponses(client);

client.login(process.env.BOT_TOKEN);
