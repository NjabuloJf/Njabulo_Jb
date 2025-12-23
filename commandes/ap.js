
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

