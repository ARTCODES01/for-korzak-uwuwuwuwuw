const {
  ChatInputCommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  name: "nowplaying",
  description: `see current playing song info`,
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
      let song = queue.songs[0];

      interaction.followUp({
        embeds: [
          new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setThumbnail(song.thumbnail)
            .setAuthor({
              name: `Now Playing`,
              iconURL: song.thumbnail,
              url: song.url,
            })
            .setDescription(`** [${song.name}](${song.streamURL}) **`)
            .addFields([
              {
                name: `** Duration **`,
                value: ` \`${queue.formattedCurrentTime}/${song.formattedDuration} \``,
                inline: true,
              },
              {
                name: `** Requested By **`,
                value: ` \`${song.user.tag} \``,
                inline: true,
              },
              {
                name: `** Author **`,
                value: ` \`${song.uploader.name}\``,
                inline: true,
              },
            ]),
        ],
      });
    }
  },
};
