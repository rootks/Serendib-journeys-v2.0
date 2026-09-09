# Serendib Journeys — Firebase Edition (User Accounts, No Server)

This upgrades the original static Serendib Journeys site with real user accounts, powered entirely by **Firebase** — no Node server, no npm install, no build step. It's still just static HTML/CSS/JS; open it in a browser (ideally via a simple local server — see below) and it talks directly to your Firebase project.

- **Firebase Authentication** — register, log in, log out (email/password)
- **Firestore** — replaces a traditional database:
  - `users/{uid}` — profile (name, phone, role, accommodation preference)
  - `savedTrips/{id}` — itineraries saved from the Trip Planner
  - `bookings/{id}` — tour reservations, with a status (`pending` / `confirmed` / `completed` / `cancelled`)
- **Admin dashboard** — stats, all bookings (with status control), all users — gated by a `role` field on the user's profile plus Firestore security rules

## Project Structure

```
serendib-journeys/
└── public/                     ← the whole site — just static files
    ├── index.html, destinations.html, tours.html, ... (original pages, nav updated)
    ├── login.html               ← NEW
    ├── register.html            ← NEW
    ├── account.html             ← NEW (profile / saved trips / bookings tabs)
    ├── admin.html                ← NEW (admin dashboard)
    ├── firebase-config.js        ← NEW — paste your Firebase project keys here
    ├── firestore.rules           ← NEW — paste into Firebase console → Firestore → Rules
    ├── styles.css                ← extended with account/admin styles
    ├── app.js                    ← original site logic (unchanged)
    └── auth.js                  ← NEW — talks to Firebase Auth & Firestore
```

## Step 1 — Create a Firebase Project (free)

1. Go to **https://console.firebase.google.com** and sign in with a Google account.
2. Click **"Add project"**, give it a name (e.g. `serendib-journeys`), and finish the wizard (you can leave Google Analytics off).
3. Once the project loads, click the **`</>`  (Web)** icon on the project overview page to register a web app. Give it a nickname (e.g. `serendib-web`) — you don't need Firebase Hosting for this step.
4. Firebase will show you a code block that starts with `const firebaseConfig = { apiKey: "...", ... }`. **Copy those values.**

## Step 2 — Enable Authentication

1. In the left sidebar: **Build → Authentication → Get started**.
2. Under **Sign-in method**, click **Email/Password**, toggle it **Enabled**, and click **Save**.

## Step 3 — Create the Firestore Database

1. In the left sidebar: **Build → Firestore Database → Create database**.
2. Choose **Start in production mode** (we supply our own rules in the next step), pick a location close to you, and click **Enable**.

## Step 4 — Set the Security Rules

1. Still in **Firestore Database**, click the **Rules** tab.
2. Delete everything there and paste in the contents of `public/firestore.rules` from this project.
3. Click **Publish**.

These rules make sure a user can only read/write their own saved trips and bookings, while an account with `role: "admin"` in its profile document can read everything (needed for the admin dashboard).

## Step 5 — Plug Your Config Into the Site

1. Open `public/firebase-config.js`.
2. Replace the placeholder values (`YOUR_API_KEY`, `YOUR_PROJECT_ID`, etc.) with the real values you copied in Step 1.
3. Save the file.

## Step 6 — Run the Site

Because it's plain static files, you have a few easy options:

- **VS Code "Live Server" extension** — right-click `public/index.html` → "Open with Live Server". (Recommended — simplest.)
- **Python** (if installed): `cd public && python -m http.server 5500`, then open `http://localhost:5500`.
- **Just double-click `public/index.html`** — Firebase Auth/Firestore calls go straight to Google's servers, so this usually works fine too, though a local server is more reliable for some browsers.

You should see **Log In / Sign Up** links appear in the navbar.

## Step 7 — Try It Out

1. Click **Sign Up**, create a traveler account.
2. Go to **Trip Planner**, build a route, click **"Save This Trip to My Account"**.
3. Go to **Curated Tours**, reserve a package → check **My Account → My Bookings**.
4. To test the admin dashboard: register a second account, then in the Firebase console go to **Firestore Database → Data → `users` collection**, find the document whose ID matches that account's UID (check **Authentication → Users** tab to see UIDs next to emails), open it, and change its `role` field from `"user"` to `"admin"`. Log out and back in with that account — an **Admin** link will now appear in the nav.

## Troubleshooting

- **"Missing or insufficient permissions" in the console** — you skipped Step 4, or mistyped the rules. Re-check Firestore → Rules matches `firestore.rules` exactly and is Published.
- **A link in the browser console saying "The query requires an index"** — click it; Firebase will offer to auto-create the needed index (only shows up occasionally, e.g. if Firestore proposes an index for a compound query) — takes a minute to build.
- **Nothing happens when logging in / a Firebase error about API key** — double check `firebase-config.js` has your real project values, not the placeholders.
- **Admin link never appears** — the `role` field must be exactly the string `admin` on that user's Firestore document (Step 7.4).

## Notes for Your Report

- **Authentication:** handled entirely by Firebase Authentication (industry-standard, handles password hashing/storage for you — you never touch raw passwords).
- **Database:** Firestore (NoSQL, document-based) — three collections: `users`, `savedTrips`, `bookings`.
- **Access control:** enforced both in the UI (hiding the Admin link) and, more importantly, at the data layer via Firestore Security Rules (`firestore.rules`) — a non-admin user's Firestore requests for other people's data are rejected by Firebase itself, not just hidden in the interface.
- **No backend server:** the entire app is static files; Firebase's client SDK talks directly and securely to Google's servers from the browser.
