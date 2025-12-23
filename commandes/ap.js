

const { fana } = require("../njabulo/fana");
const fs = require('fs-extra');
const conf = require('../set');
const { default: axios } = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const gis = require('g-i-s');

fana({ 'nomCom': 'apk1', 'aliases': ['app', 'playstore'], 'reaction': '✔', 'categorie': 'Download' }, async (groupId, client, context) => {
  const { repondre, arg, ms } = context;
  try {
    const appName = arg.join(" ");
    if (!appName) {
      return repondre("Please provide an app name.");
    }
    const apiUrl = `https://api.aptoide.com/api/7/apps/search?query=${encodeURIComponent(appName)}`;
    const response = await axios.get(apiUrl);
    const data = response.data;
    if (!data.datalist || data.datalist.list.length === 0) {
      return repondre("No app found with that name, please try again.");
    }
    const app = data.datalist.list[0];
    if (!app.file || !app.file.path) {
      return repondre("No download link found for this app.");
    }
    const appSize = (app.size / 1048576).toFixed(2);
    await client.sendMessage(
      groupId,
      {
        document: { url: app.file.path },
        fileName: `${app.name}.apk`,
        mimetype: "application/vnd.android.package-archive",
        caption: `*👑 APK NAME:* ${app.name}\n*👑 SIZE:* ${appSize} MB\n\n*DML-MIN BOT*`
      },
      { quoted: ms }
    );
  } catch (error) {
    console.error("Error:", error);
    repondre(`Error: ${error.message}. Try checking the app name or try again later.`);
  }
}); 
