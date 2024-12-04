const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const targetUrl = "https://api.livecoinwatch.com/coins/map";

async function fetchPrices() {
  const response = await fetch(proxyUrl + targetUrl, {
    method: "POST",
    headers: {
      "x-api-key": "process.env.LCW_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currency: "USD",
      codes: ["BTC", "ETH", "XRP", "SOL", "BNB", "USDC", "DOGE", "ADA", "TRX", "TON", "AVAX", "SHIB", "LINK", "BCH", "DOT", "NEAR", "SUI", "LTC", "UNI", "APT", "ICP", "KAS", "XMR", "RNDR", "ETC", "STX", "HBAR", "AR", "AAVE", "FIL", "OP", "FTM", "VET", "ATOM", "XTZ", "ALGO", "MATIC", "IMX", "CAKE", "PEPE", "BTT", "MKR", "THETA", "HNT", "KCS", "LDO", "WLD", "MIOTA", "ZEC", "EOS", "NEO", "LUNA", "GRT", "ZIL", "DASH", "XRD", "DOGS", "TURBO", "GOAT", "AI", "FET", "AGIX", "TCN", "SEI", "OCEAN"]​​​​​​​​​​​​​​​​, // Add your desired coins
      meta: true,
    }),
  });

  const data = await response.json();

}

fetchPrices()
