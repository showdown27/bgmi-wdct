/**
 * =========================================================================
 * BGMI Gaming 2026 - Google Sheets Webhook Script
 * =========================================================================
 * Spreadsheet URL:
 * https://docs.google.com/spreadsheets/d/1YwSfoSGwVtjKQzKvzgjfATaA56X_hraSW04pWQY0_kA/edit?usp=sharing
 * 
 * SPREADSHEET ID: 1YwSfoSGwVtjKQzKvzgjfATaA56X_hraSW04pWQY0_kA
 * 
 * QUICK SETUP (Takes 60 seconds):
 * 1. Open your Google Sheet in browser:
 *    https://docs.google.com/spreadsheets/d/1YwSfoSGwVtjKQzKvzgjfATaA56X_hraSW04pWQY0_kA/edit
 * 
 * 2. In the top menu, click:
 *    Extensions  ->  Apps Script
 * 
 * 3. Delete any boilerplate code inside the editor and paste ALL code from this file.
 * 
 * 4. At the top right, click "Deploy"  ->  "New deployment".
 * 
 * 5. Click the gear icon ⚙️ beside "Select type" and choose "Web app".
 * 
 * 6. Set the fields:
 *    - Description: "BGMI Registrations Webhook"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"   <-- CRITICAL! DO NOT pick "Only myself".
 * 
 * 7. Click "Deploy", then click "Authorize access" (choose your Google Account,
 *    click "Advanced" -> "Go to Untitled project (unsafe)" -> "Allow").
 * 
 * 8. Copy the generated "Web app URL" (it starts with https://script.google.com/macros/s/...).
 * 
 * 9. Paste that URL into your BGMI-Gaming/.env file:
 *    REACT_APP_GOOGLE_SHEET_SCRIPT_URL=https://script.google.com/macros/s/your_deployment_id/exec
 * 
 * 10. Restart your React dev server (`npm start`) or redeploy to Vercel.
 * =========================================================================
 */

var SPREADSHEET_ID = "1YwSfoSGwVtjKQzKvzgjfATaA56X_hraSW04pWQY0_kA";

/**
 * Returns the target Google Sheet instance.
 */
function getSheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) {
      return active.getActiveSheet();
    }
  } catch (err) {}

  return SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
}

/**
 * Handles incoming POST requests from the BGMI Registration React Form.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 15 seconds to safely prevent simultaneous write conflicts
  lock.tryLock(15000);

  try {
    var sheet = getSheet();
    var data = {};

    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Automatically create and style headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Email",
        "Phone Number",
        "Payment Proof Screenshot",
        "Payment File Name"
      ]);

      // Style header row
      var headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#B91C1C"); // BGMI Crimson Red
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);

      // Auto-fit column widths
      sheet.setColumnWidth(1, 190); // Timestamp
      sheet.setColumnWidth(2, 200); // Full Name
      sheet.setColumnWidth(3, 240); // Email
      sheet.setColumnWidth(4, 150); // Phone Number
      sheet.setColumnWidth(5, 300); // Payment Proof Screenshot
      sheet.setColumnWidth(6, 180); // Payment File Name
    }

    // Extract registration data with fallbacks
    var timestamp =
      data.timestamp ||
      data.createdAt ||
      Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

    var name = (data.name || data.fullName || "").toString().trim();
    var email = (data.email || "").toString().trim().toLowerCase();
    var contact = (data.contact_number || data.contactNum || data.phone || "").toString().trim();
    var paymentUrl = (data.payment_proof_url || data.paymentUrl || "").toString().trim();
    var fileName = (data.payment_file_name || data.paymentFileName || "").toString().trim();

    // Append registration row
    // Note: Prefix contact with single-quote "'" so Google Sheets preserves leading zeros and doesn't convert to scientific notation
    sheet.appendRow([
      timestamp,
      name,
      email,
      "'" + contact,
      paymentUrl,
      fileName
    ]);

    // Format the newly appended payment link as a clickable hyperlink if it's a URL
    var lastRow = sheet.getLastRow();
    if (paymentUrl && paymentUrl.startsWith("http")) {
      var cell = sheet.getRange(lastRow, 5);
      cell.setFormula('=HYPERLINK("' + paymentUrl + '", "View Payment Proof")');
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Registration recorded successfully",
        row: lastRow
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Handles GET requests - useful for verifying that your Web App URL is working!
 * Simply open the URL in any browser tab to verify.
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      message: "BGMI Gaming 2026 Google Sheet Webhook is active and connected!",
      spreadsheetId: SPREADSHEET_ID,
      timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
