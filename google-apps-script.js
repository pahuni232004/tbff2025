/**
 * Google Apps Script for TBFF 2025 Film Submission Form
 * 
 * This script receives form submissions and saves them to a Google Sheet.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet (or use an existing one)
 * 2. Open Google Apps Script (Extensions > Apps Script)
 * 3. Replace the default code with this script
 * 4. Update the SPREADSHEET_ID variable with your sheet's ID
 * 5. Deploy as a web app with "Execute as: Me" and "Who has access: Anyone"
 * 6. Copy the web app URL and add it to your .env.local as NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 */

// Replace this with your Google Sheet ID
// You can find it in the URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// Sheet name where data will be stored
const SHEET_NAME = 'Submissions';

/**
 * Main function to handle POST requests from the form
 */
function doPost(e) {
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    // If the sheet doesn't exist, create it with headers
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById(SPREADSHEET_ID).insertSheet(SHEET_NAME);
      setupHeaders(newSheet);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Sheet created. Please submit again.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if headers exist, if not, add them
    if (sheet.getLastRow() === 0) {
      setupHeaders(sheet);
    }
    
    // Prepare the row data in the same order as headers
    const rowData = [
      data.submittedAt || new Date().toISOString(),
      data.fullName || '',
      data.age || '',
      data.city || '',
      data.phoneNumber || '',
      data.emailAddress || '',
      data.description || '',
      data.filmCategory || '',
      data.filmTitle || '',
      data.synopsis || '',
      data.crewDetails || '',
      data.filmLink || '',
      data.cbfcCertification || '',
      data.declaration || '',
      data.termsAccepted ? 'Yes' : 'No'
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Form submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error for debugging
    console.error('Error processing submission:', error);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Setup headers for the sheet
 */
function setupHeaders(sheet) {
  const headers = [
    'Submitted At',
    'Full Name',
    'Age',
    'City',
    'Phone Number',
    'Email Address',
    'Description',
    'Film Category',
    'Film Title',
    'Synopsis',
    'Crew Details',
    'Film Link',
    'CBFC Certification',
    'Declaration',
    'Terms Accepted'
  ];
  
  sheet.appendRow(headers);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#FFCE21');
  headerRange.setFontColor('#091529');
  
  // Set column widths for better readability
  sheet.setColumnWidth(1, 180); // Submitted At
  sheet.setColumnWidth(2, 150); // Full Name
  sheet.setColumnWidth(3, 60);  // Age
  sheet.setColumnWidth(4, 120); // City
  sheet.setColumnWidth(5, 130); // Phone Number
  sheet.setColumnWidth(6, 200); // Email Address
  sheet.setColumnWidth(7, 200); // Description
  sheet.setColumnWidth(8, 250); // Film Category
  sheet.setColumnWidth(9, 200); // Film Title
  sheet.setColumnWidth(10, 300); // Synopsis
  sheet.setColumnWidth(11, 300); // Crew Details
  sheet.setColumnWidth(12, 250); // Film Link
  sheet.setColumnWidth(13, 120); // CBFC Certification
  sheet.setColumnWidth(14, 300); // Declaration
  sheet.setColumnWidth(15, 120); // Terms Accepted
}

/**
 * Test function to verify the script works
 * Run this from the Apps Script editor to test
 */
function testSubmission() {
  const testData = {
    submittedAt: new Date().toISOString(),
    fullName: 'Test User',
    age: '25',
    city: 'Bhopal',
    phoneNumber: '1234567890',
    emailAddress: 'test@example.com',
    description: 'Test description',
    filmCategory: 'Fiction (Under 10 Minutes)',
    filmTitle: 'Test Film',
    synopsis: 'This is a test synopsis',
    crewDetails: 'Director: Test Director',
    filmLink: 'https://drive.google.com/test',
    cbfcCertification: 'yes',
    declaration: 'Test declaration',
    termsAccepted: true
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

