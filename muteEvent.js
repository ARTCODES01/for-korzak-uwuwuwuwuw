const client = require("../index");

client.on("guildMemberAdd", async (member) => {
  if (member.user.bot) return;
  const data = await client.userprofile.get(member.id);
  const settings = await client.settings.get(member.guild.id);
  const muterole = member.guild.roles.cache.get(settings.muterole);

  if (data?.muted) {
    await member.guild.channels.cache.forEach((ch) => {
      ch.edit({
        permissionOverwrites: [
          {
            id: member.id,
            deny: ["SendMessages", "Speak", "Connect", "AddReactions"],
          },
        ],
      });
    });
    member.roles.add(muterole).catch((e) => null);
  }
});
