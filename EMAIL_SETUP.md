# Email Confirmation Setup Guide

This guide will help you set up email confirmation for TBFF 2025 film submissions.

## Overview

When users submit the film submission form, they will automatically receive a confirmation email. The email is sent using Resend, a modern email service.

## Step 1: Sign Up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (3,000 emails/month free)
3. Verify your email address

## Step 2: Get Your API Key

1. After signing in, go to **API Keys** in the dashboard
2. Click **Create API Key**
3. Give it a name (e.g., "TBFF 2025 Production")
4. Copy the API key (starts with `re_`)

## Step 3: Verify Your Domain (Optional but Recommended)

For production, you should verify your own domain:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `thebhopalfilmfestival.com`)
4. Follow the DNS setup instructions
5. Once verified, you can use emails like `noreply@thebhopalfilmfestival.com`

**For Testing/Development:**
- You can use Resend's test domain: `onboarding@resend.dev`
- This works immediately without domain verification

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add:

```env
# Resend API Key (Required)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email to send FROM (Required)
# Use your verified domain or Resend's test domain
CONFIRMATION_EMAIL_FROM=noreply@thebhopalfilmfestival.com
# OR for testing:
# CONFIRMATION_EMAIL_FROM=onboarding@resend.dev

# Festival Contact Email (Optional)
# This appears in the confirmation email
FESTIVAL_CONTACT_EMAIL=info@thebhopalfilmfestival.com

# Google Sheets Integration (if not already set)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Step 5: Test the Integration

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. Go to the submission form page
3. Fill out and submit a test form
4. Check the email address you used in the form
5. You should receive a confirmation email

## Troubleshooting

### Email not being sent?

1. **Check the browser console** - Look for any error messages
2. **Check the server logs** - Look for Resend API errors
3. **Verify your API key** - Make sure it's correct in `.env.local`
4. **Check Resend dashboard** - Go to Logs to see email delivery status
5. **Verify FROM email** - Make sure it's verified in Resend

### Getting "Email service not configured" error?

- Make sure `RESEND_API_KEY` is set in `.env.local`
- Restart your development server after adding environment variables
- Check that the variable name is exactly `RESEND_API_KEY`

### Emails going to spam?

- Verify your domain in Resend
- Use a proper FROM address (not a test domain)
- Make sure your domain has proper SPF/DKIM records (Resend handles this)

## Email Template Customization

The email template is in `app/api/send-confirmation/route.ts`. You can customize:

- Email subject line
- Email content and styling
- Festival information
- Contact details

## Production Deployment

When deploying to production (Vercel, etc.):

1. Add the same environment variables in your hosting platform's settings
2. Make sure `RESEND_API_KEY` is set
3. Make sure `CONFIRMATION_EMAIL_FROM` uses a verified domain
4. Test with a real submission

## Security Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep your Resend API key secret
- Use environment variables for all sensitive data
- The API route is server-side only, so API keys are safe

## Support

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- Check Resend dashboard for delivery logs and analytics

