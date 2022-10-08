const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "help",
  description: `see all commands`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  // command start

  /**
   *
   * @param {BOT} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    const allcommands = client.scategories.map((dir) => {
      const commands = client.commands
        .filter((cmd) => cmd.category == dir)
        .map((cmd) => {
          const cmds = [];
          cmds.push(`\`${cmd.name}\``);
          if (cmd.options) {
            cmd.options
              .filter(
                (option) =>
                  option.type === ApplicationCommandOptionType.Subcommand
              )
              .map((option) => {
                cmds.push(`\`${cmd.name} ${option.name} \``);
              });
          }
          return cmds.join();
        });
      return {
        dir,
        commands,
      };
    });

    const emojis = {
      Misc: `🔰`,
      Moderation: `🛡️`,
      Music: `🎵`,
      Settings: `⚙️`,
      Context: `🔑`,
    };

    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setAuthor({
            name: `My Commands`,
            iconURL: client.user.displayAvatarURL(),
          })
          .addFields(
            allcommands.map(({ dir, commands }) => {
              return {
                name: `${emojis[dir]} ${dir}`,
                value: commands.join(" ' ") || "` No Commands `",
              };
            })
          )
          .setFooter(client.getFooter(interaction.user)),
      ],
    });
  },
};
