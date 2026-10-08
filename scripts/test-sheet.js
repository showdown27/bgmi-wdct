/**
 * Verification script to test Google Sheets integration directly.
 * Run with: node scripts/test-sheet.js
 */
const https = require("https");
require("dotenv").config({ path: ".env" });

const scriptUrl =
  process.env.REACT_APP_GOOGLE_SHEET_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbwhtWWH1J2ybHzyH5hakTLR7Vb4Pc-OtqrjNGJW4r4R8_kNurwuP5dWJHU2EtB-vUIv7A/exec";

console.log("Testing Google Sheet Webhook URL:");
console.log(scriptUrl);
console.log("--------------------------------------------------");

const payload = JSON.stringify({
  timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  name: "Test Participant (System Check)",
  email: "test.check@example.com",
  contact_number: "9876543210",
  payment_proof_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  payment_file_name: "sample_receipt.jpg",
});

function sendPost(targetUrl) {
  const urlObj = new URL(targetUrl);
  const options = {
    hostname: urlObj.hostname,
    path: urlObj.pathname + urlObj.search,
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
      "Content-Length": Buffer.byteLength(payload),
    },
  };

  const req = https.request(options, (res) => {
    console.log(`Response Status: ${res.statusCode}`);
    if (res.headers.location && res.statusCode >= 300 && res.statusCode < 400) {
      console.log(`Redirecting to: ${res.headers.location}`);
      // For Google Apps Script 302 redirects, follow with GET as Google script does
      https.get(res.headers.location, (getRes) => {
        let body = "";
        getRes.on("data", (c) => (body += c));
        getRes.on("end", () => {
          console.log("Final Response Body:", body);
          try {
            const parsed = JSON.parse(body);
            if (parsed.status === "success" || parsed.result === "success") {
              console.log("\n SUCCESS! Google Sheet row successfully appended.");
            }
          } catch (e) {}
        });
      });
      return;
    }

    let body = "";
    res.on("data", (c) => (body += c));
    res.on("end", () => {
      console.log("Response Body:", body.slice(0, 300));
      if (res.statusCode === 401) {
        console.log(
          "\n⚠️ ERROR 401: Unauthorized.\nFix: In Google Apps Script, set 'Who has access' to 'Anyone'!"
        );
      }
    });
  });

  req.on("error", (err) => console.error("Request Error:", err));
  req.write(payload);
  req.end();
}

sendPost(scriptUrl);
