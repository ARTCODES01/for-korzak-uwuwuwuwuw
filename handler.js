const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const BOT = require("./Client");

/**
 *
 * @param {BOT} client
 */
module.exports = async (client) => {
  const { guildID, embed: ee } = client.config;
  // LOADING SLASH COMMANDS
  try {
    let arrayOfcommands = [];
    fs.readdirSync("./Commands").forEach((cmd) => {
      let commands = fs
        .readdirSync(`./Commands/${cmd}/`)
        .filter((file) => file.endsWith(".js"));
      for (cmds of commands) {
        let pull = require(`../Commands/${cmd}/${cmds}`);
        if (pull.name) {
          client.commands.set(pull.name, pull);
          arrayOfcommands.push(pull);
        } else {
          continue;
        }
      }
    });
    client.on("ready", async () => {
      // // for global slash commands
      // for guild commands
      if (guildID) {
        client.guilds.cache.get(guildID).commands.set(arrayOfcommands);
      } else {
        await client.application.commands.set(arrayOfcommands);
      }
    });
    console.log(`${client.commands.size} Slash Commands Loaded`);
  } catch (e) {
    console.log(e);
  }
  // Loading Event Files
  try {
    fs.readdirSync("./events/").forEach((file) => {
      const events = fs
        .readdirSync("./events/")
        .filter((file) => file.endsWith(".js"));
      for (let file of events) {
        let pull = require(`../events/${file}`);
        if (pull) {
          client.events.set(file, pull);
        }
      }
    });
    console.log(`${client.events.size} Events Loaded`);
  } catch (e) {
    console.log(e);
  }

  // load files
  require("./Database")(client);
  require("./PlayerHandler")(client);
  require("./Auditlogs")(client);
};
