document.addEventListener('DOMContentLoaded', function() {
    // Toggle menu
    const navbarToggler = document.getElementById('navbarToggler');
    const navList = document.querySelector('.cq-nav-list');
    const authButtons = document.querySelector('.cq-auth-buttons');

    navbarToggler.addEventListener('click', function() {
        navList.classList.toggle('show');
        authButtons.classList.toggle('show');
    });

    // Scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.cq-navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navList.contains(event.target) || 
                               navbarToggler.contains(event.target) ||
                               authButtons.contains(event.target);
        
        if (!isClickInsideNav && navList.classList.contains('show')) {
            navList.classList.remove('show');
            authButtons.classList.remove('show');
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.cq-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('show');
            authButtons.classList.remove('show');
        });
    });
}); 