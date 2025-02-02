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
    navigation: true,
    navigationPosition: 'right',
    scrollingSpeed: 700
});

// Handle navigation clicks and mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});

    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Move to the section
            fullpage_api.moveTo(index + 1);
            
            // Close mobile menu if open
            if (window.innerWidth < 992) { // Bootstrap's lg breakpoint
                bsCollapse.hide();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const menuContent = document.querySelector('.menu-content');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // Initialize fullPage.js
    new fullpage('#fullpage', {
        autoScrolling: true,
        navigation: true,
        navigationPosition: 'right',
        scrollingSpeed: 700
    });
    
    function openMenu() {
        document.body.classList.add('menu-open');
        menuOverlay.classList.add('active');
        menuBackdrop.classList.add('active');
        menuToggle.querySelector('span').textContent = 'Close';
    }
    
    function closeMenu() {
        document.body.classList.remove('menu-open');
        menuOverlay.classList.remove('active');
        menuBackdrop.classList.remove('active');
        menuToggle.querySelector('span').textContent = 'Menu';
    }
    
    // Toggle menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (document.body.classList.contains('menu-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when clicking backdrop
    menuBackdrop.addEventListener('click', closeMenu);
    
    // Prevent clicks inside menu content from closing menu
    menuContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionIndex = Array.from(link.parentElement.parentElement.children)
                .indexOf(link.parentElement);
            closeMenu();
            fullpage_api.moveTo(sectionIndex + 1);
        });
    });
});
