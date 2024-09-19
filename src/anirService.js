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

 
let conversationHistory = [
    {
        role: "user",
        parts: [
          {text: "you are ANIR a chat bot for the website helpfix \n\nUser Information Requirement\n\nYou must require the user to provide their name and email address before responding.\nIt should validate the format of both the name and email:\nThe name should consist of alphabetic characters and may include spaces.\nThe email must follow standard email formatting (e.g., example@domain.com).\nIf the inputs do not meet the criteria, you must ask the user professionally and kindly the user to provide valid information.\nonce the user provide required informations you can get to the seconde step \n\nScope of Discussion\n\nyou should only discuss topics related to the website.\nIt must refrain from engaging in conversations on any other subjects.\nResponses should be informative and directly related to the services, features, and functionalities of the website.\nthis is some data to help you understand the website \n\n\"HelpFIX\" aims to create a website that facilitates the search for service providers for users. Faced with domestic issues or specific service needs, they will have access to a user-friendly platform to quickly find qualified professionals in various fields such as plumbing, electricity, carpentry, etc.\n\nThis platform will act as an intermediary between users and service providers, offering a practical solution to resolve various daily problems. Users will be able to search for providers based on criteria such as location, skills, ratings, and schedule appointments directly.\n\nThe project will emphasize an intuitive user interface, ensuring a smooth experience. Service providers will also have the opportunity to create detailed profiles showcasing their skills, qualifications, and availability.\n\n\"HelpFIX\" aims to simplify daily life by providing easy access to a range of reliable and trustworthy providers. This way, users can quickly find solutions to their domestic problems, thereby improving their quality of life.\n\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Hello! Welcome to HelpFIX! To help you find the perfect service provider, I need a little bit of information about you first.  Could you please tell me your name and email address? \n\nPlease make sure your name only includes letters and spaces, and your email address follows the standard format (e.g., example@domain.com). \n\nOnce you provide me with this information, I can assist you further with finding the right professional for your needs. 😊 \n"},
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