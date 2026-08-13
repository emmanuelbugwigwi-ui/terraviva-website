# Connecting the real backend

The admin dashboard at `/admin` is fully built and wired to Firebase and
Cloudinary — right now it's running on placeholder keys, so logging in or
uploading will fail with a friendly error message. Follow these steps to
make it real.

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com and click "Add project."
2. Name it (e.g. `terraviva`), skip Google Analytics if you want to keep it simple.
3. Inside the project: **Build → Authentication → Get started → Email/Password → Enable.**
4. **Build → Firestore Database → Create database** (start in production mode).
5. **Project settings (gear icon) → General → Your apps → Add app → Web (`</>`)**. Register it, and copy the config values shown (`apiKey`, `authDomain`, `projectId`, etc.).

## 2. Create your admin account

Still in Firebase Console: **Authentication → Users → Add user.** Enter the
email and password the admin will log in with at `/admin/login`. That's the
entire account system — no separate password to manage in code.

## 3. Deploy the Firestore security rules

**Firestore Database → Rules tab** → paste the contents of `firestore.rules`
(already in this project) → **Publish.** This lets the public site read
content while only your signed-in admin can edit it.

## 4. Create the Cloudinary account

1. Sign up free at https://cloudinary.com.
2. From the dashboard, copy your **Cloud Name**.
3. Go to **Settings → Upload → Upload presets → Add upload preset.** Set
   **Signing Mode** to **Unsigned**, save, and copy the preset's name.

## 5. Fill in your keys

Copy `.env.local.example` to a new file named `.env.local` in the project
root, and paste in the real values from steps 1 and 4:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
```

`.env.local` is already listed in `.gitignore`, so these stay off GitHub.

## 6. Restart and test

```
npm run dev
```

Go to `http://localhost:3000/admin/login`, sign in with the account from
step 2, and you should land on the dashboard. Try the **Media library** page
— uploading a file there is the quickest way to confirm both Firebase and
Cloudinary are wired up correctly.

## What's built vs. what's next

**Already working, once keys are added:**
- Admin login/logout (Firebase Authentication)
- Homepage content editor — saves to Firestore (`site-content/homepage`)
- Media library — uploads to Cloudinary, tracks files in Firestore (`media`)

**Reasonable next steps, not built yet:**
- Connecting the public homepage (`app/page.tsx`) to actually read from
  `site-content/homepage` instead of hardcoded text, so admin edits show up live
- Admin screens for Projects, Programs, Blog posts, and Publications, following
  the same pattern as the content editor
- A small server route for deleting files from Cloudinary itself (the current
  "Remove" button only removes the Firestore record, since real deletion needs
  your API secret, which can't safely live in browser code)

Each of these follows the same pattern already in place — happy to build
any of them next.
