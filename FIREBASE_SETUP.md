# Firebase Setup Guide for JK Foundry Admin Panel

This guide will help you set up Firebase for the admin panel.

## Prerequisites

1. A Google account
2. Access to Firebase Console

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter your project name (e.g., "jk-foundry")
4. Follow the setup wizard (you can disable Google Analytics if you don't need it)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click **Get started**
3. Go to the **Sign-in method** tab
4. Click on **Email/Password**
5. Enable the first toggle (Email/Password)
6. Click **Save**

## Step 3: Create Firestore Database

1. Go to **Firestore Database** in the left sidebar
2. Click **Create database**
3. Choose **Start in production mode** (we'll set up security rules later)
4. Select a location closest to your users
5. Click **Enable**

## Step 4: Set up Cloud Storage

1. Go to **Storage** in the left sidebar
2. Click **Get started**
3. Start in production mode
4. Use the same location as Firestore
5. Click **Done**

## Step 5: Get Your Firebase Config

1. Go to **Project Settings** (gear icon next to "Project Overview")
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "JK Foundry Web")
5. Copy the Firebase configuration object
6. Copy the values to your `.env.local` file. Use the variable names documented in `ADMIN_PANEL_README.md`.

## Step 6: Create Your Admin User

1. Go to **Authentication** > **Users** in Firebase Console
2. Click **Add user**
3. Enter an email and password for your admin account
4. Click **Add user**
5. This user can now log in to `/admin/login`

## Step 7: Set Up Firestore Security Rules

1. Go to **Firestore Database** > **Rules**
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated()
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    function isBlogger() {
      return isAuthenticated()
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'blogger'];
    }

    match /users/{userId} {
      allow read: if isAuthenticated() && request.auth.uid == userId;
      allow write: if isAdmin();
    }

    // Blog posts - read publicly, write for bloggers and admins
    match /blogPosts/{postId} {
      allow read: if true;
      allow write: if isBlogger();
    }
    
    // Products - read publicly, write only for admins
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Contact submissions - public create, admin-only management
    match /contactSubmissions/{submissionId} {
      allow create: if request.resource.data.keys().hasOnly(['name', 'email', 'phone', 'company', 'message', 'createdAt', 'read'])
        && request.resource.data.name is string
        && request.resource.data.email is string
        && request.resource.data.message is string
        && request.resource.data.createdAt is timestamp
        && request.resource.data.read == false;
      allow read, update, delete: if isAdmin();
    }

    // Banners - read publicly, write only for admins
    match /banners/{bannerId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

3. Click **Publish**

## Step 8: Set Up Storage Security Rules

1. Go to **Storage** > **Rules**
2. Replace the default rules with the contents of `storage.rules` in this repository.

The checked-in rules allow public image reads, restrict uploads to authenticated users with the appropriate role, limit images to 10 MB, and require an image content type.

3. Click **Publish**

## Step 9: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Firebase configuration values from Step 5
3. Make sure `.env.local` is in your `.gitignore` file

## Step 10: Test the Admin Panel

1. Run `bun install` to install dependencies
2. Run `bun run dev` to start the development server
3. Navigate to `http://localhost:3000/admin/login`
4. Log in with the admin credentials you created in Step 6
5. You should now have access to the admin dashboard!

## Collections Structure

The following collections will be created automatically when you add content:

- **blogPosts**: Blog posts with fields (title, slug, excerpt, content, image, date, category)
- **products**: Products with fields (name, material, weight, image, category)
- **contactSubmissions**: Contact form submissions with fields (name, email, phone, company, message, createdAt, read)

## Troubleshooting

- **"Firebase: Error (auth/invalid-api-key)"**: Check your `.env.local` file has the correct API key
- **"Permission denied"**: Check your Firestore/Storage security rules
- **"Cannot read property 'auth' of undefined"**: Make sure Firebase is initialized correctly and environment variables are set

