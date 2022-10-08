const { EmbedBuilder } = require("discord.js");
const BOT = require("./Client");

/**
 *
 * @param {BOT} client
 */
module.exports = async (client) => {
  // distube events
  try {
    // events
    client.distube.on("playSong", async (queue, song) => {
      queue.textChannel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setDescription(`** [\`${song.name}\`](${song.url}) **`)
            .addFields([
              {
                name: `Requested By`,
                value: `\`${song.user.tag}\``,
                inline: true,
              },
              {
                name: `Author`,
                value: `\`${song.uploader.name}\``,
                inline: true,
              },
              {
                name: `Duration`,
                value: `\`${song.formattedDuration}\``,
                inline: true,
              },
            ]),
        ],
      });
    });

    client.distube.on("addSong", async (queue, song) => {
      queue.textChannel
        .send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setAuthor({
                name: `Added to Queue`,
                iconURL: song.user.displayAvatarURL({ dynamic: true }),
                url: song.url,
              })
              .setThumbnail(song.thumbnail)
              .setDescription(`[\`${song.name}\`](${song.url})`)
              .addFields([
                {
                  name: `Requested By`,
                  value: `\`${song.user.tag}\``,
                  inline: true,
                },
                {
                  name: `Author`,
                  value: `\`${song.uploader.name}\``,
                  inline: true,
                },
                {
                  name: `Duration`,
                  value: `\`${song.formattedDuration}\``,
                  inline: true,
                },
              ]),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => null);
          }, 5000);
        });
    });

    client.distube.on("addList", async (queue, playlist) => {
      queue.textChannel
        .send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setAuthor({
                name: `Playlist Added to Queue`,
                iconURL: playlist.user.displayAvatarURL({ dynamic: true }),
                url: playlist.url,
              })
              .setThumbnail(playlist.thumbnail)
              .setDescription(`** [\`${playlist.name}\`](${playlist.url}) **`)
              .addFields([
                {
                  name: `Requested By`,
                  value: `\`${playlist.user.tag}\``,
                  inline: true,
                },
                {
                  name: `Songs`,
                  value: `\`${playlist.songs.length}\``,
                  inline: true,
                },
                {
                  name: `Duration`,
                  value: `\`${playlist.formattedDuration}\``,
                  inline: true,
                },
              ]),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => null);
          }, 5000);
        });
    });

    client.distube.on("disconnect", async (queue) => {
      queue.textChannel
        .send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setDescription(
                `${client.config.emoji.ERROR} Player Disconnected `
              ),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => null);
          }, 5000);
        });
    });

    client.distube.on("error", async (channel, error) => {
      channel
        .send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setTitle(`Found a Error...`)
              .setDescription(String(error).substring(0, 3000)),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => null);
          }, 5000);
        });
    });

    client.distube.on("noRelated", async (queue) => {
      queue.textChannel
        .send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setTitle(
                `No Related Song Found for \`${queue?.songs[0].name}\``
              ),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => null);
          }, 5000);
        });
    });

    client.distube.on("finish", async (queue) => {
      queue.textChannel
        .send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setDescription(`Queue has ended! No more music to play`),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => null);
          }, 5000);
        });
    });

    client.distube.on("initQueue", async (queue) => {
      queue.volume = 100;
    });

    client.distube.on("searchCancel", async (message, quary) => {
      message.channel
        .send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setDescription(`I cant search \`${quary}\``),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => null);
          }, 5000);
        });
    });

    client.distube.on("searchNoResult", async (message, quary) => {
      message.channel
        .send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setDescription(
                `${client.config.emoji.ERROR} No result found for \`${quary}\`!`
              ),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => null);
          }, 5000);
        });
    });

    client.distube.on("empty", async (queue) => {
      queue.stop().catch((e) => null);
      await client.updateembed(client, queue.textChannel.guild);
      queue.textChannel
        .send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setDescription("Channel is empty. Leaving the channel"),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => null);
          }, 5000);
        });
    });
    
  } catch (e) {}
};
