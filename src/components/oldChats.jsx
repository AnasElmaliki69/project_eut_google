import React from 'react';

function OldChats({ oldChats }) {
  
  const chats = oldChats || [];

  return (
    <div className="old-chats-container p-4 bg-white-100 border-r border-indigo-700">
      <h2 className="font-bold text-lg text-indigo-700 mb-4">Previous Conversations</h2>
      {chats.length > 0 ? (
        <ul>
          {chats.map((chat, index) => (
            <li key={index} className="p-2 border-b border-indigo-300">
              {chat}
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-indigo-700' >No  conversations found.</p>
      )}
    </div>
  );
}

export default OldChats;
