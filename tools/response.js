// **************************************** FUNCTIONS ******************************************
// let getTimeoutMember = async (message, mins, reason) => {
//   const member = message.guild.members.cache.get(message.author.id);
//   if (member) {
//     try {
//       await member.timeout(mins * 60 * 1000);
//       message.channel.send(
//         `<@${message.author.id}> has been timed out for ${mins} minutes because of ${reason}.`
//       );
//     } catch (error) {
//       console.error('Failed to timeout the user:', error);
//     }
//   }
// };

//  *********************************** Response Program ***********************************

export function getResponses(client) {
  client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // ------------------- HINDI HATE RESPONSE --------------------------
    // if (
    //   hindiHateResponse.some(phrase =>
    //     new RegExp(`(^|\\s)${phrase.toLowerCase()}(\\s|$)`, 'gi').test(
    //       message.content.toLowerCase()
    //     )
    //   )
    // ) {
    //   getTimeoutMember(message, 2, `**Don't speak English**`); // Timeout for 2 minute
    // }

    // ------------------- GAY RESPONSE --------------------------
    // if (new RegExp(`\\bgay\\b`, 'i').test(message.content)) {
    //   getTimeoutMember(message, 2, 'Gay'); // Timeout for 2 minute
    // }

    // ------------------- TAGS LEAKED RESPONSE --------------------------
    // if (new RegExp(/!\w+/, 'i').test(message.content)) {
    //   getTimeoutMember(message, 1, '**Sharing Tag**'); // Timeout for 1 minute
    //   message.delete();
    // }

    // ------------------- BAD WORDS RESPONSE --------------------------
    // if (
    //   badwords.some(phrase =>
    //     new RegExp(`\\b${phrase.toLowerCase()}\\b`).test(
    //       message.content.toLowerCase()
    //     )
    //   )
    // ) {
    //   getTimeoutMember(message, 2, 'using Bad Word'); // Timeout for 2 minute
    //   message.delete();
    // }
  });
}
