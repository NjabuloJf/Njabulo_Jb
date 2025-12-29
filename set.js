const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'zokk',

    //process.env.PREFIX//
    PREFIXE: process.env.PREFIX || ".",

    //process.env.OWNER_NAME//
    OWNER_NAME: process.env.OWNER_NAME || "Njabulo Jb",
   
    //process.env.NUMERO_OWNER//
    NUMERO_OWNER : process.env.NUMERO_OWNER || "26777821911",              
   
    //process.env.AUTO_READ_STATUS//             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",

    //process.env.AUTO_BIO//
    AUTO_BIO : process.env.AUTO_BIO || 'yes',
   
    //process.env.AUTOREACT_STATUS//             
    AUTOREACT_STATUS : process.env.AUTOREACT_STATUS || 'yes',
    
    //process.env.AUTO_DOWNLOAD_STATUS//            
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    
    //process.env.BOT_NAME//            
    BOT : process.env.BOT_NAME || 'Njabulo-Jb',
    
    //process.env.BOT_MENU_LINKS//             
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/mh36c7.jpg',

    //GURL: process.env.GURL//
     GURL: process.env.GURL  || 'https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u',
  
    //process.env.PUBLIC_MODE//             
    MODE: process.env.PUBLIC_MODE || "yes",
    
    //process.env.PM_PERMIT//             
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    
    //process.env.HEROKU_APP_NAME//             
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    
    //process.env.HEROKU_APY_KEY//             
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    
    //process.env.WARN_COUNT//            
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    
    //process.env.PRESENCE//             
    ETAT : process.env.PRESENCE || '',
    
    //process.env.PM_CHATBOT//             
    CHATBOT : process.env.PM_CHATBOT || 'no',
    
    //process.env.STARTING_BOT_MESSAGE//             
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    
    //process.env.ANTI_DELETE_MESSAGE//             
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
})



