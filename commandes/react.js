

const axios = require('axios');
const fs = require("fs-extra");
const { execSync } = require("child_process");
const { unlink } = require('fs').promises;
const { fana } = require("../njabulo/fana");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const GIFBufferToVideoBuffer = async (image) => {
  const filename = `${Math.random().toString(36)}`;
  try {
    await fs.writeFileSync(`./${filename}.gif`, image);
    execSync(`ffmpeg -i ./${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./${filename}.mp4`);
    await sleep(4000);
    const buffer5 = await fs.readFileSync(`./${filename}.mp4`);
    await Promise.all([unlink(`./${filename}.mp4`), unlink(`./${filename}.gif`)]); 
    return buffer5;
  } catch (e) {
    console.error(e);
  }
};

const buttons = [
  {
    buttonId: '1',
    buttonText: { displayText: '🗃️ Visit Website' },
    type: 1
  },
  {
    buttonId: '2',
    buttonText: { displayText: 'Copy' },
    type: 1
  }
];

const generateReactionCommand = (reactionName, reactionEmoji) => {
  fana({
    nomCom: reactionName,
    categorie: "Reaction",
    reaction: reactionEmoji,
  }, async (origineMessage, zk, commandeOptions) => {
    const { auteurMessage, auteurMsgRepondu, repondre, ms, msgRepondu } = commandeOptions;
    const url = `https://api.waifu.pics/sfw/${reactionName}`;
    try {
      const response = await axios.get(url);
      const imageUrl = response.data.url;
      const gifBufferResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const gifBuffer = gifBufferResponse.data;
      const videoBuffer = await GIFBufferToVideoBuffer(gifBuffer);
      if (msgRepondu) {
        const txt = `@${auteurMessage.split("@")[0]} ${reactionName} @${auteurMsgRepondu.split("@")[0]}`;
        await zk.sendMessage(origineMessage, {
          video: videoBuffer,
          gifPlayback: true,
          caption: txt,
          mentions: [auteurMessage, auteurMsgRepondu],
          buttons
        }, { quoted: ms });
      } else {
        const txt = `@${auteurMessage.split("@")[0]} ${reactionName} everyone`;
        await zk.sendMessage(origineMessage, {
          video: videoBuffer,
          gifPlayback: true,
          caption: txt,
          mentions: [auteurMessage],
          buttons
        }, { quoted: ms });
      }
    } catch (error) {
      repondre('Error occurred: ' + error);
      console.log(error);
    }
  });
};

// Usage
generateReactionCommand("bully", "👊");
generateReactionCommand("cuddle", "🤗");
generateReactionCommand("cry", "😢");
generateReactionCommand("hug", "😊");
generateReactionCommand("awoo", "🐺");
generateReactionCommand("kiss", "😘");
generateReactionCommand("lick", "👅");
generateReactionCommand("pat", "👋");
generateReactionCommand("smug", "😏");
generateReactionCommand("bonk", "🔨");
generateReactionCommand("yeet", "🚀");
generateReactionCommand("blush", "😊");
generateReactionCommand("smile", "😄");
generateReactionCommand("wave", "👋");
generateReactionCommand("highfive");
generateReactionCommand("handhold");
generateReactionCommand("nom","👅" );
generateReactionCommand("bite", "🦷");
generateReactionCommand("glomp", "🤗");
generateReactionCommand("slap", "👋");
generateReactionCommand("kill", "💀");
generateReactionCommand("kick", "🦵");
generateReactionCommand("happy", "😄");
generateReactionCommand("wink", "😉");
generateReactionCommand("poke", "👉");
generateReactionCommand("dance", "💃");
generateReactionCommand("cringe", "😬");


