"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1.default.child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require("fs-extra");
let path = require("path");
const FileType = require('file-type');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { verifierEtatJid, recupererActionJid } = require("./data/antilien");
const { atbverifierEtatJid, atbrecupererActionJid } = require("./data/antibot");
let evt = require(__dirname + "/timnasa/timoth");
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("./data/banUser");
const { addGroupToBanList, isGroupBanned, removeGroupFromBanList } = require("./data/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require("./data/onlyAdmin");
let { reagir } = require(__dirname + "/fez/app");

var session = conf.session.replace(/TIMNASA-TMD;;;=>/g, "");
const prefixe = conf.PREFIXE;
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const BaseUrl = process.env.GITHUB_GIT;
const adamsapikey = process.env.BOT_OWNER;

// ─── FIX 1: Only called ONCE at startup ───────────────────────────────────────
async function authentification() {
    try {
        if (!fs.existsSync(__dirname + "/scan/creds.json")) {
            console.log("connexion en cour ...");
            await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
        } else if (session != "zokk") {
            await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
        }
    } catch (e) {
        console.log("Session Invalid " + e);
        return;
    }
}
authentification(); // ← called only once (was called twice before)

const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" }),
});

// ─── FIX 2: Deduplicated emojiMap (removed ~300 duplicate entries) ─────────────
const emojiMap = {
    "hello": ["👋", "🙂", "😊", "🙋‍♂️"],
    "hey": ["👋", "😊", "🙋", "😄"],
    "hi": ["👋", "😀", "😁", "🙂"],
    "bye": ["👋", "😢", "🚶‍♂️"],
    "goodbye": ["👋", "😢", "🙋‍♀️"],
    "see you": ["👋", "✌️", "🤗"],
    "good morning": ["🌅", "🌞", "☀️", "🌻"],
    "good night": ["🌙", "🌜", "⭐", "💤"],
    "goodnight": ["🌙", "😴", "💤", "🌛"],
    "thanks": ["🙏", "😊", "💖", "❤️"],
    "thank you": ["🙏", "😊", "🙌", "💖"],
    "welcome": ["😊", "😄", "🌸", "💖"],
    "sorry": ["😔", "🙏", "😓", "💔"],
    "apology": ["😔", "😞", "🙏", "💔"],
    "apologies": ["😔", "💔", "🙏", "🙇‍♂️"],
    "help": ["🆘", "❓", "🙏", "💡"],
    "love": ["❤️", "💖", "💘", "😍"],
    "love you": ["❤️", "💖", "😘", "💕"],
    "miss you": ["😢", "💔", "😔", "😭"],
    "like": ["👍", "❤️", "👌", "💓"],
    "happy": ["😊", "😁", "🙂", "🎉", "🥳"],
    "joy": ["😁", "😆", "😂", "😊"],
    "sad": ["😢", "😭", "😞", "💔"],
    "cry": ["😭", "😢", "💧", "😩"],
    "crying": ["😭", "😢", "💔", "😞"],
    "angry": ["😡", "😠", "💢", "🤬"],
    "mad": ["😠", "😡", "😤", "💢"],
    "excited": ["🤩", "🥳", "🎉", "🎊"],
    "surprised": ["😲", "😳", "😯", "🤯"],
    "shocked": ["😱", "😳", "😯", "💥"],
    "scared": ["😱", "😨", "😧", "😰"],
    "sleep": ["😴", "💤", "😌", "🛌"],
    "sleepy": ["😴", "💤", "😪", "🛌"],
    "bored": ["😐", "😑", "🙄", "😒"],
    "boring": ["😴", "🥱", "🙄", "😑"],
    "tired": ["😴", "🥱", "😌", "💤"],
    "confused": ["🤔", "😕", "🧐", "🤷‍♂️"],
    "nervous": ["😬", "😰", "🤞"],
    "lonely": ["😔", "😭", "💔"],
    "shy": ["😳", "☺️", "🙈", "😊"],
    "brave": ["🦸‍♂️", "💪", "🔥"],
    "hopeful": ["🤞", "🌈", "🙏", "💫"],
    "grateful": ["🙏", "💐", "🥰", "❤️"],
    "determined": ["💪", "🔥", "😤", "🏆"],
    "wow": ["😲", "😱", "🤩", "🤯"],
    "congratulations": ["🎉", "🎊", "🏆", "🎁", "👏"],
    "congrats": ["🎉", "👏", "🥳", "🎊"],
    "well done": ["👏", "💪", "🎉", "🏆"],
    "good job": ["👏", "💯", "👍", "🌟"],
    "great": ["👍", "💪", "😄", "🔥"],
    "cool": ["😎", "🤙", "🔥", "👌"],
    "awesome": ["🔥", "🚀", "🤩", "👏"],
    "ok": ["👌", "👍", "✅"],
    "good": ["👍", "👌", "😊", "💯"],
    "party": ["🎉", "🥳", "🍾", "💃", "🕺"],
    "fun": ["🎮", "🎲", "🤣", "🎉"],
    "cheers": ["🥂", "🍻", "🎉", "🥳"],
    "peace": ["✌️", "🕊️", "☮️"],
    "bro": ["🤜🤛", "👊", "💥"],
    "buddy": ["🤗", "👯‍♂️", "🤝"],
    "niaje": ["👋", "😄", "💥", "🔥"],
    "fredi": ["😎", "💯", "🔥", "👑"],
    "ezra": ["🔥", "💥", "👑", "💯"],
    "john": ["👑", "🔥", "💥", "😎"],
    "mike": ["💪", "🏆", "🔥", "🚀"],
    "lisa": ["💖", "👑", "🌸", "🌺"],
    "emily": ["💖", "💃", "👑", "🎉"],
    "birthday": ["🎂", "🎉", "🎈", "🎊"],
    "anniversary": ["💍", "🎉", "🎁", "💑"],
    "christmas": ["🎄", "🎅", "🎁", "⛄"],
    "new year": ["🎉", "🎊", "🎇", "🍾"],
    "easter": ["🐰", "🐣", "🥚", "🌸"],
    "halloween": ["🎃", "👻", "🕸️", "👹"],
    "valentine": ["💘", "❤️", "💌", "🌹"],
    "wedding": ["💍", "👰", "🤵", "💒"],
    "bot": ["🤖", "💻", "⚙️", "🧠"],
    "robot": ["🤖", "⚙️", "💻", "🔋"],
    "pizza": ["🍕", "🥖", "🍟"],
    "burger": ["🍔", "🍟", "🌭"],
    "coffee": ["☕", "🍵", "🥤"],
    "tea": ["🍵", "☕", "🫖"],
    "cake": ["🍰", "🎂", "🧁"],
    "donut": ["🍩", "🍪", "🧁"],
    "ice cream": ["🍦", "🍨", "🍧"],
    "food": ["🍕", "🍔", "🍟", "🍣"],
    "drink": ["🍹", "🥤", "🍷", "🍸"],
    "water": ["💧", "💦", "🌊"],
    "wine": ["🍷", "🍾", "🥂"],
    "beer": ["🍺", "🍻", "🥂"],
    "music": ["🎵", "🎶", "🎧", "🎤"],
    "guitar": ["🎸", "🎶", "🎵"],
    "piano": ["🎹", "🎶", "🎵"],
    "singing": ["🎤", "🎶", "🎵"],
    "dancing": ["💃", "🕺", "🎶"],
    "games": ["🎮", "🕹️", "🎲", "🎯"],
    "art": ["🎨", "🖌️", "🖼️"],
    "sports": ["⚽", "🏀", "🎾", "🏆"],
    "soccer": ["⚽", "🥅", "🏟️"],
    "basketball": ["🏀", "⛹️‍♂️", "🏆"],
    "running": ["🏃‍♂️", "👟", "🏅"],
    "workout": ["🏋️‍♀️", "💪", "🏃‍♂️"],
    "yoga": ["🧘", "🌸", "💪"],
    "sun": ["🌞", "☀️", "🌅"],
    "moon": ["🌜", "🌙", "⭐"],
    "star": ["🌟", "⭐", "✨", "💫"],
    "rain": ["🌧️", "☔", "💧"],
    "snow": ["❄️", "⛄", "🌨️"],
    "fire": ["🔥", "💥", "⚡"],
    "flower": ["🌸", "🌺", "🌷"],
    "tree": ["🌳", "🌲", "🌴"],
    "ocean": ["🌊", "💦", "⛵"],
    "rainbow": ["🌈", "🌤️", "✨"],
    "dog": ["🐶", "🐕", "🐾"],
    "cat": ["🐱", "😺", "🐾"],
    "lion": ["🦁", "🐯", "🐾"],
    "bear": ["🐻", "🐨", "🐼"],
    "rabbit": ["🐰", "🐇", "🐾"],
    "panda": ["🐼", "🐾", "🍃"],
    "bird": ["🐦", "🦅", "🦜"],
    "fish": ["🐟", "🐠", "🐡"],
    "unicorn": ["🦄", "✨", "🌈"],
    "butterfly": ["🦋", "🌸", "🌷"],
    "wolf": ["🐺", "🌕", "🌲"],
    "money": ["💸", "💰", "💵", "💳"],
    "rocket": ["🚀", "🌌", "✨"],
    "computer": ["💻", "🖥️", "⌨️"],
    "phone": ["📱", "📲", "☎️"],
    "book": ["📚", "📖", "✏️"],
    "gift": ["🎁", "💝", "🎉"],
    "light": ["💡", "✨", "🔦"],
    "car": ["🚗", "🚙", "🛣️"],
    "train": ["🚆", "🚄", "🚅"],
    "plane": ["✈️", "🛫", "🛬"],
    "beach": ["🏖️", "🌴", "🌊"],
    "mountain": ["🏔️", "⛰️", "🌄"],
    "city": ["🏙️", "🌆", "🌇"],
    "vacation": ["🏖️", "✈️", "🌴"],
    "laughter": ["😂", "🤣", "😆"],
    "study": ["📖", "📝", "💡"],
    "work": ["💻", "💼", "📅"],
    "good luck": ["🍀", "💯", "🎯"],
    "victory": ["✌️", "🏆", "🎉"],
};

const fallbackEmojis = [
    "😎", "🔥", "💥", "💯", "✨", "🌟", "🌈", "⚡", "💎", "🌀",
    "👑", "🎉", "🎊", "🦄", "👽", "🛸", "🚀", "🦋", "💫", "🍀",
    "🎶", "🎧", "🎸", "🎤", "🏆", "🏅", "🌍", "🎮", "🎲", "💪",
    "🥇", "👟", "🏄", "🎯", "🎁", "🎨", "🌻", "🌸", "🌺", "🌹",
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const getRandomEmojiFromMap = (keyword) => {
    const emojis = emojiMap[keyword.toLowerCase()];
    if (emojis && emojis.length > 0) {
        return emojis[Math.floor(Math.random() * emojis.length)];
    }
    return null;
};

const getRandomFallbackEmoji = () => fallbackEmojis[Math.floor(Math.random() * fallbackEmojis.length)];

const getEmojiForSentence = (sentence) => {
    if (!sentence) return getRandomFallbackEmoji();
    const words = sentence.toLowerCase().split(/\s+/);
    for (const word of words) {
        const emoji = getRandomEmojiFromMap(word);
        if (emoji) return emoji;
    }
    return getRandomFallbackEmoji();
};

function getCurrentDateTime() {
    const options = {
        timeZone: 'Africa/Nairobi',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
    };
    return new Intl.DateTimeFormat('en-KE', options).format(new Date());
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
setTimeout(() => {
    async function main() {
        const { version, isLatest } = await (0, baileys_1.fetchLatestBaileysVersion)();
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/scan");

        const sockOptions = {
            version,
            logger: pino({ level: "silent" }),
            browser: ['Timnasa-Md', "safari", "1.0.0"],
            printQRInTerminal: true,
            fireInitQueries: false,
            shouldSyncHistoryMessage: true,
            downloadHistory: true,
            syncFullHistory: true,
            generateHighQualityLinkPreview: true,
            markOnlineOnConnect: false,
            keepAliveIntervalMs: 30_000,
            auth: {
                creds: state.creds,
                keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
            },
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
                    return msg?.message || undefined;
                }
                return { conversation: 'An Error Occurred, Repeat Command!' };
            }
        };

        const zk = (0, baileys_1.default)(sockOptions);
        store.bind(zk.ev);

        // ─── FIX 3: Bio update — no console.log spam ──────────────────────────
        if (conf.AUTO_BIO === "yes") {
            setInterval(async () => {
                const bioText = `Timnasa-Md is running 🚗\n${getCurrentDateTime()}`;
                await zk.updateProfileStatus(bioText);
            }, 60000);
        }

        // ─── ANTI-CALL ────────────────────────────────────────────────────────
        let lastTextTime = 0;
        const messageDelay = 5000;

        zk.ev.on('call', async (callData) => {
            if (conf.ANTI_CALL === 'yes') {
                const callId = callData[0].id;
                const callerId = callData[0].from;
                await zk.rejectCall(callId, callerId);
                const currentTime = Date.now();
                if (currentTime - lastTextTime >= messageDelay) {
                    await zk.sendMessage(callerId, { text: conf.ANTI_CALL_TEXT });
                    lastTextTime = currentTime;
                }
            }
        });

        // ─── FIX 4: SINGLE consolidated messages.upsert listener ──────────────
        // All message handling is merged into ONE listener instead of 5+

        let lastReactionTime = 0;
        let repliedContacts = new Set();
        let auto_reply_message = "Hello, it's Timnasa Md on board. My owner is currently unavailable. Please leave a message, and we will get back to you as soon as possible.";

        // vCard helper
        async function sendVCard(jid, baseName) {
            try {
                const phoneNumber = jid.split('@')[0];
                let counter = 1;
                let name = `${baseName} ${counter}`;
                while (Object.values(store.contacts).some(contact => contact.name === name)) {
                    counter++;
                    name = `${baseName} ${counter}`;
                }
                const vCardContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;type=CELL;type=VOICE;waid=${phoneNumber}:+${phoneNumber}\nEND:VCARD\n`;
                const vCardPath = `./${name}.vcf`;
                fs.writeFileSync(vCardPath, vCardContent);
                await zk.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
                    document: { url: vCardPath },
                    mimetype: 'text/vcard',
                    fileName: `${name}.vcf`,
                    caption: `Contact saved as ${name}.\n\n TIMNASA MD👊`
                });
                fs.unlinkSync(vCardPath);
                return name;
            } catch (error) {
                console.error(`Error creating vCard:`, error.message);
            }
        }

        const decodeJid = (jid) => {
            if (!jid) return jid;
            if (/:\d+@/gi.test(jid)) {
                let decode = (0, baileys_1.jidDecode)(jid) || {};
                return decode.user && decode.server ? decode.user + '@' + decode.server : jid;
            }
            return jid;
        };

        function groupeAdmin(membres) {
            return membres.filter(m => m.admin != null).map(m => m.id);
        }

        function mybotpic() {
            const lien = conf.URL.split(',');
            return lien[Math.floor(Math.random() * lien.length)];
        }

        // ─── THE ONE CONSOLIDATED LISTENER ────────────────────────────────────
        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            const ms = messages[0];
            if (!ms.message) return;

            const origineMessage = ms.key.remoteJid;
            const mtype = (0, baileys_1.getContentType)(ms.message);

            // ── Auto-read ──────────────────────────────────────────────────────
            if (conf.AUTO_READ === 'yes' && !ms.key.fromMe) {
                await zk.readMessages([ms.key]);
            }

            // ── Status handling ────────────────────────────────────────────────
            if (origineMessage === "status@broadcast") {
                if (conf.AUTO_READ_STATUS === "yes") {
                    await zk.readMessages([ms.key]);
                }

                // Auto react to status
                if (conf.AUTO_REACT_STATUS === "yes") {
                    const now = Date.now();
                    if (now - lastReactionTime >= 5000) {
                        const timoth = zk.user?.id ? zk.user.id.split(":")[0] + "@s.whatsapp.net" : null;
                        if (timoth) {
                            const keyword = ms?.message?.conversation || "";
                            const randomReaction = getEmojiForSentence(keyword);
                            await zk.sendMessage(origineMessage, {
                                react: { key: ms.key, text: randomReaction },
                            }, {
                                statusJidList: [ms.key.participant, timoth],
                            });
                            lastReactionTime = Date.now();
                            await delay(2000);
                        }
                    }
                }

                // Auto download status
                if (conf.AUTO_DOWNLOAD_STATUS === "yes") {
                    const idBot = decodeJid(zk.user.id);
                    if (ms.message.extendedTextMessage) {
                        await zk.sendMessage(idBot, { text: ms.message.extendedTextMessage.text }, { quoted: ms });
                    } else if (ms.message.imageMessage) {
                        const stImg = await zk.downloadAndSaveMediaMessage(ms.message.imageMessage);
                        await zk.sendMessage(idBot, { image: { url: stImg }, caption: ms.message.imageMessage.caption }, { quoted: ms });
                    } else if (ms.message.videoMessage) {
                        const stVideo = await zk.downloadAndSaveMediaMessage(ms.message.videoMessage);
                        await zk.sendMessage(idBot, { video: { url: stVideo }, caption: ms.message.videoMessage.caption }, { quoted: ms });
                    }
                }
                return; // status messages don't need further processing
            }

            // ── Auto react to regular messages ─────────────────────────────────
            if (conf.AUTO_REACT === "yes") {
                const now = Date.now();
                if (now - lastReactionTime >= 5000) {
                    const conversationText = ms?.message?.conversation || "";
                    const randomEmoji = getEmojiForSentence(conversationText);
                    try {
                        await zk.sendMessage(origineMessage, { react: { text: randomEmoji, key: ms.key } });
                        lastReactionTime = Date.now();
                    } catch (err) {
                        console.error("Failed to send reaction:", err);
                    }
                    await delay(2000);
                }
            }

            // ── Auto save contacts ─────────────────────────────────────────────
            if (conf.AUTO_SAVE_CONTACTS === "yes" &&
                origineMessage.endsWith("@s.whatsapp.net") &&
                (!store.contacts[origineMessage] || !store.contacts[origineMessage].name)) {
                const assignedName = await sendVCard(origineMessage, "Timnasa-Md");
                store.contacts[origineMessage] = { name: assignedName };
                await zk.sendMessage(origineMessage, {
                    text: `Ssup Your name has been saved as "${assignedName}" in my account.\n\nTIMNASA-MD`
                });
            }

            // ── Core message parsing ───────────────────────────────────────────
            var texte = mtype == "conversation" ? ms.message.conversation
                : mtype == "imageMessage" ? ms.message.imageMessage?.caption
                : mtype == "videoMessage" ? ms.message.videoMessage?.caption
                : mtype == "extendedTextMessage" ? ms.message?.extendedTextMessage?.text
                : mtype == "buttonsResponseMessage" ? ms?.message?.buttonsResponseMessage?.selectedButtonId
                : mtype == "listResponseMessage" ? ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId
                : mtype == "messageContextInfo" ? (ms?.message?.buttonsResponseMessage?.selectedButtonId || ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text)
                : "";

            var idBot = decodeJid(zk.user.id);
            var servBot = idBot.split('@')[0];
            const verifGroupe = origineMessage?.endsWith("@g.us");

            // ─── FIX 5: Only fetch group metadata when actually in a group ─────
            var infosGroupe = verifGroupe ? await zk.groupMetadata(origineMessage) : null;
            var nomGroupe = verifGroupe ? infosGroupe.subject : "";
            var msgRepondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
            var auteurMsgRepondu = decodeJid(ms.message?.extendedTextMessage?.contextInfo?.participant);
            var mr = ms.Message?.extendedTextMessage?.contextInfo?.mentionedJid;
            var utilisateur = mr ? mr : msgRepondu ? auteurMsgRepondu : "";
            var auteurMessage = verifGroupe ? (ms.key.participant ? ms.key.participant : ms.participant) : origineMessage;
            if (ms.key.fromMe) { auteurMessage = idBot; }
            var membreGroupe = verifGroupe ? ms.key.participant : '';

            const { getAllSudoNumbers } = require("./data/sudo");
            const nomAuteurMessage = ms.pushName;
            const abu1 = '255752593977';
            const abu2 = '255620814108';
            const abu3 = "255764182801";
            const abu4 = '255752593977';
            const sudo = await getAllSudoNumbers();
            const superUserNumbers = [servBot, abu1, abu2, abu3, abu4, conf.NUMERO_OWNER].map((s) => s.replace(/[^0-9]/g) + "@s.whatsapp.net");
            const allAllowedNumbers = superUserNumbers.concat(sudo);
            const superUser = allAllowedNumbers.includes(auteurMessage);
            var dev = [abu1, abu2, abu3, abu4].map((t) => t.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);

            function repondre(mes) { zk.sendMessage(origineMessage, { text: mes }, { quoted: ms }); }

            console.log("\tCONSOLE MESSAGES");
            console.log("=========== NEW CONVERSATION ===========");
            if (verifGroupe) console.log("MESSAGE FROM GROUP : " + nomGroupe);
            console.log("MESSAGE SENT BY : [" + nomAuteurMessage + " : " + auteurMessage.split("@s.whatsapp.net")[0] + "]");
            console.log("MESSAGE TYPE : " + mtype);
            console.log("==================TEXT==================");
            console.log(texte);

            var etat = conf.ETAT;
            if (etat == 1) await zk.sendPresenceUpdate("available", origineMessage);
            else if (etat == 2) await zk.sendPresenceUpdate("composing", origineMessage);
            else if (etat == 3) await zk.sendPresenceUpdate("recording", origineMessage);
            else await zk.sendPresenceUpdate("unavailable", origineMessage);

            const mbre = verifGroupe ? infosGroupe.participants : [];
            let admins = verifGroupe ? groupeAdmin(mbre) : [];
            const verifAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
            var verifZokouAdmin = verifGroupe ? admins.includes(idBot) : false;

            const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
            const verifCom = texte ? texte.startsWith(prefixe) : false;
            const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;

            var commandeOptions = {
                superUser, dev, verifGroupe, mbre, membreGroupe, verifAdmin,
                infosGroupe, nomGroupe, auteurMessage, nomAuteurMessage, idBot,
                verifZokouAdmin, prefixe, arg, repondre, mtype, groupeAdmin,
                msgRepondu, auteurMsgRepondu, ms, mybotpic
            };

            // ── Auto-reply ─────────────────────────────────────────────────────
            const messageText = ms.message.conversation || ms.message.extendedTextMessage?.text;
            if (messageText && messageText.match(/^[^\w\s]/) && ms.key.fromMe) {
                const pfx = messageText[0];
                const command = messageText.slice(1).split(" ")[0];
                const newMessage = messageText.slice(pfx.length + command.length).trim();
                if (command === "setautoreply" && newMessage) {
                    auto_reply_message = newMessage;
                    await zk.sendMessage(origineMessage, { text: `Auto-reply updated to:\n"${auto_reply_message}"` });
                    return;
                }
            }
            if (conf.AUTO_REPLY === "yes" && !repliedContacts.has(origineMessage) && !ms.key.fromMe && !origineMessage.includes("@g.us")) {
                await zk.sendMessage(origineMessage, { text: auto_reply_message });
                repliedContacts.add(origineMessage);
            }

            // ── Block dev-only group ───────────────────────────────────────────
            if (!dev && origineMessage == "120363158701337904@g.us") return;

            // ── Level/rank tracking ────────────────────────────────────────────
            if (texte && auteurMessage.endsWith("s.whatsapp.net")) {
                const { ajouterOuMettreAJourUserData } = require("./data/level");
                try { await ajouterOuMettreAJourUserData(auteurMessage); } catch (e) { console.error(e); }
            }

            // ── Mentions ───────────────────────────────────────────────────────
            try {
                if (ms.message[mtype]?.contextInfo?.mentionedJid &&
                    (ms.message[mtype].contextInfo.mentionedJid.includes(idBot) ||
                        ms.message[mtype].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + '@s.whatsapp.net'))) {
                    if (origineMessage == "120363158701337904@g.us") return;
                    if (superUser) return;
                    let mbd = require('./data/mention');
                    let alldata = await mbd.recupererToutesLesValeurs();
                    let data = alldata[0];
                    if (data.status === 'non') return;
                    let msg;
                    if (data.type.toLocaleLowerCase() === 'image') {
                        msg = { image: { url: data.url }, caption: data.message };
                    } else if (data.type.toLocaleLowerCase() === 'video') {
                        msg = { video: { url: data.url }, caption: data.message };
                    } else if (data.type.toLocaleLowerCase() === 'sticker') {
                        let stickerMess = new Sticker(data.url, { pack: conf.NOM_OWNER, type: StickerTypes.FULL, categories: ["🤩", "🎉"], id: "12345", quality: 70, background: "transparent" });
                        msg = { sticker: await stickerMess.toBuffer() };
                    } else if (data.type.toLocaleLowerCase() === 'audio') {
                        msg = { audio: { url: data.url }, mimetype: 'audio/mp4' };
                    }
                    zk.sendMessage(origineMessage, msg, { quoted: ms });
                }
            } catch (error) {}

            // ── Anti-link ──────────────────────────────────────────────────────
            try {
                const yes = await verifierEtatJid(origineMessage);
                if (texte && texte.includes('https://') && verifGroupe && yes) {
                    const verifZokAdmin = admins.includes(idBot);
                    if (superUser || verifAdmin || !verifZokAdmin) return;
                    const key = { remoteJid: origineMessage, fromMe: false, id: ms.key.id, participant: auteurMessage };
                    var txt = "lien detected, \n";
                    const gifLink = "https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif";
                    var sticker = new Sticker(gifLink, { pack: 'Cyberion', author: conf.OWNER_NAME, type: StickerTypes.FULL, categories: ['🤩', '🎉'], id: '12345', quality: 50, background: '#000000' });
                    await sticker.toFile("st1.webp");
                    var action = await recupererActionJid(origineMessage);
                    if (action === 'remove') {
                        txt += `message deleted \n @${auteurMessage.split("@")[0]} removed from group.`;
                        await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") });
                        (0, baileys_1.delay)(800);
                        await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                        try { await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove"); } catch (e) { console.log("antilien " + e); }
                        await zk.sendMessage(origineMessage, { delete: key });
                        await fs.unlink("st1.webp");
                    } else if (action === 'delete') {
                        txt += `message deleted \n @${auteurMessage.split("@")[0]} avoid sending link.`;
                        await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                        await zk.sendMessage(origineMessage, { delete: key });
                        await fs.unlink("st1.webp");
                    } else if (action === 'warn') {
                        const { getWarnCountByJID, ajouterUtilisateurAvecWarnCount } = require('./data/warn');
                        let warn = await getWarnCountByJID(auteurMessage);
                        let warnlimit = conf.WARN_COUNT;
                        if (warn >= warnlimit) {
                            await zk.sendMessage(origineMessage, { text: `link detected, you will be removed for reaching warn-limit`, mentions: [auteurMessage] }, { quoted: ms });
                            await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                            await zk.sendMessage(origineMessage, { delete: key });
                        } else {
                            var rest = warnlimit - warn;
                            await ajouterUtilisateurAvecWarnCount(auteurMessage);
                            await zk.sendMessage(origineMessage, { text: `Link detected, warn count upgraded; ${rest} remaining.`, mentions: [auteurMessage] }, { quoted: ms });
                            await zk.sendMessage(origineMessage, { delete: key });
                        }
                    }
                }
            } catch (e) { console.log("data err " + e); }

            // ── Anti-bot ───────────────────────────────────────────────────────
            try {
                const botMsg = ms.key?.id?.startsWith('BAES') && ms.key?.id?.length === 16;
                const baileysMsg = ms.key?.id?.startsWith('BAE5') && ms.key?.id?.length === 16;
                if (botMsg || baileysMsg) {
                    if (mtype === 'reactionMessage') return;
                    const antibotactiver = await atbverifierEtatJid(origineMessage);
                    if (!antibotactiver) return;
                    if (verifAdmin || auteurMessage === idBot) return;
                    const key = { remoteJid: origineMessage, fromMe: false, id: ms.key.id, participant: auteurMessage };
                    var txt = "bot detected, \n";
                    const gifLink = "https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif";
                    var sticker = new Sticker(gifLink, { pack: 'FredieTech', author: conf.OWNER_NAME, type: StickerTypes.FULL, categories: ['🤩', '🎉'], id: '12345', quality: 50, background: '#000000' });
                    await sticker.toFile("st1.webp");
                    var action = await atbrecupererActionJid(origineMessage);
                    if (action === 'remove') {
                        txt += `message deleted \n @${auteurMessage.split("@")[0]} removed from group.`;
                        await zk.sendMessage(origineMessage, { sticker: fs.readFileSync("st1.webp") });
                        (0, baileys_1.delay)(800);
                        await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                        try { await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove"); } catch (e) { console.log("antibot " + e); }
                        await zk.sendMessage(origineMessage, { delete: key });
                        await fs.unlink("st1.webp");
                    } else if (action === 'delete') {
                        txt += `message deleted \n @${auteurMessage.split("@")[0]} Avoid sending bot messages.`;
                        await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });
                        await zk.sendMessage(origineMessage, { delete: key });
                        await fs.unlink("st1.webp");
                    } else if (action === 'warn') {
                        const { getWarnCountByJID, ajouterUtilisateurAvecWarnCount } = require('./data/warn');
                        let warn = await getWarnCountByJID(auteurMessage);
                        let warnlimit = conf.WARN_COUNT;
                        if (warn >= warnlimit) {
                            await zk.sendMessage(origineMessage, { text: `bot detected; removed for reaching warn-limit`, mentions: [auteurMessage] }, { quoted: ms });
                            await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
                            await zk.sendMessage(origineMessage, { delete: key });
                        } else {
                            var rest = warnlimit - warn;
                            await ajouterUtilisateurAvecWarnCount(auteurMessage);
                            await zk.sendMessage(origineMessage, { text: `bot detected, warn count upgraded; ${rest} remaining.`, mentions: [auteurMessage] }, { quoted: ms });
                            await zk.sendMessage(origineMessage, { delete: key });
                        }
                    }
                }
            } catch (er) { console.log('antibot err: ' + er); }

            // ── Command execution ──────────────────────────────────────────────
            if (verifCom) {
                const cd = evt.cm.find((timoth) => timoth.nomCom === com);
                if (cd) {
                    try {
                        if ((conf.MODE).toLocaleLowerCase() != 'yes' && !superUser) return;
                        if (!superUser && origineMessage === auteurMessage && conf.PM_PERMIT === "yes") { repondre("You don't have access to commands here"); return; }
                        if (!superUser && verifGroupe) {
                            if (await isGroupBanned(origineMessage)) return;
                        }
                        if (!verifAdmin && verifGroupe) {
                            if (await isGroupOnlyAdmin(origineMessage)) return;
                        }
                        if (!superUser) {
                            if (await isUserBanned(auteurMessage)) { repondre("You are banned from bot commands"); return; }
                        }
                        reagir(origineMessage, zk, ms, cd.reaction);
                        cd.fonction(origineMessage, zk, commandeOptions);
                    } catch (e) {
                        console.log("😡😡 " + e);
                        zk.sendMessage(origineMessage, { text: "😡😡 " + e }, { quoted: ms });
                    }
                }
            }
        }); // ← END of single consolidated listener

        // ─── Group participant updates ─────────────────────────────────────────
        const { recupevents } = require('./data/welcome');

        zk.ev.on('group-participants.update', async (group) => {
            console.log(group);
            let ppgroup;
            try { ppgroup = await zk.profilePictureUrl(group.id, 'image'); }
            catch { ppgroup = 'https://files.catbox.moe/7irwqn.jpeg'; }
            try {
                const metadata = await zk.groupMetadata(group.id);
                if (group.action == 'add' && (await recupevents(group.id, "welcome") == 'on')) {
                    let msg = `👋 Hello\n`;
                    let membres = group.participants;
                    for (let membre of membres) { msg += ` *@${membre.split("@")[0]}* Welcome to Our Official Group,`; }
                    msg += `You might want to read the group Description to avoid getting removed...`;
                    zk.sendMessage(group.id, { image: { url: ppgroup }, caption: msg, mentions: membres });
                } else if (group.action == 'remove' && (await recupevents(group.id, "goodbye") == 'on')) {
                    let msg = `one or some member(s) left group;\n`;
                    let membres = group.participants;
                    for (let membre of membres) { msg += `@${membre.split("@")[0]}\n`; }
                    zk.sendMessage(group.id, { text: msg, mentions: membres });
                } else if (group.action == 'promote' && (await recupevents(group.id, "antipromote") == 'on')) {
                    if (group.author == metadata.owner || group.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || group.author == decodeJid(zk.user.id) || group.author == group.participants[0]) return;
                    await zk.groupParticipantsUpdate(group.id, [group.author, group.participants[0]], "demote");
                    zk.sendMessage(group.id, { text: `@${group.author.split("@")[0]} violated anti-promotion rule, both demoted.`, mentions: [group.author, group.participants[0]] });
                } else if (group.action == 'demote' && (await recupevents(group.id, "antidemote") == 'on')) {
                    if (group.author == metadata.owner || group.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || group.author == decodeJid(zk.user.id) || group.author == group.participants[0]) return;
                    await zk.groupParticipantsUpdate(group.id, [group.author], "demote");
                    await zk.groupParticipantsUpdate(group.id, [group.participants[0]], "promote");
                    zk.sendMessage(group.id, { text: `@${group.author.split("@")[0]} violated anti-demotion rule.`, mentions: [group.author, group.participants[0]] });
                }
            } catch (e) { console.error(e); }
        });

        // ─── Cron setup ────────────────────────────────────────────────────────
        async function activateCrons() {
            const cron = require('node-cron');
            const { getCron } = require('./data/cron');
            let crons = await getCron();
            if (crons.length > 0) {
                for (let i = 0; i < crons.length; i++) {
                    if (crons[i].mute_at != null) {
                        let set = crons[i].mute_at.split(':');
                        cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {
                            await zk.groupSettingUpdate(crons[i].group_id, 'announcement');
                            zk.sendMessage(crons[i].group_id, { image: { url: './media/chrono.webp' }, caption: "Hello, it's time to close the group; sayonara." });
                        }, { timezone: "Africa/Nairobi" });
                    }
                    if (crons[i].unmute_at != null) {
                        let set = crons[i].unmute_at.split(':');
                        cron.schedule(`${set[1]} ${set[0]} * * *`, async () => {
                            await zk.groupSettingUpdate(crons[i].group_id, 'not_announcement');
                            zk.sendMessage(crons[i].group_id, { image: { url: './media/chrono.webp' }, caption: "Good morning; It's time to open the group." });
                        }, { timezone: "Africa/Nairobi" });
                    }
                }
            }
        }

        // ─── Connection update ─────────────────────────────────────────────────
        zk.ev.on("connection.update", async (con) => {
            const { lastDisconnect, connection } = con;
            if (connection === "connecting") {
                console.log("ℹ️ Timnasa is connecting...");
            } else if (connection === 'open') {
                console.log("✅ Timnasa Connected to WhatsApp! ☺️");
                await (0, baileys_1.delay)(500);
                console.log("Timnasa is Online 🕸\n");
                console.log("Loading Timnasa Commands ...\n");
                fs.readdirSync(__dirname + "/fez").forEach((fichier) => {
                    if (path.extname(fichier).toLowerCase() == ".js") {
                        try { require(__dirname + "/fez/" + fichier); console.log(fichier + " Installed ✔️"); }
                        catch (e) { console.log(`${fichier} failed: ${e}`); }
                        (0, baileys_1.delay)(300);
                    }
                });
                var md = (conf.MODE).toLocaleLowerCase() === "yes" ? "public" : (conf.MODE).toLocaleLowerCase() === "no" ? "private" : "undefined";
                console.log("Commands Installation Completed ✅");
                await activateCrons();
                if ((conf.DP).toLowerCase() === 'yes') {
                    let cmsg = `\n   _BOT🦚CONNECTED_\n\n║ Prefix: [ ${prefixe} ]\n║ Mode: ${md}\n║ Model: TIMNASA TMD\n║ Owner: Timoth\n╚═════ ❖ •✦\n\n*🪀Follow my channel for updates*\n\n> https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f\n`;
                    await zk.sendMessage(zk.user.id, { text: cmsg });
                }
            } else if (connection == "close") {
                let raisonDeconnexion = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
                if (raisonDeconnexion === baileys_1.DisconnectReason.badSession) {
                    console.log('Session id error, rescan again...');
                } else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionClosed) {
                    console.log('Connection closed, reconnecting...');
                    main();
                } else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionLost) {
                    console.log('Connection lost, reconnecting...');
                    main();
                } else if (raisonDeconnexion === baileys_1.DisconnectReason?.connectionReplaced) {
                    console.log('Connection replaced, another session is open.');
                } else if (raisonDeconnexion === baileys_1.DisconnectReason.loggedOut) {
                    console.log('Logged out, please rescan QR code.');
                } else if (raisonDeconnexion === baileys_1.DisconnectReason.restartRequired) {
                    console.log('Restart required...');
                    main();
                } else {
                    console.log('Restarting on error:', raisonDeconnexion);
                    const { exec } = require("child_process");
                    exec("pm2 restart all");
                }
                main();
            }
        });

        zk.ev.on("creds.update", saveCreds);

        // ─── Utility functions ─────────────────────────────────────────────────
        zk.downloadAndSaveMediaMessage = async (message, filename = '', attachExtension = true) => {
            let quoted = message.msg ? message.msg : message;
            let mime = (message.msg || message).mimetype || '';
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await (0, baileys_1.downloadContentFromMessage)(quoted, messageType);
            let buffer = Buffer.from([]);
            for await (const chunk of stream) { buffer = Buffer.concat([buffer, chunk]); }
            let type = await FileType.fromBuffer(buffer);
            let trueFileName = './' + filename + '.' + type.ext;
            await fs.writeFileSync(trueFileName, buffer);
            return trueFileName;
        };

        zk.awaitForMessage = async (options = {}) => {
            return new Promise((resolve, reject) => {
                if (typeof options !== 'object') reject(new Error('Options must be an object'));
                if (typeof options.sender !== 'string') reject(new Error('Sender must be a string'));
                if (typeof options.chatJid !== 'string') reject(new Error('ChatJid must be a string'));
                if (options.timeout && typeof options.timeout !== 'number') reject(new Error('Timeout must be a number'));
                if (options.filter && typeof options.filter !== 'function') reject(new Error('Filter must be a function'));
                const timeout = options?.timeout || undefined;
                const filter = options?.filter || (() => true);
                let interval = undefined;
                let listener = (data) => {
                    let { type, messages } = data;
                    if (type == "notify") {
                        for (let message of messages) {
                            const fromMe = message.key.fromMe;
                            const chatId = message.key.remoteJid;
                            const isGroup = chatId.endsWith('@g.us');
                            const isStatus = chatId == 'status@broadcast';
                            const sender = fromMe ? zk.user.id.replace(/:.*@/g, '@') : (isGroup || isStatus) ? message.key.participant.replace(/:.*@/g, '@') : chatId;
                            if (sender == options.sender && chatId == options.chatJid && filter(message)) {
                                zk.ev.off('messages.upsert', listener);
                                clearTimeout(interval);
                                resolve(message);
                            }
                        }
                    }
                };
                zk.ev.on('messages.upsert', listener);
                if (timeout) {
                    interval = setTimeout(() => {
                        zk.ev.off('messages.upsert', listener);
                        reject(new Error('Timeout'));
                    }, timeout);
                }
            });
        };

        return zk;
    }

    let fichier = require.resolve(__filename);
    fs.watchFile(fichier, () => {
        fs.unwatchFile(fichier);
        console.log(`mise à jour ${__filename}`);
        delete require.cache[fichier];
        require(fichier);
    });
    main();
}, 5000);
