const client = require("../index");

client.on("messageCreate", async (message) => {
  if (!message.id || !message.guild) return;
  const data = await client.automod.get(`${message.guild.id}.antimention`);
  if (!data) return;
  if (message.member.permissions.has("Administrator")) return;
  let rolementions = message.mentions.roles.size;
  let usermentions = message.mentions.users.size;
  let allmentions = rolementions + usermentions;
  if (allmentions > 3) {
    await message.delete().catch((e) => null);
    message.channel
      .send({
        content: `** ${message.author} Mass Mentions Not Allowed **`,
      })
      .then((msg) => {
        setTimeout(() => {
          msg.delete().catch(() => {});
        }, 3000);
      })
      .catch((e) => {});
  }
});
