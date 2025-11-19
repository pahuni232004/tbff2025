# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets to store form submissions from the TBFF 2025 Film Submission Form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "TBFF 2025 Film Submissions"
4. Copy the **Spreadsheet ID** from the URL:
   - The URL looks like: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`
   - Copy the part between `/d/` and `/edit`

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete the default code (if any)
3. Copy and paste the code from `google-apps-script.js` into the editor
4. Replace `YOUR_SPREADSHEET_ID_HERE` on line 18 with your actual Spreadsheet ID
5. Click **Save** (💾 icon) and give your project a name like "TBFF Form Handler"

## Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "TBFF Form Submission Handler"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
6. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/...`)

## Step 4: Add Environment Variable

1. In your project root, create a `.env.local` file (if it doesn't exist)
2. Add the following line:
   ```
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Replace the URL with the Web app URL you copied in Step 3
   - The URL should look like: `https://script.google.com/macros/s/AKfycby.../exec`
   - Make sure to copy the complete URL including `/exec` at the end

## Step 5: Test the Integration

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```
2. Go to your submit film page
3. Fill out the form with test data
4. Submit the form
5. Check your Google Sheet - you should see the data appear in a new row

## Troubleshooting

### Data not appearing in the sheet?

1. **Check the Spreadsheet ID**: Make sure you copied the correct ID from the URL
2. **Check permissions**: Ensure the web app is deployed with "Anyone" access
3. **Check the sheet name**: The script creates a sheet named "Submissions" - make sure it exists or the script will create it
4. **Check browser console**: Open browser DevTools (F12) and check for any errors

### Getting CORS errors?

- The form uses `mode: "no-cors"` which is correct for Google Apps Script
- You won't see the response in the browser, but the data should still be saved
- Check your Google Sheet to confirm the submission was successful

### Script execution errors?

1. Go back to Apps Script editor
2. Check the **Execution log** (View → Execution log)
3. Look for any error messages
4. Make sure the Spreadsheet ID is correct and the sheet is accessible

## Security Notes

- The web app URL is public, but only your Google account can modify the script
- Form submissions are stored in your Google Sheet, which you control
- Consider setting up sheet sharing permissions if you want others to view submissions
- The script validates data before saving to prevent errors

## Optional: Email Notifications

If you want to receive email notifications for new submissions, you can add this to the `doPost` function in the Apps Script (after line 50):

```javascript
// Send email notification
const emailBody = `
New Film Submission Received:

Name: ${data.fullName}
Email: ${data.emailAddress}
Film Title: ${data.filmTitle}
City: ${data.city}

View full details in the spreadsheet.
`;

MailApp.sendEmail({
  to: 'your-email@example.com', // Replace with your email
  subject: 'New TBFF 2025 Film Submission',
  body: emailBody
});
```

## Support

If you encounter any issues, check:
- Google Apps Script [documentation](https://developers.google.com/apps-script)
- Next.js [environment variables](https://nextjs.org/docs/basic-features/environment-variables)

