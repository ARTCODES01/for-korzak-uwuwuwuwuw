const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "ban",
  description: `@ban a member`,
  userPermissions: PermissionFlagsBits.BanMembers,
  botPermissions: PermissionFlagsBits.BanMembers,
  category: "Moderation",
  options: [
    {
      name: "user",
      description: `@mention to ban member`,
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: `give reason to ban member`,
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
      interaction.member.roles.highest.position < member.roles.highest.position
    ) {
      return client.embed(
        interaction,
        `You cant ban this User This User Permission equal To You`
      );
    } else if (member.id === interaction.member.id) {
      return client.embed(interaction, `You cant ban yourself`);
    } else {
      await member
        .ban({
          reason: reason,
        })
        .then((m) => {
          client.embed(
            interaction,
            ` ${client.config.emoji.SUCCESS} \`${member.user.tag}\` Banned From Server By ${interaction.member} | Reason :- ${reason}`
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
