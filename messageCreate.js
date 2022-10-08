const { databasing } = require("../handlers/functions");
const client = require("..");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || !message.id) return;
  await databasing(client, message.guildId, message.author.id);
  const settings = await client.settings.get(`${message.guildId}`);
  let prefix = settings.prefix;
  let mentionprefix = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  if (!mentionprefix.test(message.content)) return;
  const [, nprefix] = message.content.match(mentionprefix);
  const args = message.content.slice(nprefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) {
    if (nprefix.includes(client.user.id)) {
      client.embed(
        message,
        ` ${client.config.emoji.SUCCESS} To See My All Commands Type  \`/help\` or \`${prefix}help\``
      );
    }
  }
});

function escapeRegex(newprefix) {
  return newprefix.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
