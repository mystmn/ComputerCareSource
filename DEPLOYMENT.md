# Firebase Hosting & GitHub Actions Setup Guide

This guide documents the full deployment setup for Computer Care Source, including the CI/CD pipeline linking GitHub to Firebase Hosting, and the lessons learned throughout configuration.

---

## Architecture Overview

1. Code is pushed to the `main` branch of `https://github.com/mystmn/ComputerCareSource`.
2. GitHub Actions executes `.github/workflows/firebase-hosting-merge.yml`:
   - Installs dependencies via `npm ci`
   - Verifies types and code quality via `npm run lint`
   - Compiles production assets via `npm run build` with environment variables
   - Deploys static output (`dist/`) directly to Firebase Hosting Live channel
3. Firebase Hosting serves the application at `computercaresource.com` with HTTPS and global CDN caching.

---

## Step-by-Step Setup

### 1. Local Configuration Files

Two files must exist in the root of the repository:

#### `.firebaserc`
Defines the target Firebase project ID:
```json
{
  "projects": {
    "default": "computer-care-source"
  }
}
```

#### `firebase.json`
Configures Single-Page Application (SPA) routing, cache headers, and build folder:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "/index.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      }
    ]
  }
}
```

---

### 2. GitHub Actions Workflows

Two workflow files in `.github/workflows/` manage CI/CD:

1. `firebase-hosting-merge.yml`: Triggers on push to `main` and deploys to the Live production channel.
2. `firebase-hosting-pull-request.yml`: Triggers on pull requests and deploys to a temporary preview channel.

Each workflow passes the Web3Forms key during build:
```yaml
- name: Build Production Assets
  run: npm run build
  env:
    VITE_WEB3FORMS_ACCESS_KEY: ${{ secrets.VITE_WEB3FORMS_ACCESS_KEY || '96b8c0e0-1d09-4820-af47-781c0c0cb93a' }}
```

---

### 3. Google Cloud IAM Service Account Setup

To deploy without permissions errors, the service account must have explicit hosting roles in Google Cloud IAM:

1. Navigate to Google Cloud IAM:
   `https://console.cloud.google.com/iam-admin/iam?project=computer-care-source`
2. Locate the service account principal (`firebase-adminsdk-...@computer-care-source.iam.gserviceaccount.com`).
3. Click the edit icon (pencil) and assign these roles:
   - **Firebase Hosting Admin**
   - **Service Usage Consumer**
4. Download the private key JSON:
   - Navigate to Firebase Console > Project Settings > Service accounts
   - Click "Generate new private key" to download the JSON credentials file.

---

### 4. GitHub Repository Secrets

Add the downloaded JSON key to GitHub:

1. Open your repository on GitHub.
2. Navigate to **Settings > Secrets and variables > Actions**.
3. Create a new repository secret:
   - Name: `FIREBASE_SERVICE_ACCOUNT_COMPUTER_CARE_SOURCE` (or `FIREBASE_SERVICE_ACCOUNT`)
   - Value: Paste the entire JSON file contents.
4. Click **Add secret**.

---

### 5. Custom Domain Connection

1. In Firebase Console, open **Hosting > View Sites**.
2. Click **Add custom domain**.
3. Enter `computercaresource.com` (and choose to redirect `www.computercaresource.com`).
4. Add the provided DNS `A` records at your domain registrar.
5. Google provisions the SSL certificate automatically once DNS resolves.

---

## Lessons Learned & Troubleshooting

### 1. FormSubmit.co vs Web3Forms Reliability
- **Problem:** FormSubmit.co experienced an origin timeout outage (HTTP 522 via Cloudflare), preventing initial confirmation emails and lead capture.
- **Solution:** Switched to Web3Forms (`https://api.web3forms.com/submit`) with public access keys. Web3Forms delivers directly to the destination inbox without requiring preliminary origin activation or redirect loops.
- **Backup Strategy:** The client-side booking service maintains a local storage audit trail (`localStorage['ccs_local_leads']`) so inquiries are never lost even if external network calls fail.

### 2. ALTCHA Proof-of-Work Verification
- **Problem:** Setting `test="true"` directly as an HTML attribute on `<altcha-widget>` causes verification failure because the v3 web component does not observe the `test` attribute.
- **Solution:** Pass configuration as a JSON string attribute:
  `configuration='{"test": true, "minDuration": 400}'` or configure programmatically via JavaScript.

### 3. Responsive Logo Sizing
- **Problem:** Serving a single raw 2.4 MB logo image across all devices wastes mobile bandwidth and slows First Contentful Paint.
- **Solution:** Exported tailored resolutions:
  - `hi-fi_logo_2_25.png` (314x314) for mobile viewports (`< 640px`) and mobile navigation menus
  - `hi-fi_logo_1_50.png` (627x627) for tablet viewports (`640px - 1023px`)
  - `hi-fi_logo_76.png` (953x953) for desktop viewports (`>= 1024px`)
  Utilized the HTML5 `<picture>` element with media queries in `BrandLogo.tsx`.

### 4. `firebase init hosting:github` 404 Error
- **Problem:** Running the CLI interactive command `firebase init hosting:github` failed with:
  `HTTP Error: 404, Service account ... does not exist`
  This happens because Google Cloud IAM API replication can lag when generating ephemeral GitHub Action service accounts from the CLI.
- **Solution:** Create and download the permanent private key JSON from the Firebase Console (Settings > Service accounts) and paste it directly into GitHub repository secrets.

### 5. `FirebaseExtended/action-hosting-deploy` 403 Permission Denied Error
- **Problem:** GitHub Actions failed during deployment with:
  `HTTP Error: 403, Permission denied to get service [firebasehosting.googleapis.com]`
- **Root Cause:** The default Firebase Admin SDK service account has database permissions, but lacks the specific **Firebase Hosting Admin** and **Service Usage Consumer** IAM roles in Google Cloud.
- **Solution:** Add both roles to the principal in Google Cloud IAM (`console.cloud.google.com/iam-admin/iam`).

### 6. Local Fallback Deployment
If GitHub Actions is blocked or temporarily offline, manual deployment can always be run directly from the local terminal:
```bash
npm run build
npx firebase deploy --only hosting
```
Using `npx` avoids global PATH or version mismatch issues on Windows.
