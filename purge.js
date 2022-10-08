const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "purge",
  description: `delete messages in channel`,
  userPermissions: PermissionFlagsBits.ManageMessages,
  botPermissions: PermissionFlagsBits.ManageMessages,
  category: "Moderation",
  options: [
    {
      name: "count",
      description: `how many message you want to delete ?`,
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
    const amount = interaction.options.getString("count");
    if (amount >= 100) {
      return client.embed(
        interaction,
        `${client.config.emoji.ERROR} You Can't Delete More Than 100 Messages `
      );
    } else {
      const messages = await interaction.channel.messages.fetch({
        limit: amount,
      });
      const deletedMessages = await interaction.channel.bulkDelete(
        messages,
        true
      );

      interaction.channel
        .send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setDescription(
                `${client.config.emoji.SUCCESS} \`${deletedMessages.size}\` Messages Deleted ! `
              ),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 4000);
        });
    }
  },
};
