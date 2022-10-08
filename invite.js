const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "invite",
  description: `get invite link of bot`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  // command start

  /**
   *
   * @param {BOT} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    client.embed(
      interaction,
      `[Click to Invite ${client.user.username}](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`
    );
  },
};
