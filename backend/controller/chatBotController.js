const Chat = require("../models/ChatSchema");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require("dotenv").config({ path: "../config/.env" });

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.5,
  maxRetries: 2,
  apiKey: "AIzaSyA1e9n_Ktz8He2XZW0vH3t6HAIucg_SmZE",
});

module.exports.CineBotChat = async (req, res) => {
  try {
    const { prompt: userPrompt, userId } = req.body;
    if (!userPrompt || !userId) {
      return res.status(400).json({ error: "Prompt and userId are required." });
    }

    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = new Chat({ userId, messages: [] });
    }

    if (!Array.isArray(chat.messages)) {
      chat.messages = [];
      await chat.save();
    }

const systemMessage = {
  role: "system",
  content: `
You are CineBot, an enthusiastic movie lover and trivia expert who’s always excited to chat about films, legendary directors, iconic actors, awards, and fascinating behind-the-scenes stories.
You remember the user's tastes and preferences, and your recommendations and responses are personalized with warmth and enthusiasm.
Keep the conversation friendly, fun, and insightful — like chatting with a true cinephile friend!
  `.trim(),
};

const messagesForLLM = [
  systemMessage,
  ...chat.messages.map(msg => ({
    role: msg.role === "user" ? "user" : "assistant",
    content: msg.content,
  })),
  { role: "user", content: userPrompt },
];


    const response = await llm.call(messagesForLLM);
    const botReply = response.text ? response.text.trim() : String(response).trim();

    chat.messages.push({ role: "user", content: userPrompt });
    chat.messages.push({ role: "ai", content: botReply });
    await chat.save();

    return res.status(200).json({ data: botReply });
  } catch (err) {
    console.error("CineBotChat Error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};



module.exports.getChatHistory = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ error: "userId is required" });

    const chat = await Chat.findOne({ userId });

    if (!chat) return res.status(200).json({ messages: [] }); 

    return res.status(200).json({ messages: chat.messages });
  } catch (err) {
    console.error("GetChatHistory Error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
};


