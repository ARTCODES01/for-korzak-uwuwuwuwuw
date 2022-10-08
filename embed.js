const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  Colors,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const BOT = require("../../handlers/Client");

const colors = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Pink",
  "White",
  "Black",
];

module.exports = {
  // options
  name: "embedbuilder",
  description: `build a embed of your choice`,
  userPermissions: PermissionFlagsBits.EmbedLinks,
  botPermissions: PermissionFlagsBits.EmbedLinks,
  category: "Misc",
  options: [
    {
      name: "title",
      description: "The title of the embed.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "description",
      description: "The description of the embed.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "color",
      choices: "colors",
      description: "The color of the embed.",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: colors.map((choice) => {
        return { name: `${choice}`, value: `${choice}` };
      }),
    },
    {
      name: "footer",
      description: "The footer of the embed.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "channel",
      description: "#channel to send embed",
      type: ApplicationCommandOptionType.Channel,
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
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const color = interaction.options.getString("color");
    console.log(color);
    const footer = interaction.options.getString("footer");
    const channel =
      interaction.options.getChannel("channel") || interaction.channel;

    const embed = new EmbedBuilder()
      .setColor(Colors[color])
      .setTitle(title.substring(0, 255))
      .setDescription(description.substring(0.4))
      .setFooter({
        text: footer,
        iconURL: interaction.guild.iconURL(),
      });

    channel
      .send({ embeds: [embed] })
      .then(() => client.embed(interaction, `Embed Send in ${channel}`))
      .catch((e) => client.embed(interaction, `${e.message}`));
  },
};
