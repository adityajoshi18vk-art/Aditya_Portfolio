// ========================================
// Aditya Joshi Portfolio - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initThemeToggle();
    initNavigation();
    initScrollEffects();
    initParticles();
    initScrollReveal();
    initModal();
    initContactForm();

    // Visual Enhancement Initializers
    initCustomCursor();
    initFloatingShapes();
    initProfileTilt();
    initTypingEffect();
    initLightbox();
    initButtonRipple();
});

// ========================================
// Theme Toggle
// ========================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add animation class
        themeToggle.classList.add('animate');
        setTimeout(() => themeToggle.classList.remove('animate'), 300);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
}

// ========================================
// Navigation
// ========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink?.classList.add('active');
            }
        });
    });
}

// ========================================
// Scroll Effects
// ========================================
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Floating Particles
// ========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';

        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        particlesContainer.appendChild(particle);
    }
}

// ========================================
// Scroll Reveal Animation
// ========================================
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate children with stagger effect
                const children = entry.target.querySelectorAll('.glass-card, .timeline-item, .skill-item, .gallery-item, .contact-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    // Add initial styles to animated elements
    const animatedElements = document.querySelectorAll('.glass-card, .timeline-item, .skill-item, .gallery-item, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });
}

// ========================================
// AJ Modal
// ========================================
function initModal() {
    const modal = document.getElementById('aj-modal');
    const logoBtn = document.getElementById('logo-btn');
    const closeBtn = document.getElementById('modal-close-btn');
    const journeyBtn = document.getElementById('modal-journey-btn');

    if (!modal || !logoBtn) return;

    // Open modal when clicking AJ logo
    logoBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close modal when clicking "View My Journey"
    journeyBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close modal when clicking outside the card
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
function debounce(func, wait = 10) {
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

// Throttle function for scroll events
function throttle(func, limit = 100) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Optional: Typing Effect for Hero
// ========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ========================================
// Optional: Parallax Effect
// ========================================
function initParallax() {
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const heroGradient = document.querySelector('.hero-gradient');

        if (heroGradient) {
            heroGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }, 16));
}

// Initialize parallax on load
// initParallax();
// ========================================
// Contact Form - Web3Forms + MongoDB Handler
// ========================================

// Backend API URL - Change this when you deploy
const BACKEND_URL = 'http://localhost:3000';

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject') || 'Portfolio Contact',
            message: formData.get('message')
        };

        try {
            // Send to Web3Forms for email notification
            const web3Response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const web3Result = await web3Response.json();

            // Also save to MongoDB (runs in parallel, doesn't block)
            saveToMongoDB(data);

            if (web3Result.success) {
                showFormFeedback('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                showFormFeedback('Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            showFormFeedback('Network error. Please try again later.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Save to MongoDB backend
async function saveToMongoDB(data) {
    try {
        await fetch(`${BACKEND_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log('✅ Message saved to MongoDB');
    } catch (error) {
        // Silently fail - email was already sent via Web3Forms
        console.log('ℹ️ MongoDB backend not available (this is fine for local testing)');
    }
}

// Form feedback function
function showFormFeedback(message, type) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${type}`;
    feedback.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Insert after form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(feedback, form.nextSibling);

    // Remove after delay
    setTimeout(() => {
        feedback.remove();
    }, 5000);
}

// ========================================
// Console Welcome Message
// ========================================
console.log(`
%c Welcome to Aditya Joshi's Portfolio! 
%c Aspiring Full-Stack Developer exploring Web & Blockchain

Check out the code on GitHub:
https://github.com/adityajoshi18vk-art

`,
    'color: #6366f1; font-size: 16px; font-weight: bold;',
    'color: #8b5cf6; font-size: 14px;');

// ========================================
// Custom Cursor
// ========================================
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    // Check for touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.15;
        cursorY += dy * 0.15;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .skill-item, .project-card, .contact-link-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Click state
    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

    // Hide when leaving window
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
}

// ========================================
// Floating Geometric Shapes
// ========================================
function initFloatingShapes() {
    const container = document.getElementById('floating-shapes');
    if (!container) return;

    const shapes = [
        { type: 'circle', count: 3 },
        { type: 'circle-filled', count: 2 },
        { type: 'square', count: 2 },
        { type: 'line', count: 3 },
        { type: 'dots', count: 2 },
        { type: 'grid', count: 1 }
    ];

    shapes.forEach(({ type, count }) => {
        for (let i = 0; i < count; i++) {
            const shape = document.createElement('div');
            shape.classList.add('shape', type);

            // Random position
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';

            // Random animation delay and duration
            shape.style.animationDelay = (Math.random() * 10) + 's';
            shape.style.animationDuration = (15 + Math.random() * 15) + 's';

            container.appendChild(shape);
        }
    });
}

// ========================================
// Profile 3D Tilt Effect
// ========================================
function initProfileTilt() {
    const profileWrapper = document.querySelector('.profile-wrapper');
    if (!profileWrapper) return;

    // Only on desktop
    if (window.innerWidth < 1024) return;

    profileWrapper.addEventListener('mousemove', (e) => {
        const rect = profileWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        const rotateX = deltaY * -15;
        const rotateY = deltaX * 15;

        profileWrapper.classList.add('tilt-active');
        profileWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    profileWrapper.addEventListener('mouseleave', () => {
        profileWrapper.classList.remove('tilt-active');
        profileWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

// ========================================
// Typing Effect
// ========================================
function initTypingEffect() {
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (!subtitleElement) return;

    const text = subtitleElement.textContent.trim();
    subtitleElement.innerHTML = '<span class="typing-text"></span><span class="typing-cursor"></span>';

    const typingText = subtitleElement.querySelector('.typing-text');
    let charIndex = 0;

    function typeChar() {
        if (charIndex < text.length) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 50);
        } else {
            // Remove cursor after typing completes
            setTimeout(() => {
                const cursor = subtitleElement.querySelector('.typing-cursor');
                if (cursor) cursor.style.display = 'none';
            }, 2000);
        }
    }

    // Start typing after a short delay
    setTimeout(typeChar, 800);
}

// ========================================
// Lightbox Gallery
// ========================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    if (!lightbox || !lightboxImg) return;

    // Get all gallery images
    const galleryItems = document.querySelectorAll('.gallery-item.has-image');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-overlay span');

            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = caption ? caption.textContent : '';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ========================================
// Button Ripple Effect
// ========================================
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ========================================
// Enhanced Scroll Reveal with Stagger
// ========================================
function initEnhancedScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Add stagger class to containers
                if (entry.target.classList.contains('skills-grid') ||
                    entry.target.classList.contains('projects-grid') ||
                    entry.target.classList.contains('gallery-grid')) {
                    entry.target.classList.add('stagger-children');
                }
            }
        });
    }, observerOptions);

    // Observe sections and grids
    document.querySelectorAll('section, .skills-grid, .projects-grid, .gallery-grid').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}
