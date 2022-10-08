const {
  ChatInputCommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  name: "loop",
  description: `toggle loop in song`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 10,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "loopmode",
      description: `choose loop mode`,
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Track",
          value: `1`,
        },
        {
          name: "Queue",
          value: `2`,
        },
        {
          name: "Off",
          value: `0`,
        },
      ],
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
    const loopmode = Number(interaction.options.get("loopmode").value);
    console.log(loopmode);
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
      await queue.setRepeatMode(loopmode);
      if (queue.repeatMode === 0) {
        return client.embed(
          interaction,
          `${client.config.emoji.ERROR} Loop Disabled!`
        );
      } else if (queue.repeatMode === 1) {
        return client.embed(
          interaction,
          `${client.config.emoji.SUCCESS} Song Loop Enabled!`
        );
      } else if (queue.repeatMode === 2) {
        return client.embed(
          interaction,
          ` ${client.config.emoji.SUCCESS} Queue Loop Enabled!`
        );
      }
    }
  },
};
