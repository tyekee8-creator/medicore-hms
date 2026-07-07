// ============================================================
// seed-data.js
// Run in browser console after logging in as admin, OR
// run as a Node.js script with firebase-admin SDK.
//
// BROWSER USAGE:
//   1. Open index.html in a browser
//   2. Log in as admin
//   3. Navigate to any page, open DevTools console
//   4. Paste and run this script
// ============================================================

async function seedDatabase() {
  console.log('🌱 Starting database seed...');

  const batch = db.batch();
  const now = firebase.firestore.FieldValue.serverTimestamp();

  // ── Seed Patients ──────────────────────────────────────────
  const patients = [
    { name: 'Alice Johnson',   dob: '1985-03-12', gender: 'Female', bloodType: 'A+',  phone: '+1 555 0101', email: 'alice@email.com',   address: '12 Oak St, Springfield', ecName: 'Bob Johnson',  ecPhone: '+1 555 0102', allergies: 'Penicillin', status: 'active' },
    { name: 'Robert Smith',    dob: '1972-07-25', gender: 'Male',   bloodType: 'O-',  phone: '+1 555 0103', email: 'robert@email.com',  address: '45 Maple Ave, Springfield', ecName: 'Mary Smith', ecPhone: '+1 555 0104', allergies: 'None', status: 'active' },
    { name: 'Maria Garcia',    dob: '1990-11-08', gender: 'Female', bloodType: 'B+',  phone: '+1 555 0105', email: 'maria@email.com',   address: '78 Pine Rd, Springfield', ecName: 'Carlos Garcia', ecPhone: '+1 555 0106', allergies: 'Sulfa', status: 'active' },
    { name: 'James Wilson',    dob: '1965-01-30', gender: 'Male',   bloodType: 'AB+', phone: '+1 555 0107', email: 'james@email.com',   address: '22 Elm St, Springfield', ecName: 'Linda Wilson', ecPhone: '+1 555 0108', allergies: 'Aspirin', status: 'active' },
    { name: 'Sarah Chen',      dob: '1998-06-15', gender: 'Female', bloodType: 'O+',  phone: '+1 555 0109', email: 'sarah@email.com',   address: '99 Cedar Ln, Springfield', ecName: 'Wei Chen',  ecPhone: '+1 555 0110', allergies: 'None', status: 'active' },
    { name: 'David Brown',     dob: '1955-09-22', gender: 'Male',   bloodType: 'A-',  phone: '+1 555 0111', email: 'david@email.com',   address: '34 Birch Ct, Springfield', ecName: 'Susan Brown', ecPhone: '+1 555 0112', allergies: 'Latex', status: 'active' },
  ];

  const patientRefs = [];
  for (const p of patients) {
    const ref = db.collection('patients').doc();
    patientRefs.push({ id: ref.id, name: p.name });
    batch.set(ref, { ...p, patientId: 'PAT-' + ref.id.slice(0,6).toUpperCase(), createdAt: now, updatedAt: now });
  }

  // ── Seed Appointments ──────────────────────────────────────
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const appointments = [
    { patientName: 'Alice Johnson',  doctorName: 'Dr. Emily Carter', date: today,     time: '09:00', type: 'consultation',    status: 'scheduled',  reason: 'Annual checkup' },
    { patientName: 'Robert Smith',   doctorName: 'Dr. Michael Lee',  date: today,     time: '10:30', type: 'follow-up',       status: 'completed',  reason: 'Post-surgery review' },
    { patientName: 'Maria Garcia',   doctorName: 'Dr. Emily Carter', date: today,     time: '11:00', type: 'consultation',    status: 'scheduled',  reason: 'Headaches and dizziness' },
    { patientName: 'James Wilson',   doctorName: 'Dr. Sarah Patel',  date: today,     time: '14:00', type: 'routine-checkup', status: 'no-show',    reason: 'Routine blood pressure check' },
    { patientName: 'Sarah Chen',     doctorName: 'Dr. Michael Lee',  date: today,     time: '15:30', type: 'emergency',       status: 'completed',  reason: 'Acute abdominal pain' },
    { patientName: 'David Brown',    doctorName: 'Dr. Sarah Patel',  date: tomorrow,  time: '09:00', type: 'follow-up',       status: 'scheduled',  reason: 'Diabetes management review' },
    { patientName: 'Alice Johnson',  doctorName: 'Dr. Emily Carter', date: tomorrow,  time: '11:30', type: 'procedure',       status: 'scheduled',  reason: 'Minor skin biopsy' },
  ];

  for (const a of appointments) {
    const ref = db.collection('appointments').doc();
    batch.set(ref, { ...a, patientId: 'demo', doctorId: 'demo', createdAt: now, updatedAt: now });
  }

  // ── Seed Treatments ────────────────────────────────────────
  const treatments = [
    {
      patientName: 'Robert Smith', doctorName: 'Dr. Michael Lee',
      visitDate: today, visitType: 'follow-up',
      symptoms: 'Mild pain at incision site, some swelling',
      diagnosis: 'Normal post-operative healing, no signs of infection',
      treatmentPlan: 'Continue prescribed antibiotics for 5 more days, keep wound dry',
      medications: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily' },
        { name: 'Ibuprofen',   dosage: '400mg', frequency: 'As needed for pain' }
      ],
      labTests: 'CBC, wound culture', followUpDate: tomorrow,
      vitals: { bp: '122/78', temp: '98.4°F', weight: '82kg', pulse: '74 bpm' },
      notes: 'Patient is recovering well. Remind him to complete full antibiotic course.'
    },
    {
      patientName: 'Sarah Chen', doctorName: 'Dr. Michael Lee',
      visitDate: today, visitType: 'emergency',
      symptoms: 'Severe abdominal pain, nausea, vomiting, fever 101°F',
      diagnosis: 'Acute appendicitis confirmed via ultrasound',
      treatmentPlan: 'Laparoscopic appendectomy scheduled for tonight',
      medications: [
        { name: 'IV Morphine', dosage: '4mg', frequency: 'Every 4 hours PRN' },
        { name: 'Cefazolin',   dosage: '1g',  frequency: 'Pre-operative' }
      ],
      labTests: 'CBC, CRP, Ultrasound abdomen, CT scan', followUpDate: '',
      vitals: { bp: '110/70', temp: '101.2°F', weight: '58kg', pulse: '95 bpm' },
      notes: 'Emergency surgery scheduled. Patient and family informed and consented.'
    },
  ];

  for (const t of treatments) {
    const ref = db.collection('treatments').doc();
    batch.set(ref, { ...t, patientId: 'demo', doctorId: 'demo', createdAt: now, updatedAt: now });
  }

  // ── Seed Bills ─────────────────────────────────────────────
  const bills = [
    {
      patientName: 'Robert Smith', billDate: today,
      items: [
        { name: 'Surgeon Consultation', qty: 1, price: 350 },
        { name: 'Post-op Dressing',     qty: 2, price: 45 },
        { name: 'CBC Lab Test',         qty: 1, price: 85 }
      ],
      subtotal: 525, discount: 0, taxPct: 0, totalAmount: 525,
      amountPaid: 525, paymentMethod: 'card', status: 'paid'
    },
    {
      patientName: 'Sarah Chen', billDate: today,
      items: [
        { name: 'Emergency Consultation', qty: 1, price: 500 },
        { name: 'Appendectomy (Laparoscopic)', qty: 1, price: 3500 },
        { name: 'Anesthesia',              qty: 1, price: 800 },
        { name: 'Hospital Room (1 night)', qty: 1, price: 600 },
        { name: 'Medications',             qty: 1, price: 200 }
      ],
      subtotal: 5600, discount: 0, taxPct: 0, totalAmount: 5600,
      amountPaid: 2000, paymentMethod: 'insurance', status: 'partial',
      insuranceProvider: 'BlueCross BlueShield'
    },
    {
      patientName: 'Alice Johnson', billDate: today,
      items: [
        { name: 'Annual Physical Exam', qty: 1, price: 200 },
        { name: 'Blood Panel',          qty: 1, price: 150 }
      ],
      subtotal: 350, discount: 0, taxPct: 0, totalAmount: 350,
      amountPaid: 0, paymentMethod: '', status: 'unpaid'
    },
  ];

  for (const b of bills) {
    const ref = db.collection('bills').doc();
    batch.set(ref, { ...b, patientId: 'demo', billId: 'BILL-' + ref.id.slice(0,6).toUpperCase(), createdAt: now, updatedAt: now });
  }

  await batch.commit();
  console.log('✅ Seed data written successfully!');
  console.log(`   • ${patients.length} patients`);
  console.log(`   • ${appointments.length} appointments`);
  console.log(`   • ${treatments.length} treatment records`);
  console.log(`   • ${bills.length} bills`);
  console.log('\n🔄 Refresh the page to see the data.');
}

seedDatabase().catch(console.error);
