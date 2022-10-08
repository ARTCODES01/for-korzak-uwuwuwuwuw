const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const { Queue } = require("distube");
const BOT = require("./Client");

/**
 *
 * @param {BOT} client
 * @param {String} guildID
 * @param {String} userID
 */
async function databasing(client, guildID, userID) {
  await client.settings.ensure(guildID, {
    muterole: null,
    warnLength: 7,
    auditlog: {
      enable: false,
      channel: null,
    },
  });

  await client.automod.ensure(guildID, {
    antiraid: false,
    antiinvite: false,
    antimention: false,
    antirolepermsupdate: false,
  });

  // user
  await client.userprofile.ensure(userID, {
    muted: false,
    warnings: [],
  });
  // afk
  await client.afk.ensure(userID, {
    enable: false,
    reason: null,
    when: null,
  });
  // roles
  await client.selfrole.ensure(guildID, {
    rolesdata: [],
  });
}

async function pagination(interaction, embeds) {
  let currentPage = 0;
  let allbuttons = new ActionRowBuilder().addComponents([
    new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("0")
      .setLabel("<<"),
    // .setEmoji(`⏪`),
    new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("1")
      .setLabel("<"),
    // .setEmoji(`◀️`),
    new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setCustomId("2")
      .setLabel("⛔️"),
    // .setEmoji(`🗑`),
    new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("3")
      .setLabel(">"),
    // .setEmoji(`▶️`),
    new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("4")
      .setLabel(">>"),
    // .setEmoji(`⏩`),
  ]);
  if (embeds.length === 1) {
    if (interaction.deferred) {
      return interaction.followUp({
        embeds: [embeds[0]],
        fetchReply: true,
      });
    } else {
      return interaction.reply({
        embeds: [embeds[0]],
        fetchReply: true,
      });
    }
  }
  //Send message with buttons
  embeds = embeds.map((embed, index) => {
    return embed.setColor(interaction.client.config.embed.color).setFooter({
      text: `Page ${index + 1} / ${embeds.length}`,
      iconURL: interaction.guild.iconURL({ dynamic: true }),
    });
  });
  let swapmsg;
  if (interaction.deferred) {
    swapmsg = await interaction.followUp({
      embeds: [embeds[0]],
      components: [allbuttons],
    });
  } else {
    swapmsg = await interaction.reply({
      embeds: [embeds[0]],
      components: [allbuttons],
    });
  }
  //create a collector for the thinggy
  const collector = swapmsg.createMessageComponentCollector({
    time: 2000 * 60,
  });
  collector.on("collect", async (b) => {
    if (b.isButton()) {
      await b.deferUpdate().catch((e) => {});
      // page first
      if (b.customId == "0") {
        if (currentPage !== 0) {
          currentPage = 0;
          await swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            })
            .catch((e) => null);
        }
      }
      //page forward
      if (b.customId == "1") {
        if (currentPage !== 0) {
          currentPage -= 1;
          await swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            })
            .catch((e) => null);
        } else {
          currentPage = embeds.length - 1;
          await swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            })
            .catch((e) => null);
        }
      }
      //go home
      else if (b.customId == "2") {
        try {
          allbuttons.components.forEach((btn) => btn.setDisabled(true));
          swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            })
            .catch((e) => null);
        } catch (e) {}
      }
      //go forward
      else if (b.customId == "3") {
        if (currentPage < embeds.length - 1) {
          currentPage++;
          await swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            })
            .catch((e) => null);
        } else {
          currentPage = 0;
          await swapmsg
            .edit({
              embeds: [embeds[currentPage]],
              components: [allbuttons],
            })
            .catch((e) => null);
        }
      }
      // page last
      if (b.customId == "4") {
        currentPage = embeds.length - 1;
        await swapmsg
          .edit({
            embeds: [embeds[currentPage]],
            components: [allbuttons],
          })
          .catch((e) => null);
      }
    }
  });

  collector.on("end", () => {
    allbuttons.components.forEach((btn) => btn.setDisabled(true));
    swapmsg.edit({ components: [allbuttons] }).catch((e) => null);
  });
}

/**
 *
 * @param {BOT} client
 * @param {Queue} queue
 * @returns
 */
async function getQueueEmbeds(client, queue) {
  let guild = client.guilds.cache.get(queue.textChannel.guildId);
  let quelist = [];
  var maxTracks = 10; //tracks / Queue Page
  let tracks = queue.songs;
  for (let i = 0; i < tracks.length; i += maxTracks) {
    let songs = tracks.slice(i, i + maxTracks);
    quelist.push(
      songs
        .map(
          (track, index) =>
            `\` ${i + ++index}. \` ** ${track.name.substring(0, 35)}** - \`${
              track.isLive
                ? `LIVE STREAM`
                : track.formattedDuration.split(` | `)[0]
            }\` \`${track.user.tag}\``
        )
        .join(`\n`)
    );
  }
  let embeds = [];
  for (let i = 0; i < quelist.length; i++) {
    let desc = String(quelist[i]).substring(0, 2048);
    await embeds.push(
      new EmbedBuilder()
        .setAuthor({
          name: `Queue for ${guild.name}  -  [ ${tracks.length} Tracks ]`,
          iconURL: guild.iconURL({ dynamic: true }),
        })
        .addFields([
          {
            name: `**\` N. \` *${
              tracks.length > maxTracks
                ? tracks.length - maxTracks
                : tracks.length
            } other Tracks ...***`,
            value: `\u200b`,
          },
          {
            name: `**\` 0. \` __CURRENT TRACK__**`,
            value: `**${queue.songs[0].name.substring(0, 35)}** - \`${
              queue.songs[0].isLive
                ? `LIVE STREAM`
                : queue.songs[0].formattedDuration.split(` | `)[0]
            }\` \`${queue.songs[0].user.tag}\``,
          },
        ])
        .setColor(client.config.embed.color)
        .setDescription(desc)
    );
  }
  return embeds;
}

function duration(ms) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24) return hours + " Hrs";
  else return days + " Days";
}

function randomId() {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ""
  );
}

module.exports = {
  databasing,
  pagination,
  getQueueEmbeds,
  duration,
  randomId,
};
