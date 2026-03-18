// ============================================
// M.A.R.C – I 🔱 Crown's Council Page
// ============================================

async function renderCouncil(container) {
  const page = createElement('div', 'page animate-fade-in');
  
  page.innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon"><i data-lucide="loader-2" class="lucide-spin"></i></div>
      <h2 class="empty-state__title">Accessing Executive Audit...</h2>
    </div>
  `;
  container.appendChild(page);
  lucide.createIcons();

  try {
    const data = await window.api.get('/council');
    const c = data.report || { 
      weekStart: new Date().toISOString(), weekEnd: new Date().toISOString(), 
      overallScore: 0, previousWeekScore: 0, verdict: "No data", 
      ministryBreakdown: [], directives: [], failures: [], patterns: []
    };
    const ministriesInfo = data.ministriesBreakdown || [];

    const scoreDiff = ((c.overallScore || 0) - (c.previousWeekScore || 0)).toFixed(1);
    const diffColor = scoreDiff >= 0 ? 'var(--success)' : 'var(--danger)';
    const diffSign = scoreDiff >= 0 ? '+' : '';

    let breakdownHtml = c.ministryBreakdown && c.ministryBreakdown.length > 0 ? c.ministryBreakdown.map(mDb => {
      // Find static config like avatar, color, icon from MOCK_DATA if not fully in DB
      let m = ministriesInfo.find(mi => mi.id === mDb.ministryId) || {};
      const minConfig = MOCK_DATA.ministries[m.id || m.slug] || { name: m.name || 'Unknown', icon: '❓', colorDim: '#222', color: '#fff' };
      
      const score = mDb.score || 0;
      const status = score >= 80 ? 'strong' : score >= 50 ? 'steady' : 'failing';

      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: var(--space-3)">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: ${minConfig.colorDim}; color: ${minConfig.color}; display: flex; align-items: center; justify-content: center; font-size: 10px;">${minConfig.icon}</div>
              <span style="font-weight: var(--fw-semibold)">${minConfig.name}</span>
            </div>
          </td>
          <td style="color: var(--text-muted)">${minConfig.avatar || 'N/A'}</td>
          <td class="font-mono font-bold" style="color: var(--text-primary)">${score} <span style="color: var(--text-muted); font-weight: normal; font-size: var(--fs-xs)">/ 100</span></td>
          <td>
            <span class="badge" style="background: ${getStatusColor(status)}22; color: ${getStatusColor(status)}">
              <span class="badge__dot" style="background: currentColor"></span> ${status}
            </span>
          </td>
          <td style="color: var(--success)">-</td>
        </tr>
      `;
    }).join('') : `<tr><td colspan="5" style="text-align:center; color: var(--text-muted)">Awaiting first weekly audit.</td></tr>`;

    let directivesHtml = (c.directives || []).map((d, i) => `
      <div class="directive-item">
        <div class="directive-item__number">0${i + 1}</div>
        <div class="directive-item__text">${d}</div>
      </div>
    `).join('') || `<div style="color: var(--text-muted)">No directives issued.</div>`;

    let failuresHtml = (c.failures || []).map(f => `
      <li style="margin-bottom: var(--space-2); display: flex; gap: var(--space-3);">
        <span style="color: var(--danger)">✗</span>
        <span style="color: var(--text-secondary)">${f}</span>
      </li>
    `).join('') || `<li style="color: var(--text-muted)">None recorded.</li>`;

    let patternsHtml = (c.patterns || []).map(p => `
      <li style="margin-bottom: var(--space-2); display: flex; gap: var(--space-3);">
        <span style="color: var(--gold)">👁</span>
        <span style="color: var(--text-secondary)">${p}</span>
      </li>
    `).join('') || `<li style="color: var(--text-muted)">Awaiting data accumulation.</li>`;

    page.innerHTML = `
      <div class="page-header">
        <div class="page-header__greeting">Weekly Audit</div>
        <h1 class="page-header__title">Crown's <span>Council</span></h1>
      </div>

      <div class="council-grid">
        
        <div class="council-grid__header card" style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-5) var(--space-6)">
          <div>
            <div style="font-size: var(--fs-sm); color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-1)">Session Date</div>
            <div class="font-mono fw-semibold" style="font-size: var(--fs-lg)">${formatDate(c.weekEnd, 'long')}</div>
          </div>
          <div style="text-align: right">
            <div style="font-size: var(--fs-sm); color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--space-1)">Audit Window</div>
            <div class="font-mono" style="color: var(--text-secondary)">${formatDate(c.weekStart)} — ${formatDate(c.weekEnd)}</div>
          </div>
        </div>

        <div class="council-grid__summary card">
          <div class="score-hero" style="padding: var(--space-2); border-right: 1px solid var(--border-subtle)">
            <div class="score-hero__label">Council Verdict Score</div>
            <div class="score-hero__value" style="font-size: var(--fs-3xl); margin: var(--space-3) 0">
              ${c.overallScore} <span class="score-hero__max">/ 100</span>
            </div>
            <div style="font-size: var(--fs-sm); color: ${diffColor}; font-weight: var(--fw-semibold)">
              ${diffSign}${scoreDiff} vs last week
            </div>
          </div>
          
          <div class="chart-container" style="grid-column: span 3; padding: 0 var(--space-4)">
            <div class="chart-container__title" style="margin-bottom: var(--space-1)">Ministry Contribution</div>
            <div style="height: 180px;">
              <canvas id="council-stacked-chart"></canvas>
            </div>
          </div>
        </div>

        <div class="council-grid__verdict">
          <div class="verdict-box">
            <div class="verdict-box__label">Executive Verdict</div>
            <div class="verdict-box__text">${c.verdict}</div>
          </div>
        </div>

        <div class="council-grid__breakdown card">
          <h3 style="font-size: var(--fs-md); text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: var(--space-4);">Ministry Performance</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>Ministry</th>
                <th>Representative</th>
                <th>Score</th>
                <th>Status</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              ${breakdownHtml}
            </tbody>
          </table>
        </div>

        <div class="card" style="display: flex; flex-direction: column; gap: var(--space-6);">
          <div>
            <h3 style="font-size: var(--fs-md); text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: var(--space-4);">Pattern Recognition</h3>
            <ul style="padding-left: 0; list-style: none">${patternsHtml}</ul>
          </div>
          <div>
            <h3 style="font-size: var(--fs-md); text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: var(--space-4);">Identified Failures</h3>
            <ul style="padding-left: 0; list-style: none">${failuresHtml}</ul>
          </div>
        </div>

        <div class="council-grid__directives card">
          <h3 style="font-size: var(--fs-md); text-transform: uppercase; letter-spacing: 1px; color: var(--gold); margin-bottom: var(--space-4);">Next-Week Directives</h3>
          <div style="display: flex; flex-direction: column;">
            ${directivesHtml}
          </div>
        </div>

      </div>
    `;

    requestAnimationFrame(() => {
      // Stub out the stacked chart for now until we fully wire it dynamically
      const ctx = document.getElementById('council-stacked-chart');
      if (ctx) renderCouncilChart('council-stacked-chart', MOCK_DATA.ministryWeekly);
    });

  } catch (err) {
    console.error(err);
    page.innerHTML = `
      <div class="empty-state">
        <h2 class="empty-state__title text-danger">Council Unavailable</h2>
        <p class="empty-state__text">Could not load the executive audit report.</p>
      </div>
    `;
  }
}
