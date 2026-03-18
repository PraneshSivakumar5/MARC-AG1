// ============================================
// M.A.R.C – I 🔱 Ministry Card Component
// ============================================

function renderMinistryCards(container, ministriesApiData) {
  const grid = createElement('div', 'dashboard-grid__ministries');

  // If using API data, it's an array of objects. Otherwise fallback to Object.entries for MOCK_DATA
  const items = ministriesApiData ? ministriesApiData : Object.values(MOCK_DATA.ministries);

  items.forEach((ministry, index) => {
    // Determine completion percentage from live API data
    let completionPercentage = 0;
    if (ministriesApiData) {
      completionPercentage = Math.round((ministry.actionsCompleted / Math.max(1, ministry.actionsCount)) * 100);
    } else {
      completionPercentage = getMinistryCompletion(ministry.id).percentage;
    }
    
    // Status approximation
    const status = completionPercentage >= 80 ? 'strong' : completionPercentage >= 50 ? 'steady' : 'failing';
    const earned = ministry.actionsCompleted || 0;
    const total = ministry.actionsCount || 0;

    const card = createElement('div', `card ministry-card animate-fade-in`);
    card.setAttribute('data-status', status);
    card.style.animationDelay = `${index * 100}ms`;
    card.onclick = () => { window.location.hash = `#/ministry/${ministry.id || ministry.slug}`; };

    const scoreColorClass = getScoreColorClass(completionPercentage);
    const progressClass = completionPercentage >= 80 ? 'success' : completionPercentage >= 50 ? 'warning' : 'danger';

    card.innerHTML = `
      <div class="ministry-card__header">
        <div class="ministry-card__identity">
          <div class="ministry-card__avatar ministry-card__avatar--${ministry.id || ministry.slug}">${ministry.icon || '🔱'}</div>
          <div>
            <div class="ministry-card__name">${ministry.name}</div>
            <div class="ministry-card__guide">${ministry.avatar || ''}</div>
          </div>
        </div>
        <div class="ministry-card__score ministry-card__score--${scoreColorClass}">${completionPercentage}%</div>
      </div>
      <div class="progress">
        <div class="progress__fill progress__fill--${progressClass}" style="width: ${completionPercentage}%"></div>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: var(--space-2);">
        <span style="font-size: var(--fs-xs); color: var(--text-muted);">${earned}/${total} actions</span>
        <span class="badge badge--${status === 'strong' ? 'success' : status === 'steady' ? 'warning' : 'danger'}">
          <span class="badge__dot"></span>
          ${status}
        </span>
      </div>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);
}
