document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0; // To store the last scroll position
    const navbar = document.querySelector('.navbar');
    const menuButton = document.querySelector('.menu-btn');
    const navbarLinks = document.querySelectorAll('.navbar .nav-bar ul li a');

    // Handle menu button click to toggle navbar
    menuButton.addEventListener('click', () => {
        navbar.classList.toggle('open-nav');
    });

    // Close the mobile menu when a menu link is clicked
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only close the menu if it's currently open
            if (navbar.classList.contains('open-nav')) {
                navbar.classList.remove('open-nav');
            }
        });
    });

    // Save scroll position in localStorage before navigating away
    document.querySelectorAll('a[href^="#"], a[href="profil.html"], a[href="index.html"]').forEach(link => {
        link.addEventListener('click', function() {
            localStorage.setItem('scrollPosition', window.scrollY);
        });
    });

    // Restore scroll position on homepage load
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, scrollPosition);
        localStorage.removeItem('scrollPosition'); // Clear after restoring
    }

    // AOS initialization
    AOS.init();

    // Scroll event listener to hide/show navbar (only on desktop)
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Check if the user is on a screen width larger than 768px (desktop)
        if (window.innerWidth > 768) {
            // Desktop behavior: hide navbar on scroll down, show on scroll up
            if (currentScroll > lastScrollTop) {
                // If scrolling down, hide navbar
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // If scrolling up, show navbar
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            // Mobile behavior: keep navbar in place, no scroll effect
            navbar.style.transform = 'translateY(0)';
        }

        // Update lastScrollTop to the new position
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scrolling
    });

    // Add effect to image inside the #mig div
    const img = document.getElementById("migImage");

    if (img) {  // Check if the image exists on the page
        img.addEventListener("click", function() {
            img.style.transform = "scale(1.2) rotate(10deg)"; // Zoom in more and rotate
            setTimeout(() => {
                img.style.transform = "scale(1) rotate(0deg)"; // Reset after 300ms
            }, 300);
        });
    }
});
