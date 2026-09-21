# Admin Panel Documentation

## Overview

The JK Foundry admin panel is a complete content management system built with Firebase (Firestore, Authentication, and Storage). It allows administrators to manage blog posts, products, and view contact submissions.

## Features

### ✅ Authentication
- Secure email/password authentication using Firebase Auth
- Protected routes - only authenticated users can access admin pages
- Login page at `/admin/login`

### ✅ Blog Post Management
- **List View** (`/admin/blog`): View all blog posts with search and filtering
- **Create** (`/admin/blog/new`): Create new blog posts with:
  - Title, slug (auto-generated), category, excerpt
  - Featured image upload (stored in Firebase Storage)
  - Markdown content editor
  - Automatic date assignment
- **Edit** (`/admin/blog/[id]/edit`): Edit existing blog posts
- **Delete**: Delete blog posts with confirmation
- **Preview**: View blog posts on the public site

### ✅ Product Management
- **List View** (`/admin/products`): View all products with category filtering
- **Create** (`/admin/products/new`): Create new products with:
  - Name, material, weight
  - Category (Railway Parts, Buffer Assemblies, Trailer Hubs, Shell Moulding Parts)
  - Product image upload (stored in Firebase Storage)
- **Edit** (`/admin/products/[id]/edit`): Edit existing products
- **Delete**: Delete products with confirmation

### ✅ Contact Submissions
- **View All** (`/admin/contacts`): View all contact form submissions
- **Mark as Read**: Track which submissions have been reviewed
- **Delete**: Remove submissions
- Contact form automatically saves submissions to Firestore

### ✅ Dashboard
- **Overview** (`/admin/dashboard`): Quick stats and navigation
- Blog post count
- Contact submission count with unread badge
- Quick action buttons

## File Structure

```
src/
├── app/
│   └── admin/
│       ├── layout.tsx              # Admin layout wrapper (AuthProvider, ProtectedRoute, AdminLayout)
│       ├── login/
│       │   └── page.tsx            # Login page
│       ├── dashboard/
│       │   └── page.tsx            # Dashboard/home
│       ├── blog/
│       │   ├── page.tsx            # Blog list
│       │   ├── new/
│       │   │   └── page.tsx        # Create blog post
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx    # Edit blog post
│       ├── products/
│       │   ├── page.tsx            # Products list
│       │   ├── new/
│       │   │   └── page.tsx        # Create product
│       │   └── [id]/
│       │       └── edit/
│       │           └── page.tsx    # Edit product
│       └── contacts/
│           └── page.tsx            # Contact submissions list
├── components/
│   └── admin/
│       ├── AdminLayout.tsx         # Admin sidebar and navigation
│       └── ProtectedRoute.tsx      # Route protection wrapper
├── contexts/
│   └── AuthContext.tsx             # Firebase auth context provider
└── lib/
    └── firebase/
        ├── config.ts               # Firebase initialization
        ├── auth.ts                 # Auth functions (login, logout, etc.)
        ├── firestore.ts            # Firestore CRUD operations
        └── storage.ts              # Storage functions (upload, delete images)
```

## Firebase Collections

### `blogPosts`
```typescript
{
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;          // Markdown format
  image: string;            // Firebase Storage URL
  date: string;             // ISO date string (YYYY-MM-DD)
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### `products`
```typescript
{
  id: string;
  name: string;
  material: string;
  weight: string;
  category: string;         // railwayParts | bufferAssemblies | trailerHubs | shellMouldingParts
  image: string;            // Firebase Storage URL
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### `contactSubmissions`
```typescript
{
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  createdAt: Timestamp;
  read: boolean;
}
```

## Getting Started

1. **Set up Firebase** - Follow the instructions in `FIREBASE_SETUP.md`

2. **Configure environment variables** - Create `.env.local` file:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

3. **Create an admin user**:
   - Go to Firebase Console > Authentication > Users
   - Click "Add user"
   - Enter email and password
   - This user can now log in at `/admin/login`

4. **Install dependencies** (if not already done):
   ```bash
   bun install
   ```

5. **Start development server**:
   ```bash
   bun run dev
   ```

6. **Access admin panel**:
   - Navigate to `http://localhost:3000/admin/login`
   - Log in with your admin credentials

## Usage

### Managing Blog Posts

1. Navigate to **Blog Posts** in the sidebar
2. Click **+ New Post** to create a new blog post
3. Fill in the form:
   - Title will auto-generate the slug
   - Upload a featured image
   - Write content in Markdown format
4. Click **Create Post**
5. Edit or delete posts from the list view

**Note**: Currently, blog posts are stored in Firestore via the admin panel, but the public blog pages (`/blog` and `/blog/[slug]`) still use markdown files. To fully migrate to Firestore, you'll need to update those pages to fetch from Firestore instead of the file system.

### Managing Products

1. Navigate to **Products** in the sidebar
2. Use the category filter to view specific product categories
3. Click **+ New Product** to add a product
4. Fill in product details and upload an image
5. Edit or delete products from the list view

### Viewing Contact Submissions

1. Navigate to **Contact Submissions** in the sidebar
2. View all submissions with submission details
3. Click **Mark as Read** to track reviewed submissions
4. Unread submissions are highlighted with a "New" badge
5. Delete submissions you no longer need

## Security

- All admin routes are protected by authentication
- Only authenticated users can access admin pages
- Firestore security rules restrict write access to authenticated users
- Storage security rules allow public reads but require authentication for writes

## Migration from Markdown to Firestore

The admin panel stores blog posts in Firestore, but the public blog pages currently read from markdown files. To complete the migration:

1. Export existing markdown blog posts to Firestore using the admin panel
2. Update `src/app/blog/page.tsx` to fetch from Firestore instead of files
3. Update `src/app/blog/[slug]/page.tsx` to fetch from Firestore instead of files
4. Optionally, keep markdown files as backup or remove them

## Troubleshooting

### "Firebase not initialized" errors
- Check that all environment variables are set in `.env.local`
- Restart the development server after adding environment variables

### "Permission denied" errors
- Check Firestore security rules in Firebase Console
- Ensure the user is authenticated
- Verify security rules allow authenticated writes

### Images not uploading
- Check Storage security rules in Firebase Console
- Ensure the file is a valid image format
- Check browser console for specific error messages

### Can't log in
- Verify the user exists in Firebase Authentication
- Check that email/password authentication is enabled in Firebase Console
- Ensure environment variables are correct

## Future Enhancements

Potential improvements for the admin panel:

- [ ] Rich text editor (WYSIWYG) instead of Markdown
- [ ] Image gallery/library for reusing uploaded images
- [ ] Bulk operations (delete multiple items)
- [ ] Search functionality
- [ ] Export/import functionality
- [ ] User management (multiple admin users)
- [ ] Activity logs
- [ ] Draft/publish workflow for blog posts
- [ ] Analytics dashboard

