const {
  ChatInputCommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  name: "volume",
  description: `manage volume of player`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 10,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "amount",
      description: `Give Volume amount in number`,
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
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
    const volume = interaction.options.get("amount").value;
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
      if (volume > 250) {
        return client.embed(
          interaction,
          `${client.config.emoji.ERROR} Provide Volume Amount Between 1 - 250  !!`
        );
      } else {
        await queue.setVolume(volume);
        client.embed(
          interaction,
          `${client.config.emoji.SUCCESS} Volume Set to ${queue.volume}% !!`
        );
      }
    }
  },
};
