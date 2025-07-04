// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------
    // 1. Typed Text Effect for Hero Section
    // ------------------------------------------
    function typeWriter(textElementId, text, delay = 70) {
        const element = document.getElementById(textElementId);
        if (!element) return;

        let i = 0;
        element.innerHTML = ''; // Clear existing text

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay);
            } else {
                // Add blinking cursor after typing is complete
                element.innerHTML += '<span class="typed-cursor">|</span>';
            }
        }
        type();
    }

    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const textToType = "A Creative Developer | Building beautiful and functional web experiences.";
        typeWriter('typed-text', textToType);
    }

    // ------------------------------------------
    // 2. Scroll Animations with Staggered Delays (Intersection Observer)
    // ------------------------------------------
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || '0');
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ------------------------------------------
    // 3. Smooth Scrolling for Navigation Links
    // ------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get header height dynamically
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------------------
    // 4. Dynamic Blob Animation (More subtle variation)
    // ------------------------------------------
    const blobs = document.querySelectorAll('.background-blob');
    blobs.forEach(blob => {
        // Apply random offsets for varied blob movement via CSS custom properties
        blob.style.setProperty('--blob-x-offset', `${(Math.random() - 0.5) * 120}`); // e.g., -60 to 60
        blob.style.setProperty('--blob-y-offset', `${(Math.random() - 0.5) * 120}`); // e.g., -60 to 60
    });
});

// js/script.js - Add this new function and call it at the end of DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {
    // ... (existing code for Typed Text, Scroll Animations, Smooth Scrolling, Dynamic Blobs) ...

    // ------------------------------------------
    // 5. Adjust Body Padding for Fixed Header
    // ------------------------------------------
    function adjustBodyPadding() {
        const header = document.querySelector('header');
        if (header) {
            const headerHeight = header.offsetHeight; // Get the computed height of the header
            document.body.style.paddingTop = `${headerHeight}px`; // Apply padding to the body
        }
    }

    // Call it initially
    adjustBodyPadding();

    // Call it again if the window is resized (e.g., orientation change on mobile)
    window.addEventListener('resize', adjustBodyPadding);

    // After the menu toggles (relevant for mobile), sometimes height can change, though less common with Bootstrap's default
    // new bootstrap.Collapse(document.getElementById('navbarNav'))._element.addEventListener('shown.bs.collapse', adjustBodyPadding);
    // new bootstrap.Collapse(document.getElementById('navbarNav'))._element.addEventListener('hidden.bs.collapse', adjustBodyPadding);

});