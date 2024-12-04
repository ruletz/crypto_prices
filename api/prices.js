export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS"); // Allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end(); // Handle preflight requests
    return;
  }

  const apiKey = process.env.LCW_API_KEY;
  const endpoint = "https://api.livecoinwatch.com/coins/map";

  try {
    const coinList = ["BTC", "ETH", "XRP", "SOL", "BNB"];
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "USD",
        codes: coinList,
        meta: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`LiveCoinWatch API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).json({ error: "Failed to fetch prices" });
  }
}
2. Use a Proxy Server
If modifying the Vercel API isn't an option, you can create a simple proxy server that makes the request to https://crypto-prices-xi.vercel.app/api/prices and adds the required headers before forwarding the response to your frontend.

For example, using Node.js and Express:

javascript
Copy code
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors()); // Enable CORS for all routes

app.get("/proxy/prices", async (req, res) => {
  try {
    const response = await fetch("https://crypto-prices-xi.vercel.app/api/prices");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send("Failed to fetch data");
  }
});

app.listen(3000, () => {
  console.log("Proxy server running on http://localhost:3000");
});
}
