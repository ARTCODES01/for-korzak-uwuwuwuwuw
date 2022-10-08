const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "userinfo",
  description: `get information of a user`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  options: [
    {
      name: "user",
      description: `mention a user for info`,
      type: ApplicationCommandOptionType.User,
      required: false,
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
    const user = interaction.options.getUser("user") || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    const roles = member.roles.cache
      .map((role) => role)
      .join(" ' ")
      .substring(0, 1000);

    const EmbedFieldOptions = [
      {
        name: `Tag`,
        value: `\`${user.tag}\``,
      },
      {
        name: `Joined At`,
        value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
      },
      {
        name: `Created At`,
        value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`,
      },
      {
        name: `NickName`,
        value: `\`${member.nickname || "No NickName"}\``,
      },
      {
        name: `Roles`,
        value: `${roles}`,
      },
    ];

    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setAuthor({
            name: `${user.username} Userinfo`,
            iconURL: user.displayAvatarURL(),
          })
          .setThumbnail(user.displayAvatarURL())
          .setDescription(` ${user} | \`${user.id}\``)
          .addFields(
            EmbedFieldOptions.map((field) => {
              return {
                name: `${field.name}`,
                value: `${field.value}`,
              };
            })
          )
          .setFooter(client.getFooter(user)),
      ],
    });
  },
};
