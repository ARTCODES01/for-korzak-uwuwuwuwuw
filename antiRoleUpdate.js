const { AuditLogEvent, PermissionFlagsBits } = require("discord.js");
const client = require("../index");

client.on("roleUpdate", async (oldrole, newrole) => {
  const data = await client.automod.get(
    `${oldrole.guild.id}.antirolepermsupdate`
  );
  if (!data) return;
  const log = await oldrole.guild
    .fetchAuditLogs({ type: AuditLogEvent.RoleUpdate, limit: 1 })
    .then((value) => value.entries.first())
    .catch((e) => {});

  const isDanger = newrole.permissions.toArray().includes("Administrator");
  const target = await oldrole.guild.members.fetch(log.executor.id);
  if (!target) return;
  if (isDanger) {
    target?.roles.cache.forEach((role) => {
      target.roles
        .remove(role.id)
        .then((m) => {
          const owner = oldrole.guild.members.cache.get(oldrole.guild.ownerId);
          owner.send({
            content: `${member} Changed Permission in ${newrole} role and i removed his all role `,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (oldMember.partial) await oldMember.fetch();
  if (newMember.partial) await newMember.fetch();

  const data = await client.automod.get(
    `${oldMember.guild.id}.antirolepermsupdate`
  );
  if (!data) return;

  // role add
  const addedRoles = [];
  newMember.roles.cache.forEach((role) => {
    if (!oldMember.roles.cache.has(role.id)) addedRoles.push(role);
  });
  addedRoles.forEach(async (role) => {
    // code
    if (role.permissions.has(PermissionFlagsBits.Administrator)) {
      let owner = await newMember.guild.fetchOwner();
      let fetchroe = await oldMember.guild.roles.fetch(role.id);
      owner.send(
        `${member.username} Given \`${fetchroe.name}\` To ${newMember} Member`
      );
    }
  });

  // role remove
  const removedRoles = [];
  oldMember.roles.cache.forEach((role) => {
    if (!newMember.roles.cache.has(role.id)) removedRoles.push(role);
  });
  removedRoles.forEach(async (role) => {
    // code
    if (role.permissions.has(PermissionFlagsBits.Administrator)) {
      let owner = await newMember.guild.fetchOwner();
      let fetchroe = await oldMember.guild.roles.fetch(role.id);
      owner.send(
        `${member.username} Removed \`${fetchroe.name}\` From ${newMember} Member`
      );
    }
  });
});
