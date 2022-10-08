const client = require("../index");

client.on("messageCreate", async (message) => {
  if (!message.id || !message.guild) return;
  const data = await client.automod.get(`${message.guild.id}.antiinvite`);
  if (!data) return;
  if (message.member.permissions.has("Administrator")) return;
  let antilinkregex =
    /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g;
  if (antilinkregex.test(message)) {
    await message.delete().catch((e) => null);
    message.channel
      .send({
        content: `** ${message.author}  Invite Link Not Allowed Here **`,
      })
      .then((msg) => {
        setTimeout(() => {
          msg.delete().catch(null);
        }, 3000);
      });
  }
});
