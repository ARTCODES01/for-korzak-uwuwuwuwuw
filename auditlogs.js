const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "auditlog",
  description: `setup audit logs system`,
  userPermissions: PermissionFlagsBits.ManageGuild,
  botPermissions: PermissionFlagsBits.ViewAuditLog,
  category: "Settings",
  options: [
    {
      name: "enable",
      description: `setup audit logs`,
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "channel",
          description: `@channel mention channel for logs`,
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
      ],
    },
    {
      name: "disable",
      description: `disable audit logs`,
      type: ApplicationCommandOptionType.Subcommand,
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
    const Subcommand = interaction.options.getSubcommand();

    switch (Subcommand) {
      case "enable":
        {
          const channel = interaction.options.getChannel("channel");
          await client.settings.set(`${interaction.guild.id}.auditlog`, {
            enable: true,
            channel: channel.id,
          });
          client.embed(interaction, `Audit Log Enabled in ${channel}`);
        }
        break;
      case "disable":
        {
          await client.settings.set(`${interaction.guild.id}.auditlog`, {
            enable: false,
            channel: null,
          });
          client.embed(interaction, `Audit Log Disabled`);
        }
        break;

      default:
        break;
    }
  },
};
