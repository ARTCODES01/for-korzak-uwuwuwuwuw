const client = require("../index");

client.on("messageCreate", async (message) => {
  const afkmember = message.mentions.members.first();
  if (afkmember) {
    const data = await client.afk.get(afkmember.id);
    if (!data) return;
    const { reason, when, enable } = data;
    if (enable) {
      client.embed(
        message,
        `${afkmember} is currently afk (<t:${when}:R>) \nReason: ${reason}`
      );
    }
  }

  const afkdata = await client.afk.get(message.member.id);
  if (!afkdata) return;
  if (afkdata.enable) {
    await client.afk.delete(message.member.id);
    await client.afk.set(message.member.id, {
      enable: false,
      reason: null,
      when: null,
    });
    client.embed(message, `Welcome back, i have removed your afk!`);
  }
});
