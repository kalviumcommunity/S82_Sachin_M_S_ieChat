import React, { useState, useRef, useEffect } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const CineBotChatPopup = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat history when popup opens
  useEffect(() => {
    if (open) {
      const fetchChatHistory = async () => {
        try {
          const res = await axios.post("https://s82-sachin-m-s-iechat.onrender.com/api/aibot/history", { userId });
          if (res.data && Array.isArray(res.data.messages)) {
            setMessages(res.data.messages);
          }
        } catch (error) {
          console.error("Failed to load chat history:", error);
        }
      };

      fetchChatHistory();
    }
  }, [open, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      // Add user message immediately
      setMessages((prev) => [...prev, { role: "user", content: input }]);

      // Call backend
      const res = await axios.post("https://s82-sachin-m-s-iechat.onrender.com/api/aibot/chat", {
        prompt: input,
        userId,
      });

      // Add AI response
      setMessages((prev) => [...prev, { role: "ai", content: res.data.data }]);
      setInput("");
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { role: "ai", content: "Oops! Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700"
        >
          <FaCommentDots size={24} />
        </button>
      ) : (
        <div className="bg-[#2b2d31] w-80 h-96 rounded-xl shadow-xl flex flex-col border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-[#1e1f22] rounded-t-xl border-b border-gray-700">
            <h2 className="text-white text-sm font-bold">CineBot 🎬</h2>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-red-400">
              <FaTimes />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 bg-[#313338]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[80%] whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-[#1e1f22] border-t border-gray-700">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask CineBot something..."
              className="w-full resize-none bg-[#2b2d31] text-white p-2 rounded-md text-sm outline-none border border-gray-600 focus:border-purple-500"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="mt-2 w-full bg-purple-600 text-white py-1 rounded-md text-sm hover:bg-purple-700 transition"
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CineBotChatPopup;
