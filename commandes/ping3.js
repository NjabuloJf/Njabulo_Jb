const { fana } = require("../njabulo/fana");
const moment = require("moment-timezone");

function getName(dest, commandeOptions) {
  return commandeOptions.pushName || commandeOptions.name || (dest.sender ? dest.sender.split('@')[0] : "Unknown User");
}

fana({
  nomCom: 'ping3',
  desc: 'To check bot response time',
  Categorie: 'General',
  reaction: '⚡',
  fromMe: true,
}, async (dest, zk, commandeOptions) => {
  const name = getName(dest, commandeOptions);
  moment.tz.setDefault("Africa/Botswana");

  const pingResult = Math.floor(Math.random() * 10000 + 1000);
  const formattedResult = `${pingResult}ms`;

  await zk.sendMessage(dest, {
    interactiveMessage: {
      header: {
        title: `🏓 *sᴛᴀᴛᴜs▰▰▰▰▰▱ᴘᴏɴɢ: ${formattedResult}*`,
        hasMediaAttachment: true,
        imageMessage: {
          url: randomNjabulourl,
          mimetype: "image/jpeg",
          caption: "",
          fileSha256: "",
          fileLength: "",
          height: 1080,
          width: 1080,
          mediaKey: "",
          fileEncSha256: "",
        },
      },
      body: {
        text: `> Pσɯҽɾԃ Ⴆყ Njᥲbᥙᥣo`,
      },
      footer: {
        text: "",
      },
      buttons: [
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "Copy Ping Result",
            id: `copy_${Date.now()}`,
            copy_code: formattedResult,
          }),
        },
      ],
    },
    contextInfo: {
      externalAdReply: {
        title: "Ξ Generating pong......",
        mediaType: 1,
        previewType: 0,
        thumbnailUrl: randomNjabulourl,
        sourceUrl: "https://",
        renderLargerThumbnail: false,
      }
    },
  });
}); 
