const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "kick",
  description: `@kick a member`,
  userPermissions: PermissionFlagsBits.KickMembers,
  botPermissions: PermissionFlagsBits.KickMembers,
  category: "Moderation",
  options: [
    {
      name: "user",
      description: `@mention to kick member`,
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: `give reason to kick member`,
      type: ApplicationCommandOptionType.String,
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
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);
    const reason = interaction.options.getString("reason") || "No Reason";

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    ) {
      return client.embed(
        interaction,
        `You cant Kick this User This User Permission equal To You`
      );
    } else if (member.id === interaction.member.id) {
      return client.embed(interaction, `You cant Kick yourself`);
    } else {
      member
        .kick(reason)
        .then((m) => {
          client.embed(
            interaction,
            ` ${client.config.emoji.SUCCESS} \`${member.user.tag}\` Kicked From Server By ${interaction.member} | Reason :- ${reason}`
          );
        })
        .catch((error) => {
          client.embed(
            interaction,
            ` ${client.config.emoji.ERROR} ${error.message}`
          );
        });
    }
  },
};
