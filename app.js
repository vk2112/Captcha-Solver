const express = require('express');
const bodyParser = require('body-parser');
const Tesseract = require('tesseract.js');
const { createWorker } = require('tesseract.js');
const request = require('request-promise-native');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint to extract text from an image URL
app.get('/', async (req, res) => {
    res.status(200).send("This API is working")
});
app.post('/extract-text', async (req, res) => {
    try {
      const { imageUrl } = req.body;
      const imageBuffer = await request.get({ imageUrl: captchaUrl, encoding: null });
      const result = await Tesseract.recognize(imageBuffer);
      const extractedText = result.data.text;
      res.status(200).json({ extractedText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to extract text from image' });
    }
  });

  const captchaUrl = 'https://i.ibb.co/jTKYQqP/Captcha-United.png';

const solveCaptcha = async () => {
  const imageBuffer = await request.get({ url: captchaUrl, encoding: null });

  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_char_whitelist: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', // specify the characters that can appear in the captcha code
  });
const { data: { text } } = await worker.recognize(imageBuffer);

  await worker.terminate();

  console.log(`Captcha code: ${text}`);
};

solveCaptcha();

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});