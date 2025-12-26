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


😊 Here are the updated "summer" and "wall" commands with multiple images sent as cards:
// summer command
fana({
  nomCom: "summer",
  categorie: "Logo",
  reaction: "🌞"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}summer My text`);
    return;
  }
  const text = arg.join(" ");
  try {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      let data = await mumaker.textpro("https://textpro.me/create-sunset-light-text-effects-online-for-free-1124.html", text);
      cards.push({
        header: {
          title: `Summer ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: data.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this summer logo!",
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
                copy_code: data.image,
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
                text: "Summer Logos"
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

// wall command
fana({
  nomCom: "wall",
  categorie: "Logo",
  reaction: "👍"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}wall My text`);
    return;
  }
  let text = arg.join(" ")
  try {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      let data = await mumaker.textpro("https://textpro.me/break-wall-text-effect-871.html", text);
      cards.push({
        header: {
          title: `Wall ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: data.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this wall logo!",
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
                copy_code: data.image,
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
                text: "Wall Logos"
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


😊 Here are the updated "greenneon" and "neonlight" commands with multiple images sent as cards:
// greenneon command
fana({
  nomCom: "greenneon",
  categorie: "Logo",
  reaction: "🟢"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}greenneon My text`);
    return;
  }
  const text = arg.join(" ");
  try {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      let data = await mumaker.textpro("https://textpro.me/green-neon-text-effect-874.html", text);
      cards.push({
        header: {
          title: `Green Neon ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: data.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this green neon logo!",
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
                copy_code: data.image,
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
                text: "Green Neon Logos"
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

// neonlight command
fana({
  nomCom: "neonlight",
  categorie: "Logo",
  reaction: "💡"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}neonlight My text`);
    return;
  }
  const text = arg.join(" ");
  try {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      let data = await mumaker.textpro("https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html", text);
      cards.push({
        header: {
          title: `Neon Light ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: data.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this neon light logo!",
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
                copy_code: data.image,
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
                text: "Neon Light Logos"
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


😊 Here are the updated "boomlg", "devil", and "glitch" commands with multiple images sent as cards:
// boomlg command
fana({
  nomCom: "boomlg",
  categorie: "Logo",
  reaction: "💥"
}, async (dest, zk, commandeOptions) => {
  let { ms, repondre, prefixe, arg } = commandeOptions;
  if (!arg || arg == "") {
    repondre(` Exemple :* ${prefixe}boomlg fredie`)
    return;
  }
  try {
    var lien = "https://en.ephoto360.com/boom-text-comic-style-text-effect-675.html";
    const cards = [];
    for (let i = 0; i < 6; i++) {
      var img = await mumaker.ephoto(lien, arg.join(' '));
      cards.push({
        header: {
          title: `Boom ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: img.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this boom logo!",
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
                text: "Boom Logos"
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

// devil command
fana({
  nomCom: "devil",
  categorie: "Logo",
  reaction: "😈"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}devil My text`);
    return;
  }
  const text = arg.join(" ");
  try {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      let data = await mumaker.textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html", text);
      cards.push({
        header: {
          title: `Devil ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: data.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this devil logo!",
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
                copy_code: data.image,
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
                text: "Devil Logos"
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

// glitch command
fana({
  nomCom: "glitch",
  categorie: "Logo",
  reaction: "🎛️"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}glitch My text`);
    return;
  }
  const text = arg.join(" ");
  try {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      let data = await mumaker.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", text);
      cards.push({
        header: {
          title: `Glitch ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: data.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this glitch logo!",
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
                copy_code: data.image,
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
                text: "Glitch Logos"
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

😊 Here are the updated "transformer", "snow", and "water" commands with multiple images sent as cards:
// transformer command
fana({
  nomCom: "transformer",
  categorie: "Logo",
  reaction: "🤖"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}transformer My text`);
    return;
  }
  const text = arg.join(" ");
  try {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      let data = await mumaker.textpro("https://textpro.me/create-a-transformer-text-effect-online-1035.html", text);
      cards.push({
        header: {
          title: `Transformer ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: data.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this transformer logo!",
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
                copy_code: data.image,
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
                text: "Transformer Logos"
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

// snow command
fana({
  nomCom: "snow",
  categorie: "Logo",
  reaction: "❄️"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}snow My text`);
    return;
  }
  const text = arg.join(" ");
  try {
    const cards = [];
    for (let i = 0; i < 6; i++) {
      let data = await mumaker.textpro("https://textpro.me/create-beautiful-3d-snow-text-effect-online-1101.html", text);
      cards.push({
        header: {
          title: `Snow ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: data.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this snow logo!",
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
                copy_code: data.image,
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
                text: "Snow Logos"
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

// water command
fana({
  nomCom: "water",
  categorie: "Logo",
  reaction: "💦"
}, async (dest, zk, commandeOptions) => {
  let { arg, repondre, prefixe, ms } = commandeOptions;
  try {
    if (!arg || arg == "") {
      repondre(`${prefixe}water hans`)
      return;
    }
    var lien = "https://en.ephoto360.com/create-water-effect-text-online-295.html";
    const cards = [];
    for (let i = 0; i < 6; i++) {
      var img = await mumaker.ephoto(lien, arg.join(' '));
      cards.push({
        header: {
          title: `Water ${i + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: img.image } }, { upload: zk.waUploadToServer })).imageMessage,
        },
        body: {
          text: "Check out this water logo!",
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
                text: "Water Logos"
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

These scripts send 6 different transformer, snow, and water logos as cards 😊.

These scripts send 6 different boom, devil, and glitch logos as cards 😊.

These scripts send 6 different green neon and neon light logos as cards 😊.
These scripts send 6 different summer and wall logos as cards 😊.

This script sends 6 different didong logos as cards 😊.

// Add more commands here...

module.exports = { fana };

This script includes multiple commands with multiple images sent as cards 😊.
