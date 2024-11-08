import React, { useState, useEffect, useRef } from 'react';
import { IoSend } from 'react-icons/io5'; // Using react-icons for the send icon
import { FiUser } from 'react-icons/fi'; // Using react-icons for the profile icon

const ChatSection = ({ selectedConnection, onClose, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Reference to the last message

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Scroll to the bottom when the messages change or when the chat is opened for the first time
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedConnection]); // Also trigger scroll when the selectedConnection changes

  return (
    <div className="flex flex-col h-full">
      {/* Header with Profile Icon */}
      <div className="flex items-center justify-between p-4 bg-gray-200 border-b border-gray-300">
        <div className="flex items-center">
          <FiUser className="mr-2 text-gray-500" size={24} />
          <h2 className="text-xl font-bold">{selectedConnection.name}</h2>
        </div>
        <button onClick={onClose} className="text-red-500 font-semibold">
          Close
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-2 items-start ${
              message.sender === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* Profile icon beside each message */}
            {message.sender === 'them' && (
              <FiUser className="mr-2 text-gray-500" size={20} />
            )}
            <div
              className={`p-2 rounded-lg ${
                message.sender === 'me'
                  ? 'bg-green-100 text-right self-end'
                  : 'bg-gray-100 text-left self-start'
              } max-w-xs break-words`}
            >
              {message.text}
            </div>
            {/* Profile icon for 'me' on the right */}
            {message.sender === 'me' && (
              <FiUser className="ml-2 text-gray-500" size={20} />
            )}
          </div>
        ))}
        {/* Scroll to the last message */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input for New Message */}
      <div className="p-4 border-t border-gray-300 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button onClick={handleSendMessage} className="ml-2 text-blue-500 hover:text-blue-700">
          <IoSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
