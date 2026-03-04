const JavaScriptObfuscator = require("javascript-obfuscator");
const { fana } = require("../njabulo/fana");
const config = require("../set");

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
      display_text: "View Channel",
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
        header: text,
        buttons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "ɳʝαႦυʅσ ʝႦ",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            renderLargerThumbnail: false,
          },
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363399999197102@newsletter",
            newsletterName: "╭••➤Njabulo Jb",
            serverMessageId: 143,
          },
          forwardingScore: 999,
        },
      },
    }, { quoted: ms });
}
// ── Obfuscate command ─────────────────────────────────────────────
fana(
  {
    nomCom: "obt",
    categorie: "General",
  },
  async (chatId, zk, commandeOptions) => {
    const {
      ms,
      arg,
      repondre,
      auteurMessage,
      nomAuteurMessage,
      msgRepondu,
      auteurMsgRepondu,
    } = commandeOptions;

    if (!arg[0]) {
      sendFormattedMessage(
        zk,
        chatId,
        "*Aftᥱr thᥱ ᥴommᥲnd, ρrovιdᥱ ᥲ vᥲᥣιd JᥲvᥲSᥴrιρt ᥴodᥱ for ᥱnᥴrყρtιon*",
        ms
      );
      return;
    }

    try {
      const code = arg.join(" ");
      const obfuscated = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1,
      });

      const obfText = obfuscated.getObfuscatedCode();

      // send the obfuscated code with copy button
      const copyButtons = JSON.parse(JSON.stringify(baseButtons));
      copyButtons[1].buttonParamsJson = JSON.stringify({
        display_text: "Copy",
        id: "copy",
        copy_code: obfText,
      });

      await zk.sendMessage(
        chatId,
        {
         interactiveMessage: {
         header: obfText,
         buttons: copyButtons,
        headerType: 1,
        contextInfo: {
          mentionedJid: [ms?.sender?.jid || ""],
          externalAdReply: {
            title: "ɳʝαႦυʅσ ʝႦ",
            mediaType: 1,
            previewType: 0,
            thumbnailUrl: randomNjabulourl,
            renderLargerThumbnail: false,
          },
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363399999197102@newsletter",
            newsletterName: "╭••➤Njabulo Jb",
            serverMessageId: 143,
          },
          forwardingScore: 999,
        },
      },
    }, { quoted: ms });
    
    } catch (error) {
      console.error("Obfuscation error:", error);
      sendFormattedMessage(
        zk,
        chatId,
        "*Somᥱthιng ιs ᥕrong, ᥴhᥱᥴk ιf ყoᥙr ᥴodᥱ ιs ᥣogιᥴᥲᥣ ᥲnd hᥲs thᥱ ᥴorrᥱᥴt sყntᥲx*",
        ms
      );
    }
  }
);
