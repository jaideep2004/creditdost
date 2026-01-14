# Google Analytics Setup Guide

## Prerequisites

To integrate Google Analytics 4 (GA4) with your CreditDost application, you'll need:

1. A Google Analytics 4 property set up for your website
2. A Google Cloud Platform project with the Google Analytics Data API enabled
3. A service account with appropriate permissions

## Step-by-Step Setup

### 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Admin" in the bottom left corner
4. Under "Property", click "Create Property"
5. Select "Web" as the platform
6. Enter your website details
7. Click "Create Stream" and select "Web"
8. Enter your website URL and stream name
9. Copy the Measurement ID (format: `G-XXXXXXXXXX`) - you'll need this later

### 2. Create a Google Cloud Project and Enable APIs

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Library"
4. Search for "Google Analytics Data API"
5. Click on it and press "Enable"

### 3. Create a Service Account

1. In the Google Cloud Console, go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Enter a name (e.g., "ga-data-reader")
4. Click "Create and Continue"
5. Grant the role "Viewer" under "Primitive" or "Google Analytics Admin" under "Basic"
6. Click "Continue" and then "Done"
7. Click on your newly created service account
8. Go to "Keys" tab
9. Click "Add Key" > "Create new key"
10. Select "JSON" as the key type
11. Click "Create" - the JSON key file will download

### 4. Configure Permissions in Google Analytics

1. Go back to Google Analytics
2. Navigate to "Admin" > "Property" > "Account Access Management"
3. Click the "+" button and select "User"
4. Enter the service account email (found in the JSON file: `client_email`)
5. Assign the "Viewer" permission
6. Save the changes

### 5. Update Environment Variables

There are two secure options for configuring authentication:

**Option A: Environment Variable Method (Recommended for Production)**
1. Open the downloaded JSON key file and copy its entire content
2. Set the `GOOGLE_APPLICATION_CREDENTIALS_CONTENT` environment variable with the JSON content (as a single line)
3. Update your `.env` file:

```bash
# Google Analytics
GOOGLE_ANALYTICS_PROPERTY_ID=your_actual_ga4_property_id_here  # Use the Property ID from GA4 Admin panel (not the Measurement ID)
GOOGLE_APPLICATION_CREDENTIALS_CONTENT='{"type":"service_account","project_id":"your-project","private_key_id":"key_id","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"your-service@your-project.iam.gserviceaccount.com","client_id":"123456789012345678901","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/your-service%40your-project.iam.gserviceaccount.com"}'
```

**Option B: File-Based Method (For Development)**
1. Rename the downloaded JSON key file to `service-account-key.json`
2. Place it in the `Backend/config/` directory
3. Update your `.env` file:

```bash
# Google Analytics
GOOGLE_ANALYTICS_PROPERTY_ID=your_actual_ga4_property_id_here  # Use the Property ID from GA4 Admin panel (not the Measurement ID)
GOOGLE_APPLICATION_CREDENTIALS=./config/service-account-key.json
```

The Property ID is found in Google Analytics under Admin > Property > Property Settings. It's typically a number like `123456789`.

### 6. Property ID Format

Important: The Property ID is NOT the same as the Measurement ID.
- Measurement ID looks like: `G-XXXXXXXXXX`
- Property ID is just a number: `123456789`

To find your Property ID:
1. In Google Analytics, go to Admin
2. Under the PROPERTY column, click "Property Settings"
3. Look for "PROPERTY ID" - this is the number you need

## Testing the Integration

After completing the setup:

1. Restart your backend server
2. The Google Analytics integration should now be functional
3. Visit your admin dashboard to see visitor statistics

## Troubleshooting

- **403 Forbidden Error**: Make sure the service account has proper permissions in Google Analytics
- **404 Property Not Found**: Verify the Property ID is correct and numeric
- **File Path Issues**: Ensure the service account key file is in the correct location

## Security Note

Keep your service account key file secure and never commit it to version control. The file should remain in your `.gitignore`.

## Sample Service Account Key File Structure

Your `service-account-key.json` file should look like:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "key_id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "ga-data-reader@your-project.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ga-data-reader%40your-project.iam.gserviceaccount.com"
}
```

## Common Property ID Locations

To find your Property ID in Google Analytics 4:
1. Go to GA4 Admin panel
2. Select your account
3. Select your property
4. Click "Property Settings"
5. The Property ID is shown near the top (it's a number, not prefixed with "G-")