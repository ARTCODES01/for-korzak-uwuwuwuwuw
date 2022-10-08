const { EmbedBuilder, Guild } = require("discord.js");
const BOT = require("./Client");

/**
 *
 * @param {BOT} client
 */
module.exports = async (client) => {
  console.log(`::Logger:: loaded`);
  // message logs
  client.on("messageDelete", async (message) => {
    if (message.content?.length === 0) return;
    let deleteMsg = new EmbedBuilder()
      .setColor(client.config.embed.color)
      .setTitle(`💬 Message Deleted`)
      .addFields([
        {
          name: "👤 Author",
          value: `<@${message.author?.id}>`,
          inline: true,
        },
        {
          name: "📅 Message Time",
          value: `\`\`${message.createdAt}\`\``,
          inline: true,
        },
        {
          name: "💬 Channel",
          value: `${message.channel}`,
          inline: true,
        },
        {
          name: "🗒️ Deleted Message",
          value: `||${message.content}||`,
          inline: true,
        },
      ])
      .setFooter(getEmbedFooter(message.guild));

    sendlogs(message.guild, deleteMsg);
  });

  client.on("messageUpdate", (oldMessage, newMessage) => {
    if (oldMessage.content?.length === 0) return;
    if (oldMessage.embeds.length) return;
    let deleteembed = new EmbedBuilder()
      .setColor(client.config.embed.color)
      .setTitle(`💬 Message Updated`)
      .addFields([
        {
          name: "👤 Author",
          value: `<@${newMessage.author?.id}>`,
          inline: true,
        },
        {
          name: "📅 Message Time",
          value: `\`\`${newMessage.createdAt}\`\``,
          inline: true,
        },
        {
          name: "💬 Channel",
          value: `${newMessage.channel}`,
          inline: true,
        },
        {
          name: "🗒️ Original Message",
          value: `||${oldMessage.content || "This is Embed"}||`,
          inline: true,
        },
        {
          name: "🗒️ Updated Message",
          value: `||${newMessage.content || "This is Embed"}||`,
          inline: true,
        },
      ])
      .setFooter(getEmbedFooter(newMessage.guild));

    sendlogs(oldMessage.guild, deleteembed);
  });

  // mod logs

  // server logs

  // voice logs

  client.on("voiceStateUpdate", (oS, nS) => {
    let u = nS.member.user.tag;
    if (!oS.streaming && nS.streaming) {
      let voiceEmbed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle(`🔊 Voice State Update`)
        .setDescription(`🔊 ${u} is ${nS.streaming ? "" : "not "}streaming`)
        .setFooter(getEmbedFooter(nS.guild));

      sendlogs(oS.guild, voiceEmbed);
    }
    if (!oS.serverDeaf && nS.serverDeaf) {
      let voiceEmbed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle(`🔊 Voice State Update`)
        .setDescription(`${u} is ${nS.serverDeaf ? "" : "un"}deafed (Server)`)
        .setFooter(getEmbedFooter(nS.guild));

      sendlogs(oS.guild, voiceEmbed);
    }
    if (oS.serverDeaf && !nS.serverDeaf) {
      let voiceEmbed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle(`🔊 Voice State Update`)
        .setDescription(`${u} is ${nS.serverDeaf ? "" : "un"}deafed (Server)`)
        .setFooter(getEmbedFooter(nS.guild));

      sendlogs(oS.guild, voiceEmbed);
    }
    if (oS.sessionID != nS.sessionID) {
      let voiceEmbed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle(`🔊 Voice State Update`)
        .setDescription(`${u} sessionID on: ${nS.sessionID}`)
        .setFooter(getEmbedFooter(nS.guild));

      sendlogs(oS.guild, voiceEmbed);
    }
    if (!oS.selfVideo && nS.selfVideo) {
      let voiceEmbed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle(`🔊 Voice State Update`)
        .setDescription(
          `${u} is ${nS.selfVideo ? "" : "not "}self Video Sharing`
        )
        .setFooter(getEmbedFooter(nS.guild));

      sendlogs(oS.guild, voiceEmbed);
    }
    if (oS.selfVideo && !nS.selfVideo) {
      let voiceEmbed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle(`🔊 Voice State Update`)
        .setDescription(
          `${u} is ${nS.selfVideo ? "" : "not "}self Video Sharing`
        )
        .setFooter(getEmbedFooter(nS.guild));

      sendlogs(oS.guild, voiceEmbed);
    }
    if (!oS.channel && nS.channel) {
      let voiceEmbed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle(`🔊 Voice State Update`)
        .setDescription(`👤 ${u} Joined: 🔊 ${nS.channel}`)
        .setFooter(getEmbedFooter(nS.guild));
      sendlogs(oS.guild, voiceEmbed);
    }
    if (oS.channel && !nS.channel) {
      let voiceEmbed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle(`🔊 Voice State Update`)
        .setDescription(`👤 ${u} Left: 🔊${oS.channel}`)
        .setFooter(getEmbedFooter(nS.guild));

      sendlogs(oS.guild, voiceEmbed);
    }
    if (oS.channel && nS.channel) {
      let voiceEmbed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle(`🔊 Voice State Update`)
        .setDescription(
          `👤 ${u} switched from: 🔊 ${oS.channel} to: 🔊 ${nS.channel}`
        )
        .setFooter(getEmbedFooter(nS.guild));

      sendlogs(oS.guild, voiceEmbed);
    }
  });

  // user logs

  client.on("guildMemberUpdate", (oldMember, newMember) => {
    if (oldMember.nickname !== newMember.nickname) {
      let userUpdate = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setTitle(`👤 UserName Updated`)
        .addFields([
          {
            name: "👤 User",
            value: `<@${newMember?.id}>`,
            inline: true,
          },
          {
            name: "🗒️ Old Name",
            value: `\`\`${oldMember.nickname || oldMember.user.tag}\`\``,
            inline: true,
          },
          {
            name: "🗒️ New Name",
            value: `\`\`${newMember.nickname}\`\``,
            inline: true,
          },
          {
            name: "🆔 User ID",
            value: `${newMember?.id}`,
            inline: true,
          },
        ])
        .setFooter(getEmbedFooter(newMember.guild));

      send_log(oldMember.guild, userUpdate);
    }
  });

  /**
   *
   * @param {Guild} guild
   * @param {EmbedBuilder} embed
   */
  async function sendlogs(guild, embed) {
    const settings = await client.settings.get(`${guild.id}.auditlog`);
    if (!settings.enable) return;
    const logchannel = guild.channels.cache.get(settings.channel);
    if (!logchannel) return;
    logchannel
      .send({
        embeds: [embed],
      })
      .catch((e) => {});
  }

  function getEmbedFooter(guild) {
    return {
      text: guild.name,
      iconURL: guild.iconURL(),
    };
  }
};
