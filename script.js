// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 64; // Height of fixed header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlight
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', highlightActiveSection);

    // Header background on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .experience-item, .skill-category, .contact-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const width = skillFill.style.width;
                skillFill.style.width = '0%';
                
                setTimeout(() => {
                    skillFill.style.width = width;
                }, 100);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Here you can add your form submission logic
            // For now, we'll just show a success message
            
            // Display success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#10b981';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
            
            console.log('Form submitted:', formData);
            
            // You can integrate with email services like:
            // - EmailJS: https://www.emailjs.com/
            // - Formspree: https://formspree.io/
            // - Your own backend API
        });
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('#home');
        
        if (heroSection && scrolled < heroSection.offsetHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Type writer effect for hero heading (optional)
    const heroHeading = document.querySelector('#home h1');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < text.length) {
                heroHeading.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 30);
            }
        }
        
        // Uncomment to enable typewriter effect
        // setTimeout(typeWriter, 500);
    }

    // Add hover effect to experience timeline dots
    const timelineDots = document.querySelectorAll('.experience-timeline');
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        dot.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Back to top button (optional)
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    // Print page info to console
    console.log('Portfolio website loaded successfully!');
    console.log('Sections:', sections.length);
    console.log('Interactive features enabled: Mobile menu, smooth scroll, animations, form handling');
});

// Utility function to detect if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize listener with debounce
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments here if needed
    console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
}, 250));