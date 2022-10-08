const {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
  Colors,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  // options
  name: "roles",
  description: `setup menu role system`,
  userPermissions: PermissionFlagsBits.Administrator,
  botPermissions: PermissionFlagsBits.ManageRoles,
  category: "Settings",
  // command start

  /**
   *
   * @param {BOT} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
    const arrRoles = [];
    /*  
    {
      messageid : "",
      roles : [{role : "", desc : " "}],
    }
    */
    let counter = 0;

    while (counter < 24) {
      counter++;
      if (counter >= 24) {
        return finished();
      }

      let role = await ask(
        "Mention Role Which you want to add in self role \n\n if you want to stop type `finish`"
      );
      if (role?.content === "finish") return finished();

      role =
        role.mentions.roles.first() ||
        interaction.guild.roles.cache.get(role.content);

      if (!role) return error("invalid role please try again");

      let message = await ask("give description of mentioned role");
      message = message.content;

      if (!message) return error("message not get please try again");

      arrRoles.push({
        role: role.id,
        message: message,
      });
    }

    async function ask(title) {
      const msg = await interaction.followUp({
        embeds: [
          new EmbedBuilder().setColor(Colors.Blurple).setDescription(title),
        ],
      });
      const collected = await msg.channel.awaitMessages({
        filter: (msg) => msg.author.id === interaction.user.id,
        max: 1,
        time: 30000,
      });
      setTimeout(async () => {
        await msg.delete().catch((e) => null);
        await collected
          .first()
          .delete()
          .catch((e) => null);
      }, 2000);
      return collected.first();
    }

    async function finished() {
      let channel = await ask(`mention channel where you want to send embed`);
      channel =
        channel.mentions.channels.first() ||
        interaction.guild.channels.cache.get(channel.content);
      if (!channel) return error(`invalid channel please try again`);

      let embed = new EmbedBuilder().setColor(Colors.Green).addFields(
        arrRoles.map((item) => {
          const role = interaction.guild.roles.cache.get(item.role);
          return {
            name: `** ${role.name} **`,
            value: `${item.message}`,
          };
        })
      );
      let btnrow = new ActionRowBuilder().addComponents([
        new ButtonBuilder()
          .setCustomId(`select_role`)
          .setLabel(`Select Roles`)
          .setStyle(ButtonStyle.Success),
      ]);
      await channel
        .send({
          embeds: [embed],
          components: [btnrow],
        })
        .then(async (msg) => {
          const dataobject = {
            messageid: msg.id,
            roles: arrRoles,
          };
          await client.selfrole.push(
            `${interaction.guildId}.rolesdata`,
            dataobject
          );
          client.embed(
            interaction,
            `${client.config.emoji.SUCCESS} Self Role Setup in ${channel}`
          );
        });
    }

    function error(error) {
      interaction.followUp({
        embeds: [new EmbedBuilder().setColor(Colors.Red).setDescription(error)],
      });
    }
  },
};
