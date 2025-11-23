const { fana } = require("../njabulo/fana");
const speed = require("performance-now");
const moment = require("moment-timezone");

// ---------- HELPERS ----------
function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getName(dest, commandeOptions) {
  return (
    commandeOptions.pushName ||
    commandeOptions.name ||
    (dest.sender ? dest.sender.split('@')[0] : "Unknown User")
  );
}

// ---------- BUTTON PAYLOAD ----------
const buttonPayload = {
  limited_time_offer: {
    text: "Toxic-MD",
    url: "https://github.com/xhclintohn/Toxic-MD",
    copy_code: "TOXIC",
    expiration_time: Date.now() + 60 * 1000, // 1‑minute window
  },
  bottom_sheet: {
    in_thread_buttons_limit: 2,
    divider_indices: [1, 2],
    list_title: "Select Command",
    button_title: "Toxic-MD",
  },
};

// ---------- PING COMMAND ----------
fana(
  {
    nomCom: 'ping6',
    desc: 'To check bot response time',
    Categorie: 'General',
    reaction: '⚡',
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);

    moment.tz.setDefault("Africa/Botswana");
    const temps = moment().format('hh:mm:ss A');
    const date = moment().format('DD/MM/YYYY');

    // Generate 1 ping result with a random number
    const pingResults = [Math.floor(Math.random() * 10000 + 1000)];
    const formattedResults = pingResults.map(p => `${p}`).join("\n");

    // Random image for the thumbnail
    const njabulox = [
      "https://files.catbox.moe/iii5jv.jpg",
      "https://files.catbox.moe/xjeyjh.jpg",
      "https://files.catbox.moe/mh36c7.jpg",
      "https://files.catbox.moe/u6v5ir.jpg",
      "https://files.catbox.moe/bnb3vx.jpg"
    ];
    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

    // Build the interactive payload
    const interactiveMsg = {
      header: {
        documentMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7119-24/...", // replace with your actual file URL
          mimetype: "image/png",
          fileSha256: "+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=",
          fileLength: "1435",
          pageCount: 0,
          mediaKey: "MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=",
          fileName: "Toxic-MD",
          fileEncSha256: "ZS8v9tio2un1yWVOOG3lwBxiP+mNgaKPY9+wl5pEoi8=",
          directPath: "/v/t62.7119-24/...", // replace with actual path
          mediaKeyTimestamp: "1756370084",
          jpegThumbnail: randomNjabulourl,
        },
        hasMediaAttachment: true,
      },
      body: { text: `🏓 *Status: Pong! ${formattedResults} ms*` },
      bottomSheet: {
        inThreadButtonsLimit: 2,
        dividerIndices: [1, 2],
        listTitle: "Select Command",
        buttonTitle: "Toxic-MD",
      },
      buttons: [buttonPayload.limited_time_offer],
    };

    // Send the message with the interactive payload
    await zk.sendMessage(dest, {
      interactive: interactiveMsg,
      quoted: {
        key: {
          fromMe: false,
          participant: "0@s.whatsapp.net",
          remoteJid: "status@broadcast",
        },
        message: {
          contactMessage: {
            displayName: "njᥲbᥙᥣo",
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`,
          },
        },
      },
    });

    console.log("Ping results sent with interactive elements!");
  }
); 
