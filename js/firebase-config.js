const firebaseConfig = {
  apiKey: "AIzaSyCLVnpweeR69JiFwaVoz4wsEn2u6boHsQ8",
  authDomain: "my-hospital-hms.firebaseapp.com",
  projectId: "my-hospital-hms",
  storageBucket: "my-hospital-hms.firebasestorage.app",
  messagingSenderId: "50932039110",
  appId: "1:50932039110:web:ba37afa29790bbead106c7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence().catch(err => {
  if (err.code === 'failed-precondition') {
    console.warn('Persistence failed: multiple tabs open');
  } else if (err.code === 'unimplemented') {
    console.warn('Persistence not available in this browser');
  }
});