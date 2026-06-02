// ==================== Navbar Scroll ====================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ==================== Mobile Menu ====================
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navbar.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', navbar.classList.contains('menu-open'));
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navbar.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// ==================== Active Nav Link ====================
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        const top = section.offsetTop - 200;
        if (scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });
});

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

// ==================== Theme Toggle ====================
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
let isDark = localStorage.getItem('theme') !== 'light';

function setTheme(dark) {
    isDark = dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeIcon.className = dark ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => setTheme(!isDark));
setTheme(isDark);

// ==================== Typewriter Effect ====================
(function() {
    const el = document.getElementById('role-text');
    if (!el) return;
    const texts = ['Agentic QA Specialist', 'SQA Engineer', 'Performance and Security specialist'];
    let textIndex = 0;
    let charIndex = 0;
    let dir = 1;
    let pause = false;

    function step() {
        const text = texts[textIndex];
        if (pause) {
            pause = false;
            setTimeout(step, 2000);
            return;
        }
        if (dir === 1) {
            charIndex++;
            el.textContent = text.substring(0, charIndex);
            if (charIndex === text.length) {
                dir = -1;
                pause = true;
            }
        } else {
            charIndex--;
            el.textContent = text.substring(text.length - charIndex);
            if (charIndex === 0) {
                dir = 1;
                pause = true;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
        const delay = dir === 1 ? 60 : 35;
        setTimeout(step, pause ? 0 : delay);
    }
    step();
})();

// ==================== Back to Top ====================
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
