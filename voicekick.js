const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
  ChannelType,
} = require("discord.js");
const { createAudioPlayer, joinVoiceChannel } = require("@discordjs/voice");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "voicekick",
  description: `@user kick user from vc`,
  userPermissions: PermissionFlagsBits.MoveMembers,
  botPermissions: PermissionFlagsBits.MoveMembers,
  category: "Moderation",
  options: [
    {
      name: "user",
      description: `@user kick user from vc`,
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  // command start

  /**
   *
   * @param {BOT} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);
    const voiceChannel = interaction.member.voice.channel;

    const channelConnection = await joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guildId,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();

    channelConnection.subscribe(player);

    await member.voice
      .disconnect()
      .then((m) => {
        client.embed(
          interaction,
          `${member} Disconnected From ${voiceChannel} Voice Channel !`
        );
        channelConnection.disconnect();
      })
      .catch((e) => {
        client.embed(interaction, `${e.message}`);
      });
  },
};
