// const api = require("discord.js");
require("dotenv").config();
const { USER_TOKEN, FRIEND_ID } = process.env;

// const client = new api.Client();

// client.on("ready", () => {
//   console.log(
//     `logged in as: ${client.user.username}#${client.user.discriminator}`
//   );
// });

// client.login(USER_TOKEN);

const Discord = require("discord-user-bots");
const client = new Discord.Client(USER_TOKEN);

client.on.ready = async function () {
  console.log("Client online!");
  const channel = client.private_channels.find(
    (channel) => channel.recipient_ids == FRIEND_ID
  );
  console.log(channel);
  //   const messages = (await client.fetchmessages(10, channel.id)).filter(
  //     (msg) => msg.author.id == client.user.id
  //   );

  let messages = await client.fetchmessages(100, channel.id);
  console.log(messages.length);
  console.log(messages[99].content);

  messages = await client.fetchmessages(100, channel.id);
  console.log(messages.length);
  console.log(messages[99].content);

  //   for (let index = 0; index < messages.length; index++) {
  //     const message = messages[index];
  //     const isMyMessage = message.author.id == client.user.id;
  //     console.log(isMyMessage);
  //     if (isMyMessage) {
  //       let respond_status = "Too Many Requests";
  //       while (respond_status == "Too Many Requests") {
  //         const respond = await client.delete_message(message.id, channel.id);
  //         respond_status = respond.statusText;
  //       }

  //       //console.log(status.statusText);
  //     }
  //   }
};

// client.on.message_create = function (message) {
//   console.log(message);
// };

// const { Client, Intents } = require("discord.js");
// const allowUserBotting = require("discord.js.userbot");
// const client = new Client();
// // Remember to set correct node_modules_path if it's not working.
// //allowUserBotting(client);
// //or
// allowUserBotting(client, "./node_modules");
// client.login(USER_TOKEN);
