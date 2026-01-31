

const { fana } = require("../njabulo/fana");
const axios = require('axios');

fana({ 
  nomCom: "apk", 
  aliases: ["store", "plastore", "download"], 
  categorie: "download", 
  reaction: "🗃️" 
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  if (!arg[0]) {
    await zk.sendMessage(dest, { text: '📌 Usage: .apk <app name>' });
    return;
  }

  const appName = arg.join(' ');
  try {
    await zk.sendMessage(dest, { react: { text: '⏳', key: ms.key } });

    const response = await axios.get(`https://api.nexoracle.com/downloader/apk?q=${encodeURIComponent(appName)}&apikey=free_key@maher_apis`);
    const data = response.data;

    if (data.status !== 200 || !data.result) {
      await zk.sendMessage(dest, { text: '❌ Unable to find the APK.' });
      return;
    }

    const { name, dllink, icon, size, package: pkg, lastup } = data.result;
    await zk.sendMessage(dest, {
      image: { url: icon },
      caption: `*Loading ${name}...*\n*Size:* ${size}\n*Last Update:* ${lastup}\n*Owner:* njabulo jb`,
      buttons: [
        {
          buttonId: 'select_apk',
          buttonText: { displayText: 'SELECT' },
          type: 1,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'APK DOWNLOADER',
              sections: [
                {
                  title: `DOWNLOAD OPTIONS`,
                  highlight_label: 'Select Action',
                  rows: [
                    {
                      title: '📥 DOWNLOAD APK',
                      description: 'Download APK file',
                      id: 'apk'
                    },
                    {
                      title: '🔍 SEARCH APK',
                      description: 'Search for APK files',
                      id: 'searchapk'
                    },
                    {
                      title: '📈 TOP APK',
                      description: 'View top APK downloads',
                      id: 'topapk'
                    },
                    {
                      title: '📚 APK CATEGORIES',
                      description: 'Browse APK categories',
                      id: 'apkcat'
                    },
                    {
                      title: 'ℹ️ ABOUT APK',
                      description: 'Learn about APK files',
                      id: 'aboutapk'
                    }
                  ]
                }
              ]
            })
          }
        }
      ]
    });

    await zk.sendMessage(dest, {
      document: { url: dllink },
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${name}.apk`,
      caption: `*APK DOWNLOADER*\n\n*Name:* ${name}\n*Size:* ${size}\n*Package:* ${pkg}\n*Last Update:* ${lastup}\n\n*Owner:* njabulo jb`,
      contextInfo: {
        externalAdReply: {
          title: "APK DOWNLOADER",
          mediaType: 1,
          previewType: 0,
          thumbnailUrl: icon,
          renderLargerThumbnail: true,
        },
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363399999197102@newsletter",
          newsletterName: "APK DOWNLOADER",
          serverMessageId: 143,
        },
        forwardingScore: 999,
      },
    });

    await zk.sendMessage(dest, { react: { text: '✅', key: ms.key } });
  } catch (error) {
    console.error(error);
    await zk.sendMessage(dest, { text: `❌ Error: ${error.message}` });
    await zk.sendMessage(dest, { react: { text: '❌', key: ms.key } });
  }
});


