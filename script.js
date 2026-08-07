document.addEventListener('DOMContentLoaded', () => {


    // ============================================
    // STICKY NAVBAR
    // ============================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 50);
        // Back-to-top button visibility
        document.querySelector('.fab-top')?.classList.toggle('visible', window.scrollY > 400);
    });

    // ============================================
    // MOBILE NAV DRAWER
    // ============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navDrawer = document.querySelector('.nav-drawer');
    const navOverlay = document.querySelector('.nav-overlay');
    const drawerClose = document.querySelector('.drawer-close');

    function openDrawer() {
        navOverlay.style.display = 'block';
        setTimeout(() => navOverlay.classList.add('open'), 10);
        navDrawer.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        navOverlay.classList.remove('open');
        navDrawer.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => navOverlay.style.display = 'none', 300);
    }

    mobileMenuBtn?.addEventListener('click', openDrawer);
    drawerClose?.addEventListener('click', closeDrawer);
    navOverlay?.addEventListener('click', closeDrawer);

    // ============================================
    /// ============================================
    // FORM SUCCESS HANDLER
    // ============================================
    if (window.location.search.includes('success=true')) {
        const form = document.getElementById('contact-form');
        if (form) {
            form.innerHTML = `
                <div style="text-align:center; padding: 40px 20px;">
                    <i class="fa-solid fa-circle-check" style="font-size: 4rem; color: #22c55e; margin-bottom: 24px;"></i>
                    <h3 style="font-size: 1.75rem; margin-bottom: 12px;">We've received your message!</h3>
                    <p style="color: var(--text-light); font-size: 1.1rem; line-height: 1.6;">Someone from our security team will review your request and communicate with you within 24 hours.</p>
                </div>
            `;
        }
    }

    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // ============================================
    // STATS COUNTER ANIMATION
    // ============================================
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current) + suffix;
            if (current >= target) clearInterval(timer);
        }, 16);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.count-number').forEach(animateCounter);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelector('.stats-grid') && counterObserver.observe(document.querySelector('.stats-grid'));

    // ============================================
    // ACTIVE NAV LINK
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .drawer-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ============================================
    // RESOURCES FILTER TABS
    // ============================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    const resourceCards = document.querySelectorAll('.resource-card[data-category]');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');
            resourceCards.forEach(card => {
                const show = filter === 'all' || card.getAttribute('data-category') === filter;
                card.classList.toggle('hidden', !show);
            });
        });
    });

    // ============================================
    // BACK TO TOP
    // ============================================
    document.querySelector('.fab-top')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // NEWSLETTER FORM
    // ============================================
    document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('.btn');
        const input = e.target.querySelector('input');
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#22c55e';
        input.value = '';
        setTimeout(() => {
            btn.textContent = 'Subscribe';
            btn.style.background = '';
        }, 3000);
    });

});
