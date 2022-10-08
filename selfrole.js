const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
const client = require("../index");

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    await interaction.deferUpdate().catch((e) => {});
    const rolesdata = await client.selfrole.get(
      `${interaction.guildId}.rolesdata`
    );
    if (!rolesdata?.length) return;
    const data = rolesdata.find(
      (data) => data.messageid === interaction.message.id
    );
    if (!data) return;
    if (interaction.customId === `select_role`) {
      interaction
        .followUp({
          content: `Select The Role You Want`,
          ephemeral: true,
          components: [
            new ActionRowBuilder().addComponents([
              new SelectMenuBuilder()
                .setCustomId(`role_menu`)
                .setPlaceholder(`Click to see all roles`)
                .setMaxValues(data?.roles?.length)
                .setMinValues(1)
                .setOptions(
                  data.roles.map((item) => {
                    const role = interaction.guild.roles.cache.get(item.role);
                    if (!role) return;
                    return {
                      label: `${role.name}`.substring(0, 24),
                      description: `${item.message}`.substring(0, 99),
                      value: `${role.id}`.substring(0, 20),
                    };
                  })
                ),
            ]),
          ],
        })
        .catch((e) => {});
    }
  }

  if (interaction.isSelectMenu()) {
    await interaction.deferUpdate().catch((e) => {});
    const values = interaction.values;
    values.forEach(async (data) => {
      const role = interaction.guild.roles.cache.get(data);
      if (!role) {
        return interaction.followUp({
          content: `no role found`,
          ephemeral: true,
        });
      }

      if (!interaction.member.roles.cache.has(role.id)) {
        await interaction.member.roles.add(role.id).catch((e) => {
          interaction.followUp({
            content: `${e.message}`,
            ephemeral: true,
          });
        });
        interaction.followUp({
          content: `Your roles has been updated`,
          ephemeral: true,
        });
      } else {
        await interaction.member.roles.remove(role.id).catch((e) => {
          interaction.followUp({
            content: `${e.message}`,
            ephemeral: true,
          });
        });
        interaction.followUp({
          content: `Your roles has been updated`,
          ephemeral: true,
        });
      }
    });
  }
});
