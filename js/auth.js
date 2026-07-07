// ============================================================
// auth.js  –  Authentication & role management
// ============================================================

const Auth = (() => {

  // ── Sign in with email/password ──────────────────────────
  async function login(email, password) {
    // Set session persistence — clears when browser/tab closes
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

    const cred = await auth.signInWithEmailAndPassword(email, password);
    const userDoc = await db.collection('users').doc(cred.user.uid).get();
    if (!userDoc.exists) {
      await auth.signOut();
      throw new Error('User profile not found. Contact your administrator.');
    }

    const userData = { uid: cred.user.uid, ...userDoc.data() };

    // Save login timestamp so we can track session age
    sessionStorage.setItem('hms-login-time', Date.now().toString());
    sessionStorage.setItem('hms-logged-in', 'true');

    return userData;
  }

  // ── Sign out ──────────────────────────────────────────────
  async function logout() {
    sessionStorage.removeItem('hms-login-time');
    sessionStorage.removeItem('hms-logged-in');
    await auth.signOut();
    window.location.href = '../index.html';
  }

  // ── Check if this is a fresh intentional login ────────────
  function isSessionValid() {
    return sessionStorage.getItem('hms-logged-in') === 'true';
  }

  // ── Get current user with role ────────────────────────────
  function onAuthChange(callback) {
    return auth.onAuthStateChanged(async function(user) {
      if (user) {
        const doc = await db.collection('users').doc(user.uid).get();
        callback(doc.exists ? { uid: user.uid, ...doc.data() } : null);
      } else {
        callback(null);
      }
    });
  }

  // ── Guard pages — redirect if not logged in / wrong role ──
  function requireAuth(allowedRoles) {
    allowedRoles = allowedRoles || [];
    return new Promise(function(resolve) {
      auth.onAuthStateChanged(async function(user) {

        // Not logged in at all → go to login
        if (!user) {
          window.location.href = '../index.html';
          return;
        }

        // Session not valid (e.g. auto-restored by Firebase) → force re-login
        if (!isSessionValid()) {
          await auth.signOut();
          window.location.href = '../index.html';
          return;
        }

        // Get user profile
        var doc;
        try {
          doc = await db.collection('users').doc(user.uid).get();
        } catch(e) {
          window.location.href = '../index.html';
          return;
        }

        if (!doc.exists) {
          await auth.signOut();
          window.location.href = '../index.html';
          return;
        }

        var userData = Object.assign({ uid: user.uid }, doc.data());

        // Check role permission
        if (allowedRoles.length && allowedRoles.indexOf(userData.role) === -1) {
          alert('Access denied: insufficient permissions for this page.');
          window.location.href = '../index.html';
          return;
        }

        resolve(userData);
      });
    });
  }

  // ── Create user account (admin only) ─────────────────────
  async function createUser(email, password, name, role, extraData) {
    extraData = extraData || {};
    var secondaryApp = firebase.initializeApp(
      firebase.app().options,
      'Secondary' + Date.now()
    );
    var secondaryAuth = secondaryApp.auth();
    var cred = await secondaryAuth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(cred.user.uid).set(
      Object.assign({
        name: name,
        email: email,
        role: role,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }, extraData)
    );
    await secondaryAuth.signOut();
    await secondaryApp.delete();
    return cred.user.uid;
  }

  return { login, logout, onAuthChange, requireAuth, createUser, isSessionValid };
})();