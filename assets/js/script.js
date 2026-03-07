// ==================== Navigation Active Link ==================== 
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        const sections = document.querySelectorAll('section, header');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// ==================== Smooth Scroll Behavior ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Scroll Animations with Intersection Observer ==================== 
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, scrollObserverOptions);

// Add scroll-animate class to elements
document.querySelectorAll('.timeline-item, .skill-category, .project-card, .education-item, .certification-item, .about-content, .about-text, .about-stats').forEach(el => {
    el.classList.add('scroll-animate');
    scrollObserver.observe(el);
});

// Staggered animation delays
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.1}s`;
});

// ==================== Parallax Effect for Hero ==================== 
const hero = document.querySelector('.hero');

document.addEventListener('mousemove', (e) => {
    if (hero) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    }
});

// ==================== Navbar Scroll Effect ==================== 
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.98) 0%, rgba(30, 64, 175, 0.98) 100%)';
        navbar.style.padding = '0.8rem 0';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'none';
        navbar.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)';
        navbar.style.padding = '1rem 0';
    }
});

// ==================== Scroll to Top Button ==================== 
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    display: none;
    z-index: 9999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseover', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
    scrollTopBtn.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.6)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.transform = 'scale(1)';
    scrollTopBtn.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
});

// ==================== Loading Animation ==================== 
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==================== Counter Animation for Stats ==================== 
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

const statNumbers = document.querySelectorAll('.stat h3');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const target = parseInt(text);
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statObserver.observe(stat));

// ==================== Timeline Animation ==================== 
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const marker = this.querySelector('.timeline-marker');
        if (marker) {
            marker.style.transform = 'scale(1.3)';
            marker.style.background = 'linear-gradient(135deg, #8b5cf6, #3b82f6)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const marker = this.querySelector('.timeline-marker');
        if (marker) {
            marker.style.transform = 'scale(1)';
            marker.style.background = '';
        }
    });
});

// ==================== Skill Tags Animation ==================== 
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(3deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ==================== Project Cards Animation ==================== 
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== Contact Link Animation ==================== 
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.style.color = '#3b82f6';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// ==================== Section Title Animation on Scroll ==================== 
document.querySelectorAll('section h2').forEach(title => {
    title.classList.add('scroll-animate');
    scrollObserver.observe(title);
});

// ==================== Button Ripple Effect ==================== 
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 20px;
            height: 20px;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== Initial Hero Animations ==================== 
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.hero > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.8s ease forwards`;
        el.style.animationDelay = `${index * 0.2 + 0.2}s`;
    });
});

// ==================== Console Welcome Message ==================== 
console.log('%c ═══════════════════════════════════════════', 'color: #3b82f6;');
console.log('%c   Welcome to Md Ruhul Amin\'s QA Portfolio!   ', 'background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; font-size: 14px; padding: 8px; font-weight: bold;');
console.log('%c ═══════════════════════════════════════════', 'color: #3b82f6;');
console.log('%c QA Engineer | Test Automation Specialist | Performance Testing', 'color: #8b5cf6; font-weight: bold;');
console.log('%c Live Portfolio: https://ruhulsportfolio.vercel.app', 'color: #10b981; font-weight: bold;');
console.log('%c ═══════════════════════════════════════════', 'color: #3b82f6;');

// ==================== Lazy Loading Images ==================== 
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            imageObserver.observe(img);
        });
    }
});

// ==================== Smooth Scroll Progress Indicator ==================== 
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            z-index: 10000;
            transition: width 0.1s ease;
            border-radius: 0 2px 2px 0;
        `;
        document.body.appendChild(progressBar);
    }
    progressBar.style.width = scrollPercentage + '%';
});
