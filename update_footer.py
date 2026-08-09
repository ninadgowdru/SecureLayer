import os
import re

new_footer = '''    <!-- Footer -->
    <footer class="footer">
        <div class="container footer-top">
            <div class="footer-newsletter">
                <h3>Subscribe to Security Briefings</h3>
                <p>Get the latest threat intel and vulnerability research delivered to your inbox.</p>
                <form class="newsletter-form" onsubmit="event.preventDefault();">
                    <input type="email" placeholder="Enter your email" required>
                    <button type="submit" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>
            <div class="footer-badges">
                <div class="trust-badge">
                    <i class="fa-solid fa-shield-check"></i>
                    <span>SOC 2 Type II Certified</span>
                </div>
                <div class="trust-badge">
                    <i class="fa-solid fa-certificate"></i>
                    <span>CREST Approved</span>
                </div>
            </div>
        </div>
        <div class="footer-divider"></div>
        <div class="container footer-container">
            <div class="footer-brand">
                <a href="index.html" class="logo footer-logo"><img src="logo.png" alt="SecureLayer Logo"> SecureLayer</a>
                <p>Elite hacker-led security assessments for the modern web.</p>
                <div class="social-links">
                    <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-github"></i></a>
                </div>
            </div>
            <div class="footer-links-group">
                <div class="footer-column">
                    <h4>Services</h4>
                    <a href="services.html">Pentest as a Service</a>
                    <a href="services.html">Product Security</a>
                    <a href="services.html">AI & Logic Security</a>
                </div>
                <div class="footer-column">
                    <h4>Use Cases</h4>
                    <a href="#">SaaS Platforms</a>
                    <a href="#">FinTech</a>
                    <a href="#">Healthcare</a>
                </div>
                <div class="footer-column">
                    <h4>Resources</h4>
                    <a href="blog.html">Blog</a>
                    <a href="resources.html">Case Studies</a>
                    <a href="threat-library.html">Threat Library</a>
                </div>
                <div class="footer-column">
                    <h4>Company</h4>
                    <a href="company.html">Trust Center</a>
                    <a href="contact.html">Contact Us</a>
                    <a href="#">Partners</a>
                </div>
            </div>
        </div>
        <div class="container footer-bottom">
            <div class="footer-status">
                <span class="status-dot"></span> All Systems Operational
            </div>
            <div class="legal-links">
                <p>&copy; 2026 SecureLayer Inc.</p>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </div>
        </div>
    </footer>'''

# Find all HTML files
html_files = [f for f in os.listdir('.') if f.endswith('.html')]
count = 0
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to match the old footer, which may or may not have "<!-- Footer -->" immediately preceding it, but we can match from <footer class="footer"> to </footer>
    new_content = re.sub(r'(\s*<!-- Footer -->\s*)?<footer class="footer">.*?</footer>', '\n' + new_footer, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1

print(f"Updated footer in {count} files.")
