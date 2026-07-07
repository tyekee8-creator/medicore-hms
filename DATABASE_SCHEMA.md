# Firestore Database Schema
## MediCore Hospital Management System

---

## Collections Overview

```
firestore/
├── users/          → Staff accounts (admin, doctor, receptionist)
├── patients/       → Patient registrations & demographics
├── appointments/   → Scheduled visits
├── treatments/     → Medical records & history
└── bills/          → Invoices & payment tracking
```

---

## Collection: `users`

Stores all system staff user accounts. Created via Firebase Auth + mirrored here.

```json
{
  "uid":            "firebase_auth_uid",        // Document ID = Firebase Auth UID
  "name":           "Dr. Emily Carter",
  "email":          "emily@hospital.com",
  "role":           "doctor",                   // "admin" | "doctor" | "receptionist"
  "phone":          "+1 555 0100",
  "status":         "active",                   // "active" | "inactive" | "on-leave"

  // Doctor-specific fields
  "specialization": "Cardiology",
  "department":     "Internal Medicine",
  "licenseNo":      "MD-12345",
  "qualifications": "MBBS, MD",
  "workingDays":    ["Mon","Tue","Wed","Thu","Fri"],
  "shiftStart":     "08:00",
  "shiftEnd":       "17:00",

  "createdAt":  Timestamp,
  "updatedAt":  Timestamp
}
```

---

## Collection: `patients`

Patient demographic and registration data.

```json
{
  "patientId":  "PAT-ABC123",              // Auto-generated friendly ID
  "name":       "Alice Johnson",
  "dob":        "1985-03-12",              // ISO date string
  "gender":     "Female",                  // "Male" | "Female" | "Other"
  "bloodType":  "A+",                      // "A+" | "A-" | "B+" | ... | "O-"
  "phone":      "+1 555 0101",
  "email":      "alice@email.com",
  "address":    "12 Oak St, Springfield",

  "ecName":     "Bob Johnson",             // Emergency contact name
  "ecPhone":    "+1 555 0102",             // Emergency contact phone
  "allergies":  "Penicillin",
  "notes":      "Patient notes...",
  "status":     "active",                  // "active" | "inactive"

  "createdAt":  Timestamp,
  "updatedAt":  Timestamp
}
```

---

## Collection: `appointments`

Scheduled and historical patient visits.

```json
{
  "patientId":   "patients_doc_id",
  "doctorId":    "users_doc_id",
  "patientName": "Alice Johnson",          // Denormalized for query speed
  "doctorName":  "Dr. Emily Carter",       // Denormalized for query speed

  "date":   "2025-08-15",                  // ISO date string (YYYY-MM-DD)
  "time":   "09:00",                       // HH:MM 24hr format
  "type":   "consultation",               // "consultation"|"follow-up"|"emergency"|"routine-checkup"|"procedure"
  "status": "scheduled",                  // "scheduled"|"completed"|"cancelled"|"no-show"
  "reason": "Annual checkup",
  "notes":  "...",

  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

---

## Collection: `treatments`

Full medical records per visit.

```json
{
  "patientId":    "patients_doc_id",
  "doctorId":     "users_doc_id",
  "patientName":  "Alice Johnson",
  "doctorName":   "Dr. Emily Carter",

  "visitDate":    "2025-08-15",
  "visitType":    "consultation",

  "symptoms":     "Headache, fatigue for 3 days",
  "diagnosis":    "Tension headache, stress-related",
  "treatmentPlan":"Rest, hydration, stress management",

  "medications": [
    { "name": "Paracetamol", "dosage": "500mg", "frequency": "Twice daily" },
    { "name": "Vitamin B12",  "dosage": "1000mcg", "frequency": "Once daily" }
  ],

  "labTests":     "CBC, Thyroid panel",
  "followUpDate": "2025-08-30",

  "vitals": {
    "bp":     "118/76",
    "temp":   "98.6°F",
    "weight": "65kg",
    "pulse":  "72 bpm"
  },

  "notes":      "Doctor's private notes...",
  "createdAt":  Timestamp,
  "updatedAt":  Timestamp
}
```

---

## Collection: `bills`

Invoices and payment records.

```json
{
  "billId":      "BILL-ABC123",
  "patientId":   "patients_doc_id",
  "patientName": "Alice Johnson",

  "billDate":    "2025-08-15",

  "items": [
    { "name": "Consultation", "qty": 1, "price": 200 },
    { "name": "Blood Panel",  "qty": 1, "price": 150 },
    { "name": "X-Ray",        "qty": 2, "price": 120 }
  ],

  "subtotal":    590,
  "discount":    50,
  "taxPct":      5,
  "totalAmount": 567,               // (subtotal - discount) + tax

  "amountPaid":       200,
  "paymentMethod":    "card",       // "cash"|"card"|"insurance"|"bank-transfer"|"mobile-money"
  "insuranceProvider":"BlueCross",

  "status":  "partial",             // "unpaid" | "partial" | "paid"
  "notes":   "Billing notes...",

  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

---

## Recommended Firestore Indexes

Create these composite indexes in Firebase Console → Firestore → Indexes:

| Collection     | Fields                                    | Order |
|---------------|-------------------------------------------|-------|
| appointments  | date ASC, time ASC                        | ASC   |
| appointments  | doctorId ASC, date DESC                   | —     |
| appointments  | patientId ASC, date DESC                  | —     |
| treatments    | patientId ASC, createdAt DESC             | —     |
| treatments    | doctorId ASC, createdAt DESC              | —     |
| bills         | patientId ASC, createdAt DESC             | —     |
| bills         | status ASC, createdAt DESC                | —     |

Most indexes are created automatically when queries first run in development mode.
