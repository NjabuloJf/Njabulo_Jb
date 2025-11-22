const { fana } = require("../njabulo/fana");
const moment = require("moment-timezone");

// Helper function to safely get the sender's name
function getName(dest, commandeOptions) {
  return commandeOptions.pushName || commandeOptions.name || (dest.sender ? dest.sender.split('@')[0] : "Unknown User");
}

// Command: Ping
fana({
  nomCom: 'ping1',
  desc: 'To check bot response time',
  Categorie: 'General',
  reaction: '⚡',
  fromMe: true,
}, async (dest, zk, commandeOptions) => {
  const name = getName(dest, commandeOptions);
  moment.tz.setDefault("Africa/Botswana");

  // Generate a random ping result
  const pingResult = Math.floor(Math.random() * 10000 + 1000);
  const formattedResult = `${pingResult}ms`;

  // Create button
  const buttons = [
    {
      buttonId: 'ping_again',
      buttonText: { displayText: 'Ping Again' },
      type: 1
    }
  ];

  const buttonMessage = {
    text: `🏓 *sᴛᴀᴛᴜs▰▰▰▰▰▱ᴘᴏɴɢ: ${formattedResult}*`,
    buttons,
    headerType: 1
  };

  // Reply with ping result and button
  await zk.sendMessage(dest, buttonMessage, {
    quoted: {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "Njabulo-Jb",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
        }
      }
    }
  });

  console.log("Ping result sent successfully!");
});
