const {
    GoogleGenerativeAI,
} = require("@google/generative-ai");

const apiKey = process.env.REACT_APP_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);


const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// Start with the initial conversation history
let conversationHistory = [
    {
        role: "user",
        parts: [
            {
                text: `You are ANIR, a chatbot designed to assist users. Before engaging in any conversation, your primary task is to collect the user’s name and email address...`
            },
        ],
    },
    {
        role: "model",
        parts: [
            { text: "Hello! I’m ANIR, and I’m here to assist you. Before we can proceed, could you please provide your name and email? I need both to continue our conversation.\n" },
        ],
    },
];

// Service function to handle the conversation
const anirService = {
    sendMessage: async (inputText) => {
        // Add user input to the conversation history
        conversationHistory.push({
            role: "user",
            parts: [{ text: inputText }],
        });

        const chatSession = model.startChat({
            generationConfig,
            history: conversationHistory, // Pass the entire history each time
        });

        // Send the user input and get the model response
        const result = await chatSession.sendMessage(inputText);

        // Add the model's response to the conversation history
        conversationHistory.push({
            role: "model",
            parts: [{ text: result.response.text() }],
        });

        // Return the response text to be used in the chat component
        return result.response.text();
    },
};

export { anirService };
