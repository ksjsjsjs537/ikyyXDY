const axios = require("axios");

async function BratGenerator(text) {
  try {
    const url = `https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(text.trim())}`;
    const res = await axios.get(url, { responseType: "arraybuffer" });
    return res.data;
  } catch (err) {
    console.error("Error:", err.message);
    return null;
  }
}

module.exports = { BratGenerator };