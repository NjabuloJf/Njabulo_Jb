

const { fana } = require("../njabulo/fana");
const fs = require('fs-extra');
const conf = require('../set');
const { default: axios } = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const gis = require('g-i-s');

fana({ 'nomCom': 'apk1', 'aliases': ['app', 'playstore'], 'reaction': '✔', 'categorie': 'Download' }, async (groupId, client, context) => {
  const { repondre, arg, ms } = context;
  try {
    // Check if app name is provided
    const appName = arg.join(" ");
    if (!appName) {
      return repondre("Please provide an app name.");
    }
    // Fetch app search results from the Aptoide API
    const searchResponse = await axios.get(`https://api.aptoide.com/api/7/apps/search?query=${encodeURIComponent(appName)}`);
    const searchData = searchResponse.data;
    // Check if any results were found
    if (!searchData.datalist || searchData.datalist.list.length === 0) {
      return repondre("No app found with that name, please try again.");
    }
    // Get the first result
    const app = searchData.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2);
    // Send the APK file to the group
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
    // Catch any errors and notify the user
    console.error("Error during APK download process:", error);
    repondre("APK download failed. Please try again later.");
  }
});










/*
const axios = require("axios");
const { fana } = require(__dirname + "/../njabulo/fana");

fana({
  nomCom: "apk",
  categorie: "download",
  react: "🥺"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, args } = commandeOptions;
  const q = args.join(" ");
  
  try {
    await zk.react(dest, "🥺", ms.key);

    if (!q) {
      return repondre("*IF YOU WANT TO DOWNLOAD ANY APP 🥺* \n *THEN TYPE LIKE THIS 😇* \n\n *APK ❮YOUR APP NAME❯* \n\n *YOUR APPLICATION WILL BE DOWNLOADED AND SENT HERE*");
    }

    await repondre("*YOUR APK IS DOWNLOADING 🥺 WHEN THE DOWNLOAD IS COMPLETE IT WILL BE SENT HERE 😇* \n *PLEASE WAIT A LITTLE...☺️*");

    const apiUrl = `https://api.aptoide.com/api/7/apps/search?query=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.datalist || !data.datalist.list.length) {
      return repondre("*APK NOT FOUND SORRY 😔*");
    }

    const app = data.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2);

    await zk.sendMessage(dest, { document: { url: app.file.path }, fileName: `${app.name}.apk`, mimetype: "application/vnd.android.package-archive", caption: `*👑 APK NAME:* ${app.name}\n*👑 SIZE:* ${appSize} MB\n\n*DML-MIN BOT*` }, { quoted: ms });

    await zk.react(dest, "☺️", ms.key);
  } catch (error) {
    console.error("APK download error:", error);
    repondre("*😔 APK download failed, please try again!*");
    await zk.react(dest, "😔", ms.key);
  }
});
*/
