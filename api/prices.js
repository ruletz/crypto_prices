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
    const coinList = codes: ["BTC", "ETH", "XRP", "SOL", "BNB", "USDC", "DOGE", "ADA", "TRX", "TON", "AVAX", "SHIB", "LINK", "BCH", "DOT", "NEAR", "SUI", "LTC", "UNI", "APT", "ICP", "KAS", "XMR", "RNDR", "ETC", "STX", "HBAR", "AR", "AAVE", "FIL", "OP", "FTM", "VET", "ATOM", "XTZ", "ALGO", "MATIC", "IMX", "CAKE", "PEPE", "BTT", "MKR", "THETA", "HNT", "KCS", "LDO", "WLD", "MIOTA", "ZEC", "EOS", "NEO", "LUNA", "GRT", "ZIL", "DASH", "XRD", "DOGS", "TURBO", "GOAT", "AI", "FET", "AGIX", "TCN", "SEI", "OCEAN"];
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
