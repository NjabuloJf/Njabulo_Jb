const { fana } = require("../njabulo/fana");
const config = require("../set");

    // List of image URLs
    const njabulox = [
        "https://files.catbox.moe/iii5jv.jpg",
        "https://files.catbox.moe/xjeyjh.jpg",
        "https://files.catbox.moe/mh36c7.jpg",
        "https://files.catbox.moe/u6v5ir.jpg",
        "https://files.catbox.moe/bnb3vx.jpg" // New image added
    ];

    // Select a random image file
    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];

const buttons = [
  {
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
      display_text: "View Channel",
      id: "backup channel",
      url: config.GURL,
    }),
  },
];



async function sendFormattedMessage(zk, chatId, text, ms) {
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

fana({
  nomCom: "blocklist",
  aliases: ["listblock", "blacklist"],
  reaction: '🍂',
  categorie: "Search"
}, async (chatId, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    let blocklist = await zk.fetchBlocklist();

    if (blocklist.length > 0) {
      let jackhuh = `*Bᥣoᥴkᥱd Contᥲᥴts*\n`;

      await sendFormattedMessage(zk, chatId, `*ყoᥙ hᥲvᥱ bᥣoᥴkᥱd ${blocklist.length} contact(s), fᥱtᥴhιng ᥲnd sᥱndιng thᥱιr dᥱtᥲιᥣs!*`, ms);

      const promises = blocklist.map(async (blockedUser) => {
        const phoneNumber = blockedUser.split('@')[0];

        jackhuh += `🖕  +${phoneNumber}\n`; 
      });

      await Promise.all(promises);

      await sendFormattedMessage(zk, chatId, jackhuh, ms);
    } else {
      await sendFormattedMessage(zk, chatId, "*Thᥱrᥱ ᥲrᥱ no bᥣoᥴkᥱd ᥴontᥲᥴts*", ms);
    }
  } catch (e) {
    await sendFormattedMessage(zk, chatId, "An error occurred while accessing blocked users.\n\n" + e, ms);
  }
});
