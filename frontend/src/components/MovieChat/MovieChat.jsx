import React, { useEffect, useState,useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useUser } from '../../context/UserContext'; 

const socket = io('http://localhost:5000');

function MovieChat({ movieID }) {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null); 
  useEffect(() => {
    if (!movieID) return;

    // Join room
    socket.emit('join_movie_room', movieID);

    // Fetch previous messages
    axios.get(`http://localhost:5000/api/movies/movie-chats/${movieID}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));

    // Receive new messages
    const handleReceive = (msg) => {
      setMessages(prev => [...prev, msg]);
    };
    socket.on('receive_message', handleReceive);

    // Cleanup on unmount
    return () => {
      socket.off('receive_message', handleReceive);
      socket.emit('leave_movie_room', movieID); // Optional
    };
  }, [movieID]);
  

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData = {
      movieID,
      sender: user?.username || user?.email || 'Guest',
      message: input
    };

    socket.emit('send_message', messageData);
    setInput('');
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className="flex flex-col h-full max-h-[500px] w-full bg-[#2f3136] rounded-lg text-white shadow-md">
      <div className="bg-[#36393f] p-3 font-semibold text-lg border-b border-gray-700">
        💬 Chat for Movie ID: {movieID}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#2f3136]">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-sm text-gray-400">{msg.sender}</span>
            <div className="bg-[#40444b] px-4 py-2 rounded-md max-w-[80%]">
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-gray-700 bg-[#36393f] flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-[#40444b] text-white outline-none"
          placeholder="Message the room..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-[#5865f2] px-4 py-2 rounded-md hover:bg-[#4752c4]"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MovieChat;
