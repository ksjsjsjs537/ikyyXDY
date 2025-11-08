const axios = require("axios");

async function SubdomainFinder(domain) {
  try {
    const res = await axios.get(`https://crt.sh/?q=%25.${domain}&output=json`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 10000,
    });
    const subdomains = new Set();
    for (const entry of res.data) {
      const names = entry.name_value.split("\n");
      for (const name of names) {
        if (name.includes(domain)) subdomains.add(name.trim());
      }
    }
    return [...subdomains];
  } catch {
    return [];
  }
}

module.exports = { SubdomainFinder };