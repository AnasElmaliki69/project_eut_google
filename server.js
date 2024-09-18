const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Endpoint to get old chats
app.get('/get-chats', (req, res) => {
    fs.readFile('chatHistory.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading chat history' });
        }
        const chats = JSON.parse(data || '[]');
        res.json(chats);
    });
});


app.post('/save-chat', (req, res) => {
    const newChat = req.body;

    console.log('Received chat to save:', newChat); // Log received chat

    fs.readFile('chatHistory.json', 'utf8', (err, data) => {
        let chats = [];

        if (!err && data) {
            chats = JSON.parse(data);
        }

        // Check if chat with the same ID exists
        const existingChatIndex = chats.findIndex(chat => chat.id === newChat.id);
        if (existingChatIndex > -1) {
            chats[existingChatIndex] = newChat; // Update existing chat
        } else {
            chats.push(newChat); // Add new chat
        }

        fs.writeFile('chatHistory.json', JSON.stringify(chats), (err) => {
            if (err) {
                console.error('Error saving chat history:', err); // Log error
                return res.status(500).json({ message: 'Error saving chat history' });
            }
            res.json({ message: 'Chat saved successfully' });
        });
    });
});

// Endpoint to delete a chat
app.delete('/delete-chat/:id', (req, res) => {
    const chatId = req.params.id; // Get the ID from the URL
    console.log('Request to delete chat with ID:', chatId);

    fs.readFile('chatHistory.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading chat history:', err);
            return res.status(500).json({ message: 'Error reading chat history' });
        }

        let chats = JSON.parse(data || '[]');
        const originalLength = chats.length;

        // Filter out the chat whose ID matches the chatId (convert both to strings)
        chats = chats.filter(chat => chat.id.toString() !== chatId.toString());

        if (chats.length === originalLength) {
            console.error('Chat ID not found:', chatId);
            return res.status(404).json({ message: 'Chat not found' });
        }

        fs.writeFile('chatHistory.json', JSON.stringify(chats), (err) => {
            if (err) {
                console.error('Error writing chat history:', err);
                return res.status(500).json({ message: 'Error deleting chat' });
            }
            console.log('Chat deleted successfully');
            res.json({ message: 'Chat deleted successfully' });
        });
    });
});



  


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
