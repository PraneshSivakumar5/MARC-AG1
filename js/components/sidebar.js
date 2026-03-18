// ============================================
// M.A.R.C – I 🔱 Sidebar Component
// ============================================

function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sidebar__header">
      <div class="sidebar__brand">
        <div class="sidebar__logo">🔱</div>
        <div>
          <div class="sidebar__title">M.A.R.C</div>
          <div class="sidebar__subtitle">Inevitable</div>
        </div>
      </div>
    </div>

    <nav class="sidebar__nav">
      <div class="nav__section-label">Command</div>
      <a href="#/" class="nav__link" data-route="/" id="nav-dashboard">
        <svg class="nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        Dashboard
      </a>

      <div class="nav__section-label" style="margin-top: var(--space-4)">Ministries</div>
      <a href="#/ministry/wealth" class="nav__link" data-route="/ministry/wealth" id="nav-wealth">
        <svg class="nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
        Wealth · Mike
      </a>
      <a href="#/ministry/work" class="nav__link" data-route="/ministry/work" id="nav-work">
        <svg class="nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
        Work · Donna
      </a>
      <a href="#/ministry/stoicism" class="nav__link" data-route="/ministry/stoicism" id="nav-stoicism">
        <svg class="nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
        Stoicism · Caesar
      </a>
      <a href="#/ministry/health" class="nav__link" data-route="/ministry/health" id="nav-health">
        <svg class="nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        Queen's Health · Aurelia
      </a>

      <div class="nav__section-label" style="margin-top: var(--space-4)">Intel</div>
      <a href="#/council" class="nav__link" data-route="/council" id="nav-council">
        <svg class="nav__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        Crown's Council
      </a>
    </nav>

    <div class="sidebar__footer">
      <div class="sidebar__date" id="sidebar-date">${getFormattedNow()}</div>
      <div class="sidebar__status">
        <span class="sidebar__status-dot"></span>
        System Active
      </div>
    </div>
  `;

  updateActiveNav();
}

function updateActiveNav() {
  const hash = window.location.hash || '#/';
  const route = hash.replace('#', '');

  document.querySelectorAll('.nav__link').forEach(link => {
    const linkRoute = link.getAttribute('data-route');
    if (route === linkRoute || (route.startsWith('/ministry/') && linkRoute === route)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}
