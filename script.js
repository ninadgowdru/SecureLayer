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


// Hacker Terminal Animation
const initTerminal = () => {
    const term = document.getElementById('hacker-terminal');
    if(!term) return;

    const sequence = [
        { text: "nmap -sV -p- --script vuln target-api.com", type: "cmd", delay: 1000 },
        { text: "Starting Nmap 7.93 ( https://nmap.org )", type: "info", delay: 800 },
        { text: "PORT     STATE SERVICE VERSION", type: "text", delay: 400 },
        { text: "443/tcp  open  ssl     nginx 1.18.0", type: "text", delay: 200 },
        { text: "8080/tcp open  http    Node.js (Express)", type: "text", delay: 600 },
        { text: "Host is up (0.015s latency).", type: "info", delay: 1000 },
        { text: "python3 exploit_jwt_bypass.py --target https://target-api.com:8080/api/v1/", type: "cmd", delay: 2000 },
        { text: "[*] Analyzing JWT signature algorithm...", type: "text", delay: 800 },
        { text: "[!] Target accepts 'none' algorithm (CVE-2015-9256)", type: "term-error", delay: 1000 },
        { text: "[*] Forging admin token...", type: "info", delay: 800 },
        { text: "[+] Exploit Successful. Admin privileges granted.", type: "term-success", delay: 1000 },
        { text: "dumping database schema...", type: "info", delay: 800 },
        { text: "== TABLE: users (rows: 145,203) ==", type: "text", delay: 500 },
        { text: "Mission accomplished. Generating remediation report.", type: "term-success", delay: 2000 }
    ];

    let currentLine = 0;
    
    const typeLine = () => {
        if(currentLine >= sequence.length) {
            // Loop it
            setTimeout(() => {
                term.innerHTML = '';
                currentLine = 0;
                typeLine();
            }, 5000);
            return;
        }

        const lineData = sequence[currentLine];
        const lineDiv = document.createElement('div');
        lineDiv.className = 'term-line';
        
        let prefix = '';
        if(lineData.type === 'cmd') {
            prefix = '<span class="term-prompt">root@securelayer:~#</span>';
        }

        let contentClass = '';
        if(lineData.type !== 'cmd' && lineData.type !== 'text') {
            contentClass = lineData.type;
        } else if (lineData.type === 'cmd') {
            contentClass = 'term-cmd';
        }

        term.innerHTML = term.innerHTML.replace('<span class="term-cursor"></span>', '');
        
        if(lineData.type === 'cmd') {
            // Typewriter effect for commands
            lineDiv.innerHTML = prefix + '<span class="' + contentClass + '"></span><span class="term-cursor"></span>';
            term.appendChild(lineDiv);
            
            let i = 0;
            const targetSpan = lineDiv.querySelector('.' + contentClass);
            
            const typeChar = () => {
                if(i < lineData.text.length) {
                    targetSpan.textContent += lineData.text.charAt(i);
                    i++;
                    setTimeout(typeChar, Math.random() * 50 + 30); // Random typing speed
                } else {
                    currentLine++;
                    setTimeout(typeLine, lineData.delay);
                }
            };
            typeChar();
        } else {
            // Instant print for output
            lineDiv.innerHTML = '<span class="' + contentClass + '">' + lineData.text + '</span><span class="term-cursor"></span>';
            term.appendChild(lineDiv);
            currentLine++;
            
            // Auto scroll
            term.scrollTop = term.scrollHeight;
            setTimeout(typeLine, lineData.delay);
        }
    };

    // Start it when it scrolls into view
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            term.innerHTML = '<span class="term-cursor"></span>';
            setTimeout(typeLine, 1000);
            observer.disconnect();
        }
    });
    
    observer.observe(term);
};

document.addEventListener('DOMContentLoaded', () => {
    initTerminal();
});


// ============================================
// PROFESSIONAL MAP ENGINE
// ============================================
const initProfessionalMap = () => {
    const container = document.querySelector('.professional-map-container');
    if (!container) return;

    const blipsContainer = document.getElementById('radar-blips');
    const vectorsSvg = document.querySelector('.attack-vectors');
    const tooltip = document.getElementById('threat-tooltip');
    
    // Relative coordinates based on 2754x1398 SVG (Standard Equirectangular / Robinson rough coords)
    // These are approximate X, Y percentages (0-100) for major tech hubs
    const locations = [
        { name: "New York", x: 28, y: 35 },
        { name: "San Francisco", x: 18, y: 37 },
        { name: "London", x: 48, y: 30 },
        { name: "Frankfurt", x: 50, y: 31 },
        { name: "Tokyo", x: 85, y: 36 },
        { name: "Singapore", x: 78, y: 56 },
        { name: "Sydney", x: 88, y: 78 },
        { name: "Mumbai", x: 70, y: 48 },
        { name: "São Paulo", x: 34, y: 65 }
    ];

    const attackTypes = [
        "SQL Injection", "RCE Attempt", "API Fuzzing", "DDoS Node", 
        "Data Exfil", "Zero-Day Exploit", "Auth Bypass"
    ];

    const spawnThreat = () => {
        if (!container.offsetParent) return; // Don't run if hidden
        
        // Pick origin and target
        const origin = locations[Math.floor(Math.random() * locations.length)];
        let target = locations[Math.floor(Math.random() * locations.length)];
        while(target.name === origin.name) {
            target = locations[Math.floor(Math.random() * locations.length)];
        }
        
        const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
        
        // 1. Create origin blip (red)
        const originBlip = document.createElement('div');
        originBlip.className = 'radar-blip';
        originBlip.style.left = origin.x + '%';
        originBlip.style.top = origin.y + '%';
        const originRing = document.createElement('div');
        originRing.className = 'radar-ring';
        originBlip.appendChild(originRing);
        blipsContainer.appendChild(originBlip);

        // 2. Create target blip (blue)
        const targetBlip = document.createElement('div');
        targetBlip.className = 'radar-blip blue';
        targetBlip.style.left = target.x + '%';
        targetBlip.style.top = target.y + '%';
        const targetRing = document.createElement('div');
        targetRing.className = 'radar-ring';
        targetBlip.appendChild(targetRing);
        blipsContainer.appendChild(targetBlip);

        // 3. Draw curved SVG line (Vector)
        // SVG viewBox is 2754 x 1398. We map percentages to these coordinates.
        const svgW = 2754;
        const svgH = 1398;
        const ox = (origin.x / 100) * svgW;
        const oy = (origin.y / 100) * svgH;
        const tx = (target.x / 100) * svgW;
        const ty = (target.y / 100) * svgH;
        
        // Control point for a nice curve
        const cx = (ox + tx) / 2;
        const cy = Math.min(oy, ty) - 200; // Curve upwards
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M${ox},${oy} Q${cx},${cy} ${tx},${ty}`);
        path.setAttribute("class", "attack-vector");
        
        // Calculate path length for animation
        vectorsSvg.appendChild(path);
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        // 4. Show Tooltip
        document.getElementById('tt-origin').textContent = origin.name;
        document.getElementById('tt-target').textContent = target.name;
        document.getElementById('tt-type').textContent = attackType;
        tooltip.classList.add('show');

        // Cleanup after 4 seconds
        setTimeout(() => {
            if(originBlip.parentNode) originBlip.parentNode.removeChild(originBlip);
            if(targetBlip.parentNode) targetBlip.parentNode.removeChild(targetBlip);
            if(path.parentNode) path.parentNode.removeChild(path);
            tooltip.classList.remove('show');
        }, 4000);
    };

    // Spawn a threat every 3 to 6 seconds
    const scheduleNext = () => {
        setTimeout(() => {
            spawnThreat();
            scheduleNext();
        }, Math.random() * 3000 + 3000);
    };
    
    // Initial spawn
    setTimeout(() => {
        spawnThreat();
        scheduleNext();
    }, 1000);
};

document.addEventListener('DOMContentLoaded', () => {
    initProfessionalMap();
});
