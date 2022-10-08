const Josh = require("@joshdb/core");
const provider = require("@joshdb/sqlite");
// const provider = require("@joshdb/json");

module.exports = async (client) => {
  client.settings = new Josh({
    name: "settings",
    provider,
  });
  client.userprofile = new Josh({
    name: "userprofile",
    provider,
  });
  client.automod = new Josh({
    name: "automod",
    provider,
  });
  client.afk = new Josh({
    name: "afk",
    provider,
  });
  client.selfrole = new Josh({
    name: "selfrole",
    provider,
  });
};
