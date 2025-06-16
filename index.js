const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/your_webhook_id/your_webhook_token";

exports.handler = async function(event, context) {
  // Get visitor IP
  const ip =
    event.headers["client-ip"] ||
    event.headers["x-forwarded-for"] ||
    event.headers["x-nf-client-connection-ip"] ||
    "unknown";

  // Log IP to Discord webhook
  await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `Dog viewed by IP: ${ip}` }),
  });

  // Read image file from public folder
  const imagePath = path.resolve(__dirname, "../public/dog.png");
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
