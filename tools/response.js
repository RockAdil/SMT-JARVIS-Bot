import {
  hindiHateResponse,
  badwords,
  greetings,
  dayGreetings,
  howAreYouResponses,
  boss,
  bye,
  goods,
  bads,
} from '../module/phrase.js';

// * FUNCTIONS
const getRandomResponse = (responses, message) => {
  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];
  message.channel.send(randomResponse);
};

// ------------------------------- Response Program ---------------------------

const greetingCooldowns = new Map();
const bossCooldowns = new Map();
const greetingCooldownTime = 30000;
const bossCooldownTime = 600000;
/**
 * Responding to User Messages and Reacting
 */
export function getResponses(client) {
  client.on('messageCreate', message => {
    if (message.author.bot) return;

    // ------------------- HINDI HATE RESPONSE --------------------------
    if (
      hindiHateResponse.some(phrase =>
        message.content.toLowerCase().includes(phrase)
      )
    ) {
      const responses = [
        `Hey <@${message.author.id}>!, Can you please speak in English?`,
        `Sorry <@${message.author.id}>, I don't understand Hindi.`,
        `Speak English Please 🙏😁, <@${message.author.id}>.`,
        `I can only respond to English messages, <@${message.author.id}>.`,
        `Let's keep the conversation in English, <@${message.author.id}>.`,
        `I know only little bit of Hindi, <@${message.author.id}>. Please use English.`,
        `If you talk in Hindi then you are gay, <@${message.author.id}>.`,
        `Whoevers speaks in Hindi is gay, Including you <@${message.author.id}>.`,
        `Nood <@${message.author.id}>, I don't understand Hindi.`,
      ];
      getRandomResponse(responses, message);
    }

    // ------------------- GAY RESPONSE --------------------------
    if (message.content.toLowerCase().includes('gay')) {
      const responses = [
        `No, you are the gay one, <@${message.author.id}>.`,
        `Don’t worry, you are too ugly to kiss. <@${message.author.id}>.`,
        `Here is the gay community for you 🏳️‍🌈, <@${message.author.id}>.`,
        `Oh my God, how do you tell?? Usually only gays who can identify other gays. <@${message.author.id}> 🏳️‍🌈.`,
      ];
      getRandomResponse(responses, message);
    }

    // ------------------- TAGS LEAKED RESPONSE --------------------------
    if (
      message.content.toLowerCase().includes('tags') ||
      message.content.toLowerCase().includes('tag') ||
      /!\w+/.test(message.content)
    ) {
      const responses = [
        `Whoever talks about tags here is gay! <@${message.author.id}>`,
        `Tags are not allowed here. <@${message.author.id}>`,
        `Don't talk about tags here. <@${message.author.id}>`,
        `Avoid Talking about tags, Read the #rules no. 6 <@${message.author.id}>`,
      ];
      getRandomResponse(responses, message);
    }

    // ------------------- BAD WORDS RESPONSE --------------------------
    if (
      badwords.some(phrase => message.content.toLowerCase().includes(phrase))
    ) {
      const responses = [
        `Whoever speaks bad words is gay! <@${message.author.id}>`,
        `Bad words are not allowed here. <@${message.author.id}>`,
        `No harmful words, please. <@${message.author.id}>`,
        `Avoid using bad words. <@${message.author.id}>`,
        `Control your words. <@${message.author.id}> wowowow chill chill, no need to use bad words. <@${message.author.id}>`,
      ];
      getRandomResponse(responses, message);
    }

    // -----------------------GREETINGS RESPONSE-----------------------
    const userId = message.author.id; // Get the user's ID
    const currentTime = Date.now(); // Get the current time

    const mentionedBot = message.mentions.has(client.user);

    if (greetings.includes(message.content.toLowerCase()) || mentionedBot) {
      const lastGreetingTime = greetingCooldowns.get(userId);

      if (
        !lastGreetingTime ||
        currentTime - lastGreetingTime >= greetingCooldownTime
      ) {
        const responses = [
          `Hello! <@${message.author.id}>`,
          `Hi! <@${message.author.id}>`,
          `Hey! <@${message.author.id}>`,
          `Yo! <@${message.author.id}>`,
          `What's up! <@${message.author.id}>`,
          `Hey there! <@${message.author.id}>`,
          `What's up! <@${message.author.id}>`,
        ];
        getRandomResponse(responses, message);
        greetingCooldowns.set(userId, currentTime);
      }
    }

    // -----------------------DAY GREETINGS RESPONSE-----------------------
    const responses = {
      'good morning': `Good Morning! <@${message.author.id}>  🌞`,
      'good afternoon': `Good Afternoon! <@${message.author.id}>`,
      'good evening': `Good Evening! <@${message.author.id}>`,
      'good night': `Good Night! <@${message.author.id}> 🌙`,
    };

    const userMessage = message.content.toLowerCase();

    const greeting = dayGreetings.find(phrase => userMessage.includes(phrase));

    if (greeting) {
      message.channel.send(responses[greeting]);
    }

    // -----------------------HOW ARE YOU RESPONSE-----------------------
    if (
      howAreYouResponses.some(phrase =>
        message.content.toLowerCase().includes(phrase)
      )
    ) {
      message.channel.send(
        `I'm doing great!😀 How about you, <@${message.author.id}>? I hope you asked me else ignore.`
      );
    }

    // -----------------------BOSS RESPONSE-----------------------
    if (boss.some(phrase => message.content.toLowerCase() === phrase)) {
      const ownerID = '888712652409409546';
      const responses = [
        `My boss is <@${ownerID}> 😎!`,
        `I belong to <@${ownerID}>!`,
        `I was created by <@${ownerID}> 😊!`,
        `I was made by <@${ownerID}> 😁!`,
      ];
      getRandomResponse(responses, message);
    }

    // -----------------------BOSS CALL-----------------------
    const ownerID = '888712652409409546';
    if (
      message.content.toLowerCase().includes(`<@${ownerID}>`) ||
      message.content.toLowerCase().includes(`<@!${ownerID}>`) ||
      message.content.toLowerCase().includes(`adil`) ||
      message.content.toLowerCase().includes(`rock adil`) ||
      message.content.toLowerCase().includes(`adil ahamed`)
    ) {
      const lastBossResponseTime = bossCooldowns.get(userId);

      if (
        !lastBossResponseTime ||
        currentTime - lastBossResponseTime >= bossCooldownTime
      ) {
        message.channel.send(
          `<@${ownerID}> Seems someone is calling you! or talking about you.`
        );

        bossCooldowns.set(userId, currentTime);
      }
    }

    // -----------------------BYE RESPONSE-----------------------
    if (bye.some(phrase => message.content.toLowerCase().includes(phrase))) {
      message.channel.send(`Bye👋, ${message.author.username}!`);
    }

    // -----------------------GOOD and BAD RESPONSE-----------------------
    const content = message.content.toLowerCase().trim();

    if (goods.includes(message.content.toLowerCase())) {
      message.react('👍');
    }

    if (content === 'good bot') {
      message.react('🥰');
    } else if (content === 'bad bot') {
      message.react('🥹');
    }

    if (bads.includes(message.content.toLowerCase())) {
      message.react('👎');
    }
  });

  /* Welcoming New Members */
  client.on('guildMemberAdd', member => {
    const channelID = '1283798249190457397';
    const channel = member.guild.channels.cache.get(channelID);

    if (channel) {
      channel.send(`Everyone, say hi to, <@${member.id}> 😃!`);
    }
  });
}
