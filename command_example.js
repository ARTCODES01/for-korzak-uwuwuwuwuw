// chat input slash commands
const {
  ChatInputCommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  name: "",
  description: ``,
  userPermissions: [],
  botPermissions: [],
  category: "",
  cooldown: 10,
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {BOT} client
   * @param {ChatInputCommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    // Code
  },
};

// message input slash commands
const {
  ContextMenuChatInputCommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  name: "",
  category: "",
  type: ApplicationCommandType.Message,
  /**
   *
   * @param {BOT} client
   * @param {ContextMenuChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
  },
};

// user slash commands

const {
  ContextMenuChatInputCommandInteraction,
  ApplicationCommandType,
} = require("discord.js");
const BOT = require("../../handlers/Client");

module.exports = {
  name: "",
  category: "",
  type: ApplicationCommandType.User,
  /**
   *
   * @param {BOT} client
   * @param {ContextMenuChatInputCommandInteraction} interaction
   */
  run: async (client, interaction) => {
    // Code
  },
};
