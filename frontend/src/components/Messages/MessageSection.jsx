import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ChatSection from './ChatSectioin'
import axios from 'axios';

const MessageSection = ({ userData }) => {
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [messages, setMessages] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/connections/${userData.username}`, { withCredentials: true })
      .then((response) => {
        setConnections(response.data);
      })
      .catch((error) => console.error("Error fetching connections:", error));
  }, [userData.username]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("receiveMessage", (message) => {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [message.sender]: [...(prevMessages[message.sender] || []), message],
        }));
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("receiveMessage");
      }
    };
  }, []);


  // Open chat with selected connection
  const openChat = (connection) => {
    setSelectedConnection(connection);

    const roomId = [userData.username, connection.username].sort().join("-");
    socketRef.current.emit("joinRoom", roomId);

    setMessages((prevMessages) => ({
      ...prevMessages,
      [connection.username]: prevMessages[connection.username] || [],
    }));
  };

  // Send a message to the backend and update local messages
  const sendMessage = (text) => {
    const roomId = [userData.username, selectedConnection.username].sort().join("-");
    const newMessage = { id: Date.now(), text, sender: userData.username, receiver: selectedConnection.username };

    socketRef.current.emit("sendMessage", { roomId, message: newMessage });

    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedConnection.username]: [...(prevMessages[selectedConnection.username] || []), newMessage],
    }));
  };

  const closeChat = () => {
    setSelectedConnection(null);
  };

  return (
    <div className="flex h-screen">
      {/* Connections List on the Left */}
      <div className="w-1/3 p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Connections</h2>
        <div className="space-y-2">
          {connections.map((connection) => (
            <div
              key={connection.username}
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
            messages={messages[selectedConnection.username] || []}
            onClose={closeChat}
            onSendMessage={sendMessage}
          />
        </div>
      )}
    </div>
  );
};

export default MessageSection;