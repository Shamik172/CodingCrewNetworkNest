// MessageSection.jsx
import React, { useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import ChatSection from './ChatSectioin';
import axios from 'axios';

const MessageSection = ({userData}) => {

  const [connections, setConnections] = useState([{}]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [messages, setMessages] = useState({});
  const socketRef = useRef(null);

  // Initialize socket connection once
  useEffect(() => {
    socketRef.current = io("http://localhost:3000");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);


  // const [messages, setMessages] = useState({
  //   1: [{ id: 1, text: 'Hello!', sender: 'them' }], // Alice's messages
  //   2: [{ id: 2, text: 'Hi Bob!', sender: 'them' }], // Bob's messages
  //   3: [{ id: 3, text: 'Hey Charlie!', sender: 'them' }], // Charlie's messages
  // });
  // console.log(userData.username);


  useEffect(()=>{
    axios.get(`http://localhost:3000/user/connections/${userData.username}`, {withCredentials: true})
    .then(currentConnection=>{
        setConnections(currentConnection.data);
        console.log(connections); 
    })
    .catch(err=>console.log(err));
  },[userData.username])

  //messages on socket

  useEffect(() => {
    // Handle incoming messages
    socketRef.current.on("receiveMessage", (message) => {
      const { roomId, sender, text } = message;
      setMessages((prevMessages) => ({
        ...prevMessages,
        [roomId]: [...(prevMessages[roomId] || []), { sender, text }],
      }));
      console.log(`receive message on ${sender}`, text);
    });
    // Cleanup on unmount
    return () => socketRef.current.off("receiveMessage");
  }, []);

  const openChat = (connection) => {
    setSelectedConnection(connection);
    
    const roomId = [userData.username, connection.username].sort().join("-");
    socketRef.current.emit("joinRoom", roomId);
    
    setMessages((prevMessages) => ({
      ...prevMessages,
      [roomId]: prevMessages[roomId] || [],
    }));
  };


  const sendMessage = (text) => {
    if (!selectedConnection) return;
    const roomId = [userData.username, selectedConnection.username].sort().join("-");
    const newMessage = { sender: 'me', text };

    socketRef.current.emit("sendMessage", { roomId, message: newMessage });

    setMessages((prevMessages) => ({
      ...prevMessages,
      [roomId]: [...(prevMessages[roomId] || []), newMessage],
    }));
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
          {connections.map((connection) => (
            // console.log(connection),
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
            messages={messages[[userData.username, selectedConnection.username].sort().join("-")] || []}
            onClose={closeChat}
            onSendMessage={sendMessage}
          />
        </div>
      )}
    </div>
  );
};

export default MessageSection;
