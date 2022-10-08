const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} = require("discord.js");
const BOT = require("../../handlers/Client");
const ms = require("ms");
const { duration } = require("../../handlers/functions");

module.exports = {
  // options
  name: "slowmode",
  description: `set slowmode in channel`,
  userPermissions: PermissionFlagsBits.ManageChannels,
  botPermissions: PermissionFlagsBits.ManageChannels,
  category: "Moderation",
  options: [
    {
      name: "duration",
      description: `give duration :- 10s 10m 10h`,
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
    const amount = ms(interaction.options.getString("duration"));
    const seconds = amount / 1000;
    if (seconds > 21600) {
      return client.embed(
        interaction,
        `Duration Must Be Less Than \`6\` Hours`
      );
    } else {
      interaction.channel
        .setRateLimitPerUser(seconds)
        .then((t) => {
          client.embed(
            interaction,
            `${interaction.channel} Slowmode Set \`${duration(amount)}\``
          );
        })
        .catch((e) => console.log(e));
    }
  },
};
