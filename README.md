# 🏥 MediCore Hospital Management System

<div align="center">

![MediCore HMS](https://img.shields.io/badge/MediCore-Hospital%20Management%20System-teal?style=for-the-badge&logo=heart&logoColor=white)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-Backend-orange?style=for-the-badge&logo=firebase)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A complete, modern, full-stack Hospital Management System built for a Software Engineering Final Year Project.**

[🌐 Live Demo](https://my-hospital-hms.web.app) • [📁 Repository](https://github.com/tyekee8-creator/medicore-hms) • [🐛 Report Bug](https://github.com/tyekee8-creator/medicore-hms/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Author](#author)

---

## 🎯 About The Project

**MediCore HMS** is a real-world Hospital Management System developed as a Final Year Project for a Bachelor of Software Engineering degree. It provides a comprehensive platform for managing all hospital operations including patient registration, doctor management, appointment scheduling, treatment records, and billing — all powered by a real-time cloud backend.

The system supports **three user roles** (Admin, Doctor, Receptionist), **four languages** (English, French, Swahili, Kinyarwanda), **dark/light mode**, and is fully **responsive** for mobile, tablet, and desktop devices.

---

## ✨ Features

### 🔐 Authentication & Security
- Email/Password login via Firebase Authentication
- Role-based access control (Admin, Doctor, Receptionist)
- Session-based persistence — requires fresh login on browser close
- Firestore security rules enforcing data access per role

### 👥 User Management (Admin)
- Create staff accounts (Admin, Doctor, Receptionist)
- Manage all system users
- Role assignment and account removal

### 🧑‍⚕️ Patient Management
- Complete patient registration with demographics
- Blood type, allergies, emergency contacts
- Auto-generated unique Patient IDs
- Full patient profile with history tabs (Appointments, Treatments, Bills)
- Search and filter by name, ID, blood type, status

### 👨‍⚕️ Doctor Management
- Doctor profiles with specialization and department
- Working days and shift scheduling
- License number and qualifications tracking
- Department-based filtering

### 📅 Appointment Scheduling
- Book appointments linking patients and doctors
- Appointment types: Consultation, Follow-up, Emergency, Routine Checkup, Procedure
- Real-time status updates (Scheduled, Completed, Cancelled, No-show)
- Filter by date, status, doctor
- Live stats dashboard

### 💊 Treatments & Medical History
- Full clinical records per visit
- Vitals tracking (BP, Temperature, Weight, Pulse)
- Diagnosis, symptoms, treatment plan
- Dynamic medication prescriptions with dosage and frequency
- Lab test records
- Follow-up date scheduling
- Doctor's confidential notes

### 💳 Billing & Payments
- Line-item invoice creation
- Discount and tax calculation
- Payment method tracking (Cash, Card, Insurance, Bank Transfer, Mobile Money)
- Bill status: Unpaid, Partial, Paid
- **Print invoice** directly from browser
- **Download PDF** — professional A4 invoice document
- Revenue and outstanding balance statistics

### 📊 Admin Dashboard
- Real-time KPI stats (Patients, Doctors, Appointments, Revenue, Unpaid Bills)
- **Bar Chart** — Appointments this week
- **Doughnut Chart** — Appointment status breakdown
- **Bar Chart** — Revenue last 6 months
- **Pie Chart** — Billing status overview
- Today's appointments table
- Recently registered patients
- Pending unpaid bills

### 🌍 Multi-Language Support
- 🇺🇸 English
- 🇫🇷 French (Français)
- 🇰🇪 Swahili (Kiswahili)
- 🇷🇼 Kinyarwanda
- Language preference saved and persists across all pages

### 🌙 Dark / Light Mode
- Full dark mode support across all pages
- Preference saved in localStorage
- Instant toggle from topbar

### 📱 Fully Responsive
- Mobile-friendly with hamburger sidebar navigation
- Bottom sheet modals on mobile
- Optimized for phones (360px+), tablets, and desktops

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Authentication** | Firebase Authentication (Email/Password) |
| **Database** | Cloud Firestore (NoSQL, Real-time) |
| **Hosting** | Firebase Hosting (CDN, HTTPS) |
| **Charts** | Chart.js 4.4 |
| **PDF Generation** | jsPDF + html2canvas |
| **Design System** | Custom CSS Variables, DM Sans + Playfair Display fonts |
| **Version Control** | Git + GitHub |

---

## 🏗️ System Architecture
