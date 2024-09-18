import React, { useState } from 'react';
import { anirService } from '../anirService';
import { FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

function AnirChat() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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

      // Update chat history with both user's message and model's response
      setChatHistory((prevHistory) => [...prevHistory, modelResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
      setChatHistory((prevHistory) => [...prevHistory, { role: 'model', text: 'Error: Could not get response from AI' }]);
    }

    
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="mb-8 font-bold text-[3rem] drop-shadow-lg text-blue-50">ANIR Chat</h1>
      <div className="bg-white w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 h-96 overflow-y-auto">
          {chatHistory.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`rounded-lg p-2 shadow-md overflow-x-hidden ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
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
              <span>Loading</span>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-lg outline-none"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AnirChat;
