const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "dm",
  description: `dm a user in server`,
  userPermissions: PermissionFlagsBits.Administrator,
  botPermissions: PermissionFlagsBits.Administrator,
  category: "Misc",
  options: [
    {
      name: "user",
      description: "@mention user to send dm",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "message",
      description: "type message to send",
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
    const message = interaction.options.getString("message");

    user
      .send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setAuthor({
              name: `Dm from ${interaction.user.tag}`,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setDescription(`${message}`.substring(0, 4000)),
        ],
      })
      .then(() => client.embed(interaction, `DM send to ${user}`))
      .catch(() => client.embed(interaction, `can't send DM to ${user}`));
  },
};
