import React, { useEffect, useState } from 'react';

function OldChats({ selectChat }) {
  const [oldChats, setOldChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
        try {
            const response = await fetch('http://localhost:3001/get-chats');
            const data = await response.json();
            setOldChats(data);
        } catch (error) {
            console.error('Error fetching old chats:', error);
        }
    };

    fetchChats();
}, []);

const deleteChat = async (chatId) => {
  console.log('Deleting chat with ID:', chatId);  // Log the chat ID before sending the request
  try {
    await fetch(`http://localhost:3001/delete-chat/${chatId}`, {
      method: 'DELETE',
    });
    // Remove the deleted chat from the state
    setOldChats(oldChats.filter(chat => chat.id !== chatId));
  } catch (error) {
    console.error('Error deleting chat:', error);
  }
};



  return (
    <div className="old-chats-container p-4 bg-white-100 border-r border-indigo-700">
      <h2 className="font-bold text-lg text-indigo-700 mb-4">Previous Conversations</h2>
      {oldChats.length > 0 ? (
        <ul>
          {oldChats.map((chat) => (
            <li key={chat.id} className="p-2 border-b border-indigo-300 flex justify-between items-center">
              <button onClick={() => selectChat(chat.conversation)}>
                Chat ID: {chat.id}
              </button>
              <button
                onClick={() => deleteChat(chat.id)}
                className="bg-red-500 text-white p-1 rounded ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-indigo-700">No conversations found.</p>
      )}
    </div>
  );
}

export default OldChats;
