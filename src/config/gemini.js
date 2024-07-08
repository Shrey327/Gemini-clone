import { apiKey } from './config.js'; // Assuming config.js is in the same directory

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Your remaining code ...


// Create a function to handle API key retrieval (optional)
function getApiKey() {
  // You can check for environment variables or other logic here
  // If using environment variables, uncomment the following line:
  // return process.env.GEMINI_API_KEY;
  return apiKey; // Assuming you have it in config.js
}

const genAI = new GoogleGenerativeAI(getApiKey());

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

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return result.response.text();
}

export default run;
