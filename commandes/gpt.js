const { fana } = require("../njabulo/fana");
const axios = require("axios");

fana({ 
  nomCom: "gp", 
  reaction: "🤖", 
  categorie: "AI", 
  aliases: [], 
}, async (chatId, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const text = arg.join(" ").trim();
  if (!text) return repondre("Where is your prompt? You managed to type the command but forgot the question. Amazing.");

  try {
    await zk.sendMessage(chatId, { react: { text: 'thinking' } });
    const statusMsg = await repondre("Thinking... Try not to break anything else while you wait.");
    const apiUrl = `https://szhost.biz.id/api/ai/chatgpt4o`;
    const response = await axios.post(apiUrl, { text: text }, { timeout: 10000 });

    if (response.status !== 200) throw new Error(`Service unavailable: ${response.status}`);
    const data = response.data;
    if (!data.status || !data.result || !data.result.message) throw new Error('The AI returned a blank, useless response.');

    let replyText = data.result.message;
    const blockedTerms = ["owner", "prefix", "all", "broadcast", "gc", "kick", "add", "promote", "demote", "delete", "set", "reset", "clear", "block", "unblock", "leave", "ban", "get", "update", "config", "jadibot"];
    const lowerReply = replyText.toLowerCase();
    const containsBlocked = blockedTerms.some(term => lowerReply.includes(term));
    if (containsBlocked) replyText = "I cannot assist with that request.";

    await zk.sendMessage(chatId, { delete: statusMsg });
    await zk.sendMessage(chatId, { react: { text: 'done' } });
    await repondre(`[GPT]\n${replyText}\n—\nFEE-XMD`);
  } catch (error) {
    console.error(`GPT error:`, error);
    await zk.sendMessage(chatId, { react: { text: 'error' } });
    let userMessage = 'The AI service has failed. Surprise.';
    if (error.message.includes('Service unavailable')) userMessage = 'The API is down. Blame their infrastructure, not my competence.';
    if (error.message.includes('blank, useless')) userMessage = 'The AI returned empty text. Try asking a question that makes sense.';
    await repondre(`${userMessage}\nError: ${error.message}`);
  }
});

