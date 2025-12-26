😊 Here's the full script with all commands using fana and sending multiple images with cards:
const { fana } = require("../njabulo/fana");
var mumaker = require("mumaker");
const axios = require("axios");
const { generateWAMessageContent, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

// hacker command
fana({
  nomCom: "hacker",
  categorie: "Logo",
  reaction: "👨🏿‍💻"
}, async (origineMessage, zk, commandeOptions) => {
  const { prefixe, arg, ms, repondre } = commandeOptions;
  if (!arg || arg == "") {
    repondre("*__Exemple : * " + prefixe + "hacker yesser");
    return;
  }
  try {
    let radio = "984dd03e-220d-4335-a6ba-7ac56b092240";
    let anu = await mumaker.ephoto("https://en.ephoto360.com/anonymous-hacker-avatars-cyan-neon-677.html", arg);
    const cards = [];
    for (let i = 0; i < 6; i++) {
      cards.push({
        header: {
          title: `Hacker Avatar ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: anu.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this hacker avatar!",
        },
        footer: {
          text: "LUCKY MD",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy Link",
                copy_code: anu.image,
              }),
            },
          ],
        },
      });
    }
    const message = generateWAMessageFromContent(
      origineMessage,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: {
              body: {
                text: "Hacker Avatars"
              },
              footer: {
                text: "Click to view"
              },
              carouselMessage: {
                cards
              },
            },
          },
        },
      },
      { quoted: ms }
    );
    await zk.relayMessage(origineMessage, message.message, { messageId: message.key.id });
  } catch (e) {
    repondre("🥵🥵 " + e);
  }
});

// dragonball command
fana({
  nomCom: "dragonball",
  categorie: "Logo",
  reaction: "🐉"
}, async (dest, zk, commandeOptions) => {
  let { arg, repondre, prefixe, ms } = commandeOptions;
  try {
    if (!arg || arg == '') {
      repondre("*_EXEMPLE *: " + prefixe + "dragonball Lucky");
      return;
    }
    var lienMaker2 = "https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html";
    const imgInfo = await mumaker.ephoto(lienMaker2, arg.join(' '));
    const cards = [];
    for (let i = 0; i < 6; i++) {
      cards.push({
        header: {
          title: `Dragon Ball ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: imgInfo.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this dragon ball logo!",
        },
        footer: {
          text: "LUCKY MD",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy Link",
                copy_code: imgInfo.image,
              }),
            },
          ],
        },
      });
    }
    const message = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: {
              body: {
                text: "Dragon Ball Logos"
              },
              footer: {
                text: "Click to view"
              },
              carouselMessage: {
                cards
              },
            },
          },
        },
      },
      { quoted: ms }
    );
    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    repondre("🥵🥵 " + e);
  }
});

// naruto command
fana({
  nomCom: "naruto",
  categorie: "Logo",
  reaction: "⛩"
}, async (dest, zk, commandeOptions) => {
  let { ms, arg, repondre, prefixe } = commandeOptions;
  try {
    if (!arg || arg == '') {
      repondre("*_Exemple : * " + prefixe + "naruto lucky");
      return;
    }
    var nar = "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html";
    repondre("*traitement en cours...*");
    var img = await mumaker.ephoto(nar, arg.join(' '));
    const cards = [];
    for (let i = 0; i < 6; i++) {
      cards.push({
        header: {
          title: `Naruto ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: img.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this naruto logo!",
        },
        footer: {
          text: "LUCKY MD",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy Link",
                copy_code: img.image,
              }),
            },
          ],
        },
      });
    }
    const message = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: {
              body: {
                text: "Naruto Logos"
              },
              footer: {
                text: "Click to view"
              },
              carouselMessage: {
                cards
              },
            },
          },
        },
      },
      { quoted: ms }
    );
    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    repondre("🥵🥵 " + e);
  }
});

// didong command
fana({
  nomCom: "didong",
  categorie: "Logo",
  reaction: "📱"
}, async (dest, zk, commandeOptions) => {
  let { arg, repondre, prefixe, ms } = commandeOptions;
  try {
    if (!arg || arg == "") {
      repondre(`*exemple :* ${prefixe}didong fredi`)
      return;
    }
    var lien = "https://ephoto360.com/tao-anh-che-vui-tu-choi-cuoc-goi-voi-ten-cua-ban-930.html";
    var img = await mumaker.ephoto(lien, arg.join(' '));
    repondre('*processing...*')
    const cards = [];
    for (let i = 0; i < 6; i++) {
      cards.push({
        header: {
          title: `Didong ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: img.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this didong logo!",
        },
        footer: {
          text: "LUCKY MD",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy Link",
                copy_code: img.image,
              }),
            },
          ],
        },
      });
    }
    const message = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: {
              body: {
                text: "Didong Logos"
              },
              footer: {
                text: "Click to view"
              },
              carouselMessage: {
                cards
              },
            },
          },
        },
      },
      { quoted: ms }
    );
    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    repondre("🥵🥵 " + e);
  }
});


😊 Here's the updated "didong" command with multiple images sent as cards:
fana({
  nomCom: "didong",
  categorie: "Logo",
  reaction: "📱"
}, async (dest, zk, commandeOptions) => {
  let { arg, repondre, prefixe, ms } = commandeOptions;
  try {
    if (!arg || arg == "") {
      repondre(`*exemple :* ${prefixe}didong fredi`)
      return;
    }
    var lien = "https://ephoto360.com/tao-anh-che-vui-tu-choi-cuoc-goi-voi-ten-cua-ban-930.html";
    const cards = [];
    for (let i = 0; i < 6; i++) {
      var img = await mumaker.ephoto(lien, arg.join(' '));
      cards.push({
        header: {
          title: `Didong ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: img.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this didong logo!",
        },
        footer: {
          text: "LUCKY MD",
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy Link",
                copy_code: img.image,
              }),
            },
          ],
        },
      });
    }
    const message = generateWAMessageFromContent(
      dest,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: {
              body: {
                text: "Didong Logos"
              },
              footer: {
                text: "Click to view"
              },
              carouselMessage: {
                cards
              },
            },
          },
        },
      },
      { quoted: ms }
    );
    await zk.relayMessage(dest, message.message, { messageId: message.key.id });
  } catch (e) {
    repondre("🥵🥵 " + e);
  }
});

This script sends 6 different didong logos as cards 😊.

// Add more commands here...

module.exports = { fana };

This script includes multiple commands with multiple images sent as cards 😊.
