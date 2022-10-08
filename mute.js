const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");
const ms = require("ms");

module.exports = {
  // options
  name: "mute",
  description: `@mute a member`,
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
    {
      name: "reason",
      description: `give reason for mute`,
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
        `You cant mute this User This User Permission equal To You`
      );
    } else if (
      muterole.position >= interaction.guild.members.me.roles.highest.position
    ) {
      return client.embed(
        interaction,
        `Mute Role is Above On Me Please Give me Highest Permissions`
      );
    } else if (member.id === interaction.member.id) {
      return client.embed(interaction, `You cant mute yourself`);
    } else {
      await interaction.guild.channels.cache.forEach((ch) => {
        ch.edit({
          permissionOverwrites: [
            {
              id: member.id,
              deny: ["SendMessages", "Speak", "Connect", "AddReactions"],
            },
          ],
        });
      });
      await member.roles
        .add(muterole, reason)
        .then(async (m) => {
          await client.userprofile.set(`${member.id}.muted`, true);
          client.embed(
            interaction,
            ` ${client.config.emoji.SUCCESS} ${member} Muted By ${interaction.member} | Reason :- ${reason}`
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
