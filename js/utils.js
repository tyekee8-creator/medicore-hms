// Apply saved theme on every page load
(function() {
  var saved = localStorage.getItem('hms-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

// ============================================================
// utils.js  –  Shared helpers used across all pages
// ============================================================

const Utils = (() => {

  // ── Toast notifications ──────────────────────────────────
  function toast(msg, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
    t.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ'}</span><span>${msg}</span>`;
    container.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
  }

  // ── Date helpers ─────────────────────────────────────────
  function formatDate(ts) {
    if (!ts) return '—';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function formatDateTime(ts) {
    if (!ts) return '—';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function today() {
    return new Date().toISOString().split('T')[0];
  }

  // ── ID generators ────────────────────────────────────────
  function genPatientId() {
    return 'PAT-' + Date.now().toString(36).toUpperCase();
  }

  function genBillId() {
    return 'BILL-' + Date.now().toString(36).toUpperCase();
  }

  // ── DOM helpers ──────────────────────────────────────────
  function qs(sel, ctx = document) { return ctx.querySelector(sel); }
  function qsa(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

  function setLoading(btn, loading) {
    if (loading) {
      btn.dataset.origText = btn.textContent;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> Loading…';
    } else {
      btn.disabled = false;
      btn.textContent = btn.dataset.origText || 'Submit';
    }
  }

  function emptyState(msg = 'No records found.') {
    return `<tr><td colspan="20" class="empty-state"><div class="empty-icon">📋</div><p>${msg}</p></td></tr>`;
  }

  // ── Currency ─────────────────────────────────────────────
  function currency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
  }

  // ── Badge HTML ───────────────────────────────────────────
  function badge(text, color) {
    return `<span class="badge badge-${color}">${text}</span>`;
  }

  function statusBadge(status) {
    const map = {
      scheduled: 'blue', completed: 'green', cancelled: 'red', 'no-show': 'orange',
      paid: 'green', unpaid: 'red', partial: 'orange',
      active: 'green', inactive: 'gray'
    };
    return badge(status, map[status] || 'gray');
  }

  return { toast, formatDate, formatDateTime, today, genPatientId, genBillId, qs, qsa, setLoading, emptyState, currency, badge, statusBadge };
})();