// ============================================
// M.A.R.C – I 🔱 Ministry Detail Page
// ============================================

window.currentMinistryId = null; // Store for global functions

async function renderMinistry(container, ministryId) {
  window.currentMinistryId = ministryId;
  const page = createElement('div', 'page animate-fade-in');

  // Loading state
  page.innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon"><i data-lucide="loader-2" class="lucide-spin"></i></div>
      <h2 class="empty-state__title">Accessing Ministry Records...</h2>
    </div>
  `;
  container.appendChild(page);
  lucide.createIcons();

  try {
    const ministry = await window.api.get(`/ministry/${ministryId}`);
    
    // We get id, name, avatar, status, score, actions[], logs[] from API
    // Calculate raw numbers for UI display
    const actionsCount = ministry.actions.length;
    const actionsCompleted = ministry.actions.filter(a => a.completed).length;
    let completionPercentage = Math.round((actionsCompleted / Math.max(1, actionsCount)) * 100);
    const statusColor = getStatusColor(ministry.status || 'steady');
    
    let actionsHtml = ministry.actions.map((action, i) => `
      <div class="action-item" style="animation-delay: ${i * 50}ms">
        <div class="action-item__check ${action.completed ? 'checked' : ''}" 
             data-id="${action.id}"
             onclick="toggleAction(this)">
        </div>
        <div class="action-item__text ${action.completed ? 'completed' : ''}">${action.text}</div>
      </div>
    `).join('');

    let logsHtml = ministry.logs.map(log => `
      <tr>
        <td class="font-mono" style="width: 120px;">${formatDate(log.date)}</td>
        <td>
          <span class="badge" style="background: var(--bg-card); color: var(--text-muted); margin-right: var(--space-3)">Intel</span>
          ${log.action}
        </td>
      </tr>
    `).join('');

    const color = ministry.color || 'var(--gold)';
    const colorDim = ministry.color ? ministry.color.replace(')', ', 0.15)').replace('rgb', 'rgba') : 'rgba(212, 175, 55, 0.15)'; // simple assumption

    page.innerHTML = `
      <div class="page-header">
        <div class="page-header__greeting">Ministry of</div>
        <h1 class="page-header__title" style="color: ${color}">${ministry.name}</h1>
      </div>

      <div class="ministry-detail">
        
        <div class="ministry-detail__header card" style="border-left: 4px solid ${color}">
          <div class="ministry-detail__avatar" style="background: ${colorDim}; color: ${color}">
            🔱
          </div>
          <div class="ministry-detail__info">
            <h2 style="color: ${color}">${ministry.avatar || ''}</h2>
            <p>${ministry.description || ''}</p>
          </div>
        </div>

        <div class="ministry-detail__stats card">
          <div class="stat-card">
            <div class="stat-card__value" style="color: ${statusColor}">${completionPercentage}%</div>
            <div class="stat-card__label">Today's Readiness</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value">N/A</div>
            <div class="stat-card__label">Weekly Average</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value" style="color: var(--success)">↑</div>
            <div class="stat-card__label">7-Day Trend</div>
          </div>
        </div>

        <div class="ministry-detail__actions card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
            <h3 style="font-size: var(--fs-md); text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);">Today's Directives</h3>
            <span class="font-mono fw-bold" style="color: ${statusColor}">${actionsCompleted} / ${actionsCount} tasks</span>
          </div>
          <div class="progress" style="margin-bottom: var(--space-5)">
            <div class="progress__fill" style="width: ${completionPercentage}%; background: ${statusColor}"></div>
          </div>
          <div class="action-list">
            ${actionsHtml}
          </div>
        </div>

        <div class="ministry-detail__log card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
            <h3 style="font-size: var(--fs-md); text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted);">Activity Intel</h3>
            <button class="btn btn--ghost" style="padding: var(--space-2) var(--space-3)" onclick="promptManualLog()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span style="margin-left: var(--space-2)">Log Entry</span>
            </button>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Action Report</th>
              </tr>
            </thead>
            <tbody id="log-table-body">
              ${logsHtml}
            </tbody>
          </table>
        </div>

      </div>
    `;
  } catch(err) {
    console.error(err);
    page.innerHTML = `
      <div class="empty-state">
        <h2 class="empty-state__title text-danger">Ministry Offline</h2>
        <p class="empty-state__text">Could not retrieve records from the mainframe.</p>
        <a href="#/" class="btn btn--gold" style="margin-top: var(--space-4)">Return to Dashboard</a>
      </div>
    `;
  }
}

// Global handler for action toggles wired to API
window.toggleAction = async function(el) {
  if (!window.currentMinistryId) return;
  const actionId = el.getAttribute('data-id');
  
  // Optimistic UI update
  const isChecked = el.classList.contains('checked');
  const textEl = el.nextElementSibling;
  
  if (isChecked) {
    el.classList.remove('checked');
    textEl.classList.remove('completed');
  } else {
    el.classList.add('checked');
    textEl.classList.add('completed');
  }

  try {
    await window.api.put(`/ministry/${window.currentMinistryId}/actions/${actionId}/toggle`);
    // Full refresh optionally: handleRoute();
  } catch(err) {
    console.error("Failed to toggle action", err);
    // Revert UI on failure
    if (isChecked) {
      el.classList.add('checked');
      textEl.classList.add('completed');
    } else {
      el.classList.remove('checked');
      textEl.classList.remove('completed');
    }
  }
};

window.promptManualLog = async function() {
  if (!window.currentMinistryId) return;
  const entry = prompt("Enter manual activity intel:");
  if (entry) {
    try {
      const response = await window.api.post(`/ministry/${window.currentMinistryId}/logs`, {
        action: entry,
        impact: 'Manual'
      });
      // Prepend to table visually
      const tbody = document.getElementById('log-table-body');
      if (tbody) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="font-mono" style="width: 120px;">${response.date}</td>
          <td>
            <span class="badge" style="background: var(--bg-card); color: var(--text-muted); margin-right: var(--space-3)">Intel</span>
            ${response.action}
          </td>
        `;
        tbody.prepend(tr);
      }
    } catch(err) {
      console.error(err);
      alert("Failed to save log entry to M.A.R.C.");
    }
  }
};
