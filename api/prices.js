export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(204).end(); // No content for OPTIONS request
  }

  const apiKey = process.env.LCW_API_KEY;
  const endpoint = "https://api.livecoinwatch.com/coins/map";

  try {
    // Make request to LiveCoinWatch API
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "USD",
        codes: [
          "BTC", "ETH", "XRP", "SOL", "BNB", "USDC", "DOGE", "ADA", "TRX", 
          "TON", "AVAX", "SHIB", "LINK", "BCH", "DOT", "NEAR", "SUI", "LTC", 
          "UNI", "APT", "ICP", "KAS", "XMR", "RNDR", "ETC", "STX", "HBAR", 
          "AR", "AAVE", "FIL", "OP", "FTM", "VET", "ATOM", "XTZ", "ALGO", 
          "MATIC", "IMX", "CAKE", "PEPE", "BTT", "MKR", "THETA", "HNT", 
          "KCS", "LDO", "WLD", "MIOTA", "ZEC", "EOS", "NEO", "LUNA", "GRT", 
          "ZIL", "DASH", "XRD", "DOGS", "TURBO", "GOAT", "AI", "FET", "AGIX", 
          "TCN", "SEI", "OCEAN"
        ],
        meta: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`LiveCoinWatch API error: ${response.statusText}`);
    }

    const apiData = await response.json();
    res.status(200).json(apiData); // Send the fetched data
  } catch (error) {
    console.error("Error fetching price data:", error);
    res.status(500).json({ error: "Failed to fetch price data" });
  }
}
