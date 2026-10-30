const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==================== Mobile Menu ====================
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');

function setMenu(open) {
    menuToggle.classList.toggle('open', open);
    navbar.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', open);
}

menuToggle.addEventListener('click', () => setMenu(!navbar.classList.contains('menu-open')));
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navbar.classList.contains('menu-open')) {
        setMenu(false);
        menuToggle.focus();
    }
});
document.addEventListener('click', e => {
    if (navbar.classList.contains('menu-open') && !navbar.contains(e.target)) setMenu(false);
});

// ==================== Scroll Effects ====================
// Navbar state, active nav link, progress bar and back-to-top share one rAF-throttled handler.
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const progressBar = document.getElementById('scrollProgress');
const backToTop = document.querySelector('.back-to-top');
let scrollTicking = false;

function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    backToTop.classList.toggle('visible', y > 400);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;

    let current = '';
    sections.forEach(section => {
        if (y >= section.offsetTop - 200) current = section.id;
    });
    // The last section may be too short to reach the threshold; treat page bottom as "contact".
    if (max > 0 && y >= max - 4 && sections.length) current = sections[sections.length - 1].id;
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });
    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(onScroll);
    }
}, { passive: true });
onScroll();

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        const target = id.length > 1 && document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', id);
    });
});

// ==================== Reveal Observer ====================
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ==================== Count-up Stats ====================
const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        countObserver.unobserve(el);
        const end = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        if (prefersReducedMotion || !end) return;
        const duration = 1200;
        const start = performance.now();
        function frame(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(end * eased) + suffix;
            if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    });
}, { threshold: 0.6 });

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// ==================== Theme Toggle ====================
// The initial data-theme is applied by an inline script in <head> to avoid a flash.
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
let isDark = document.documentElement.getAttribute('data-theme') !== 'light';

function setTheme(dark, persist) {
    isDark = dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeIcon.className = dark ? 'fas fa-moon' : 'fas fa-sun';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    if (themeColorMeta) themeColorMeta.setAttribute('content', dark ? '#0e0e0e' : '#ffffff');
    if (persist) {
        try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) { /* storage unavailable */ }
    }
}

themeToggle.addEventListener('click', () => setTheme(!isDark, true));
setTheme(isDark, false);

// ==================== Typewriter Effect ====================
(function() {
    const el = document.getElementById('role-text');
    if (!el) return;
    const texts = ['Agentic QA Specialist', 'SQA Engineer', 'Performance and Security specialist'];
    if (prefersReducedMotion) {
        el.textContent = texts[0];
        return;
    }
    let textIndex = 0;
    let charIndex = 0;
    let dir = 1;

    function step() {
        const text = texts[textIndex];
        charIndex += dir;
        el.textContent = text.substring(0, charIndex);
        let delay = dir === 1 ? 60 : 35;
        if (dir === 1 && charIndex === text.length) {
            dir = -1;
            delay = 2000;
        } else if (dir === -1 && charIndex === 0) {
            dir = 1;
            textIndex = (textIndex + 1) % texts.length;
            delay = 400;
        }
        setTimeout(step, delay);
    }
    step();
})();

// ==================== Contact Form ====================
// No backend: validate, then hand off to the visitor's mail client with a prefilled message.
(function() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const status = form.querySelector('.form-status');
    const EMAIL = 'hmruhul16.ict@gmail.com';

    form.addEventListener('submit', e => {
        e.preventDefault();
        let firstInvalid = null;
        form.querySelectorAll('input, textarea').forEach(field => {
            const valid = field.checkValidity() && field.value.trim() !== '';
            field.setAttribute('aria-invalid', valid ? 'false' : 'true');
            if (!valid && !firstInvalid) firstInvalid = field;
        });
        if (firstInvalid) {
            status.textContent = 'Please fill in every field with a valid email address.';
            status.classList.add('is-error');
            firstInvalid.focus();
            return;
        }

        const fields = form.elements;
        const name = fields.namedItem('name').value.trim();
        const subject = `Portfolio inquiry from ${name}`;
        const body = `${fields.namedItem('message').value.trim()}\n\n— ${name}\n${fields.namedItem('email').value.trim()}`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        status.classList.remove('is-error');
        status.innerHTML = `Opening your email app… If nothing happens, write to <a href="mailto:${EMAIL}">${EMAIL}</a>.`;
    });
})();

// ==================== Footer Year ====================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
