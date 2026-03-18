// ============================================
// M.A.R.C – I 🔱 Chart.js Wrapper
// ============================================

// ── Shared Chart Defaults ──
const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#1a1a2e',
      titleColor: '#e8e8ec',
      bodyColor: '#8a8a9a',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      titleFont: { family: 'Inter', weight: '600' },
      bodyFont: { family: 'JetBrains Mono' },
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
      ticks: { color: '#4a4a56', font: { family: 'Inter', size: 11 } },
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
      ticks: { color: '#4a4a56', font: { family: 'JetBrains Mono', size: 11 } },
    },
  },
};

/**
 * Render 7-day Laurel Score trend line
 */
function renderTrendLine(canvasId, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.day),
      datasets: [{
        label: 'Laurel Score',
        data: data.map(d => d.score),
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderWidth: 2.5,
        pointBackgroundColor: '#d4af37',
        pointBorderColor: '#0a0a0f',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
      }],
    },
    options: {
      ...CHART_DEFAULTS,
      scales: {
        ...CHART_DEFAULTS.scales,
        y: {
          ...CHART_DEFAULTS.scales.y,
          min: 0,
          max: 100,
          ticks: {
            ...CHART_DEFAULTS.scales.y.ticks,
            stepSize: 25,
            callback: v => v + '%',
          },
        },
      },
    },
  });
}

/**
 * Render weekly comparison (current vs previous)
 */
function renderWeeklyComparison(canvasId, currentData, previousData) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: currentData.map(d => d.day),
      datasets: [
        {
          label: 'This Week',
          data: currentData.map(d => d.score),
          backgroundColor: 'rgba(212, 175, 55, 0.7)',
          borderColor: '#d4af37',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.6,
        },
        {
          label: 'Last Week',
          data: previousData.map(d => d.score),
          backgroundColor: 'rgba(138, 138, 154, 0.3)',
          borderColor: 'rgba(138, 138, 154, 0.5)',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.6,
        },
      ],
    },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            color: '#6e6e7a',
            font: { family: 'Inter', size: 11 },
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 3,
            useBorderRadius: true,
            padding: 16,
          },
        },
      },
      scales: {
        ...CHART_DEFAULTS.scales,
        y: {
          ...CHART_DEFAULTS.scales.y,
          min: 0,
          max: 100,
        },
      },
    },
  });
}

/**
 * Render ministry breakdown radar/doughnut
 */
function renderMinistryBreakdown(canvasId, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const colors = ['#d4af37', '#3498db', '#9b59b6', '#2ecc71'];
  const names = Object.values(MOCK_DATA.ministries).map(m => m.name);
  const scores = Object.keys(MOCK_DATA.ministries).map(id => getMinistryCompletion(id).percentage);

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: names,
      datasets: [{
        label: 'Ministry Performance',
        data: scores,
        backgroundColor: 'rgba(212, 175, 55, 0.15)',
        borderColor: '#d4af37',
        borderWidth: 2,
        pointBackgroundColor: colors,
        pointBorderColor: '#0a0a0f',
        pointBorderWidth: 2,
        pointRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: CHART_DEFAULTS.plugins.tooltip,
      },
      scales: {
        r: {
          angleLines: { color: 'rgba(255,255,255,0.06)' },
          grid: { color: 'rgba(255,255,255,0.06)' },
          pointLabels: {
            color: '#8a8a9a',
            font: { family: 'Inter', size: 12, weight: '500' },
          },
          ticks: {
            color: '#4a4a56',
            backdropColor: 'transparent',
            font: { family: 'JetBrains Mono', size: 10 },
            stepSize: 25,
          },
          min: 0,
          max: 100,
        },
      },
    },
  });
}

/**
 * Render ministry contribution stacked bar for council
 */
function renderCouncilChart(canvasId, ministryWeekly) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const ministryKeys = Object.keys(MOCK_DATA.ministries);
  const colors = ['#d4af37', '#3498db', '#9b59b6', '#2ecc71'];

  const datasets = ministryKeys.map((key, i) => ({
    label: MOCK_DATA.ministries[key].name,
    data: ministryWeekly[key].scores,
    backgroundColor: colors[i] + 'cc',
    borderColor: colors[i],
    borderWidth: 1,
    borderRadius: 2,
  }));

  new Chart(ctx, {
    type: 'bar',
    data: { labels: days, datasets },
    options: {
      ...CHART_DEFAULTS,
      plugins: {
        ...CHART_DEFAULTS.plugins,
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            color: '#6e6e7a',
            font: { family: 'Inter', size: 11 },
            boxWidth: 12,
            boxHeight: 12,
            borderRadius: 3,
            useBorderRadius: true,
            padding: 12,
          },
        },
      },
      scales: {
        ...CHART_DEFAULTS.scales,
        x: { ...CHART_DEFAULTS.scales.x, stacked: true },
        y: { ...CHART_DEFAULTS.scales.y, stacked: true },
      },
    },
  });
}
