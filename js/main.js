// Enhanced website functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        for (const [index, span] of spans.entries()) {
            span.style.transform = navLinks.classList.contains('active') 
                ? `rotate(${index === 0 ? '45deg' : index === 1 ? '0deg' : '-45deg'}) ${index === 1 ? 'scaleX(0)' : 'translateY(0px)'}` 
                : 'none';
        }
    });
    
    // Close menu when clicking a link or outside
    const links = navLinks.querySelectorAll('a');
    for (const link of links) {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
            resetHamburger();
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
            resetHamburger();
        }
    });
    
    function resetHamburger() {
        const spans = mobileMenuToggle.querySelectorAll('span');
        for (const span of spans) {
            span.style.transform = 'none';
        }
    }
    
    // Enhanced smooth scrolling for anchor links
    for (const anchor of document.querySelectorAll('a[href^="#"]')) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.service-card, .company-card, .contact-item');
    for (const el of animateElements) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    }
    
    // Header background on scroll
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sender...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                submitBtn.textContent = 'Melding sendt! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }
    
    // Add hover effects to buttons
    for (const btn of document.querySelectorAll('.btn')) {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.2; // Reduced for less jarring effect
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
});

// Additional CSS for smooth header transition
const style = document.createElement('style');
style.textContent = `
    header {
        transition: transform 0.3s ease, background-color 0.3s ease, backdrop-filter 0.3s ease;
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    .mobile-menu-toggle span {
        transition: transform 0.3s ease;
    }
    
    /* Fix for content overlap */
    main {
        position: relative;
        z-index: 1;
    }
    
    .hero {
        position: relative;
        z-index: 2;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);