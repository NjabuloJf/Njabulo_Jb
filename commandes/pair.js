const { fana } = require("../njabulo/fana");
const axios = require("axios");
const conf = require(__dirname + "/../set");

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // (empty string kept as in original)
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Base button definition (same as in other modules) ─────
const baseButtons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "𝗪𝗮 𝗖𝗵𝗮𝗻𝗻𝗲𝗹",
      id: "backup channel",
      url: config.GURL
    }),
  },
  {
    name: "cta_copy",
    buttonParamsJson: JSON.stringify({
      display_text: "Copy",
      id: "copy",
      copy_code: "", // will be filled dynamically
    }),
  },
];

// ── Helper that sends an interactive message with image + buttons ─────
async function sendFormattedMessage(zk, chatId, text, ms) {
  // clone the button array so we can set the copy_code for this message
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy",
    id: "copy",
    copy_code: text, // copy the exact text that was sent
  });

  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        image: { url: randomNjabulourl },
        header: text,
        buttons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "💓ᥕᥱᥣᥴomᥱ fᥲmιᥣყ ",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            renderLargerThumbnail: false,
          },
        },
      },
    },
    {
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
    }
  );
}

// ── Pair code command ─────────────────────────────────────────────
fana(
  {
    nomCom: "pair",
    aliases: ["session", "code", "paircode", "qrcode"],
    reaction: "📡",
    categorie: "system",
  },
  async (chatId, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;

    if (!arg || arg.length === 0) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*ᥱntᥱr ყoᥙr nᥙmbᥱr ᥣιkᥱ .ρᥲιr +267*",
        ms
      );
    }

    try {
      await sendFormattedMessage(
        zk,
        chatId,
        "*Wᥲιt, gᥱnᥱrᥲtιng ყoᥙr ρᥲιrιng ᥴodᥱ*",
        ms
      );

      const encodedNumber = encodeURIComponent(arg.join(" "));
      const apiUrl = `https://site-code-bv0o.onrender.com/code?number=${encodedNumber}`;

      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data && data.code) {
        const pairingCode = data.code;

        // send the pairing code with copy button
        const copyButtons = JSON.parse(JSON.stringify(baseButtons));
        copyButtons[1].buttonParamsJson = JSON.stringify({
          display_text: "Copy",
          id: "copy",
          copy_code: pairingCode,
        });

        await zk.sendMessage(
          chatId,
          {
            interactiveMessage: {
              image: { url: randomNjabulourl },
              header: pairingCode,
              buttons: copyButtons,
              headerType: 1,
              contextInfo: {
                mentionedJid: [ms?.sender?.jid || ""],
                externalAdReply: {
                  title: "💓ᥕᥱᥣᥴomᥱ fᥲmιᥣყ ",
                  mediaType: 1,
                  previewType: 0,
                  thumbnailUrl: randomNjabulourl,
                  renderLargerThumbnail: false,
                },
              },
            },
          },
          {
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
          }
        );

        await sendFormattedMessage(
          zk,
          chatId,
          "*Hᥱrᥱ ιs ყoᥙr ρᥲιr ᥴodᥱ, ᥴoρყ ᥲnd ρᥲstᥱ ιt to thᥱ notιfιᥴᥲtιon ᥲbovᥱ or ᥣιnk dᥱvιᥴᥱs*",
          ms
        );
      } else {
        throw new Error("*Invᥲᥣιd rᥱsρonsᥱ from API.*");
      }
    } catch (error) {
      console.error("Error getting API response:", error.message);
      sendFormattedMessage(zk, chatId, "Error getting response from API.", ms);
    }
  }
);
