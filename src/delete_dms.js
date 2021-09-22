const axios = require("axios").default;
const { get_user } = require("./get_user.js");

function build_next_url(msgs, get_msgs_url) {
  const last_msg = msgs[msgs.length - 1];
  return `${get_msgs_url}&before=${last_msg.id}`;
}

async function req(method, url, token) {
  while (true) {
    try {
      const res = await axios[method](url, {
        headers: { authorization: token },
      });
      return res.data;
    } catch (error) {
      if (error.response?.statusText == "Too Many Requests") {
        console.log(`Delayed ${error.response.data.retry_after}ms`);
        const time = parseInt(error.response.data.retry_after) * 1000;
        await new Promise((resolve) => setTimeout(resolve, time));
      } else {
        console.log(error);
      }
    }
  }
}

async function delete_messages(
  USER_TOKEN,
  my_messages,
  delete_msg_url,
  callback
) {
  for (let index = 0; index < my_messages.length; index++) {
    const my_message = my_messages[index];
    await req("delete", `${delete_msg_url}/${my_message.id}`, USER_TOKEN);
    callback(my_messages.length);
  }
}

function build_urls(user, friend_id, api_msg_limit = "100") {
  const channel_id = user.private_channels.find(
    (channel) => channel.recipient_ids == friend_id
  ).id;
  return {
    get_msgs_url: `https://discord.com/api/v9/channels/${channel_id}/messages?limit=${api_msg_limit}`,
    delete_msg_url: `https://discord.com/api/v9/channels/${channel_id}/messages`,
  };
}

async function delete_dms(USER_TOKEN, FRIEND_ID, callback) {
  const user = await get_user(USER_TOKEN);

  const { get_msgs_url, delete_msg_url } = build_urls(user, FRIEND_ID);

  let get_msgs_url_modified = get_msgs_url;
  let msg_count = 100;
  do {
    const msgs = await req("get", get_msgs_url_modified, USER_TOKEN);

    const my_messages = msgs.filter((msg) => msg.author.id == user.user.id);
    await delete_messages(USER_TOKEN, my_messages, delete_msg_url, callback);

    get_msgs_url_modified = build_next_url(msgs, get_msgs_url);
    msg_count = msgs.length;
  } while (msg_count == 100);
}

module.exports = {
  delete_dms,
};
