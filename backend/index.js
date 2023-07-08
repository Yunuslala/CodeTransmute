const express = require('express');
const axios = require('axios');
const app = express();

const cors=require('cors');
require('dotenv').config()

const apikey=process.env.key
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors)
// Code conversion API endpoint
app.post('/convert', async (req, res) => {
  try {
    const { code, targetLanguage } = req.body;

    // Make an API call to the OpenAI code conversion endpoint
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Convert the following code from ${targetLanguage} to ${targetLanguage}: \n${code}`,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${apikey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during code conversion' });
  }
});

// Debugging API endpoint
app.post('/debug', async (req, res) => {
  try {
    const { code, targetLanguage } = req.body;

    // Make an API call to the OpenAI debugging endpoint
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Debug the following code written in ${targetLanguage}:\n${code}`,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${apikey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const debugResult = response.data.choices[0].text.trim();
    res.json({ debugResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during debugging' });
  }
});

// Quality check API endpoint
app.post('/qualitycheck', async (req, res) => {
  try {
    const { code, targetLanguage } = req.body;

    // Make an API call to the OpenAI quality check endpoint
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Perform quality check on the following code written in ${targetLanguage}:\n${code}`,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${apikey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const qualityCheckResult = response.data.choices[0].text.trim();
    res.json({ qualityCheckResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during quality check' });
  }
});

// Start the server
app.listen(process.env.port, () => {
  console.log(`Server listening on port ${process.env.port}`);
});

