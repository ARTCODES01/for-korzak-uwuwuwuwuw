const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "settings",
  description: `see settings of server`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.EmbedLinks,
  category: "Settings",
  // command start

  /**
   *
   * @param {BOT} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    const settings = await client.settings.get(interaction.guildId);
    const automod = await client.automod.get(interaction.guildId);

    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setAuthor({
            name: `Settings Of ${interaction.guild.name}`,
            iconURL: interaction.guild.iconURL(),
          })
          .addFields([
            {
              name: `Prefix`,
              value: `\`${settings.prefix}\``,
              inline: true,
            },
            {
              name: `Mute Role`,
              value: `${
                settings.muterole ? `<@${settings.muterole}>` : `\`Not Setup\``
              }`,
              inline: true,
            },
            {
              name: `Log Channel`,
              value: `${
                settings.auditlog.enable
                  ? `<#${settings.auditlog.channel}>`
                  : `\`Not Setup\``
              }`,
              inline: true,
            },
            {
              name: `Anti Raid`,
              value: `${
                automod.antiraid
                  ? `${client.config.emoji.SUCCESS}\` ON\``
                  : `${client.config.emoji.ERROR}\` OFF\``
              }`,
              inline: true,
            },
            {
              name: `Anti Invite`,
              value: `${
                automod.antiinvite
                  ? `${client.config.emoji.SUCCESS} \`ON\``
                  : `${client.config.emoji.ERROR} \`OFF\``
              }`,
              inline: true,
            },
            {
              name: `Anti Massmention`,
              value: `${
                automod.antimention
                  ? `${client.config.emoji.SUCCESS} \`ON\``
                  : `${client.config.emoji.ERROR} \` OFF\``
              }`,
              inline: true,
            },
            {
              name: `Slash Commands`,
              value: `\`\`\`nim\n ${interaction.guild.commands.cache
                .map((cmd) => `${cmd.name}`)
                .join(", ")} \`\`\``,
            },
          ])
          .setFooter(client.getFooter(interaction.user)),
      ],
    });
  },
};
