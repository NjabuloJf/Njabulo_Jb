const { fana } = require("../njabulo/fana");
const fs = require("fs");
const config = require("../set");
const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require("axios");

// ── Random image list ─────────────────────────────────────────────
const njabulox = [
  "", // keep the empty entry if you want a chance of no image
  "https://files.catbox.moe/xjeyjh.jpg",
  "https://files.catbox.moe/mh36c7.jpg",
  "https://files.catbox.moe/u6v5ir.jpg",
  "https://files.catbox.moe/bnb3vx.jpg",
];
const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

// ── Standard button set (used by all modules) ────────────────────────
const baseButtons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "Visit Website",
      id: "backup channel",
      url: config.GURL
    }),
  },
];

// ── Helper that sends an *interactive* message with image + buttons ─────
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

// ── Helper that sends an *interactive* message with video + buttons ─────
async function sendVideoWithButtons(zk, chatId, videoUrl, header, ms) {
  // clone the button array so we can set the copy_code for this message
  const buttons = JSON.parse(JSON.stringify(baseButtons));
  buttons[1].buttonParamsJson = JSON.stringify({
    display_text: "Copy",
    id: "copy",
    copy_code: header,
  });

  await zk.sendMessage(
    chatId,
    {
      interactiveMessage: {
        video: { url: videoUrl },
        header,
        buttons,
        headerType: 2, // 2 = video
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "🎞️ Facebook Downloader",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            renderLargerThumbnail: false,
          },
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363345407274799@newsletter",
            newsletterName: "╭••➤®Njabulo Jb",
            serverMessageId: 143,
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

// ── Facebook video download command ─────────────────────────────────────────────
fana(
  {
    nomCom: "fb",
    categorie: "Download",
    reaction: "🎞️",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg } = commandeOptions;

    if (!arg[0]) {
      return sendFormattedMessage(
        zk,
        dest,
        "😡Yo stop slacking! Give me a query, like .img cat",
        ms
      );
    }

    const queryURL = arg.join(" ");

    try {
      const result = await getFBInfo(queryURL);

      const caption = `
_______________________________
*titre:* ${result.title}
*Lien:* ${result.url}
_______________________________`;

      // Send the thumbnail image with buttons
      const copyButtons = JSON.parse(JSON.stringify(baseButtons));
      copyButtons[1].buttonParamsJson = JSON.stringify({
        display_text: "Copy",
        id: "copy",
        copy_code: caption,
      });

      await zk.sendMessage(
        dest,
        {
          interactiveMessage: {
            image: { url: result.thumbnail },
            header: caption,
            buttons: copyButtons,
            headerType: 1,
            contextInfo: {
              mentionedJid: [ms?.sender?.jid || ""],
              externalAdReply: {
                title: "🎞️ Facebook Downloader",
                mediaType: 1,
                previewType: 0,
                thumbnailUrl: randomNjabulourl,
                renderLargerThumbnail: false,
              },
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363345407274799@newsletter",
                newsletterName: "╭••➤®Njabulo Jb",
                serverMessageId: 143,
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

      // Send the video with the same buttons
      await sendVideoWithButtons(zk, dest, result.sd, caption, ms);
    } catch (error) {
      console.log("Error:", error);
      sendFormattedMessage(zk, dest, error.message, ms);
    }
  }
);
