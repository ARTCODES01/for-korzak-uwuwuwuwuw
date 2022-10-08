const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "unwarn",
  description: `@user unwarn a user`,
  userPermissions: PermissionFlagsBits.ManageGuild,
  botPermissions: PermissionFlagsBits.ManageGuild,
  category: "Moderation",
  options: [
    {
      name: "user",
      description: `@mention use to warn`,
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "id",
      description: `give id of warn`,
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
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);
    const warnid = interaction.options.getString("id");
    const data = await client.userprofile.get(member.id);
    let warndata = data.warnings
      .filter((warn) => warn.warnid != warnid)
      .map((warn) => warn);
    if (!warndata?.length) {
      await client.userprofile.ensure(member.id, {
        warnings: [],
      });
    }
    if (
      interaction.member.roles.highest.position < member.roles.highest.position
    ) {
      return client.embed(
        interaction,
        `You cant Unwarn this User This User Permission equal To You`
      );
    } else if (member.id === interaction.member.id) {
      return client.embed(interaction, `You cant Unwarn yourself`);
    } else {
      await client.userprofile.set(`${member.id}.warnings`, [...warndata]);
      client.embed(
        interaction,
        `${client.config.emoji.SUCCESS} Warning Removed From ${member}`
      );
    }
  },
};
