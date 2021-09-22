const WebSocket = require("ws");
require("dotenv").config();
const { USER_TOKEN, FRIEND_ID } = process.env;

const config = {
  api: "v9",
  wsurl: "wss://gateway.discord.gg/?encoding=json&v=9",
  os: "linux",
  bd: "holy",
  language: "en-US",
  intents: "all",
  typinginterval: 1000,
};

class GateWayOpen {
  constructor(token, config) {
    let intent = 0;
    switch (config.intents) {
      case "all": {
        intent = 32767;
        break;
      }
      case "minimum": {
        intent = 1;
        break;
      }
      case "unset": {
        intent = null;
        break;
      }
    }
    return {
      op: 2,
      d: {
        token: token,
        capabilities: 125,
        properties: {
          os: config.os,
          browser: "Chrome",
          device: "",
          system_locale: config.language,
          browser_user_agent: `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36`,
          browser_version: "93.0.4577.63",
          os_version: "",
          referrer: "",
          referring_domain: "",
          referrer_current: "",
          referring_domain_current: "",
          release_channel: "stable",
          client_build_number: 97662,
          client_event_source: null,
        },
        presence: { status: "online", since: 0, activities: [], afk: false },
        compress: false,
        client_state: {
          guild_hashes: {},
          highest_last_message_id: "0",
          read_state_version: 0,
          user_guild_settings_version: -1,
        },
      },
    };
  }
}

function get_dms() {
  return new Promise((resolve, reject) => {
    try {
      const ws = new WebSocket(config.wsurl);
      let ready = false;
      ws.on("message", (message) => {
        message = JSON.parse(message);

        switch (message.t) {
          case null:
            if (!ready) {
              //   const heartbeattimer = message.d.heartbeat_interval;
              //   setInterval(() => {
              //     ws.send(JSON.stringify({ op: 1, d: null }));
              //   }, heartbeattimer);
              ws.send(JSON.stringify(new GateWayOpen(USER_TOKEN, config)));
              ready = true;
            }
            break;
          case "READY":
            const dms = message.d.private_channels;
            ws.close();
            resolve(dms);

            break;
          default:
            break;
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  get_dms,
};
