const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "warnings",
  description: `@user see warnings of a user`,
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
    const data = await client.userprofile.get(member.id);
    let warndata = data.warnings;
    if (!warndata?.length) {
      await client.userprofile.ensure(member.id, {
        warnings: [],
      });
      client.embed(interaction, `${member} Have No Warnings`);
    } else {
      interaction.followUp({
        embeds: [
          new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setTitle(`[${warndata.length}] Warnings Of ${user.tag}`)
            .setThumbnail(user.displayAvatarURL())
            .setFooter(client.getFooter(user))
            .setDescription(
              warndata
                .map(
                  (warn, index) =>
                    `** \`${index + 1}\` ID :: \`${warn.warnid}\` User :: <@${
                      warn.user
                    }> Moderator :: <@${warn.moderator}> Reason :: \`${
                      warn.reason
                    }\` **`
                )
                .join("\n\n")
                .substring(0, 4000)
            ),
        ],
      });
    }
  },
};
