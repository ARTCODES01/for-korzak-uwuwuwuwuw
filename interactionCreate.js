const { ApplicationCommandOptionType } = require("discord.js");
const client = require("..");
const { databasing } = require("../handlers/functions");
const { emoji } = require("../settings/config");

client.on("interactionCreate", async (interaction) => {
  // Slash Command Handling
  if (interaction.isChatInputCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch((e) => {});
    await databasing(client, interaction.guildId, interaction.user.id);
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd)
      return client.embed(
        interaction,
        `${emoji.ERROR} \`${interaction.commandName}\` Command Not Found `
      );
    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    if (cmd) {
      // checking user perms
      if (!interaction.member.permissions.has(cmd.userPermissions)) {
        return client.embed(
          interaction,
          `You Don't Have Permission to Use \`${cmd.name}\` Command!!`
        );
      } else if (
        !interaction.guild.members.me.permissions.has(cmd.botPermissions)
      ) {
        return client.embed(
          interaction,
          `I Don't Have Permission to Use \`${cmd.name}\` Command!!`
        );
      } else {
        cmd.run(client, interaction, args);
      }
    }
  }

  // Context Menu Handling
  if (interaction.isContextMenuCommand()) {
    await interaction.deferReply({ ephemeral: true }).catch((e) => {});
    const command = client.commands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});
