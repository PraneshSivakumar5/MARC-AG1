// ============================================
// M.A.R.C – I 🔱 Utility Functions
// ============================================

/**
 * Format a date string to readable format
 */
function formatDate(dateStr, format = 'short') {
  const date = new Date(dateStr + 'T00:00:00');
  if (format === 'short') {
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  }
  if (format === 'long') {
    return date.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }
  if (format === 'weekday') {
    return date.toLocaleDateString('en-IN', { weekday: 'short' });
  }
  return dateStr;
}

/**
 * Get today's date as YYYY-MM-DD
 */
function getTodayString() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Get day name
 */
function getDayName() {
  return new Date().toLocaleDateString('en-IN', { weekday: 'long' });
}

/**
 * Get time-based greeting for King
 */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5)  return 'Burning midnight oil';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Late night ops';
}

/**
 * Animate a number counting up
 */
function animateCount(element, target, duration = 1200) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Animate score ring SVG
 */
function animateRing(element, percentage, duration = 1500) {
  const circumference = 2 * Math.PI * 80; // r=80
  const offset = circumference - (percentage / 100) * circumference;

  element.style.strokeDasharray = circumference;
  element.style.strokeDashoffset = circumference;

  requestAnimationFrame(() => {
    element.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    element.style.strokeDashoffset = offset;
  });
}

/**
 * Create an element with classes and attributes
 */
function createElement(tag, className, attrs = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  Object.entries(attrs).forEach(([key, val]) => {
    if (key === 'textContent') el.textContent = val;
    else if (key === 'innerHTML') el.innerHTML = val;
    else el.setAttribute(key, val);
  });
  return el;
}

/**
 * Stagger animation delays for child elements
 */
function staggerChildren(parent, selector, baseDelay = 80) {
  const children = parent.querySelectorAll(selector);
  children.forEach((child, i) => {
    child.style.animationDelay = `${i * baseDelay}ms`;
  });
}

/**
 * Get score color class
 */
function getScoreColorClass(percentage) {
  if (percentage >= 80) return 'high';
  if (percentage >= 50) return 'mid';
  return 'low';
}

/**
 * Get score CSS color
 */
function getScoreColor(percentage) {
  if (percentage >= 80) return '#2ecc71';
  if (percentage >= 50) return '#f39c12';
  return '#e74c3c';
}

/**
 * Get status color
 */
function getStatusColor(status) {
  switch (status) {
    case 'strong': return '#2ecc71';
    case 'steady': return '#f39c12';
    case 'failing': return '#e74c3c';
    default: return '#8a8a9a';
  }
}

/**
 * Format current date/time for sidebar
 */
function getFormattedNow() {
  const now = new Date();
  return now.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
