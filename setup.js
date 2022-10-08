const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "setup",
  description: `setup bot system`,
  userPermissions: PermissionFlagsBits.Administrator,
  botPermissions: PermissionFlagsBits.Administrator,
  category: "Settings",
  options: [
    {
      name: "muterole",
      description: `setup muterole system`,
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "role",
          description: "@role mention mute role",
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
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
      case "muterole":
        {
          const muterole = interaction.options.getRole("role");
          await client.settings.set(
            `${interaction.guildId}.muterole`,
            muterole.id
          );
          client.embed(
            interaction,
            `${client.config.emoji.SUCCESS} ${muterole} is Now Muterole !`
          );
        }
        break;

      default:
        break;
    }
  },
};
