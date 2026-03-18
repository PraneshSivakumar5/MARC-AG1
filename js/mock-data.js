// ============================================
// M.A.R.C – I 🔱 Mock Data
// ============================================

const MOCK_DATA = {
  // ── King Profile ──
  king: {
    name: 'King',
    title: 'Supreme Commander',
    streak: 12,
    bestStreak: 23,
  },

  // ── Ministry Definitions ──
  ministries: {
    wealth: {
      id: 'wealth',
      name: 'Wealth',
      avatar: 'Mike',
      icon: '💰',
      color: '#d4af37',
      colorDim: 'rgba(212, 175, 55, 0.15)',
      description: 'Income, freelance, trading, financial moves',
      actions: [
        { id: 'w1', text: 'Review trading positions', completed: true, weight: 3 },
        { id: 'w2', text: 'Log freelance income', completed: true, weight: 2 },
        { id: 'w3', text: 'Update expense tracker', completed: false, weight: 2 },
        { id: 'w4', text: 'Prospect new client leads', completed: false, weight: 3 },
      ],
    },
    work: {
      id: 'work',
      name: 'Work',
      avatar: 'Donna',
      icon: '⚡',
      color: '#3498db',
      colorDim: 'rgba(52, 152, 219, 0.15)',
      description: 'Project output, client delivery, coding hours',
      actions: [
        { id: 'k1', text: 'Code for 4+ focused hours', completed: true, weight: 4 },
        { id: 'k2', text: 'Push to GitHub', completed: true, weight: 2 },
        { id: 'k3', text: 'Client deliverable progress', completed: true, weight: 3 },
        { id: 'k4', text: 'Document architecture decisions', completed: false, weight: 1 },
      ],
    },
    stoicism: {
      id: 'stoicism',
      name: 'Stoicism',
      avatar: 'Julius Caesar',
      icon: '🏛️',
      color: '#9b59b6',
      colorDim: 'rgba(155, 89, 182, 0.15)',
      description: 'Mental discipline, journaling, emotional control',
      actions: [
        { id: 's1', text: 'Morning journal entry', completed: true, weight: 3 },
        { id: 's2', text: 'No reactive decisions', completed: true, weight: 3 },
        { id: 's3', text: 'Read 20 pages', completed: false, weight: 2 },
        { id: 's4', text: 'Evening reflection', completed: false, weight: 2 },
      ],
    },
    health: {
      id: 'health',
      name: "Queen's Health",
      avatar: 'Aurelia',
      icon: '🏋️',
      color: '#2ecc71',
      colorDim: 'rgba(46, 204, 113, 0.15)',
      description: 'Fitness, nutrition, sleep, no-smoking compliance',
      actions: [
        { id: 'h1', text: 'Workout completed', completed: true, weight: 4 },
        { id: 'h2', text: 'Clean nutrition (no junk)', completed: true, weight: 3 },
        { id: 'h3', text: 'No smoking', completed: true, weight: 3 },
        { id: 'h4', text: '7+ hours sleep', completed: false, weight: 2 },
      ],
    },
  },

  // ── Weekly Laurel Scores (Mon–Sat) ──
  weeklyScores: [
    { day: 'Mon', date: '2026-03-09', score: 72, max: 100 },
    { day: 'Tue', date: '2026-03-10', score: 85, max: 100 },
    { day: 'Wed', date: '2026-03-11', score: 68, max: 100 },
    { day: 'Thu', date: '2026-03-12', score: 91, max: 100 },
    { day: 'Fri', date: '2026-03-13', score: 78, max: 100 },
    { day: 'Sat', date: '2026-03-14', score: 83, max: 100 },
  ],

  // ── Previous Week (for comparison) ──
  previousWeekScores: [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 70 },
    { day: 'Wed', score: 58 },
    { day: 'Thu', score: 82 },
    { day: 'Fri', score: 75 },
    { day: 'Sat', score: 71 },
  ],

  // ── Ministry Weekly Breakdown ──
  ministryWeekly: {
    wealth:   { scores: [18, 22, 15, 24, 20, 21], avg: 20, trend: 'up' },
    work:     { scores: [22, 25, 20, 28, 22, 24], avg: 23.5, trend: 'up' },
    stoicism: { scores: [16, 20, 18, 22, 18, 20], avg: 19, trend: 'steady' },
    health:   { scores: [16, 18, 15, 17, 18, 18], avg: 17, trend: 'down' },
  },

  // ── Ministry Logs (recent entries) ──
  ministryLogs: {
    wealth: [
      { date: '2026-03-14', entry: 'Closed ₹15K freelance project milestone', type: 'income' },
      { date: '2026-03-13', entry: 'Reviewed and rebalanced crypto positions', type: 'trading' },
      { date: '2026-03-12', entry: 'New client inquiry from LinkedIn — responded', type: 'freelance' },
      { date: '2026-03-11', entry: 'Tracked all expenses for the week', type: 'financial' },
      { date: '2026-03-10', entry: 'Sent invoice for design sprint deliverables', type: 'income' },
    ],
    work: [
      { date: '2026-03-14', entry: 'Shipped M.A.R.C UI scaffold — CSS system complete', type: 'coding' },
      { date: '2026-03-13', entry: '5.5 hours deep work on Praxis revision engine', type: 'coding' },
      { date: '2026-03-12', entry: 'Client presentation — approved Phase 2 scope', type: 'client' },
      { date: '2026-03-11', entry: 'Refactored sidebar component for mobile', type: 'coding' },
      { date: '2026-03-10', entry: 'Architecture review session with Claude', type: 'project' },
    ],
    stoicism: [
      { date: '2026-03-14', entry: 'Morning journal: analyzed yesterday\'s reactive moment', type: 'journal' },
      { date: '2026-03-13', entry: 'Read 30 pages of Meditations', type: 'reading' },
      { date: '2026-03-12', entry: 'Handled client pushback without emotional reaction', type: 'discipline' },
      { date: '2026-03-11', entry: 'Evening reflection: identified 2 improvement areas', type: 'reflection' },
      { date: '2026-03-10', entry: 'Started Seneca\'s Letters — Book 1', type: 'reading' },
    ],
    health: [
      { date: '2026-03-14', entry: 'Push day complete — bench PR at 80kg', type: 'fitness' },
      { date: '2026-03-13', entry: 'Clean eating maintained. No sugar.', type: 'nutrition' },
      { date: '2026-03-12', entry: 'Slept only 5.5 hours — needs improvement', type: 'sleep' },
      { date: '2026-03-11', entry: 'No smoking — Day 12', type: 'compliance' },
      { date: '2026-03-10', entry: 'Leg day + 20 min cardio', type: 'fitness' },
    ],
  },

  // ── Crown's Council (Last Sunday Audit) ──
  council: {
    weekOf: '2026-03-08',
    weekEnd: '2026-03-14',
    overallScore: 79.5,
    previousWeekScore: 70.2,
    totalPossible: 100,
    ministryBreakdown: [
      { ministry: 'Wealth', avatar: 'Mike', score: 20, max: 25, status: 'strong', trend: '↑' },
      { ministry: 'Work', avatar: 'Donna', score: 23.5, max: 25, status: 'strong', trend: '↑' },
      { ministry: 'Stoicism', avatar: 'Julius Caesar', score: 19, max: 25, status: 'steady', trend: '→' },
      { ministry: "Queen's Health", avatar: 'Aurelia', score: 17, max: 25, status: 'failing', trend: '↓' },
    ],
    failures: [
      'Sleep consistency below 7-hour target 3 out of 6 days',
      'Reading goal missed on 2 days',
      'No financial planning session this week',
    ],
    patterns: [
      'Work output peaks mid-week (Thu highest scores consistently)',
      'Stoicism dips correlate with poor sleep nights',
      'Wealth actions frontloaded — drops off by Thursday',
    ],
    verdict: 'Solid week with clear upward momentum from last week (+9.3). Work and Wealth ministries performing well. Queen\'s Health is the weak link — sleep discipline is the bottleneck. Fix sleep, everything else levels up.',
    directives: [
      'Set hard 11 PM screen cutoff — no exceptions',
      'Move reading block to morning (post-journal) to avoid evening skips',
      'Schedule one dedicated financial planning session mid-week',
      'Maintain current Work intensity — Donna is delivering',
      'Track sleep hours daily in health log, not just binary',
    ],
  },

  // ── Motivational States ──
  motivationalStates: {
    dominant:  { min: 85, label: 'DOMINANT', message: 'The empire expands. Every ministry firing.', color: '#d4af37' },
    strong:    { min: 70, label: 'STRONG', message: 'Discipline holds. Push for dominance.', color: '#2ecc71' },
    steady:    { min: 55, label: 'STEADY', message: 'Holding ground. Not enough. Escalate.', color: '#f39c12' },
    slipping:  { min: 40, label: 'SLIPPING', message: 'Cracks forming. Immediate correction.', color: '#e67e22' },
    critical:  { min: 0,  label: 'CRITICAL', message: 'Empire at risk. Full reset. Now.', color: '#e74c3c' },
  },
};

// ── Helper: Calculate today's Laurel Score ──
function calculateTodayScore() {
  let earned = 0, total = 0;
  Object.values(MOCK_DATA.ministries).forEach(ministry => {
    ministry.actions.forEach(action => {
      total += action.weight;
      if (action.completed) earned += action.weight;
    });
  });
  return { earned, total, percentage: Math.round((earned / total) * 100) };
}

// ── Helper: Get ministry completion ──
function getMinistryCompletion(ministryId) {
  const ministry = MOCK_DATA.ministries[ministryId];
  let earned = 0, total = 0;
  ministry.actions.forEach(a => {
    total += a.weight;
    if (a.completed) earned += a.weight;
  });
  const pct = Math.round((earned / total) * 100);
  return {
    earned, total, percentage: pct,
    status: pct >= 80 ? 'strong' : pct >= 50 ? 'steady' : 'failing',
  };
}

// ── Helper: Get motivational state ──
function getMotivationalState(score) {
  const states = MOCK_DATA.motivationalStates;
  if (score >= states.dominant.min) return states.dominant;
  if (score >= states.strong.min) return states.strong;
  if (score >= states.steady.min) return states.steady;
  if (score >= states.slipping.min) return states.slipping;
  return states.critical;
}
