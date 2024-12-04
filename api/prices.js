export default async function handler(req, res) {
  const apiKey = process.env.LCW_API_KEY; // Secure API key in Vercel
  const endpoint = "https://api.livecoinwatch.com/coins/map";

  try {
    // Coin codes you want to request
    const coinList = ["BTC", "ETH", "XRP", "SOL", "BNB", "USDC", "DOGE", "ADA", "TRX", "TON", "AVAX", "SHIB", "LINK", "BCH", "DOT", "NEAR", "SUI", "LTC", "UNI", "APT", "ICP", "KAS", "XMR", "RNDR", "ETC", "STX", "HBAR", "AR", "AAVE", "FIL", "OP", "FTM", "VET", "ATOM", "XTZ", "ALGO", "MATIC", "IMX", "CAKE", "PEPE", "BTT", "MKR", "THETA", "HNT", "KCS", "LDO", "WLD", "MIOTA", "ZEC", "EOS", "NEO", "LUNA", "GRT", "ZIL", "DASH", "XRD", "DOGS", "TURBO", "GOAT", "AI", "FET", "AGIX", "TCN", "SEI", "OCEAN"]​​​​​​​​​​​​​​​​,

    // Make the request to LiveCoinWatch
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

    const data = await response.json(); // Parse the JSON response

    // Return the exact response to the client
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).json({ error: "Failed to fetch prices" });
  }
}
