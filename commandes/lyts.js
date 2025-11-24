const { fana } = require("../njabulo/fana");
const axios = require("axios");

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
      url: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
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
            renderLargerThumbnail: true,
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

// ── Lyrics command ─────────────────────────────────────────────
fana(
  {
    nomCom: "lyrics",
    reaction: "🎵",
    categorie: "Search",
    aliases: ["lyric", "mistari"],
  },
  async (chatId, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
    const songName = arg.join(" ").trim();

    if (!songName) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*Pᥣᥱᥲsᥱ ρrovιdᥱ ᥲ song nᥲmᥱ. Exᥲmρᥣᥱ: ᥣყrιᥴs Shᥲρᥱ of Yoᥙ*",
        ms
      );
    }

    const apis = [
      `https://api.dreaded.site/api/lyrics?title=${encodeURIComponent(songName)}`,
      `https://some-random-api.com/others/lyrics?title=${encodeURIComponent(songName)}`,
      `https://api.davidcyriltech.my.id/lyrics?title=${encodeURIComponent(songName)}`,
    ];

    let lyricsData;
    for (const api of apis) {
      try {
        const response = await axios.get(api);
        if (response.data?.result?.lyrics) {
          lyricsData = response.data;
          break;
        }
      } catch (error) {
        console.error(`API ${api} failed:`, error.message);
      }
    }

    if (!lyricsData?.result) {
      return sendFormattedMessage(
        zk,
        chatId,
        "*Coᥙᥣdn't fιnd ᥣყrιᥴs for*" + songName + "*",
        ms
      );
    }

    const { title, artist, thumb, lyrics } = lyricsData.result;
    const imageUrl = thumb || "https://files.catbox.moe/b2vql7.jpg";

    try {
      const imageResponse = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      const caption = `🎶 *${title}* - ${artist}\n\n${lyrics}\n\n*Powered by Njabulo Jb*`;

      // Build a copy‑enabled button list for this image
      const copyButtons = JSON.parse(JSON.stringify(baseButtons));
      copyButtons[1].buttonParamsJson = JSON.stringify({
        display_text: "Copy",
        id: "copy",
        copy_code: caption, // copy the full caption
      });

      await zk.sendMessage(
        chatId,
        {
          interactiveMessage: {
            image: { url: imageUrl },
            header: caption,
            buttons: copyButtons,
            headerType: 1,
            contextInfo: {
              mentionedJid: [ms?.sender?.jid || ""],
              externalAdReply: {
                title: "Lyrics Finder",
                body: "Get any song lyrics instantly",
                thumbnail: Buffer.from(imageResponse.data),
                mediaType: 1,
                mediaUrl: "",
                sourceUrl: "",
              },
            },
          },
        },
        { quoted: ms }
      );
    } catch (error) {
      console.error("Error sending lyrics:", error);
      const truncated = `🎶 *${title}* - ${artist}\n\n${lyrics.substring(
        0,
        2000
      )}...\n\n*[Truncated - image failed to load]*`;
      sendFormattedMessage(zk, chatId, truncated, ms);
    }
  }
);