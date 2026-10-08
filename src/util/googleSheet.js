/**
 * Utility to send registration entries directly to Google Sheets
 * Target Sheet: https://docs.google.com/spreadsheets/d/1YwSfoSGwVtjKQzKvzgjfATaA56X_hraSW04pWQY0_kA/edit
 */

export const SPREADSHEET_ID =
  process.env.REACT_APP_GOOGLE_SHEET_ID ||
  "1YwSfoSGwVtjKQzKvzgjfATaA56X_hraSW04pWQY0_kA";

export const GOOGLE_SHEET_URL =
  process.env.REACT_APP_GOOGLE_SHEET_URL ||
  "https://docs.google.com/spreadsheets/d/1YwSfoSGwVtjKQzKvzgjfATaA56X_hraSW04pWQY0_kA/edit?usp=sharing";

/**
 * Appends registration data into Google Sheets via Google Apps Script Web App
 * @param {Object} data
 * @param {string} data.name - Participant full name
 * @param {string} data.email - Participant email
 * @param {string} data.contact_number - 10-digit phone number
 * @param {string} data.payment_proof_url - Cloudinary image URL
 * @param {string} [data.payment_file_name] - Name of uploaded proof file
 * @param {string} [data.createdAt] - Formatted timestamp
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const saveToGoogleSheet = async ({
  name,
  email,
  contact_number,
  payment_proof_url,
  payment_file_name,
  createdAt,
}) => {
  const scriptUrl = process.env.REACT_APP_GOOGLE_SHEET_SCRIPT_URL;

  const payload = {
    spreadsheetId: SPREADSHEET_ID,
    timestamp:
      createdAt ||
      new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "medium",
      }),
    name: name ? name.trim() : "",
    email: email ? email.trim().toLowerCase() : "",
    contact_number: contact_number ? contact_number.trim() : "",
    payment_proof_url: payment_proof_url || "",
    payment_file_name: payment_file_name || "",
  };

  if (!scriptUrl || scriptUrl.trim() === "" || scriptUrl.includes("your_google_apps_script")) {
    console.warn(
      "[Google Sheets] REACT_APP_GOOGLE_SHEET_SCRIPT_URL is not set yet in .env. Registration saved to Firebase, but skipped Google Sheet append."
    );
    return {
      success: false,
      error: "REACT_APP_GOOGLE_SHEET_SCRIPT_URL is not configured",
    };
  }

  try {
    // Send using text/plain to avoid CORS preflight (OPTIONS) limitations on Google Apps Script
    await fetch(scriptUrl.trim(), {
      method: "POST",
      mode: "no-cors", // Crucial for cross-origin redirects from Google Apps Script Web App
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return { success: true };
  } catch (error) {
    console.error("[Google Sheets] Error appending registration to sheet:", error);
    return {
      success: false,
      error: error?.message || "Failed to append to Google Sheet",
    };
  }
};
