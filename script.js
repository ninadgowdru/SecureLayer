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


// Threat Ticker Logic
const initTicker = () => {
    const tickerContainer = document.getElementById('threat-ticker');
    if (!tickerContainer) return;

    // Realistic recent high-profile CVEs for the demo
    const threats = [
        { cve: 'CVE-2024-21626', desc: 'Runc container breakout vulnerability', severity: 'critical' },
        { cve: 'CVE-2024-3094', desc: 'XZ Utils backdoor discovered in SSH', severity: 'critical' },
        { cve: 'CVE-2023-46805', desc: 'Ivanti Connect Secure authentication bypass', severity: 'high' },
        { cve: 'CVE-2024-21412', desc: 'Windows SmartScreen security feature bypass', severity: 'high' },
        { cve: 'CVE-2023-4863', desc: 'WebP heap buffer overflow', severity: 'critical' },
        { cve: 'CVE-2024-23897', desc: 'Jenkins arbitrary file read vulnerability', severity: 'medium' }
    ];

    let html = '';
    // Duplicate the list twice to ensure smooth scrolling loop without gap
    const displayThreats = [...threats, ...threats];
    
    displayThreats.forEach(t => {
        let severityText = t.severity.toUpperCase();
        html += `
            <div class="ticker-item">
                <span class="ticker-severity severity-${t.severity}">${severityText}</span>
                <span style="color: white; margin-right: 6px;">${t.cve}:</span> ${t.desc}
            </div>
        `;
    });

    tickerContainer.innerHTML = html;
};
document.addEventListener('DOMContentLoaded', initTicker);


// Attack Surface Diagram Logic
const initAttackSurface = () => {
    const nodes = document.querySelectorAll('.as-node');
    const infoPanel = document.getElementById('as-info');
    if (!infoPanel || nodes.length === 0) return;

    const data = {
        cloud: {
            title: "Cloud Infrastructure",
            threat: "Misconfigured S3 buckets, overly permissive IAM roles, and exposed admin panels allow instant data exfiltration.",
            defense: "We audit your AWS/GCP architecture for zero-day misconfigurations and enforce least-privilege principles."
        },
        web: {
            title: "Web Applications",
            threat: "SQL Injection, Cross-Site Scripting (XSS), and Broken Authentication lead to full database compromises.",
            defense: "We perform deep, manual penetration testing beyond automated scanners to find complex business-logic flaws."
        },
        api: {
            title: "Internal & External APIs",
            threat: "BOLA (Broken Object Level Authorization) allows attackers to access other users' private data using valid API keys.",
            defense: "We rigorously test API endpoints with custom payloads to ensure strict authorization controls are in place."
        },
        mobile: {
            title: "Mobile Applications",
            threat: "Insecure local storage, hardcoded API keys, and root-bypass flaws expose users to device-level attacks.",
            defense: "We decompile and reverse-engineer your iOS/Android apps to ensure military-grade client-side security."
        }
    };

    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const target = node.getAttribute('data-target');
            const info = data[target];
            infoPanel.innerHTML = `
                <h3>${info.title}</h3>
                <p><span class="threat-text">The Threat:</span> ${info.threat}</p>
                <p><span class="defense-text">Our Defense:</span> ${info.defense}</p>
            `;
        });
        
        node.addEventListener('mouseleave', () => {
            infoPanel.innerHTML = `
                <h3>Select a Vector</h3>
                <p>Hover over a node to view vulnerability data.</p>
            `;
        });
    });
};
document.addEventListener('DOMContentLoaded', initAttackSurface);


// ROI Calculator Logic
const initCalculator = () => {
    const ind = document.getElementById('calc-industry');
    const size = document.getElementById('calc-size');
    const cloud = document.getElementById('calc-cloud');
    
    if(!ind || !size || !cloud) return;

    const outBreach = document.getElementById('out-breach');
    const outInv = document.getElementById('out-investment');
    const outRoi = document.getElementById('out-roi');
    
    const sizeVal = document.getElementById('size-val');
    const cloudVal = document.getElementById('cloud-val');

    const updateCalc = () => {
        sizeVal.innerText = size.value;
        cloudVal.innerText = cloud.value;

        // Base cost assumptions (purely for demonstration/marketing purposes)
        const baseCostPerEmployee = 5000;
        const industryMultiplier = parseFloat(ind.value);
        const cloudMultiplier = parseFloat(cloud.value) * 0.1 + 0.5; // Scale 0.6 to 1.5

        const estimatedBreachCost = parseInt(size.value) * baseCostPerEmployee * industryMultiplier * cloudMultiplier;
        
        // Investment scales slightly with company size but is fundamentally capped
        let estimatedInvestment = 15000 + (parseInt(size.value) * 5);
        if(estimatedInvestment > 75000) estimatedInvestment = 75000;

        const roi = (estimatedBreachCost / estimatedInvestment).toFixed(0);

        outBreach.innerText = '$' + estimatedBreachCost.toLocaleString();
        outInv.innerText = '$' + estimatedInvestment.toLocaleString();
        outRoi.innerText = roi + 'x';
    };

    ind.addEventListener('change', updateCalc);
    size.addEventListener('input', updateCalc);
    cloud.addEventListener('input', updateCalc);
    
    updateCalc();
};
document.addEventListener('DOMContentLoaded', initCalculator);


// Interactive Timeline Logic
const initTimeline = () => {
    const steps = document.querySelectorAll('.timeline-step');
    if(steps.length === 0) return;

    steps.forEach(step => {
        step.addEventListener('click', () => {
            // Close others
            steps.forEach(s => {
                if(s !== step) {
                    s.classList.remove('active');
                    s.querySelector('.step-details').style.display = 'none';
                }
            });
            // Toggle current
            if(step.classList.contains('active')){
                step.classList.remove('active');
                step.querySelector('.step-details').style.display = 'none';
            } else {
                step.classList.add('active');
                step.querySelector('.step-details').style.display = 'block';
            }
        });
    });
};
document.addEventListener('DOMContentLoaded', initTimeline);
