# MediCore HMS – Setup & Deployment Guide

## A Complete Hospital Management System
**Stack:** Vanilla JS + Firebase (Auth + Firestore) + Firebase Hosting

---

## Project Structure

```
hospital-mgmt/
├── index.html                 ← Login page
├── firebase.json              ← Firebase hosting config
├── firestore.rules            ← Security rules
├── seed-data.js               ← Demo data seeder
├── DATABASE_SCHEMA.md         ← Firestore schema docs
├── SETUP.md                   ← This file
│
├── css/
│   └── style.css              ← All styles (design system)
│
├── js/
│   ├── firebase-config.js     ← 🔧 YOUR FIREBASE CREDENTIALS GO HERE
│   ├── auth.js                ← Authentication module
│   ├── utils.js               ← Shared helpers & UI utilities
│   └── layout.js              ← Sidebar / topbar renderer
│
└── pages/
    ├── dashboard.html         ← Admin dashboard with KPIs
    ├── patients.html          ← Patient registration & records
    ├── doctors.html           ← Doctor management
    ├── appointments.html      ← Appointment scheduling
    ├── treatments.html        ← Treatment & medical history
    ├── billing.html           ← Billing & payment tracking
    └── users.html             ← User account management (admin)
```

---

## Step 1 — Create a Firebase Project

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"** → Give it a name (e.g. `medicore-hms`)
3. Disable Google Analytics (optional) → Click **Create project**

---

## Step 2 — Enable Firebase Services

### Authentication
1. In Firebase Console → **Build → Authentication**
2. Click **"Get started"**
3. Under **Sign-in providers**, enable **Email/Password**
4. Click **Save**

### Firestore Database
1. Go to **Build → Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll add rules later)
4. Select your preferred region → Click **Enable**

---

## Step 3 — Get Your Firebase Config

1. In Firebase Console → click the **gear icon ⚙** → **Project settings**
2. Scroll to **"Your apps"** → Click the **Web** icon (`</>`)
3. Register app with nickname `hms-web`
4. Copy the `firebaseConfig` object — it looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

5. Open `js/firebase-config.js` and **replace** the placeholder values with your actual config.

---

## Step 4 — Create the First Admin User

Since there are no users yet, you need to create the first admin directly in Firebase:

### Option A: Firebase Console (Easiest)

1. Go to **Authentication → Users → Add user**
2. Enter email: `admin@hospital.com` and a strong password
3. Copy the **User UID** shown in the Users table

4. Go to **Firestore → Start collection** → Collection ID: `users`
5. Document ID: *paste the UID you copied*
6. Add these fields:
   ```
   name         (string)  → "System Admin"
   email        (string)  → "admin@hospital.com"
   role         (string)  → "admin"
   status       (string)  → "active"
   createdAt    (timestamp) → current time
   ```

### Option B: Run the seed via the browser console
1. Open `index.html` after completing Step 3
2. Log in with the admin credentials created above
3. Open DevTools → Console tab
4. Copy all contents of `seed-data.js` and paste into the console, then press Enter
5. This populates demo patients, appointments, treatments, and bills

---

## Step 5 — Run Locally

**No build step needed** — this is pure HTML/CSS/JS.

### Option A: VS Code Live Server (recommended)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Browser opens at `http://127.0.0.1:5500`

### Option B: Python HTTP Server
```bash
cd hospital-mgmt
python3 -m http.server 8080
# Open http://localhost:8080
```

### Option C: Node.js `serve`
```bash
npm install -g serve
serve hospital-mgmt
# Open the URL shown
```

---

## Step 6 — Deploy Firebase Security Rules

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. In the `hospital-mgmt` folder:
   ```bash
   firebase init
   # Select: Firestore, Hosting
   # Use existing project → select your project
   # Firestore rules: firestore.rules (already exists)
   # Public directory: . (current directory)
   # Single-page app: No
   ```

3. Deploy:
   ```bash
   firebase deploy
   ```

4. Your app is live at `https://YOUR-PROJECT-ID.web.app` 🎉

---

## Step 7 — Create Additional Staff Users

1. Log in as Admin
2. Navigate to **User Management** (sidebar)
3. Click **"+ Create User"**
4. Fill in name, email, password, and role
5. Share credentials securely with the staff member

### Role Permissions Summary

| Feature           | Admin | Doctor | Receptionist |
|-------------------|-------|--------|--------------|
| Dashboard         | ✅    | ❌     | ❌           |
| Patients (view)   | ✅    | ✅     | ✅           |
| Patients (edit)   | ✅    | ✅     | ✅           |
| Patients (delete) | ✅    | ❌     | ❌           |
| Doctors           | ✅    | ❌     | ✅ (view)    |
| Appointments      | ✅    | ✅     | ✅           |
| Treatments        | ✅    | ✅     | ❌           |
| Billing           | ✅    | ❌     | ✅           |
| User Management   | ✅    | ❌     | ❌           |

---

## Default Demo Credentials

After running `seed-data.js`, use these to log in:

| Role          | Email                      | Password     |
|---------------|----------------------------|--------------|
| Admin         | admin@hospital.com         | *(set by you in Step 4)* |
| Doctor        | doctor@hospital.com        | *(create in User Management)* |
| Receptionist  | receptionist@hospital.com  | *(create in User Management)* |

---

## Troubleshooting

### "Missing or insufficient permissions"
→ Your Firestore security rules are blocking access. Either:
- Temporarily set rules to test mode in Firebase Console
- Or deploy `firestore.rules` using `firebase deploy --only firestore:rules`

### Firebase indexes error in console
→ Click the link in the error — it takes you directly to Firebase Console to create the needed composite index. Click **Create** and wait ~1 min.

### "auth/configuration-not-found"
→ You haven't enabled Email/Password authentication. Go to Firebase Console → Authentication → Sign-in method → Enable Email/Password.

### Blank page after login
→ Check `js/firebase-config.js` — make sure you replaced ALL placeholder values with your real Firebase config.

### CORS errors when running locally
→ Use **Live Server** extension or a local HTTP server (see Step 5). Don't open `index.html` directly as a `file://` URL.

---

## For Your University Report

### Technologies Used
- **Frontend:** HTML5, CSS3 (CSS Variables, Grid, Flexbox), Vanilla JavaScript (ES6+)
- **Backend-as-a-Service:** Firebase
  - **Authentication:** Email/Password sign-in with role-based access control
  - **Database:** Cloud Firestore (NoSQL, real-time, offline-capable)
  - **Hosting:** Firebase Hosting (CDN-delivered, HTTPS)
- **Design:** Custom design system with responsive layout

### System Architecture
```
Browser Client (HTML/CSS/JS)
         │
         │ HTTPS
         ▼
Firebase SDK (firebase-compat v9)
    ├── Firebase Auth ──► Manages login sessions & JWT tokens
    └── Cloud Firestore ──► Real-time NoSQL database
                              ├── users/
                              ├── patients/
                              ├── appointments/
                              ├── treatments/
                              └── bills/
```

### Key Features Implemented
1. **Multi-role Authentication** – Admin, Doctor, Receptionist with route guards
2. **Patient Registration** – Full demographic capture with auto-generated IDs
3. **Patient Profile View** – Tabbed view with appointment, treatment, bill history
4. **Doctor Management** – Staff profiles with schedule and specialization
5. **Appointment System** – CRUD with real-time status updates
6. **Medical Records** – Treatment history with vitals, medications, diagnoses
7. **Billing Module** – Line-item invoices, tax/discount, payment tracking, print
8. **Admin Dashboard** – KPI cards with live stats
9. **User Management** – Admin creates/removes staff accounts
10. **Security Rules** – Firestore rules enforce role-based data access

---

*MediCore HMS — Built for academic purposes. Extend with telehealth, lab results, medical imaging, and analytics modules.*
