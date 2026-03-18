// Global Router
const routes = {
    '/': renderDashboard,
    '/dashboard': renderDashboard,
    '/council': renderCouncil,
    '/ministry/:id': renderMinistry
};

function handleRoute() {
    const appRoot = document.getElementById('app-root');
    let path = window.location.hash.slice(1) || '/';
    
    // Clear current content
    appRoot.innerHTML = '';
    
    // Update active nav
    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + path || (path.startsWith('/ministry') && link.getAttribute('href') === '#' + path)) {
            link.classList.add('active');
        }
    });

    // Match route
    for (let route in routes) {
        if (path === route) {
            return routes[route](appRoot);
        }
        if (route.includes(':id')) {
            const baseRoute = route.split('/:id')[0];
            if (path.startsWith(baseRoute)) {
                const id = path.split('/')[2];
                return routes[route](appRoot, id);
            }
        }
    }
    
    // 404
    appRoot.innerHTML = `
        <div class="empty-state">
            <i data-lucide="file-question" class="empty-state__icon"></i>
            <h2 class="empty-state__title">Sector Not Found</h2>
            <a href="#/" class="btn btn--gold" style="margin-top: var(--space-4)">Return to Dashboard</a>
        </div>
    `;
    lucide.createIcons();
}

window.addEventListener('hashchange', handleRoute);
