// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to nav items on scroll
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Initialize fullPage.js
new fullpage('#fullpage', {
    autoScrolling: true,
    scrollHorizontally: true,
    navigation: true,
    navigationPosition: 'right',
    menu: '#navbarNav',
    scrollingSpeed: 700,
    lockAnchors: true,  // Prevents URL hash changes
    anchors: [], // Remove anchors completely
    onLeave: (origin, destination, direction) => {
        // You can add animations here when leaving a section
    },
    afterLoad: (origin, destination, direction) => {
        // You can add animations here after loading a section
    }
});

// Handle navigation clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionIndex = Array.from(link.parentElement.parentElement.children)
            .indexOf(link.parentElement);
        fullpage_api.moveTo(sectionIndex + 1);
    });
});
