const client = require("../index");

client.on("guildMemberAdd", async (member) => {
  const data = await client.automod.get(`${member.guild.id}.antiraid`);
  if (!data) return;

  member
    .kick("Anti Raid Mode Enabled ")
    .then((mem) => {
      mem
        .send({
          content: `You have been kicked from ${mem.guild.name} because AntiRaid Mode Enabled`,
        })
        .catch((e) => {});
    })
    .catch((e) => {});
});
