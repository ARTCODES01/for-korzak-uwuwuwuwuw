const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "automod",
  description: `setup automod system`,
  userPermissions: PermissionFlagsBits.Administrator,
  botPermissions: PermissionFlagsBits.Administrator,
  category: "Settings",
  options: [
    {
      name: "antiraid",
      description: `setup antiraid`,
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "antiinvite",
      description: `setup antiinvite`,
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "antimassmention",
      description: `setup antimentions`,
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "antiroleupdate",
      description: `setup anti role permisson update`,
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
    const data = await client.automod.get(interaction.guild.id);

    switch (Subcommand) {
      case "antiraid":
        {
          if (data.antiraid) {
            await client.automod.set(`${interaction.guildId}.antiraid`, false);
            client.embed(
              interaction,
              `${client.config.emoji.SUCCESS} Antiraid Disabled`
            );
          } else {
            await client.automod.set(`${interaction.guildId}.antiraid`, true);
            client.embed(
              interaction,
              `${client.config.emoji.SUCCESS} Antiraid Enabled`
            );
          }
        }
        break;
      case "antiinvite":
        {
          if (data.antiinvite) {
            await client.automod.set(
              `${interaction.guildId}.antiinvite`,
              false
            );
            client.embed(
              interaction,
              `${client.config.emoji.SUCCESS} Anti Invite Disabled`
            );
          } else {
            await client.automod.set(`${interaction.guildId}.antiinvite`, true);
            client.embed(
              interaction,
              `${client.config.emoji.SUCCESS} Anti Invite Enabled`
            );
          }
        }
        break;
      case "antimassmention":
        {
          if (data.antimention) {
            await client.automod.set(
              `${interaction.guildId}.antimention`,
              false
            );
            client.embed(
              interaction,
              `${client.config.emoji.SUCCESS} Anti Mention Disabled`
            );
          } else {
            await client.automod.set(
              `${interaction.guildId}.antimention`,
              true
            );
            client.embed(
              interaction,
              `${client.config.emoji.SUCCESS} Anti Mention Enabled`
            );
          }
        }
        break;
      case "antiroleupdate":
        {
          if (data.antirolepermsupdate) {
            await client.automod.set(
              `${interaction.guildId}.antirolepermsupdate`,
              false
            );
            client.embed(
              interaction,
              `${client.config.emoji.SUCCESS} Anti Role Permission Update Disabled`
            );
          } else {
            await client.automod.set(
              `${interaction.guildId}.antirolepermsupdate`,
              true
            );
            client.embed(
              interaction,
              `${client.config.emoji.SUCCESS} Anti Role Permission Update Enabled`
            );
          }
        }
        break;

      default:
        break;
    }
  },
};
