// ============================================
// M.A.R.C – I 🔱 Streak Counter Component
// ============================================

function renderStreak(container, streakValue) {
  const streak = streakValue || 0;
  // Fallback to MOCK_DATA for the personal best since it's not in the API yet
  const best = MOCK_DATA && MOCK_DATA.king ? MOCK_DATA.king.bestStreak : 0;

  const el = createElement('div', 'card streak animate-fade-in');
  el.innerHTML = `
    <div class="streak__icon">🔥</div>
    <div>
      <div class="streak__count" id="streak-count">0</div>
      <div class="streak__label">Days of Discipline</div>
    </div>
    <div style="margin-left: auto; text-align: right;">
      <div style="font-size: var(--fs-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Best</div>
      <div class="font-mono fw-semibold" style="color: var(--text-secondary);">${best}</div>
    </div>
  `;

  container.appendChild(el);

  requestAnimationFrame(() => {
    const countEl = document.getElementById('streak-count');
    if (countEl) animateCount(countEl, streak, 1000);
  });
}
