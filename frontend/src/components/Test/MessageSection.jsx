// MessageSection.jsx
import React, { useState } from 'react';
import ChatSection from './ChatSectioin';

const mockConnections = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const MessageSection = () => {
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [messages, setMessages] = useState({
    1: [{ id: 1, text: 'Hello!', sender: 'them' }], // Alice's messages
    2: [{ id: 2, text: 'Hi Bob!', sender: 'them' }], // Bob's messages
    3: [{ id: 3, text: 'Hey Charlie!', sender: 'them' }], // Charlie's messages
  });

  const openChat = (connection) => {
    setSelectedConnection(connection);
  };

  const closeChat = () => {
    setSelectedConnection(null);
  };

  const addMessage = (connectionId, newMessage) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [connectionId]: [...(prevMessages[connectionId] || []), newMessage],
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Connections List on the Left */}
      <div className="w-1/3 p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Connections</h2>
        <div className="space-y-2">
          {mockConnections.map((connection) => (
            <div
              key={connection.id}
              onClick={() => openChat(connection)}
              className="p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              {connection.name}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section on the Right */}
      {selectedConnection && (
        <div className="w-2/3">
          <ChatSection
            selectedConnection={selectedConnection}
            messages={messages[selectedConnection.id] || []}
            onClose={closeChat}
            onSendMessage={(text) =>
              addMessage(selectedConnection.id, { id: Date.now(), text, sender: 'me' })
            }
          />
        </div>
      )}
    </div>
  );
};

export default MessageSection;
