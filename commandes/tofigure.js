const { fana } = require('../njabulo/fana');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const conf = require(__dirname + '/../set');

// Function to upload image to qu.ax and get a URL
async function uploadImage(buffer) {
  try {
    const tempFilePath = path.join(__dirname, `temp_${Date.now()}.jpg`);
    fs.writeFileSync(tempFilePath, buffer);

    const form = new FormData();
    form.append('files[]', fs.createReadStream(tempFilePath));

    const response = await axios.post('https://qu.ax/upload.php', form, {
      headers: form.getHeaders(),
    });

    if (response.data && response.data.files && response.data.files[0] && response.data.files[0].url) {
      const link = response.data.files[0].url;
      fs.unlinkSync(tempFilePath);
      return { url: link };
    } else {
      fs.unlinkSync(tempFilePath);
      return { error: 'Failed to upload image' };
    }
  } catch (error) {
    return { error: `Upload error: ${error.message}` };
  }
}

fana({
  nomCom: "tofigure",
  aliases: ["figure", "tofigur"],
  categorie: "Images",
  reaction: "🎨"
}, async (dest, zk, commandeOptions) => {
  try {
    const { repondre, ms, arg, quoted } = commandeOptions;

    let imageBuffer;
    try {
      imageBuffer = await ms.downloadMediaMessage(ms);
    } catch {
      try {
        imageBuffer = await ms.downloadMediaMessage(quoted);
      } catch {
        return repondre('Please send an image with this command.');
      }
    }

    await repondre('Creating your figure-style image... Please wait');

    // Step 1: Limit size to 10MB
    if (imageBuffer.length > 10 * 1024 * 1024) {
      return repondre('The image is too large (max 10MB).');
    }

    // Step 2: Upload to get public URL
    const imageUpload = await uploadImage(imageBuffer);
    if (imageUpload.error) {
      return repondre(imageUpload.error);
    }
    const imageUrl = imageUpload.url;

    // Step 3: Call the tofigur API
    const apiURL = `https://api.fikmydomainsz.xyz/imagecreator/tofigur?url=${encodeURIComponent(imageUrl)}`;
    const response = await axios.get(apiURL);

    // Step 4: Validate API response
    if (!response.data || !response.data.status || !response.data.result) {
      return repondre('Invalid response from API');
    }

    const resultUrl = response.data.result;

    // Step 5: Download the generated figure image
    const figureResponse = await axios.get(resultUrl, { responseType: 'arraybuffer' });
    if (!figureResponse.data) {
      return repondre('Failed to download the generated image');
    }
    const figureBuffer = figureResponse.data;

    // Step 6: Send back the image
    await zk.sendMessage(
      dest,
      {
        image: Buffer.from(figureBuffer),
        caption: 'Your image has been turned into a figure-style art!',
      },
      { quoted: ms }
    );
  } catch (err) {
    await repondre(`Error while generating figure image: ${err.message}`);
  }
});
