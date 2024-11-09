import React, { useState } from "react";
import { FaEnvelope, FaUserPlus } from "react-icons/fa"; // Importing icons
import ConnectionDetails from "./ConnectionDetails"; // Importing the new component

const Connection = () => {
  // Sample data for connection requests, current connections, and suggestions
  const [requests, setRequests] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ]);

  const [connections, setConnections] = useState([
    { id: 4, name: "Mark Wilson", isOnline: true },
    { id: 5, name: "Emily Davis", isOnline: false },
  ]);

  const [suggestions, setSuggestions] = useState([
    { id: 6, name: "Michael Brown" },
    { id: 7, name: "Sarah Parker" },
  ]);

  // State for modal visibility and the current user being viewed
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Handle accepting a connection request
  const handleAccept = (request) => {
    setConnections([...connections, { ...request, isOnline: false }]); // Add to connections with default offline status
    setRequests(requests.filter((r) => r.id !== request.id)); // Remove from requests
  };

  // Handle rejecting a connection request
  const handleReject = (requestId) => {
    setRequests(requests.filter((r) => r.id !== requestId));
  };

  // Redirect to messaging route with connection ID or name
  const handleMessage = (connection) => {
    window.location.href = `/message/${connection.id}`;
  };

  // Handle adding a suggested user to requests
  const handleAddSuggestion = (suggestion) => {
    setRequests([...requests, suggestion]); // Move suggestion to requests
    setSuggestions(suggestions.filter((s) => s.id !== suggestion.id)); // Remove from suggestions
  };

  // Handle opening the modal with user details
  const handleOpenModal = (user) => {
    setCurrentUser(user);
    setModalVisible(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentUser(null);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center mt-10">
      {/* Connection Requests Section */}
      <div className="lg:w-1/3 w-full bg-white dark:bg-black p-4 border rounded-md shadow-md mx-2">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-purple-500">Connection Requests</h2>
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id} className="flex justify-between items-center bg-slate-300 dark:bg-slate-950  text-black dark:text-orange-500 p-3 mb-3 rounded-md shadow-sm dark:shadow-sky-300 shadow-blue-900">
              <div>
                <h3
                  className="font-medium cursor-pointer hover:text-blue-500"
                  onClick={() => handleOpenModal(request)} // Open modal with user details
                >
                  {request.name}
                </h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAccept(request)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No connection requests at the moment.</p>
        )}
      </div>

      {/* Current Connections Section */}
      <div className="lg:w-1/3 w-full bg-white dark:bg-black p-4 border rounded-md shadow-md mx-2 mt-4 lg:mt-0">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-purple-500">Your Connections</h2>
        {connections.length > 0 ? (
          connections.map((connection) => (
            <div key={connection.id} className="flex justify-between items-center bg-slate-300 dark:bg-slate-950  text-black dark:text-orange-500 p-3 mb-3 rounded-md shadow-sm dark:shadow-sky-300 shadow-blue-900">
              <div className="flex items-center space-x-2">
                {/* Online/Offline Status Dot */}
                <span
                  className={`h-3 w-3 rounded-full ${connection.isOnline ? "bg-green-600" : "bg-red-600"}`}
                  title={connection.isOnline ? "Online" : "Offline"}
                ></span>
                <h3
                  className="font-medium cursor-pointer hover:text-blue-500"
                  onClick={() => handleOpenModal(connection)} // Open modal with user details
                >
                  {connection.name}
                </h3>
              </div>
              <button
                onClick={() => handleMessage(connection)}
                className="text-blue-500 hover:text-blue-600"
              >
                <FaEnvelope size={20} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have no connections yet.</p>
        )}
      </div>

      {/* Suggestions Section */}
      <div className="lg:w-1/3 w-full bg-white dark:bg-black p-4 border rounded-md shadow-md mx-2 mt-4 lg:mt-0">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-purple-500">Suggestions</h2>
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <div key={suggestion.id} className="flex justify-between items-center bg-slate-300 dark:bg-slate-950  text-black dark:text-orange-500 p-3 mb-3 rounded-md shadow-sm dark:shadow-sky-300 shadow-blue-900">
              <h3
                className="font-medium cursor-pointer hover:text-blue-500"
                onClick={() => handleOpenModal(suggestion)} // Open modal with user details
              >
                {suggestion.name}
              </h3>
              <button
                onClick={() => handleAddSuggestion(suggestion)}
                className="text-green-500 hover:text-green-600"
              >
                <FaUserPlus size={20} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No suggestions available.</p>
        )}
      </div>

      {/* User Details Modal */}
      {modalVisible && currentUser && (
        <ConnectionDetails user={currentUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Connection;
