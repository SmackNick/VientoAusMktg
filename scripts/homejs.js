document.addEventListener('DOMContentLoaded', () => {
    // Configuration Constants
    const ANIMATION_DURATION = 1000; // Duration of the rotation animation in milliseconds
    const ROTATION_INTERVAL = 6000; // Time interval between rotations in milliseconds
    const DEFAULT_ROTATION = 45; // Default rotation angle in degrees
    const DIAMOND_SIZE = 800; // Size of the diamond in pixels
    const BORDER_WIDTH = 3; // Border width of the diamond in pixels
    const OPACITY = 0.1; // Opacity of the diamond

    // Select the hero element
    const hero = document.querySelector('.hero');

    // Create the diamond dynamically
    const diamond = document.createElement('div');
    diamond.style.position = 'absolute';
    diamond.style.width = `${DIAMOND_SIZE}px`;
    diamond.style.height = `${DIAMOND_SIZE}px`;
    diamond.style.border = `${BORDER_WIDTH}px solid var(--accent-color)`;
    diamond.style.transform = `rotate(${DEFAULT_ROTATION}deg)`; // Default rotation
    diamond.style.opacity = OPACITY;
    diamond.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`; // Smooth rotation
    hero.appendChild(diamond);

    // Function to apply random rotation and reset to default
    function rotateDiamond() {
        const randomAngle = Math.random() * 360 - 180; // Random angle between -180° and 180°
        diamond.style.transform = `rotate(${randomAngle}deg)`; // Apply random rotation

        // Reset to default rotation after the animation duration
        setTimeout(() => {
            diamond.style.transform = `rotate(${DEFAULT_ROTATION}deg)`; // Back to default rotation
        }, ANIMATION_DURATION);
    }

    // Trigger the rotation at the configured interval
    setInterval(rotateDiamond, ROTATION_INTERVAL);

    // Debugging logs for development (remove in production)
    console.log(`Diamond rotation configured with:
        Animation Duration: ${ANIMATION_DURATION}ms
        Rotation Interval: ${ROTATION_INTERVAL}ms
        Default Rotation: ${DEFAULT_ROTATION}deg
        Diamond Size: ${DIAMOND_SIZE}px`);
});


document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-content a'); // Select all menu links

    // Toggle Mobile Menu
    function toggleMenu() {
        mobileMenu.classList.toggle('show');
        hamburger.classList.toggle('open');
    }

    // Close Menu on Overlay Click
    function closeMenu() {
        mobileMenu.classList.remove('show');
        hamburger.classList.remove('open');
    }

    // Close Menu when clicking a menu link
    function handleMenuLinkClick() {
        closeMenu();
    }

    hamburger.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenu);
    menuLinks.forEach(link => {
        link.addEventListener('click', handleMenuLinkClick);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const mobileLogo = document.querySelector('.logo-mobile');
    const heroSection = document.querySelector('.hero');

    // Detect scroll position
    window.addEventListener('scroll', () => {
        const heroHeight = heroSection.offsetHeight; // Height of the hero section
        const scrollPosition = window.scrollY; // Current scroll position

        if (scrollPosition > heroHeight) {
            mobileLogo.classList.add('transparent'); // Add transparency class
        } else {
            mobileLogo.classList.remove('transparent'); // Remove transparency class
        }
    });
});


// Debounce function to improve performance
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply fade-in animation with debounced observer
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(
    debounce((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, 50), // Debounce delay in milliseconds
    { threshold: 0.1 }
);

sections.forEach(section => observer.observe(section));
