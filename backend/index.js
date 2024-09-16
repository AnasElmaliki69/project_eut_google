 
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.use(cors());

app.get('/api/generate', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = 'Que fait-on ce soir ?';
    const result = await model.generateContent(prompt);
    res.json({ text: await result.response.text() });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).send('Error generating content');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
