const {
  ChatInputCommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  name: "autoplay",
  description: `toggle autoplay`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 10,
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {BOT} client
   * @param {ChatInputCommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    // Code
    const voiceChannel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;
    const queue = client.distube.getQueue(interaction.guildId);
    if (!voiceChannel) {
      return client.embed(
        interaction,
        `${client.config.emoji.ERROR} Please Join Voice Channel! `
      );
    } else if (botChannel && !botChannel?.equals(voiceChannel)) {
      return client.embed(
        interaction,
        `${client.config.emoji.ERROR} You Need to Join ${botChannel} Voice Channel `
      );
    } else if (!queue) {
      return client.embed(
        interaction,
        `${client.config.emoji.ERROR} Queue Not Playing `
      );
    } else {
      const autoplay = queue.toggleAutoplay();

      client.embed(
        interaction,
        `${client.config.emoji.SUCCESS} AutoPlay: \`${
          autoplay ? "On" : "Off"
        }\``
      );
    }
  },
};
