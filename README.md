# Vertixol Website

Professional website for Vertixol - Integrated Security & Management Solutions.

## Overview

This is a static website built with HTML5 and served via Express.js, designed to run on Google Cloud Platform Cloud Functions.

## Features

- **Responsive Design**: Built with HTML5 UP Hyperspace template
- **Professional Layout**: Modern, clean design optimized for all devices
- **Service Pages**: Dedicated pages for each service offering
- **Contact Forms**: Integrated contact forms for lead generation
- **Cloud-Ready**: Optimized for GCP Cloud Functions deployment

## Services Covered

1. **Physical Security** - Comprehensive security solutions
2. **Engineering Risk Assessment** - Building structure analysis
3. **Risk Management** - Enterprise risk management frameworks
4. **Management Consulting** - Strategic organizational consulting

## Local Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yami-glick/vertixol.git
cd vertixol
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

## Deployment to GCP Cloud Functions

### Method 1: Using gcloud CLI

1. Install and configure Google Cloud SDK:

```bash
# Install gcloud CLI
# Follow instructions at: https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID
```

2. Deploy the function:

```bash
npm run deploy
```

### Method 2: Using Cloud Build (Recommended)

1. Enable required APIs:

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable cloudfunctions.googleapis.com
```

2. Deploy using Cloud Build:

```bash
gcloud builds submit --config cloudbuild.yaml
```

### Method 3: Manual Deployment

1. Deploy the function manually:

```bash
gcloud functions deploy vertixol-website \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point vertixolWebsite \
  --source . \
  --region us-central1
```

## Configuration

### Environment Variables

- `PORT`: Server port (default: 8080)
- `NODE_ENV`: Environment mode (development/production)
- `EMAIL_USER`: Gmail address for sending emails
- `EMAIL_PASS`: Gmail app password (not regular password)

### Email Setup

1. **Gmail Configuration**:

   - Use a Gmail account for sending emails
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password (Google Account → Security → App Passwords)
   - Use the App Password, not your regular Gmail password

2. **Environment Setup**:

   ```bash
   # Copy the example configuration
   cp email-config.example .env

   # Edit .env with your actual credentials
   nano .env
   ```

3. **GCP Cloud Functions**:
   - Set environment variables in the Cloud Functions console
   - Or use the gcloud command:
   ```bash
   gcloud functions deploy vertixol-website \
     --set-env-vars EMAIL_USER=your-email@gmail.com,EMAIL_PASS=your-app-password
   ```

### Customization

- **Company Information**: Update content in HTML files
- **Styling**: Modify `assets/css/main.css`
- **Images**: Replace images in `images/` directory
- **Contact Information**: Update contact details in HTML files

## File Structure

```
vertixol/
├── public/                    # Website files (served by Express)
│   ├── index.html            # Homepage
│   ├── physical-security.html # Physical Security page
│   ├── engineering-risk-assessment.html # Engineering Risk Assessment page
│   ├── risk-management.html  # Risk Management page
│   ├── management-consulting.html # Management Consulting page
│   ├── elements.html         # Template elements page
│   ├── generic.html          # Generic template page
│   ├── 404.html              # Custom 404 page
│   ├── assets/               # CSS, JS, and font files
│   │   ├── css/
│   │   ├── js/
│   │   └── webfonts/
│   └── images/               # Image assets
├── index.js                  # Express server
├── package.json              # Dependencies and scripts
├── cloudbuild.yaml          # Cloud Build configuration
├── email-config.example     # Email configuration template
└── README.md                # This file
```

## API Endpoints

- `GET /` - Homepage
- `GET /physical-security` - Physical Security page
- `GET /engineering-risk-assessment` - Engineering Risk Assessment page
- `GET /risk-management` - Risk Management page
- `GET /management-consulting` - Management Consulting page

## Performance Optimization

- Static file serving for optimal performance
- Minified CSS and JavaScript
- Optimized images
- CDN-ready structure

## Security Considerations

- HTTPS enforced in production
- No sensitive data in client-side code
- Input validation on contact forms
- Secure headers configuration

## Monitoring and Logging

- Cloud Functions built-in logging
- Error handling and 404 redirects
- Performance monitoring via GCP Console

## Support

For technical support or questions about deployment, please contact the development team.

## License

MIT License - see LICENSE file for details.

---

**Vertixol** - Integrated Security & Management Solutions
