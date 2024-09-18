import React, { useState, useRef, useEffect } from 'react';
import { anirService } from '../anirService';
import { FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import OldChats from './oldChats';

function AnirChat() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [oldChats, setOldChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null); // Track the current chat ID
  const chatContainerRef = useRef(null);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (e) => {
    setUserInput('');
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessage = { role: 'user', text: userInput };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    try {
      setLoading(true);
      const response = await anirService.sendMessage(userInput);
      const modelResponse = { role: 'model', text: response };
      setLoading(false);

      setChatHistory((prevHistory) => [...prevHistory, modelResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'model', text: 'Error: Could not get response from AI' },
      ]);
    }
  };

  const fetchOldChats = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-chats');
      const data = await response.json();
      setOldChats(data);
    } catch (error) {
      console.error('Error fetching old chats:', error);
    }
  };

  const saveOldChat = async () => {
    const newChat = {
      id: currentChatId || Date.now(),
      conversation: [...chatHistory],
    };
  
    // Update the state with the new or updated chat
    setOldChats((prevChats) => {
      const existingChatIndex = prevChats.findIndex(chat => chat.id === currentChatId);
      if (existingChatIndex > -1) {
        const updatedChats = [...prevChats];
        updatedChats[existingChatIndex] = newChat;
        return updatedChats;
      }
      return [...prevChats, newChat];
    });
  
    // Reset chat history and ID
    setChatHistory([]);
    setCurrentChatId(null);
  
    try {
      const response = await fetch('http://localhost:3001/save-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChat),
      });
  
      const result = await response.json();
      console.log(result.message);
  
      // After everything is saved, reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };
  

  const selectChat = (chat) => {
    setChatHistory(chat);
    setCurrentChatId(chat.id); // Set the current chat ID when a chat is selected
  };

  useEffect(() => {
    fetchOldChats(); // Fetch chats when the component mounts
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-300">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col justify-between w-2/3 p-4 border-r border-indigo-700">
          <h1 className="mb-8 font-bold text-[2rem] drop-shadow-lg text-indigo-800">ANIR Chat</h1>
          <div className="h-80 overflow-y-auto" ref={chatContainerRef}>
            {chatHistory.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`rounded-lg p-2 shadow-md ${message.role === 'user' ? 'bg-indigo-700 text-white' : 'bg-indigo-200'}`}>
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <span></span>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-indigo-700 flex">
            <input
              type="text"
              className="flex-1 p-2 border border-indigo-700 rounded-lg outline-none"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleInputChange}
            />
            <button type="submit" className="ml-2 bg-indigo-700 text-white p-2 rounded-lg hover:bg-indigo-800 transition-all">
              <FaPaperPlane />
            </button>
          </form>
          <button onClick={saveOldChat} className="mt-2 bg-indigo-700 text-white p-2 rounded-lg hover:bg-indigo-800">
            Save Current Chat
          </button>
        </div>

        <OldChats oldChats={oldChats} selectChat={selectChat} />
      </div>
    </div>
  );
}

export default AnirChat;
