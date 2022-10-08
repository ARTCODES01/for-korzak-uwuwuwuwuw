const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "unmute",
  description: `@unmute a member`,
  userPermissions: PermissionFlagsBits.MuteMembers,
  botPermissions: PermissionFlagsBits.MuteMembers,
  category: "Moderation",
  options: [
    {
      name: "user",
      description: `@mention to ban member`,
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
    const settings = await client.settings.get(interaction.guild.id);
    const muterole = interaction.guild.roles.cache.get(settings?.muterole);

    if (!muterole) {
      return client.embed(
        interaction,
        `Muterole is Setup please setup first \`/setup\``
      );
    } else if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    ) {
      return client.embed(
        interaction,
        `You cant unmute this User This User Permission equal To You`
      );
    } else if (member.id === interaction.member.id) {
      return client.embed(interaction, `You cant unmute yourself`);
    } else if (!member.roles.cache.has(muterole.id)) {
      return client.embed(interaction, `${member} is Not Muted`);
    } else {
      await interaction.guild.channels.cache.forEach((ch) => {
        ch.edit({
          permissionOverwrites: [
            {
              id: member.id,
              allow: ["SendMessages", "Speak", "Connect", "AddReactions"],
            },
          ],
        });
      });
      await member.roles
        .remove(muterole.id)
        .then(async (m) => {
          await client.userprofile.set(`${member.id}.muted`, false);
          client.embed(
            interaction,
            ` ${client.config.emoji.SUCCESS} ${member} UnMuted By ${interaction.member}`
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
