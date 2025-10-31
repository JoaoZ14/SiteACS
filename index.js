// ========================================
// NAVBAR FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navToggle && navMenu) {
            if (navbar && !navbar.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
    
    // Navbar scroll effect
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
            }
        }
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function makeNavLinkActive() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', makeNavLinkActive);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 90;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================================
// ANIMATIONS ON SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
});

// ========================================
// COUNTER ANIMATION
// ========================================
function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const isPercent = suffix === '%';
    const finalTarget = isPercent ? target : target;
    const increment = finalTarget / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < finalTarget) {
            if (isPercent) {
                element.textContent = Math.floor(start) + suffix;
            } else {
                element.textContent = Math.floor(start) + suffix;
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = finalTarget + suffix;
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            const stats = entry.target.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const text = stat.textContent.trim();
                const isPercent = text.includes('%');
                const target = parseInt(text.replace(/\D/g, ''));
                const suffix = isPercent ? '%' : (text.includes('+') ? '+' : '');
                
                // Clear initial value
                stat.textContent = '';
                
                // Animate
                animateCounter(stat, target, 2000, suffix);
            });
            entry.target.setAttribute('data-animated', 'true');
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.sobre-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ========================================
// HOVER EFFECTS FOR CARDS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.segmento-card, .diferencial-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Add ripple effect
            createRipple(e, this);
        });
    });
});

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    const rippleContainer = element;
    rippleContainer.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .segmento-card,
    .diferencial-card,
    .stat-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 168, 255, 0.1);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// PARALLAX EFFECT FOR HERO - DISABLED
// ========================================
// Parallax effect removed per user request

// ========================================
// CAROUSEL CONTROL
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const carrosselTrack = document.querySelector('.carrossel-track');
    
    if (carrosselTrack) {
        // Pause animation on hover
        carrosselTrack.addEventListener('mouseenter', () => {
            carrosselTrack.style.animationPlayState = 'paused';
        });
        
        carrosselTrack.addEventListener('mouseleave', () => {
            carrosselTrack.style.animationPlayState = 'running';
        });
        
        // Touch events for mobile
        carrosselTrack.addEventListener('touchstart', () => {
            carrosselTrack.style.animationPlayState = 'paused';
        });
        
        carrosselTrack.addEventListener('touchend', () => {
            setTimeout(() => {
                carrosselTrack.style.animationPlayState = 'running';
            }, 500);
        });
    }
});

// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any preloader if it exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    }
});

// ========================================
// BUTTON CURSOR FOLLOW EFFECT
// ========================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ========================================
// ADD SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ========================================
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 16);
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Throttle function for scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const optimizedScroll = throttle(() => {
    // Scroll-dependent functions here
}, 16);

window.addEventListener('scroll', optimizedScroll);

// ========================================
// INTERSECTION OBSERVER POLYFILL CHECK
// ========================================
if (!window.IntersectionObserver) {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animated');
    });
}

// ========================================
// CONSOLE BRANDING
// ========================================
console.log('%c JK Distribuidora ', 'background: #0056B3; color: white; padding: 10px 20px; font-size: 20px; font-weight: bold;');
console.log('%c Desenvolvido com excelência ', 'background: #00A8FF; color: white; padding: 5px 10px; font-size: 14px;');

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================
// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#sobre';
skipLink.textContent = 'Pular para conteúdo principal';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #0056B3;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 10000;
    transition: top 0.3s;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu on ESC
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// ========================================
// WHATSAPP FORM SUBMISSION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const whatsappForm = document.getElementById('whatsapp-form');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const nome = document.getElementById('nome').value.trim();
            const mensagemTipo = document.getElementById('mensagem-tipo').value;

            // Simple validation
            if (!nome || !mensagemTipo) {
                alert('Por favor, preencha seu nome e escolha o tipo de mensagem.');
                return;
            }

            // Get the selected message text
            const mensagemSelecionada = document.getElementById('mensagem-tipo').selectedOptions[0].text;

            // Create WhatsApp message
            const whatsappMessage = `${nome}

${mensagemSelecionada}`;

            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappNumber = '5524988805041'; // (24)98880-5041
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Reset form
            this.reset();
        });
    }
});

