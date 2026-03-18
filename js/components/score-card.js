// ============================================
// M.A.R.C – I 🔱 Score Card Component
// ============================================

function renderScoreHero(container, todayScorePercentage) {
  const state = getMotivationalState(todayScorePercentage);

  const el = createElement('div', 'card score-hero animate-fade-in-scale');
  el.innerHTML = `
    <div class="score-hero__label">Laurel Score · Today</div>
    <div class="score-hero__ring">
      <svg viewBox="0 0 180 180">
        <circle class="score-hero__ring-bg" cx="90" cy="90" r="80"/>
        <circle class="score-hero__ring-fill" id="score-ring" cx="90" cy="90" r="80"/>
      </svg>
      <div class="score-hero__ring-value" id="score-value">0</div>
    </div>
    <div class="score-hero__verdict" style="color: ${state.color}">
      <strong>${state.label}</strong> — ${state.message}
    </div>
  `;

  container.appendChild(el);

  // Animate after mount
  requestAnimationFrame(() => {
    const ring = document.getElementById('score-ring');
    const value = document.getElementById('score-value');
    if (ring) animateRing(ring, todayScorePercentage);
    if (value) animateCount(value, todayScorePercentage);
  });
}

function renderScoreCard(container) {
  const today = calculateTodayScore();

  const el = createElement('div', 'card score-hero animate-fade-in-scale');
  el.style.padding = 'var(--space-6)';
  el.innerHTML = `
    <div class="score-hero__label">Score Breakdown</div>
    <div style="margin-top: var(--space-4);">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-2);">
        <span style="font-size: var(--fs-sm); color: var(--text-secondary);">Completed</span>
        <span class="font-mono fw-bold" style="color: var(--gold);">${today.earned} / ${today.total}</span>
      </div>
      <div class="progress">
        <div class="progress__fill progress__fill--gold" style="width: ${today.percentage}%"></div>
      </div>
      <div style="margin-top: var(--space-5); display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
        ${Object.entries(MOCK_DATA.ministries).map(([id, m]) => {
          const c = getMinistryCompletion(id);
          return `
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <span style="font-size: var(--fs-xs);">${m.icon}</span>
              <span style="font-size: var(--fs-xs); color: var(--text-muted);">${m.name}</span>
              <span class="font-mono" style="font-size: var(--fs-xs); color: ${getScoreColor(c.percentage)}; margin-left: auto;">${c.percentage}%</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  container.appendChild(el);
}
