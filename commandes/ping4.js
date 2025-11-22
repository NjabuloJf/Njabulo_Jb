const { fana } = require("../njabulo/fana");
const moment = require("moment-timezone");

// simple delay helper (kept for completeness)
function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// pick a name for the sender
function getName(dest, commandeOptions) {
  return (
    commandeOptions.pushName ||
    commandeOptions.name ||
    (dest.sender ? dest.sender.split("@")[0] : "Unknown User")
  );
}

// array of image URLs – the bot will pick one at random
const njabulox = [
  "",
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg" // New image added
];

// select a random image
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

fana(
  {
    nomCom: "ping4",
    desc: "To check bot response time",
    Categorie: "General",
    reaction: "⚡",
    fromMe: true,
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);

    // set Botswana time zone
    moment.tz.setDefault("Africa/Botswana");
    const temps = moment().format("hh:mm:ss A");
    const date = moment().format("DD/MM/YYYY");

    // generate a single ping value
    const pingResults = Array.from({ length: 1 }, () =>
      Math.floor(Math.random() * 10000 + 1000)
    );
    const formattedResults = pingResults.map(ping => `${ping}ms`).join("\n");

    // build the message with interactive content, ad reply, image & caption
    const message = {
      interactiveMessage: {
        header: "Ping Results",
        title: `🏓 *sᴛᴀᴛᴜs▰▰▰▰▰▱ᴘᴏɴɢ: ${formattedResults}*`,
        footer: "> Pσɯҽɾԃ Ⴆყ Njᥲbᥙᥣo",
        buttons: [
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "Copy Ping Result",
              id: `copy_${Date.now()}`,
              copy_code: formattedResults,
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
          sourceUrl: "https://www.instagram.com/njabulojb871",
          renderLargerThumbnail: false,
        },
        image: { url: randomNjabulourl },
        caption: `🏓 *sᴛᴀᴛᴜs▰▰▰▰▰▱ᴘᴏɴɢ: ${formattedResults}ᴍs*`,
      },
    };

    await zk.sendMessage(dest, message, {
      quoted: {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "status@broadcast",
        },
        message: {
          contactMessage: {
            displayName: "Njᥲbᥙᥣo",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`,
          },
        },
      },
    });

    console.log("Ping results sent with copy button, ad reply & image!");
  }
); 
