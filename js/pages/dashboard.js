// ============================================
// M.A.R.C – I 🔱 Dashboard Page
// ============================================

async function renderDashboard(container) {
  const page = createElement('div', 'page animate-fade-in');
  
  // Show loading state first
  page.innerHTML = `
    <div class="empty-state">
      <div class="empty-state__icon"><i data-lucide="loader-2" class="lucide-spin"></i></div>
      <h2 class="empty-state__title">Syncing with M.A.R.C Core...</h2>
    </div>
  `;
  container.appendChild(page);
  lucide.createIcons();

  try {
    const data = await window.api.get('/dashboard');
    
    // Once data is loaded, render the actual dashboard
    page.innerHTML = `
      <div class="page-header">
        <div class="page-header__greeting">${getGreeting()},</div>
        <h1 class="page-header__title"><span>King</span>. The Empire Awaits.</h1>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-grid__hero" id="dashboard-hero">
          <!-- Score Card injected here -->
          <!-- Streak injected here -->
        </div>
        
        <div class="dashboard-grid__ministries" id="dashboard-ministries">
          <!-- Ministry Cards injected here -->
        </div>
        
        <div class="dashboard-grid__charts">
          <div class="card chart-container animate-fade-in" style="animation-delay: 400ms">
            <div class="chart-container__title">7-Day Trajectory</div>
            <div style="height: 250px;">
              <canvas id="trend-chart"></canvas>
            </div>
          </div>
          
          <div class="card chart-container animate-fade-in" style="animation-delay: 500ms">
            <div class="chart-container__title">Week vs Week</div>
            <div style="height: 250px;">
              <canvas id="comparison-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;

    // Mount components with live data
    const heroContainer = document.getElementById('dashboard-hero');
    if (heroContainer) {
      // Temporarily mock MOCK_DATA structure so score-card.js still works, 
      // or modify score-card.js directly. We will supply data.
      window.CURRENT_DASHBOARD = data;
      renderScoreHero(heroContainer, data.todayScore);
      renderStreak(heroContainer, data.streak);
    }

    const ministriesContainer = document.getElementById('dashboard-ministries');
    if (ministriesContainer) {
      renderMinistryCards(ministriesContainer, data.ministries);
    }

    // Render Charts
    requestAnimationFrame(() => {
      // Convert API trend data to array of numbers for Chart.js wrapper
      const trendValues = data.trend.map(t => t.score);
      renderTrendLine('trend-chart', trendValues);
      // For Weekly Comparison, use mock for now or omit
      renderWeeklyComparison('comparison-chart', trendValues, [65,70,68,58,82,75,72]);
    });
  } catch (err) {
    console.error(err);
    page.innerHTML = `
      <div class="empty-state">
        <h2 class="empty-state__title text-danger">Data Sync Failed</h2>
        <p class="empty-state__text">Could not load dashboard data from backend.</p>
      </div>
    `;
  }
}
