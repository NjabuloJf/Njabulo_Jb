const { fana } = require('../njabulo/fana');
const { attribuerUnevaleur } = require('../bdd/welcome');
const moment = require("moment-timezone");



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

moment.tz.setDefault("Africa/Botswana");
  const temps = moment().format('HH:mm:ss');
  const date = moment().format('DD/MM/YYYY');

async function sendFormattedMessage(zk, chatId, text, ms) {
   
    await zk.sendMessage(chatId, {
      interactiveMessage: {
        header: {
          documentMessage: {
            url: randomNjabulourl,
            mimetype: 'image/jpeg',
            fileSha256: '',
            fileLength: '',
            pageCount: 0,
            mediaKey: '',
            fileName: 'NJABULOJB',
            fileEncSha256: '',
            directPath: '',
            mediaKeyTimestamp: '',
            jpegThumbnail: '',
          },
          hasMediaAttachment: true,
        },
        image: { url: randomNjabulourl },
       header: text,
        footer: `Pσɯҽɾҽԃ Ⴆყ njabulo`,
        nativeFlowMessage: {
          buttons: [
            {
              name: 'cta_url',
              buttonParamsJson: JSON.stringify({
                display_text: 'Wa Channel',
                url: 'https://whatsapp.com',
                merchant_url: 'https://whatsapp.com',
              }),
            },
            {
              name: 'single_select',
              buttonParamsJson: JSON.stringify({
                title: 'View Single',
                sections: [
                  {
                    title: '⌜system⌟',
                    highlight_label: 'ꗃ',
                    rows: [
                      { title: 'system ping', description: 'Check bot response time', id: `ping` },
                      { title: 'system repository', description: 'Get bot repository link', id: `repo` },
                    ],
                  },
                  {
                    title: 'settings',
                    highlight_label: 'ꗄ',
                    rows: [
                      { title: 'system setting', description: 'Show bot settings', id: `settings` },
                      { title: 'system owner', description: 'Get message information', id: `support` },
                    ],
                  },
                ],
              }),
            },
          ],
          messageParamsJson: JSON.stringify({
            limited_time_offer: {
              text: 'ɳʝαႦυʅσ ʝႦ',
              url: 'https://github.com',
              copy_code: '✘ð',
              expiration_time: moment().add(1, 'hour').valueOf(),
            },
            bottom_sheet: {
              in_thread_buttons_limit: 2,
              divider_indices: [1, 2],
              list_title: 'Select Command',
              button_title: 'Njabulo Jb',
            },
          }),
        },
      },
      contextInfo: {
        externalAdReply: {
          title: `⏰ message menu`,
          mediaType: 1,
          previewType: 0,
          thumbnailUrl: randomNjabulourl,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: ms });
}

async function events(nomCom) {
  fana({
    nomCom: nomCom,
    categorie: 'Group'
  }, async (dest, zk, commandeOptions) => {
    const { ms, arg, superUser, verifAdmin } = commandeOptions;

    if (verifAdmin || superUser) {
      if (!arg[0] || arg.join(' ') === ' ') {
        await sendFormattedMessage(zk, dest, nomCom + ' ' + 'on to active and ' + ' ' + nomCom + ' ' + 'off to put off', ms);
      } else {
        if (arg[0] === 'on' || arg[0] === 'off') {
          await attribuerUnevaleur(dest, nomCom, arg[0]);
          await sendFormattedMessage(zk, dest, nomCom + " is actualised on " + arg[0], ms);
        } else {
          await sendFormattedMessage(zk, dest, 'on for active and off for desactive', ms);
        }
      }
    } else {
      await sendFormattedMessage(zk, dest, 'You can\'t use this commands', ms);
    }
  });
}

// Appel de la fonction events pour les valeurs 'welcome' et 'goodbye'
events('welcome');
events('goodbye');
events('antipromote');
events('antidemote');
