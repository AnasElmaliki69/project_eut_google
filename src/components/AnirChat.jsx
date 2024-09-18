import React, { useState, useRef, useEffect } from 'react';
import { anirService } from '../anirService';
import { FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import OldChats from './oldChats';

function AnirChat() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [oldChats, setOldChats] = useState([]); // For storing old chats
  const chatContainerRef = useRef(null); // Reference for chat container

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (e) => {
    setUserInput(''); // Clear the input field
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

  const saveOldChat = () => {
    setOldChats((prevChats) => [...prevChats, [...chatHistory]]);
    setChatHistory([]); // Clear current chat history after saving
  };

  const selectChat = (chat) => {
    setChatHistory(chat); // Load the selected chat into the current chat history
  };

  // Scroll to the bottom of the chat when a new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, loading]); // Triggers every time chatHistory or loading changes

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-300">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left: Chat Component */}
        <div className="flex flex-col justify-between w-2/3 p-4 border-r border-indigo-700">
          <h1 className="mb-8 font-bold text-[2rem] drop-shadow-lg text-indigo-800">ANIR Chat</h1>
          <div
            className="h-80 overflow-y-auto"
            ref={chatContainerRef} // Reference for scrolling
          >
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

        {/* Right: Old Chats Component */}
        <OldChats oldChats={oldChats} selectChat={selectChat} />
      </div>
    </div>
  );
}

export default AnirChat;
