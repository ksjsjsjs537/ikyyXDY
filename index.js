const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Import API handlers
const { tiktokdl } = require('./tiktok.js');
const { igdl } = require('./instagram.js');
const { xnxxdl, xnxxsearch } = require('./xnxxdl.js');
const { BratGenerator } = require('./brat.js');
const { SSIPGenerator } = require('./ssip.js');
const { githubstalk } = require('./githubstalk.js');
const igstalk = require('./igstalk.js');
const { SubdomainFinder } = require('./subdomainfinder.js');
const { ttSearch } = require('./tiktoksearch.js');

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Example endpoint
app.get('/hello', (req, res) => {
  res.status(200).json({
    status: true,
    message: "Hello from your API!",
    author: "Ikyy Developer",
  });
});

// Quotes endpoint
app.get('/quotes', (req, res) => {
  const quotes = [
    "Semangat terus, jangan nyerah!",
    "Waktu terbaik untuk memulai adalah sekarang.",
    "Hidup itu bukan tentang menunggu badai berlalu, tapi belajar menari di tengah hujan.",
  ];
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.status(200).json({
    status: true,
    quote: random,
  });
});

// Downloader endpoints
app.get('/tiktok', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, message: "URL parameter is required" });
    const result = await tiktokdl.fetchData(url);
    res.status(200).json({ status: true, result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/instagram', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, message: "URL parameter is required" });
    const result = await igdl(url);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/xnxxdl', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ status: false, message: "URL parameter is required" });
    const result = await xnxxdl(url);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/xnxxsearch', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ status: false, message: "Query parameter is required" });
    const result = await xnxxsearch(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// Feature endpoints
app.get('/brat', async (req, res) => {
  try {
    const { text } = req.query;
    if (!text) return res.status(400).json({ status: false, message: "Text parameter is required" });
    const result = await BratGenerator(text);
    if (result) {
      res.set('Content-Type', 'image/png');
      res.send(result);
    } else {
      res.status(500).json({ status: false, message: "Failed to generate image" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/ssip', async (req, res) => {
  try {
    const { text, batre, time, signal, emoji, carrier } = req.query;
    if (!text) return res.status(400).json({ status: false, message: "Text parameter is required" });
    const result = await SSIPGenerator({ text, batre, time, signal, emoji, carrier });
    if (result) {
      res.set('Content-Type', 'image/png');
      res.send(result);
    } else {
      res.status(500).json({ status: false, message: "Failed to generate image" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// Search/Stalk endpoints
app.get('/githubstalk', async (req, res) => {
  try {
    const { user } = req.query;
    if (!user) return res.status(400).json({ status: false, message: "User parameter is required" });
    const result = await githubstalk(user);
    res.status(200).json({ status: true, result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/igstalk', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ status: false, message: "Username parameter is required" });
    const result = await igstalk.stalk(username);
    res.status(200).json({ status: true, result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/subdomainfinder', async (req, res) => {
  try {
    const { domain } = req.query;
    if (!domain) return res.status(400).json({ status: false, message: "Domain parameter is required" });
    const result = await SubdomainFinder(domain);
    res.status(200).json({ status: true, result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/tiktoksearch', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ status: false, message: "Query parameter is required" });
    const result = await ttSearch(query);
    res.status(200).json({ status: true, result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// Catch-all (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;