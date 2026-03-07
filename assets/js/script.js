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

// ==================== Add Animation on Scroll ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .education-item, .certification-item, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ==================== Mobile Menu Toggle ==================== 
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active');
    });
});

// ==================== Add CSS Animations ==================== 
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== Scroll to Top Button ==================== 
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    display: none;
    z-index: 999;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
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
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// ==================== Add Loading Animation ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in';
});

// ==================== Console Message ==================== 
console.log('%c Welcome to Md Ruhul Amin\'s QA Portfolio! ', 'background: #2563eb; color: white; font-size: 16px; padding: 10px;');
console.log('%c SQA Engineer | Test Automation Specialist ', 'background: #1e40af; color: white; font-size: 14px; padding: 8px;');
