const {
  ChatInputCommandInteraction,
  version,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const BOT = require("../../handlers/Client");
const os = require("os");

module.exports = {
  // options
  name: "stats",
  description: `stats of bot`,
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
    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setTitle("__**Stats:**__")
          .addFields([
            {
              name: `⌚️ Uptime`,
              value: `<t:${Math.floor(
                Date.now() / 1000 - client.uptime / 1000
              )}:R>`,
            },
            {
              name: `📁 Users`,
              value: `\`${client.guilds.cache.reduce(
                (acc, guild) => acc + guild.memberCount,
                0
              )} \``,
              inline: true,
            },
            {
              name: `📁 Servers`,
              value: `\`${client.guilds.cache.size}\``,
              inline: true,
            },
            {
              name: `📁 Channels`,
              value: `\`${client.channels.cache.size}\``,
              inline: true,
            },
            {
              name: `👾 Discord.JS`,
              value: `\`v${version}\``,
              inline: true,
            },
            {
              name: `🤖 Node`,
              value: `\`${process.version}\``,
              inline: true,
            },
            {
              name: `🏓 Ping`,
              value: `\`${client.ws.ping}ms\``,
              inline: true,
            },
            {
              name: `🤖 CPU`,
              value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``,
            },
            {
              name: `🤖 Arch`,
              value: `\`${os.arch()}\``,
              inline: true,
            },
            {
              name: `💻 Platform`,
              value: `\`\`${os.platform()}\`\``,
              inline: true,
            },
          ])
          .setFooter(client.getFooter(interaction.user)),
      ],
    });
  },
};
