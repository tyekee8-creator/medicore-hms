# 🏥 MediCore Hospital Management System

<div align="center">

![MediCore HMS](https://img.shields.io/badge/🏥_MediCore-Hospital_Management_System-0d9488?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-3b82f6?style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-Powered-orange?style=for-the-badge&logo=firebase&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live_&_Deployed-22c55e?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-8b5cf6?style=for-the-badge)

<br />

### 🌐 [LIVE DEMO → https://my-hospital-hms.web.app](https://my-hospital-hms.web.app)

<br />

> **A complete, modern, real-world Hospital Management System**
> Built with HTML, CSS, JavaScript & Firebase as a
> **Software Engineering Final Year Project — 2026**

<br />

[🌐 Live App](https://my-hospital-hms.web.app) &nbsp;•&nbsp;
[📁 Source Code](https://github.com/tyekee8-creator/medicore-hms) &nbsp;•&nbsp;
[🐛 Report Bug](https://github.com/tyekee8-creator/medicore-hms/issues) &nbsp;•&nbsp;
[⭐ Star this Repo](https://github.com/tyekee8-creator/medicore-hms)

</div>

---

## 📋 Table of Contents

- [🎯 About The Project](#-about-the-project)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ System Architecture](#️-system-architecture)
- [🗄️ Database Schema](#️-database-schema)
- [👥 User Roles & Permissions](#-user-roles--permissions)
- [🚀 Getting Started](#-getting-started)
- [🌐 Deployment](#-deployment)
- [📁 Project Structure](#-project-structure)
- [🔒 Security](#-security)
- [👨‍💻 Author](#-author)

---

## 🎯 About The Project

**MediCore HMS** is a fully functional, cloud-based Hospital Management System developed as a **Final Year Project** for a Bachelor of Software Engineering degree.

The system is **live and deployed** at 👉 **[https://my-hospital-hms.web.app](https://my-hospital-hms.web.app)**

It provides a comprehensive digital platform for managing all hospital operations:

- ✅ **Patient** registration, records and medical history
- ✅ **Doctor** profiles, schedules and specializations
- ✅ **Appointment** scheduling and real-time tracking
- ✅ **Treatment** records with vitals and prescriptions
- ✅ **Billing** with professional PDF invoice generation
- ✅ **Admin Dashboard** with live charts and KPI stats

All powered by a **real Firebase cloud backend** with proper authentication, role-based access control, and security rules enforced at the database level.

### 🌟 What makes this special:
- **Real backend** — Firebase Auth + Cloud Firestore
- **Real-time data** — Live updates without page refresh
- **Multi-language** — English, French, Swahili, Kinyarwanda
- **Dark/Light mode** — Full theme system
- **Mobile responsive** — Works on any device
- **PDF invoices** — Professional downloadable receipts
- **Live charts** — Chart.js powered analytics

---

## ✨ Features

### 🔐 Authentication & Security
- Email/Password login via Firebase Authentication
- **3 user roles** with different access levels
- Session-based persistence — requires fresh login on browser close
- Firestore security rules enforcing data access per role
- Route guards protecting every page

### 📊 Admin Dashboard
- Real-time KPI statistics cards
- 📊 **Bar Chart** — Appointments this week (last 7 days)
- 🍩 **Doughnut Chart** — Appointment status breakdown
- 💰 **Bar Chart** — Revenue last 6 months
- 🥧 **Pie Chart** — Billing status overview
- Today's appointments live table
- Recently registered patients
- Pending unpaid bills list

### 🧑‍⚕️ Patient Management
- Complete registration with full demographics
- Blood type, allergies, emergency contacts
- Auto-generated unique Patient IDs (`PAT-XXXXX`)
- Full tabbed patient profile (Appointments · Treatments · Bills)
- Search by name, ID, phone · Filter by blood type, status

### 👨‍⚕️ Doctor Management
- Staff profiles with specialization and department
- Working days scheduler + shift times
- License number and qualifications
- Stats: Total, Active, Departments, Today's appointments

### 📅 Appointment Scheduling
- Book appointments linking patients to specific doctors
- **5 appointment types:** Consultation, Follow-up, Emergency, Routine Checkup, Procedure
- **4 statuses:** Scheduled, Completed, Cancelled, No-show
- Quick status update from table row
- Filter by date, status, doctor name

### 💊 Treatments & Medical History
- Full clinical visit records per patient
- **Vitals tracking:** BP, Temperature, Weight, Pulse
- Diagnosis, symptoms, treatment plan documentation
- **Dynamic prescriptions** — add multiple medications with dosage & frequency
- Lab test orders
- Follow-up date scheduling
- Doctor's confidential notes section

### 💳 Billing & Payments
- **Line-item invoice** creation with multiple services
- Discount ($) and tax (%) calculation — auto-computes total
- **6 payment methods:** Cash, Card, Insurance, Bank Transfer, Mobile Money
- **3 payment statuses:** Unpaid, Partial, Paid — auto-detected
- **🖨️ Print Invoice** directly from browser
- **📄 Download PDF** — Professional A4 document saved to device
- Revenue stats, outstanding balances, unpaid bills counter

### 👥 User Management (Admin Only)
- Create staff accounts (saved to Firebase Auth + Firestore)
- Assign roles: Admin, Doctor, Receptionist
- Doctor-specific fields: Specialization, Department, License
- Remove staff accounts from the system
- 
### 🌙 Dark / Light Mode
- Complete dark theme across every single page
- One-click toggle from topbar on all pages
- Theme saved in `localStorage` — remembers preference
- Smooth CSS transition between themes

### 📱 Fully Responsive Design
- ☰ Hamburger menu with slide-in sidebar on mobile
- Bottom sheet modals on mobile devices
- Optimized layouts for phones (360px+), tablets and desktops
- Minimum 44px touch targets for mobile usability

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, Vanilla JS ES6+ | UI & Logic |
| **Authentication** | Firebase Auth | Login, Sessions, Security |
| **Database** | Cloud Firestore | Real-time NoSQL database |
| **Hosting** | Firebase Hosting | CDN, HTTPS, Global deployment |
| **Charts** | Chart.js 4.4 | Dashboard analytics |
| **PDF Export** | jsPDF + html2canvas | Invoice document generation |
| **Fonts** | Google Fonts (DM Sans + Playfair Display) | Typography |
| **Icons** | Emoji-based icon system | UI icons |
| **Version Control** | Git + GitHub | Source control |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────┐
│                  Browser Client                  │
│         HTML5 + CSS3 + Vanilla JavaScript        │
│                                                  │
│  index.html ──► pages/ ──► js/ modules          │
│  (Login)        (Dashboard,   (auth, utils,      │
│                  Patients,     layout, i18n)      │
│                  Doctors,                        │
│                  Appointments,                   │
│                  Treatments,                     │
│                  Billing,                        │
│                  Users)                          │
└──────────────────────┬───────────────────────────┘
                       │ HTTPS / Firebase SDK v9
                       ▼
┌──────────────────────────────────────────────────┐
│                  Firebase Platform               │
│                                                  │
│  ┌─────────────────┐   ┌──────────────────────┐  │
│  │  Firebase Auth  │   │   Cloud Firestore    │  │
│  │                 │   │                      │  │
│  │  • Email/Pass   │   │  collections:        │  │
│  │  • JWT Tokens   │   │  ├── users/          │  │
│  │  • Sessions     │   │  ├── patients/       │  │
│  │  • Role check   │   │  ├── appointments/   │  │
│  └─────────────────┘   │  ├── treatments/     │  │
│                        │  └── bills/          │  │
│  ┌─────────────────────────────────────────┐  │  │
│  │         Firestore Security Rules        │  │  │
│  │  Role-based read/write enforcement      │  │  │
│  └─────────────────────────────────────────┘  │  │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │           Firebase Hosting               │   │
│  │  CDN · HTTPS · Global edge network       │   │
│  │  https://my-hospital-hms.web.app         │   │
│  └──────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### `users/` — Staff accounts
```json
{
  "name": "Dr. Emily Carter",
  "email": "emily@hospital.com",
  "role": "doctor",
  "specialization": "Cardiology",
  "department": "Internal Medicine",
  "licenseNo": "MD-12345",
  "qualifications": "MBBS, MD",
  "workingDays": ["Mon","Tue","Wed","Thu","Fri"],
  "shiftStart": "08:00",
  "shiftEnd": "17:00",
  "status": "active",
  "createdAt": "Timestamp"
}
```

### `patients/` — Patient records
```json
{
  "patientId": "PAT-ABC123",
  "name": "Alice Johnson",
  "dob": "1985-03-12",
  "gender": "Female",
  "bloodType": "A+",
  "phone": "+1 555 0101",
  "email": "alice@email.com",
  "address": "12 Oak St, Springfield",
  "allergies": "Penicillin",
  "ecName": "Bob Johnson",
  "ecPhone": "+1 555 0102",
  "status": "active",
  "createdAt": "Timestamp"
}
```

### `appointments/` — Visit scheduling
```json
{
  "patientId": "firestore_doc_id",
  "doctorId": "firestore_doc_id",
  "patientName": "Alice Johnson",
  "doctorName": "Dr. Emily Carter",
  "date": "2026-07-07",
  "time": "09:00",
  "type": "consultation",
  "status": "scheduled",
  "reason": "Annual checkup",
  "notes": "Patient notes here",
  "createdAt": "Timestamp"
}
```

### `treatments/` — Medical records
```json
{
  "patientId": "firestore_doc_id",
  "doctorId": "firestore_doc_id",
  "visitDate": "2026-07-07",
  "visitType": "consultation",
  "symptoms": "Headache, fatigue for 3 days",
  "diagnosis": "Tension headache",
  "treatmentPlan": "Rest, hydration, stress management",
  "medications": [
    {"name": "Paracetamol", "dosage": "500mg", "frequency": "Twice daily"},
    {"name": "Vitamin B12", "dosage": "1000mcg", "frequency": "Once daily"}
  ],
  "vitals": {
    "bp": "120/80 mmHg",
    "temp": "98.6°F",
    "weight": "65kg",
    "pulse": "72 bpm"
  },
  "labTests": "CBC, Thyroid panel",
  "followUpDate": "2026-07-21",
  "notes": "Doctor confidential notes",
  "createdAt": "Timestamp"
}
```

### `bills/` — Invoices & payments
```json
{
  "billId": "BILL-ABC123",
  "patientId": "firestore_doc_id",
  "patientName": "Alice Johnson",
  "billDate": "2026-07-07",
  "items": [
    {"name": "Consultation Fee", "qty": 1, "price": 200},
    {"name": "Blood Panel CBC", "qty": 1, "price": 150},
    {"name": "X-Ray", "qty": 2, "price": 120}
  ],
  "subtotal": 590,
  "discount": 50,
  "taxPct": 5,
  "totalAmount": 567.00,
  "amountPaid": 567.00,
  "paymentMethod": "card",
  "insuranceProvider": "",
  "status": "paid",
  "notes": "Payment received",
  "createdAt": "Timestamp"
}
```

---

## 👥 User Roles & Permissions

| Feature | 👑 Admin | 👨‍⚕️ Doctor | 💁 Receptionist |
|---------|:-------:|:--------:|:--------------:|
| Dashboard & Charts | ✅ | ❌ | ❌ |
| View Patients | ✅ | ✅ | ✅ |
| Register Patients | ✅ | ✅ | ✅ |
| Edit Patients | ✅ | ✅ | ✅ |
| Delete Patients | ✅ | ❌ | ❌ |
| View Doctors | ✅ | ❌ | ✅ |
| Add/Edit Doctors | ✅ | ❌ | ❌ |
| View Appointments | ✅ | ✅ own | ✅ |
| Book Appointments | ✅ | ✅ | ✅ |
| View Treatments | ✅ | ✅ own | ❌ |
| Add Treatments | ✅ | ✅ | ❌ |
| View Billing | ✅ | ❌ | ✅ |
| Create Bills | ✅ | ❌ | ✅ |
| Download PDF | ✅ | ❌ | ✅ |
| Delete Bills | ✅ | ❌ | ❌ |
| User Management | ✅ | ❌ | ❌ |

**Login redirects:**
- Admin → Dashboard
- Doctor → Appointments
- Receptionist → Patients

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- [Firebase account](https://console.firebase.google.com)
- [Node.js](https://nodejs.org) *(for deployment only)*

### 1. Clone the repository
```bash
git clone https://github.com/tyekee8-creator/medicore-hms.git
cd medicore-hms
```

### 2. Create Firebase project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project → name it anything
3. Enable **Email/Password Authentication**
   - Build → Authentication → Sign-in method → Email/Password
4. Create **Firestore Database**
   - Build → Firestore → Create database → Start in test mode
5. Enable **Firebase Hosting**
   - Build → Hosting → Get started

### 3. Add your Firebase config
Open `js/firebase-config.js` — replace with your credentials:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();
```

### 4. Create your first Admin user

**In Firebase Console → Authentication → Users → Add user:**
```
Email:    admin@hospital.com
Password: (your choice)
```
Copy the **UID** shown.

**In Firebase Console → Firestore → Start collection:**
```
Collection: users
Document ID: (paste the UID)

Fields:
  name     → "System Admin"
  email    → "admin@hospital.com"
  role     → "admin"
  status   → "active"
```

### 5. Run locally
```bash
# Option A: VS Code Live Server (recommended)
# Right-click index.html → Open with Live Server

# Option B: Python
python3 -m http.server 8080
# Open: http://localhost:8080

# Option C: Node.js
npx serve .
```

### 6. Login
```
URL:      http://127.0.0.1:5500
Email:    admin@hospital.com
Password: (what you set)
Role:     Admin
```

---

## 🌐 Deployment

### Deploy to Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (answer: . → N → N → N)
firebase init hosting

# Deploy!
firebase deploy
```

**Your app goes live at:**
```
https://YOUR-PROJECT-ID.web.app
https://YOUR-PROJECT-ID.firebaseapp.com
```

### Push updates to GitHub
```bash
git add .
git commit -m "Update: description of changes"
git push
```

### Redeploy after changes
```bash
firebase deploy
```

---

## 📁 Project Structure

```
medicore-hms/
│
├── 📄 index.html                 ← Login page (entry point)
├── 📄 firebase.json              ← Firebase hosting configuration
├── 📄 firestore.rules            ← Database security rules
├── 📄 DATABASE_SCHEMA.md         ← Full database documentation
├── 📄 SETUP.md                   ← Detailed setup instructions
├── 📄 seed-data.js               ← Demo data population script
│
├── 📁 css/
│   └── 🎨 style.css              ← Complete design system
│                                    Light mode + Dark mode
│                                    Mobile responsive breakpoints
│                                    CSS custom properties (variables)
│
├── 📁 js/
│   ├── 🔧 firebase-config.js     ← Firebase credentials & init
│   ├── 🌍 i18n.js                ← Multi-language (EN/FR/SW/RW)
│   ├── 🔐 auth.js                ← Authentication & session mgmt
│   ├── 🛠️  utils.js               ← Shared helpers, toasts, badges
│   └── 🏗️  layout.js              ← Sidebar, topbar, mobile menu
│
└── 📁 pages/
    ├── 📊 dashboard.html         ← Admin dashboard + 4 charts
    ├── 🧑‍⚕️ patients.html          ← Patient CRUD + profile view
    ├── 👨‍⚕️ doctors.html            ← Doctor management
    ├── 📅 appointments.html       ← Appointment scheduling
    ├── 💊 treatments.html         ← Medical records + vitals
    ├── 💳 billing.html            ← Invoicing + PDF download
    └── 👥 users.html              ← User account management
```

---

## 🔒 Security

| Security Layer | Implementation |
|----------------|---------------|
| **Authentication** | Firebase Auth — passwords hashed by Firebase, never stored |
| **Session Control** | `sessionStorage` — cleared when browser closes |
| **Route Guards** | `Auth.requireAuth()` on every protected page |
| **Role Enforcement** | Client-side role check + Firestore security rules |
| **Database Rules** | Role-based read/write rules in `firestore.rules` |
| **HTTPS** | Enforced by Firebase Hosting on all traffic |

---

## 🧪 Test Accounts

After setup, create these accounts from **User Management**:

| Role | Email | Access Level |
|------|-------|-------------|
| Admin | `admin@hospital.com` | Full system access |
| Doctor | `doctor@hospital.com` | Clinical pages only |
| Receptionist | `receptionist@hospital.com` | Admin pages only |

---

## 📈 Project Statistics

| Metric | Value |
|--------|-------|
| Total Files | 18 files |
| Lines of Code | 5,700+ lines |
| Pages | 8 pages |
| Features | 15+ major features |
| Languages Supported | 4 languages |
| Firebase Collections | 5 collections |
| Chart Types | 4 chart types |
| Deployment | Firebase Hosting (Live) |

---

## 👨‍💻 Author

<div align="center">

### tyekee8-creator

**Bachelor of Software Engineering**
**Final Year Project — 2026**

[![GitHub](https://img.shields.io/badge/GitHub-tyekee8--creator-181717?style=for-the-badge&logo=github)](https://github.com/tyekee8-creator)
[![Live Demo](https://img.shields.io/badge/Live_Demo-my--hospital--hms.web.app-0d9488?style=for-the-badge&logo=firebase)](https://my-hospital-hms.web.app)

</div>

---

## 📄 License

```
MIT License

Copyright (c) 2026 tyekee8-creator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

## 🏥 MediCore Hospital Management System

**Live at → [https://my-hospital-hms.web.app](https://my-hospital-hms.web.app)**

Built with ❤️ using **HTML · CSS · JavaScript · Firebase**

---

⭐ **Please star this repository if you found it helpful!** ⭐

*Software Engineering Final Year Project — 2026*

</div>
