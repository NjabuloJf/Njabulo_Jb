const { fana } = require("../njabulo/fana");
const moment = require("moment-timezone");

function getName(dest, commandeOptions) {
  return commandeOptions.pushName || commandeOptions.name || (dest.sender ? dest.sender.split('@')[0] : "Unknown User");
}

fana({
  nomCom: 'ping2',
  desc: 'To check bot response time',
  Categorie: 'General',
  reaction: '⚡',
  fromMe: true,
}, async (dest, zk, commandeOptions) => {
  const name = getName(dest, commandeOptions);
  moment.tz.setDefault("Africa/Botswana");

  const pingResult = Math.floor(Math.random() * 10000 + 1000);
  const formattedResult = `${pingResult}ms`;

  const sections = [
    {
      title: "Ping Options",
      rows: [
        { title: "Ping", rowId: "ping" },
        { title: "Bot Info", rowId: "info" },
      ],
    },
  ];

  const listMessage = {
    text: `🏓 *sᴛᴀᴛᴜs▰▰▰▰▰▱ᴘᴏɴɢ: ${formattedResult}*\nSelect an option:`,
    buttonText: "Select",
    sections,
  };

  zk.sendMessage(dest, listMessage);

  zk.ev.on("messages.upsert", (m) => {
    const message = m.messages[0];
    if (message.listResponseMessage) {
      const selectedRowId = message.listResponseMessage.singleSelectReply.selectedRowId;
      if (selectedRowId === 'ping') {
        zk.sendMessage(dest, { text: `🏓 *sᴛᴀᴛᴜs▰▰▰▰▰▱ᴘᴏɴɢ: ${formattedResult}*` });
      } else if (selectedRowId === 'info') {
        zk.sendMessage(dest, { text: 'This is a WhatsApp bot created by Njabulo-Jb.' });
      }
    }
  });
});
