const prompt = require("prompt");
const { delete_dms } = require("./src/delete_dms");

(async () => {
  const { user_token, friend_id } = await prompt.get([
    "user_token",
    "friend_id",
  ]);

  let dmc = 0;
  await delete_dms(user_token, friend_id, (deleted_msg_count) => {
    dmc += deleted_msg_count;
    console.log(dmc);
  });
  console.log("FINISHED");
})();
