function handleButtons(zk, msg) {
  try {
    // Your button handling logic here
  } catch (e) {
    console.error('Error handling buttons:', e);
  }
}
module.exports = { handleButtons };

Also, ensure you're calling it correctly in your main script:
const { handleButtons } = require(__dirname + "/+267/play0");

zk.ev.on("messages.upsert", async (m) => {
  const msg = m.messages[0];
  if (!msg.message) return;
  await handleButtons(zk, msg);
});

