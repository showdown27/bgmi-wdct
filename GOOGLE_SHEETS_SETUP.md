# Google Sheets Registration Setup Guide

This project connects the registration form directly to your Google Spreadsheet:
**[BGMI Registrations Spreadsheet](https://docs.google.com/spreadsheets/d/1YwSfoSGwVtjKQzKvzgjfATaA56X_hraSW04pWQY0_kA/edit?usp=sharing)**

---

## ⚡ Quick 1-Minute Setup Instructions

Follow these simple steps to activate the connection:

### Step 1: Open Google Sheets Apps Script
1. Open your sheet: [https://docs.google.com/spreadsheets/d/1YwSfoSGwVtjKQzKvzgjfATaA56X_hraSW04pWQY0_kA/edit](https://docs.google.com/spreadsheets/d/1YwSfoSGwVtjKQzKvzgjfATaA56X_hraSW04pWQY0_kA/edit)
2. In the top navigation menu, click **Extensions** > **Apps Script**.

### Step 2: Paste the Webhook Code
1. In the Apps Script code editor, delete any existing placeholder code.
2. Open [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) from this project, copy all the code, and paste it into the Apps Script editor.
3. Click the **Save** icon (diskette icon) or press `Ctrl + S`.

### Step 3: Deploy as a Web App
1. At the top-right corner, click **Deploy** > **New deployment**.
2. Click the gear icon (**⚙️ Select type**) beside "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `BGMI Registrations Webhook`
   - **Execute as**: `Me (<your-email>)`
   - **Who has access**: `Anyone` *(⚠️ Crucial: Must be "Anyone" so frontend form submissions can reach it without requiring users to log in)*.
4. Click **Deploy**.
5. When prompted with "Authorization required", click **Authorize access**:
   - Choose your Google account.
   - Click **Advanced** (at the bottom-left of the warning popup).
   - Click **Go to Untitled project (unsafe)**.
   - Click **Allow**.

### Step 4: Copy the Web App URL & Add to `.env`
1. Copy the generated **Web app URL**. It looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
2. Open your `.env` file in the project and add it to `REACT_APP_GOOGLE_SHEET_SCRIPT_URL`:
   ```env
   REACT_APP_GOOGLE_SHEET_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_DEPLOYMENT_ID/exec
   ```
3. Restart your development server (`npm start`) or redeploy to your hosting service (Vercel).

---

## 🔍 How to Test
1. **Direct Browser Test**: Open your `https://script.google.com/macros/s/.../exec` URL directly in your browser. You should see:
   ```json
   {"status":"active","message":"BGMI Gaming 2026 Google Sheet Webhook is active and connected!","spreadsheetId":"1YwSfoSGwVtjKQzKvzgjfATaA56X_hraSW04pWQY0_kA"}
   ```
2. **Form Submission Test**: Open the BGMI website, click **Register!**, fill in sample details, attach a payment screenshot, and click **SUBMIT**.
3. Check your Google Sheet: A new row will appear with the formatted timestamp, name, email, phone number, and a clickable link to view the payment screenshot on Cloudinary!
