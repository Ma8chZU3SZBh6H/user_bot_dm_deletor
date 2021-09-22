const axios = require("axios").default;
const WebSocket = require("ws");
const { get_dms } = require("./src/get_dms.js");

require("dotenv").config();
const { USER_TOKEN, FRIEND_ID } = process.env;

(async () => {
  const test = await get_dms();
  console.log(test);
})();

// (async () => {
//   const channel_id = "801159144572059698";
//   const api_msg_limit = "100";
//   const url = `https://discord.com/api/v9/channels/${channel_id}/messages?limit=${api_msg_limit}`;
//   let url_modified = url;
//   let msg_count = 100;
//   do {
//     const msgs = (
//       await axios.get(url_modified, { headers: { authorization: USER_TOKEN } })
//     ).data;
//     const last_msg = msgs[msgs.length - 1];
//     url_modified = `${url}&before=${last_msg.id}`;
//     msg_count = msgs.length;
//     console.log(msgs.length, last_msg.content, url_modified);
//   } while (msg_count == 100);
// })();
