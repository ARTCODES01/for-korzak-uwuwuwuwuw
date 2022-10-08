const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");
const { randomId } = require("../../handlers/functions");

module.exports = {
  // options
  name: "warn",
  description: `@user warn a user`,
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
      name: "reason",
      description: `give reason for warn`,
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
    const reason = interaction.options.getString("reason") || "No Reason";
    await client.userprofile.ensure(`${member.id}.warnings`, []);
    const warndata = await client.userprofile.get(`${member.id}.warnings`);
    const settings = await client.settings.get(interaction.guildId);
    if (
      interaction.member.roles.highest.position < member.roles.highest.position
    ) {
      return client.embed(
        interaction,
        `You cant Warn this User This User Permission equal To You`
      );
    } else if (member.id === interaction.member.id) {
      return client.embed(interaction, `You cant Warn yourself`);
    } else {
      if (warndata?.length >= settings?.warnLength) {
        member
          .kick(`${settings.warnLength} Warnings Limit Cross`)
          .then(async (user) => {
            await client.userprofile.set(`${member.id}.warnings`, []);
            client.embed(
              interaction,
              `${member} Kicked Beacuse He/She Cross Warnings Limit`
            );
          });
      } else {
        warndata?.push({
          moderator: interaction.user.id,
          user: user.id,
          reason: reason,
          warnid: randomId(),
        });
        await client.userprofile.set(`${member.id}.warnings`, [...warndata]);
        client.embed(
          interaction,
          `${client.config.emoji.SUCCESS} ${member} Warned By ${interaction.member} | Warnings :- \`${warndata.length}\``
        );
      }
    }
  },
};
