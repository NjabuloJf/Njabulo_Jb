
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');

const DATABASE_URL = 'postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9';

module.exports = {
  session: process.env.SESSION_ID || 'zokk',
  PREFIXE: process.env.PREFIX || ".",
  OWNER_NAME: process.env.OWNER_NAME || "Njabulo Jb",
  NUMERO_OWNER : process.env.NUMERO_OWNER || "26777821911",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
  AUTO_BIO : process.env.AUTO_BIO || 'yes',
  AUTOREACT_STATUS : process.env.AUTOREACT_STATUS || 'yes',
  AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
  BOT : process.env.BOT_NAME || 'Njabulo-Jb',
  URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/mh36c7.jpg',
  GURL: process.env.GURL || 'https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u',
  MODE: process.env.PUBLIC_MODE || "yes",
  PM_PERMIT: process.env.PM_PERMIT || 'yes',
  HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
  HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
  WARN_COUNT : process.env.WARN_COUNT || '3' ,
  ETAT : process.env.PRESENCE || '',
  CHATBOT : process.env.PM_CHATBOT || 'no',
  DP : process.env.STARTING_BOT_MESSAGE || "yes",
  ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
  DATABASE_URL,
  DATABASE: DATABASE_URL,
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
  fs.unwatchFile(fichier);
  console.log(`mise à jour ${__filename}`);
  delete require.cache[fichier];
  require(fichier);
})
