# Resend Integration Setup

This project uses [Resend](https://resend.com) for handling contact form email submissions.

## Setup Instructions

### 1. Get a Resend API Key

1. Go to [resend.com](https://resend.com) and create an account
2. Navigate to [API Keys](https://resend.com/api-keys)
3. Create a new API key for your project
4. Copy the API key (it will start with `re_`)

### 2. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   TO_EMAIL=your-email@example.com
   FROM_EMAIL=noreply@yourdomain.com
   ```

### 3. Domain Configuration (Production)

For production use, you'll need to verify your domain with Resend:

1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain
3. Add the required DNS records
4. Wait for verification
5. Update `FROM_EMAIL` to use your verified domain (e.g., `contact@yourdomain.com`)

### 4. Testing

For development/testing, you can use:

- Any valid email address for `TO_EMAIL`
- The default `FROM_EMAIL` will work with Resend's sandbox

### Environment Variables Reference

**Resend (Required):**

- `RESEND_API_KEY`: Your Resend API key (required)
- `TO_EMAIL`: Email address that receives contact form submissions (required)
- `FROM_EMAIL`: Email address used as the sender (optional, defaults to noreply@yourdomain.com)

**AWS S3 for Attachments (Required for file uploads):**

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
- `AWS_REGION`: AWS region for your S3 bucket (e.g., us-east-1)
- `AWS_S3_BUCKET_NAME`: Name of your S3 bucket for storing attachments

### AWS S3 Setup (For File Attachments)

1. **Create S3 Bucket:**

   - Go to [AWS S3 Console](https://console.aws.amazon.com/s3/)
   - Create a new bucket with public read access
   - Note the bucket name and region

2. **Create IAM User:**

   - Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
   - Create a new user with programmatic access
   - Attach policy with S3 permissions (PutObject, DeleteObject, GetObject)
   - Save the Access Key ID and Secret Access Key

3. **Bucket Policy Example:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

## Features

- ✅ Form validation (client and server-side)
- ✅ Email sending via Resend API
- ✅ File attachments with S3 storage
- ✅ Attachment preview in emails
- ✅ File type and size validation
- ✅ Loading states and user feedback
- ✅ Error handling
- ✅ Responsive design

## API Endpoint

The contact form submits to `/api/contact` which:

- Validates form data
- Sends email via Resend
- Returns success/error responses
- Includes proper error handling and logging
