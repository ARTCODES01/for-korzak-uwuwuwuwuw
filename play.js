const {
  ChatInputCommandInteraction,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  name: "play",
  description: `play song from youtube`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 10,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "song",
      description: `song Name/Link`,
      type: ApplicationCommandOptionType.String,
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
    const songName = interaction.options.get("song").value;

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
    } else {
      client.distube.play(voiceChannel, songName, {
        member: interaction.member,
        textChannel: interaction.channel,
      });
      client.embed(interaction, `Searching....`);
    }
  },
};
