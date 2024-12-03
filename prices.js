const fetch = require("node-fetch");

export default async function handler(req, res) {
  const API_KEY = process.env.LCW_API_KEY; // Use environment variable for API key
  const API_ENDPOINT = "https://api.livecoinwatch.com/coins/map";

  // List of coin codes to fetch
  const coinCodes = ["BTC", "ETH", "XRP", "SOL", "BNB", "USDC", "DOGE", "ADA", "TRX", "TON", "AVAX", "SHIB", "LINK", "BCH", "DOT", "NEAR", "SUI", "LTC", "UNI", "APT", "ICP", "KAS", "XMR", "RNDR", "ETC", "STX", "HBAR", "AR", "AAVE", "FIL", "OP", "FTM", "VET", "ATOM", "XTZ", "ALGO", "MATIC", "IMX", "CAKE", "PEPE", "BTT", "MKR", "THETA", "HNT", "KCS", "LDO", "WLD", "IOTA", "ZEC", "EOS", "NEO", "LUNA", "GRT", "ZIL", "DASH", "XRD", "DOGS", "TURBO", "GOAT", "AI", "FET", "AGIX", "TCN", "SEI", "OCEAN"];

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "USD",
        codes: coinCodes,
        meta: true,
      }),
    });

    const data = await response.json();
    const prices = data.map(coin => ({
      name: coin.code,
      price: coin.rate,
    }));

    res.status(200).json(prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
