// ========================================
// NAVBAR FUNCTIONALITY
// ========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function throttleScroll(callback) {
    let ticking = false;
    return function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function() {
            callback();
            ticking = false;
        });
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    function setNavMenuOpen(isOpen) {
        if (!navMenu || !navToggle) return;

        navMenu.classList.toggle('active', isOpen);
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute(
            'aria-label',
            isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
        );
    }

    function closeNavMenu() {
        setNavMenuOpen(false);
    }
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isOpen = !navMenu.classList.contains('active');
            setNavMenuOpen(isOpen);
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeNavMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navToggle && navMenu) {
            if (navbar && !navbar.contains(event.target)) {
                closeNavMenu();
            }
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeNavMenu();
            navToggle.focus();
        }
    });
    
    const sections = document.querySelectorAll('section[id]');

    function makeNavLinkActive() {
        const scrollY = window.pageYOffset;

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

    // Navbar scroll + active section (single rAF-throttled handler)
    function updateOnScroll() {
        if (navbar) {
            navbar.classList.toggle('is-scrolled', window.pageYOffset > 50);
        }
        makeNavLinkActive();
    }

    window.addEventListener('scroll', throttleScroll(updateOnScroll), { passive: true });
    updateOnScroll();
    
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

            if (prefersReducedMotion.matches) {
                entry.target.setAttribute('data-animated', 'true');
                statsObserver.unobserve(entry.target);
                return;
            }

            stats.forEach(stat => {
                const text = stat.textContent.trim();
                const isPercent = text.includes('%');
                const target = parseInt(text.replace(/\D/g, ''), 10);
                const suffix = isPercent ? '%' : (text.includes('+') ? '+' : '');

                stat.textContent = '';
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
// CAROUSEL CONTROL
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const carrosselTrack = document.querySelector('.carrossel-track');

    if (!carrosselTrack || carrosselTrack.dataset.loopReady === 'true') return;

    if (!prefersReducedMotion.matches) {
        const logos = Array.from(carrosselTrack.children);
        logos.forEach(function(logo) {
            const clone = logo.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.querySelectorAll('img').forEach(function(img) {
                img.alt = '';
                img.loading = 'lazy';
                img.decoding = 'async';
            });
            carrosselTrack.appendChild(clone);
        });
    }

    carrosselTrack.dataset.loopReady = 'true';

    carrosselTrack.addEventListener('mouseenter', function() {
        carrosselTrack.style.animationPlayState = 'paused';
    });

    carrosselTrack.addEventListener('mouseleave', function() {
        carrosselTrack.style.animationPlayState = 'running';
    });

    carrosselTrack.addEventListener('touchstart', function() {
        carrosselTrack.style.animationPlayState = 'paused';
    }, { passive: true });

    carrosselTrack.addEventListener('touchend', function() {
        setTimeout(function() {
            carrosselTrack.style.animationPlayState = 'running';
        }, 500);
    }, { passive: true });
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
document.addEventListener('DOMContentLoaded', function() {
    if (prefersReducedMotion.matches) return;

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
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
// INTERSECTION OBSERVER POLYFILL CHECK
// ========================================
if (!window.IntersectionObserver) {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('animated');
    });
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================
// Skip link e menu mobile: ver index.html e bloco NAVBAR acima.

// ========================================
// WHATSAPP FORM SUBMISSION
// ========================================
const WHATSAPP_CONTACTS = {
    alcir: {
        number: '5524988805041',
        name: 'Alcir Canuto'
    },
    kleber: {
        number: '5524988661692',
        name: 'Kleber Giroto'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const whatsappForm = document.getElementById('whatsapp-form');
    if (!whatsappForm) return;

    const nomeInput = document.getElementById('nome');
    const mensagemTipoSelect = document.getElementById('mensagem-tipo');
    const submitButton = document.getElementById('whatsapp-submit');
    const formStatus = document.getElementById('form-status');
    const nomeGroup = document.getElementById('form-group-nome');
    const mensagemTipoGroup = document.getElementById('form-group-mensagem-tipo');
    const nomeError = document.getElementById('nome-error');
    const mensagemTipoError = document.getElementById('mensagem-tipo-error');

    function clearFieldError(group, input, errorEl) {
        group.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        errorEl.textContent = '';
    }

    function setFieldError(group, input, errorEl, message) {
        group.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = message;
    }

    function clearFormStatus() {
        if (!formStatus) return;
        formStatus.textContent = '';
        formStatus.className = 'form-status';
    }

    function showFormStatus(message, type) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = `form-status is-visible form-status--${type}`;
    }

    function validateNome() {
        const nome = nomeInput.value.trim();

        if (!nome) {
            setFieldError(nomeGroup, nomeInput, nomeError, 'Informe seu nome completo para abrir o WhatsApp.');
            return false;
        }

        if (nome.length < 2) {
            setFieldError(nomeGroup, nomeInput, nomeError, 'O nome precisa ter pelo menos 2 caracteres.');
            return false;
        }

        clearFieldError(nomeGroup, nomeInput, nomeError);
        return true;
    }

    function validateMensagemTipo() {
        const mensagemTipo = mensagemTipoSelect.value;

        if (!mensagemTipo) {
            setFieldError(
                mensagemTipoGroup,
                mensagemTipoSelect,
                mensagemTipoError,
                'Selecione o assunto para direcionarmos você ao contato certo.'
            );
            return false;
        }

        clearFieldError(mensagemTipoGroup, mensagemTipoSelect, mensagemTipoError);
        return true;
    }

    nomeInput.addEventListener('input', validateNome);
    mensagemTipoSelect.addEventListener('change', validateMensagemTipo);

    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearFormStatus();

        const isNomeValid = validateNome();
        const isMensagemTipoValid = validateMensagemTipo();

        if (!isNomeValid || !isMensagemTipoValid) {
            showFormStatus('Preencha os campos em destaque para continuar.', 'error');
            if (!isNomeValid) {
                nomeInput.focus();
            } else {
                mensagemTipoSelect.focus();
            }
            return;
        }

        const nome = nomeInput.value.trim();
        const selectedOption = mensagemTipoSelect.selectedOptions[0];
        const contactKey = selectedOption.dataset.contact || 'alcir';
        const contact = WHATSAPP_CONTACTS[contactKey] || WHATSAPP_CONTACTS.alcir;
        const mensagemSelecionada = selectedOption.dataset.message || selectedOption.text;
        const whatsappMessage = `${nome}\n\n${mensagemSelecionada}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${contact.number}?text=${encodedMessage}`;

        if (submitButton) {
            submitButton.disabled = true;
        }

        const whatsappWindow = window.open(whatsappURL, '_blank', 'noopener,noreferrer');

        if (!whatsappWindow) {
            showFormStatus(
                'Não foi possível abrir o WhatsApp. Verifique se o navegador bloqueou pop-ups ou acesse: ' + whatsappURL,
                'error'
            );
            if (submitButton) {
                submitButton.disabled = false;
            }
            return;
        }

        showFormStatus(`Abrindo WhatsApp com ${contact.name}. Se não abrir, confira a nova aba do navegador.`, 'success');
        whatsappForm.reset();
        clearFieldError(nomeGroup, nomeInput, nomeError);
        clearFieldError(mensagemTipoGroup, mensagemTipoSelect, mensagemTipoError);

        if (submitButton) {
            setTimeout(function() {
                submitButton.disabled = false;
            }, 1500);
        }
    });
});

