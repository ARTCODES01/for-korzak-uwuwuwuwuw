const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "unban",
  description: `@user unban a user`,
  userPermissions: PermissionFlagsBits.BanMembers,
  botPermissions: PermissionFlagsBits.BanMembers,
  category: "Moderation",
  options: [
    {
      name: "id",
      description: `id of banned user`,
      type: ApplicationCommandOptionType.String,
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
    const userid = interaction.options.getString("id");
    const user =
      client.users.cache.get(userid) || (await client.users.fetch(userid));

    interaction.guild.members
      .unban(user)
      .then((user) => {
        client.embed(
          interaction,
          `${client.config.emoji.SUCCESS} \`${user.tag}\` Unbanned From Server By ${interaction.member}`
        );
      })
      .catch((e) => {
        client.embed(interaction, `${client.config.emoji.ERROR} ${e.message} `);
      });
  },
};
