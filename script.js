/* ===== MENU HAMBURGER ===== */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Fermer le menu au clic en dehors
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

/* ===== NAVBAR SHADOW AU SCROLL ===== */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

/* ===== ANIMATION DES BARRES DE COMPÉTENCES AU SCROLL ===== */
const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.bar .fill');

if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 100);
                });
                skillsObserver.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsSection);
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const revealElements = document.querySelectorAll('.about-card, .skills-group, .project-card, .timeline-content, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger delay based on index within the observed set
            const allVisible = Array.from(revealElements).filter(el => {
                const rect = el.getBoundingClientRect();
                return rect.top < window.innerHeight && rect.bottom > 0;
            });
            const idx = allVisible.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx % 3 * 120); // stagger per group of 3
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link');
        }
    });
});
