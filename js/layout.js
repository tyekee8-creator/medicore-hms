// ============================================================
// layout.js  –  Renders sidebar + topbar + mobile menu
// ============================================================

const Layout = (() => {

  const navConfig = {
    admin: [
      { section: 'Overview' },
      { href: 'dashboard.html',    icon: '📊', label: 'Dashboard' },
      { section: 'Hospital' },
      { href: 'patients.html',     icon: '🧑‍⚕️', label: 'Patients' },
      { href: 'doctors.html',      icon: '👨‍⚕️', label: 'Doctors' },
      { href: 'appointments.html', icon: '📅', label: 'Appointments' },
      { section: 'Clinical' },
      { href: 'treatments.html',   icon: '💊', label: 'Treatments' },
      { href: 'billing.html',      icon: '💳', label: 'Billing' },
      { section: 'Admin' },
      { href: 'users.html',        icon: '👥', label: 'User Management' },
    ],
    doctor: [
      { section: 'My Work' },
      { href: 'appointments.html', icon: '📅', label: 'My Appointments' },
      { href: 'patients.html',     icon: '🧑‍⚕️', label: 'Patients' },
      { href: 'treatments.html',   icon: '💊', label: 'Treatments' },
    ],
    receptionist: [
      { section: 'Daily Work' },
      { href: 'patients.html',     icon: '🧑‍⚕️', label: 'Patients' },
      { href: 'appointments.html', icon: '📅', label: 'Appointments' },
      { href: 'billing.html',      icon: '💳', label: 'Billing' },
    ]
  };

  function render(user) {
    const currentPage = window.location.pathname.split('/').pop();
    const links = navConfig[user.role] || navConfig.receptionist;

    const navHTML = links.map(item => {
      if (item.section) return `<div class="nav-section-label">${item.section}</div>`;
      const active = currentPage === item.href ? 'active' : '';
      return `<a href="${item.href}" class="nav-item ${active}">
        <span class="nav-item-icon">${item.icon}</span>
        <span>${item.label}</span>
      </a>`;
    }).join('');

    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);

    // Build language selector safely
    var langSelectorHTML = '';
    try {
      if (typeof I18n !== 'undefined') {
        langSelectorHTML = I18n.buildSelector();
      }
    } catch(e) {
      langSelectorHTML = '';
    }

    const sidebar = `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-brand">
            <div class="sidebar-brand-icon">🏥</div>
            <div>
              <div class="sidebar-brand-name">MediCore</div>
              <div class="sidebar-brand-sub">HMS v1.0</div>
            </div>
          </div>
        </div>
        <div class="sidebar-user">
          <div class="sidebar-user-info">
            <div class="sidebar-avatar">${initials}</div>
            <div>
              <div class="sidebar-user-name">${user.name}</div>
              <div class="sidebar-user-role">${user.role}</div>
            </div>
          </div>
        </div>
        <nav class="sidebar-nav">${navHTML}</nav>
        <div class="sidebar-footer">
          <button onclick="Auth.logout()" class="btn btn-secondary btn-full btn-sm">
            🚪 Sign Out
          </button>
        </div>
      </aside>
      <div class="sidebar-overlay" id="sidebar-overlay"></div>`;

    const topbar = `
      <header class="topbar">
        <div class="topbar-left">
          <button class="mobile-menu-btn" id="mobile-menu-btn" title="Menu">☰</button>
          <h1 id="page-title">Loading…</h1>
        </div>
        <div class="topbar-right">
          <div class="topbar-time" id="live-time"></div>
          ${langSelectorHTML}
          <button class="theme-toggle" id="theme-toggle-btn" title="Toggle Dark/Light Mode">🌙</button>
        </div>
      </header>`;

    document.body.insertAdjacentHTML('afterbegin', sidebar + topbar);

    // ── Theme toggle ──────────────────────────────
    var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    var toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
      toggleBtn.addEventListener('click', function() {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        var newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('hms-theme', newTheme);
        toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      });
    }

    // ── Language dropdown toggle ──────────────────
    var langBtn = document.getElementById('lang-btn');
    var langDropdown = document.getElementById('lang-dropdown');
    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('open');
      });
      document.addEventListener('click', function() {
        if (langDropdown) langDropdown.classList.remove('open');
      });
    }

    // ── Mobile sidebar toggle ─────────────────────
    var menuBtn   = document.getElementById('mobile-menu-btn');
    var sidebarEl = document.getElementById('sidebar');
    var overlayEl = document.getElementById('sidebar-overlay');

    function openSidebar() {
      if (sidebarEl) sidebarEl.classList.add('open');
      if (overlayEl) overlayEl.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      if (sidebarEl) sidebarEl.classList.remove('open');
      if (overlayEl) overlayEl.classList.remove('show');
      document.body.style.overflow = '';
    }

    if (menuBtn)   menuBtn.addEventListener('click', openSidebar);
    if (overlayEl) overlayEl.addEventListener('click', closeSidebar);

    // Close sidebar when nav link tapped on mobile
    document.querySelectorAll('.nav-item').forEach(function(item) {
      item.addEventListener('click', function() {
        if (window.innerWidth <= 768) closeSidebar();
      });
    });

    // Close sidebar on window resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) closeSidebar();
    });

    // ── Live clock ────────────────────────────────
    function updateClock() {
      var el = document.getElementById('live-time');
      if (el) el.textContent = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ── Apply translations if i18n loaded ─────────
    try {
      if (typeof I18n !== 'undefined') I18n.applyTranslations();
    } catch(e) {}
  }

  function setTitle(title) {
    var el = document.getElementById('page-title');
    if (el) el.textContent = title;
    document.title = title + ' – MediCore HMS';
  }

  return { render, setTitle };
})();