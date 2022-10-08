const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const BOT = require("../../handlers/Client");
const { verificationLevels } = require("../../settings/constant");

module.exports = {
  // options
  name: "serverinfo",
  description: `see information about current server`,
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
    const roles = interaction.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role)
      .join(" ' ")
      .substring(0, 1000);

    const emojis = interaction.guild.emojis.cache
      .map((emoji) => emoji)
      .join(" ' ")
      .substring(0, 1000);
    const EmbedFieldOptions = [
      {
        name: `🎴 Guild Owner`,
        value: `<@${interaction.guild.ownerId}>`,
      },
      {
        name: `👩‍👩‍👦 Member Count`,
        value: `${interaction.guild.memberCount}`,
      },
      {
        name: `🎚️ Verification Level`,
        value: `${verificationLevels[interaction.guild.verificationLevel]}`,
      },
      {
        name: `🗒️ Rules Channel`,
        value: `${interaction.guild.rulesChannel || "None"}`,
      },
      {
        name: `📅 Created On`,
        value: `${interaction.guild.createdAt.toString()}`,
      },
      {
        name: `🎛️ Total Roles`,
        value: ` ${roles}`,
      },
      {
        name: `🌀 Emoji Count`,
        value: `${emojis}`,
      },
    ];

    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setAuthor({
            name: `${interaction.guild.name} Server Info`,
            iconURL: interaction.guild.iconURL(),
          })
          .setThumbnail(interaction.guild.iconURL())
          .addFields(
            EmbedFieldOptions.map((field) => {
              return {
                name: `${field.name}`,
                value: `${field.value}`,
              };
            })
          )
          .setFooter(client.getFooter(interaction.user)),
      ],
    });
  },
};
