
const { fana } = require("../njabulo/fana");
const axios = require("axios");
const googleTTS = require('google-tts-api');
const { franc } = require('franc');

fana({ 
  nomCom: "voicegpt", 
  reaction: "🤖", 
  categorie: "AI", 
  aliases: [], 
}, async (chatId, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const q = arg.join(" ").trim();
  if (!q) return repondre("😊 Ask me something!");

  try {
    console.log('Query:', q);
    const res = await axios.get(`https://api.siputzx.my.id/api/ai/gpt3?prompt=kamu%20adalah%20ai%20yang%20ceria&content=${encodeURIComponent(q)}`);
    console.log('API Response:', res.data);
    const response = res.data.data;

    await zk.sendMessage(chatId, { react: { text: '⏳', key: ms.key } });

    let detectedLang = franc(response);
    console.log('Detected Lang:', detectedLang);
    const langMap = {
      'afr': 'af', 'amh': 'am', 'ara': 'ar', 'ben': 'bn', 'bos': 'bs', 
      'bul': 'bg', 'cat': 'ca', 'ceb': 'ceb', 'cmn': 'zh-CN', 'hrv': 'hr', 
      'ces': 'cs', 'dan': 'da', 'nld': 'nl', 'eng': 'en', 'epo': 'eo', 
      'est': 'et', 'fil': 'fil', 'fin': 'fi', 'fra': 'fr', 'glg': 'gl', 
      'kat': 'ka', 'deu': 'de', 'ell': 'el', 'guj': 'gu', 'hau': 'ha', 
      'heb': 'he', 'hin': 'hi', 'hun': 'hu', 'isl': 'is', 'ind': 'id', 
      'ita': 'it', 'jpn': 'ja', 'jav': 'jv', 'kan': 'kn', 'kaz': 'kk', 
      'khm': 'km', 'kor': 'ko', 'lao': 'lo', 'lav': 'lv', 'lit': 'lt', 
      'mkd': 'mk', 'mal': 'ml', 'mar': 'mr', 'msa': 'ms', 'mya': 'my', 
      'nep': 'ne', 'nor': 'no', 'pol': 'pl', 'por': 'pt', 'pan': 'pa', 
      'ron': 'ro', 'rus': 'ru', 'srp': 'sr', 'sin': 'si', 'slk': 'sk', 
      'slv': 'sl', 'som': 'so', 'spa': 'es', 'swa': 'sw', 'swe': 'sv', 
      'tam': 'ta', 'tel': 'te', 'tha': 'th', 'tur': 'tr', 'ukr': 'uk', 
      'urd': 'ur', 'uzb': 'uz', 'vie': 'vi', 'wel': 'cy', 'yor': 'yo', 
      'zul': 'zu'
    };
    let voiceLanguage = langMap[detectedLang] || 'en';
    console.log('Voice Lang:', voiceLanguage);
    const audioUrls = googleTTS.getAllAudioUrls(response, { lang: voiceLanguage, slow: false, host: 'https://translate.google.com' });
    console.log('Audio URLs:', audioUrls);

    for (const audio of audioUrls) {
      await zk.sendMessage(chatId, { audio: { url: audio.url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: ms });
    }
  } catch (err) {
    console.error("voicegpt error:", err);
    repondre("❌ Error. Try again later.");
  }
});

