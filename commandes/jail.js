const { ezra } = require("../fredi/ezra");
const canvacord = require("canvacord");
const { uploadImageToImgur } = require("../fredi/imgur")

// Generic function to create a canvacord order function
createCanvacordCommand(commandName, canvacordFunction) {
  ezra({
    nomCom: commandName,
    categorie: "Image-Edit",
    reaction: "🎉"
  }, async (origineMessage, zk, commandeOptions) => {
    const { ms, msgRepondu, auteurMsgRepondu } = commandeOptions;
    const clientId = 'b40a1820d63cd4e';
    try {
      let img;
      if (msgRepondu) {
        if (msgRepondu.imageMessage) {
          const image = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage)
          img = await uploadImageToImgur(image, clientId)
        } else {
          img = await zk.profilePictureUrl(auteurMsgRepondu, 'image');
        }
      } else {
        img = "https://i.pinimg.com/564x/84/09/12/840912dd744e6662ab211b8070b5d84c.jpg";
      }
      const result = await canvacordFunction(img);
      const cards = [
        {
          header: {
            title: `${commandName} Image`,
            hasMediaAttachment: true,
            imageMessage: (await generateWAMessageContent({ image: result }, { upload: zk.waUploadToServer })).imageMessage,
          },
          body: {
            text: `Check out this ${commandName} image!`,
          },
          footer: {
            text: "LUCKY MD",
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "Copy Link",
                  copy_code: img,
                }),
              },
            ],
          },
        },
      ];
      const message = generateWAMessageFromContent(
        origineMessage,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: {
                body: {
                  text: `${commandName} Image`
                },
                footer: {
                  text: "Click to view"
                },
                carouselMessage: {
                  cards
                },
              },
            },
          },
        },
        { quoted: ms }
      );
      await zk.relayMessage(origineMessage, message.message, { messageId: message.key.id });
    } catch (error) {
      console.error(`Error when ordering "${commandName}":`, error);
    }
  });
}

// Créer des commandes avec différentes fonctions canvacord
createCanvacordCommand("shit", canvacord.Canvacord.shit);
createCanvacordCommand("wasted", canvacord.Canvacord.wasted);
createCanvacordCommand("wanted", canvacord.Canvacord.wanted);
createCanvacordCommand("trigger", canvacord.Canvacord.trigger);
createCanvacordCommand("trash", canvacord.Canvacord.trash);
createCanvacordCommand("rip", canvacord.Canvacord.rip);
createCanvacordCommand("sepia", canvacord.Canvacord.sepia);
createCanvacordCommand("rainbow", canvacord.Canvacord.rainbow);
createCanvacordCommand("hitler", canvacord.Canvacord.hitler);
createCanvacordCommand("invert", canvacord.Canvacord.invert);
createCanvacordCommand("jail", canvacord.Canvacord.jail);
createCanvacordCommand("affect", canvacord.Canvacord.affect);
createCanvacordCommand("beautiful", canvacord.Canvacord.beautiful);
createCanvacordCommand("blur", canvacord.Canvacord.blur);
createCanvacordCommand("circle", canvacord.Canvacord.circle);
createCanvacordCommand("facepalm", canvacord.Canvacord.facepalm);
createCanvacordCommand("greyscale", canvacord.Canvacord.greyscale);
createCanvacordCommand("jokes", canvacord.Canvacord.jokeOverHead);

