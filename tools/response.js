import {
  notEnglishHateResponse,
  badwords,
  goods,
  goodsReaction,
  bads,
  badsReaction,
} from '../module/phrase.js';

// **************************************** FUNCTIONS ******************************************
const getGoodsRandomReaction = (goodsReaction, message) => {
  const randomGoodsReaction =
    goodsReaction[Math.floor(Math.random() * goodsReaction.length)];
  message.react(randomGoodsReaction);
};

const getBadsRandomReaction = (badsReaction, message, reason) => {
  const randomBadsReaction =
    badsReaction[Math.floor(Math.random() * badsReaction.length)];
  message.react(randomBadsReaction);
};

let getTimeoutMember = async (message, mins, reason) => {
  const member = message.guild.members.cache.get(message.author.id);
  if (member) {
    try {
      await member.timeout(mins * 60 * 1000);
      message.channel.send(
        `<@${message.author.id}> has been timed out for ${mins} minutes because of ${reason}.`
      );
    } catch (error) {
      console.error('Failed to timeout the user:', error);
    }
  }
};

//  *********************************** Response Program ***********************************

const bossCooldowns = new Map();
const bossCooldownTime = 600000;

export function getResponses(client) {
  client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // ------------------- HINDI HATE RESPONSE --------------------------
    if (
      notEnglishHateResponse.some(phrase =>
        new RegExp(`(^|\\s)${phrase.toLowerCase()}(\\s|$)`, 'gi').test(
          message.content.toLowerCase()
        )
      )
    ) {
      getTimeoutMember(message, 2, `**Don't speak English**`); // Timeout for 2 minute
    }

    // ------------------- GAY RESPONSE --------------------------
    if (new RegExp(`\\bgay\\b`, 'i').test(message.content)) {
      getTimeoutMember(message, 2, 'Gay'); // Timeout for 2 minute
    }

    // ------------------- TAGS LEAKED RESPONSE --------------------------
    if (new RegExp(/!\w+/, 'i').test(message.content)) {
      getTimeoutMember(message, 1, '**Sharing Tag**'); // Timeout for 1 minute
      message.delete();
    }

    // ------------------- BAD WORDS RESPONSE --------------------------
    if (
      badwords.some(phrase =>
        new RegExp(`\\b${phrase.toLowerCase()}\\b`).test(
          message.content.toLowerCase()
        )
      )
    ) {
      getTimeoutMember(message, 2, 'using Bad Word'); // Timeout for 2 minute
      message.delete();
    }

    // -----------------------BOSS CALL-----------------------
    const ownerID = '888712652409409546';
    const userId = message.author.id;

    if (
      message.content.toLowerCase().includes(`<@${ownerID}>`) ||
      message.content.toLowerCase().includes(`<@!${ownerID}>`) ||
      message.content.toLowerCase().includes(`adil`) ||
      message.content.toLowerCase().includes(`rock adil`) ||
      message.content.toLowerCase().includes(`adil ahamed`)
    ) {
      const currentTime = Date.now();
      const lastBossResponseTime = bossCooldowns.get(userId);

      if (
        !lastBossResponseTime ||
        currentTime - lastBossResponseTime >= bossCooldownTime
      ) {
        message.channel.send(
          `<@${ownerID}> Seems someone is talking about you! or calling you. Check it out!`
        );

        bossCooldowns.set(userId, currentTime);
      }
    }

    // -----------------------GOOD and BAD RESPONSE-----------------------
    const content = message.content.toLowerCase().trim();

    if (goods.includes(message.content.toLowerCase())) {
      getGoodsRandomReaction(goodsReaction, message);
    }

    if (content === 'good bot') {
      getGoodsRandomReaction(goodsReaction, message);
    } else if (content === 'bad bot') {
      getBadsRandomReaction(badsReaction, message);
    }

    if (bads.includes(message.content.toLowerCase())) {
      getBadsRandomReaction(badsReaction, message);
    }
  });

  /* Welcoming New Members */
  client.on('guildMemberAdd', member => {
    const channelID = '753212000829702176';
    const channel = member.guild.channels.cache.get(channelID);

    if (channel) {
      channel.send(
        `SMT Welcome's you, Everyone say hi to, <@${member.id}> 😃!`
      );
    }
  });
}
