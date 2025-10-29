const { fana } = require('../njabulo/fana');
const axios = require('axios');
const FormData = require('form-data');
const conf = require(__dirname + '/../set');

fana({
  nomCom: "tofigure",
  aliases: ["figure", "tofigur"],
  categorie: "Images",
  reaction: "🎨"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg, m } = commandeOptions;

  try {
    // Choose between quoted or direct message
    const quoted = m.quoted ? m.quoted : m;
    const quotedMime = quoted.mimetype || '';

    if (!/image/.test(quotedMime)) {
      return repondre('Please reply to or send an image with this command.');
    }

    await repondre('Creating your figure-style image... Please wait');

    // Step 1: Download the image buffer
    const media = await quoted.download();
    if (!media) {
      return repondre('Failed to download the image. Try again.');
    }

    // Step 2: Limit size to 10MB
    if (media.length > 10 * 1024 * 1024) {
      return repondre('The image is too large (max 10MB).');
    }

    // Step 3: Upload to get public URL
    const uploadImage = async (buffer) => {
      const form = new FormData();
      form.append('files[]', buffer);
      try {
        const response = await axios.post('https://qu.ax/upload.php', form, {
          headers: form.getHeaders(),
        });
        return response.data.files[0].url;
      } catch (error) {
        throw new Error(`Upload error: ${error.message}`);
      }
    };

    const imageUrl = await uploadImage(media);

    // Step 4: Call the tofigur API
    const apiURL = `https://api.fikmydomainsz.xyz/imagecreator/tofigur?url=${encodeURIComponent(imageUrl)}`;
    try {
      const response = await axios.get(apiURL);
      if (!response.data || !response.data.status || !response.data.result) {
        throw new Error('Invalid response from API');
      }
      const resultUrl = response.data.result;

      // Step 5: Download the generated figure image
      try {
        const figureBuffer = (await axios.get(resultUrl, { responseType: 'arraybuffer' })).data;

        // Step 6: Send back the image
        await zk.sendMessage(
          dest,
          {
            image: Buffer.from(figureBuffer),
            caption: 'Your image has been turned into a figure-style art!',
          },
          { quoted: ms }
        );
      } catch (error) {
        throw new Error(`Error downloading or sending figure image: ${error.message}`);
      }
    } catch (error) {
      throw new Error(`API error: ${error.message}`);
    }
  } catch (err) {
    repondre(`Error while generating figure image: ${err.message}`);
  }
});
