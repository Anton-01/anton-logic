/* ==========================================================================
   Anton Logic - JavaScript
   Main scripts for interactivity, animations, and bilingual support
   ========================================================================== */

(function () {
    'use strict';

    // ==========================================================================
    // Configuration
    // ==========================================================================

    const CONFIG = {
        animationDuration: 600,
        scrollOffset: 80,
        counterDuration: 2000,
        preloaderDelay: 500
    };

    // ==========================================================================
    // DOM Elements
    // ==========================================================================

    const DOM = {
        preloader: document.getElementById('preloader'),
        header: document.getElementById('header'),
        navMenu: document.getElementById('nav-menu'),
        navToggle: document.getElementById('nav-toggle'),
        langToggle: document.getElementById('lang-toggle'),
        langDropdown: document.getElementById('lang-dropdown'),
        langMenu: document.getElementById('lang-menu'),
        langFlag: document.getElementById('lang-flag'),
        contactForm: document.getElementById('contact-form'),
        html: document.documentElement
    };

    // ==========================================================================
    // Language System
    // ==========================================================================

    const LanguageSystem = {
        currentLang: 'es',

        init() {
            // Check for saved language preference, default is always Spanish
            const savedLang = localStorage.getItem('antonlogic-lang');
            if (savedLang) {
                this.currentLang = savedLang;
            }

            // Apply initial language
            this.setLanguage(this.currentLang);

            // Bind dropdown toggle event
            if (DOM.langToggle && DOM.langDropdown) {
                DOM.langToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleDropdown();
                });

                // Bind language option events
                document.querySelectorAll('.lang-option').forEach(option => {
                    option.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const lang = option.getAttribute('data-lang');
                        this.setLanguage(lang);
                        this.closeDropdown();
                    });
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', (e) => {
                    if (!DOM.langDropdown.contains(e.target)) {
                        this.closeDropdown();
                    }
                });

                // Close dropdown on Escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        this.closeDropdown();
                    }
                });
            }
        },

        toggleDropdown() {
            DOM.langDropdown.classList.toggle('active');
            const isOpen = DOM.langDropdown.classList.contains('active');
            DOM.langToggle.setAttribute('aria-expanded', isOpen);
        },

        closeDropdown() {
            DOM.langDropdown.classList.remove('active');
            DOM.langToggle.setAttribute('aria-expanded', 'false');
        },

        setLanguage(lang) {
            this.currentLang = lang;

            // Update HTML lang attribute
            DOM.html.setAttribute('lang', lang);
            DOM.html.setAttribute('data-lang', lang);

            // Update toggle button text
            const langDisplay = DOM.langToggle?.querySelector('.lang-current');
            if (langDisplay) {
                langDisplay.textContent = lang.toUpperCase();
            }

            // Update flag display
            if (DOM.langFlag) {
                const flagEs = DOM.langFlag.querySelector('.flag-es');
                const flagEn = DOM.langFlag.querySelector('.flag-en');
                if (flagEs && flagEn) {
                    flagEs.style.display = lang === 'es' ? 'block' : 'none';
                    flagEn.style.display = lang === 'en' ? 'block' : 'none';
                }
            }

            // Update all translatable elements
            document.querySelectorAll('[data-es][data-en]').forEach(element => {
                const text = element.getAttribute(`data-${lang}`);
                if (text) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = text;
                    } else if (element.tagName === 'OPTION') {
                        element.textContent = text;
                    } else {
                        element.textContent = text;
                    }
                }
            });

            // Update large content blocks (e.g., privacy policy, terms)
            document.querySelectorAll('[data-lang-content]').forEach(block => {
                const blockLang = block.getAttribute('data-lang-content');
                block.style.display = blockLang === lang ? 'block' : 'none';
            });

            // Update meta tags for SEO
            this.updateMetaTags(lang);

            // Save preference
            localStorage.setItem('antonlogic-lang', lang);
        },

        updateMetaTags(lang) {
            const titles = {
                es: 'Anton Logic | Desarrollo de Software & Diseño Web Profesional',
                en: 'Anton Logic | Software Development & Professional Web Design'
            };

            const descriptions = {
                es: 'Anton Logic - Expertos en desarrollo de software a medida, páginas web profesionales, APIs, consultoría técnica y desarrollo de marca. Transformamos tus ideas en soluciones digitales.',
                en: 'Anton Logic - Experts in custom software development, professional websites, APIs, technical consulting, and brand development. We transform your ideas into digital solutions.'
            };

            document.title = titles[lang];

            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', descriptions[lang]);
            }

            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) {
                ogTitle.setAttribute('content', titles[lang]);
            }

            const ogDescription = document.querySelector('meta[property="og:description"]');
            if (ogDescription) {
                ogDescription.setAttribute('content', descriptions[lang]);
            }
        }
    };

    // ==========================================================================
    // Navigation System
    // ==========================================================================

    const NavigationSystem = {
        init() {
            this.bindScrollEvents();
            this.bindMobileMenu();
            this.bindSmoothScroll();
            this.setActiveLink();
        },

        bindScrollEvents() {
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;

                // Header background on scroll
                if (currentScroll > 50) {
                    DOM.header?.classList.add('scrolled');
                } else {
                    DOM.header?.classList.remove('scrolled');
                }

                // Update active nav link
                this.setActiveLink();

                lastScroll = currentScroll;
            }, { passive: true });
        },

        bindMobileMenu() {
            const navMenuClose = document.getElementById('nav-menu-close');

            if (DOM.navToggle && DOM.navMenu) {
                // Open menu
                DOM.navToggle.addEventListener('click', () => {
                    DOM.navToggle.classList.toggle('active');
                    DOM.navMenu.classList.toggle('active');
                    document.body.classList.toggle('no-scroll');
                });

                // Close button
                if (navMenuClose) {
                    navMenuClose.addEventListener('click', () => {
                        this.closeMobileMenu();
                    });
                }

                // Close menu when clicking a link
                DOM.navMenu.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', () => {
                        this.closeMobileMenu();
                    });
                });

                // Close menu when clicking CTA
                const menuCta = DOM.navMenu.querySelector('.nav-menu-cta');
                if (menuCta) {
                    menuCta.addEventListener('click', () => {
                        this.closeMobileMenu();
                    });
                }
            }
        },

        closeMobileMenu() {
            DOM.navToggle?.classList.remove('active');
            DOM.navMenu?.classList.remove('active');
            document.body.classList.remove('no-scroll');
        },

        bindSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;

                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        const offsetTop = target.offsetTop - CONFIG.scrollOffset;

                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        },

        setActiveLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.pageYOffset + CONFIG.scrollOffset + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    };

    // ==========================================================================
    // Animation System (AOS-like)
    // ==========================================================================

    const AnimationSystem = {
        init() {
            this.observeElements();
        },

        observeElements() {
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.getAttribute('data-aos-delay') || 0;

                        setTimeout(() => {
                            entry.target.classList.add('aos-animate');
                        }, parseInt(delay));

                        // Unobserve after animation
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('[data-aos]').forEach(element => {
                observer.observe(element);
            });
        }
    };

    // ==========================================================================
    // Counter Animation
    // ==========================================================================

    const CounterSystem = {
        init() {
            this.observeCounters();
        },

        observeCounters() {
            const counters = document.querySelectorAll('[data-count]');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        },

        animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = CONFIG.counterDuration;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(easeOut * target);

                element.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        }
    };

    // ==========================================================================
    // Form Handler
    // ==========================================================================

    const FormSystem = {
        // Configuration for the contact form
        config: {
            // Web3Forms API endpoint (free, no backend required)
            apiUrl: 'https://api.web3forms.com/submit',
            // Rate limiting: minimum seconds between submissions
            minSubmitInterval: 30,
            // Last submission timestamp
            lastSubmitTime: 0,
            // reCAPTCHA v3 site key - Replace with your own key from https://www.google.com/recaptcha/admin
            recaptchaSiteKey: '6Lf3B2YsAAAAAG6iTmz2MT7wQOwx22R-tk-CGHln'
        },

        init() {
            if (DOM.contactForm) {
                DOM.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
                this.setupValidation();
            }
        },

        setupValidation() {
            // Real-time email validation
            const emailInput = DOM.contactForm.querySelector('#email');
            if (emailInput) {
                emailInput.addEventListener('blur', () => {
                    this.validateEmail(emailInput);
                });
            }

            // Name validation
            const nameInput = DOM.contactForm.querySelector('#name');
            if (nameInput) {
                nameInput.addEventListener('blur', () => {
                    this.validateName(nameInput);
                });
            }
        },

        validateEmail(input) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const isValid = emailRegex.test(input.value);
            this.setFieldValidation(input, isValid);
            return isValid;
        },

        validateName(input) {
            const isValid = input.value.trim().length >= 2;
            this.setFieldValidation(input, isValid);
            return isValid;
        },

        setFieldValidation(input, isValid) {
            if (input.value.length > 0) {
                input.style.borderColor = isValid ? 'var(--color-secondary)' : '#EF4444';
            } else {
                input.style.borderColor = '';
            }
        },

        async handleSubmit(e) {
            e.preventDefault();

            const formData = new FormData(DOM.contactForm);
            const currentLang = LanguageSystem.currentLang;
            const submitBtn = DOM.contactForm.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;

            // Anti-spam check 1: Honeypot field
            const honeypot = formData.get('botcheck');
            if (honeypot && honeypot.length > 0) {
                console.warn('Bot detected via honeypot');
                return; // Silently fail for bots
            }

            // Anti-spam check 2: Rate limiting
            const now = Date.now();
            if (now - this.config.lastSubmitTime < this.config.minSubmitInterval * 1000) {
                const waitMessage = currentLang === 'es'
                    ? 'Por favor espera unos segundos antes de enviar otro mensaje.'
                    : 'Please wait a few seconds before sending another message.';
                this.showNotification(waitMessage, 'error');
                return;
            }

            // Anti-spam check 3: Basic content validation
            const message = formData.get('message');
            if (this.containsSpamPatterns(message)) {
                const spamMessage = currentLang === 'es'
                    ? 'Tu mensaje parece contener contenido no permitido.'
                    : 'Your message appears to contain disallowed content.';
                this.showNotification(spamMessage, 'error');
                return;
            }

            // Show loading state
            submitBtn.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="50" stroke-linecap="round">
                        <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="1s" repeatCount="indefinite"/>
                    </circle>
                </svg>
                <span>${currentLang === 'es' ? 'Enviando...' : 'Sending...'}</span>
            `;
            submitBtn.disabled = true;

            try {
                // reCAPTCHA v3: Generate token before submission
                if (typeof grecaptcha !== 'undefined' && this.config.recaptchaSiteKey && !this.config.recaptchaSiteKey.includes('XXXX')) {
                    try {
                        const token = await grecaptcha.execute(this.config.recaptchaSiteKey, { action: 'contact_form' });
                        const tokenField = document.getElementById('recaptcha-token');
                        if (tokenField) tokenField.value = token;
                        formData.set('recaptcha_token', token);
                    } catch (recaptchaError) {
                        console.warn('reCAPTCHA token generation failed:', recaptchaError);
                    }
                }
                // Check if using demo mode (no API key configured)
                const accessKey = formData.get('access_key');
                const isDemoMode = !accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE';

                if (isDemoMode) {
                    // Demo mode - simulate submission
                    await this.simulateSubmission(formData);
                } else {
                    // Production mode - send to Web3Forms
                    await this.sendToApi(formData);
                }

                // Update rate limiting timestamp
                this.config.lastSubmitTime = Date.now();
                // Success message
                const successMessage = currentLang === 'es'
                    ? '¡Mensaje enviado con éxito! Te contactaremos pronto.'
                    : 'Message sent successfully! We\'ll contact you soon.';

                this.showNotification(successMessage, 'success')
                DOM.contactForm.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                const errorMessage = currentLang === 'es'
                    ? 'Error al enviar el mensaje. Por favor intenta de nuevo.'
                    : 'Error sending message. Please try again.';
                this.showNotification(errorMessage, 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        },

        async simulateSubmission(formData) {
            // Simulate network delay for demo purposes
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('📧 Form data (Demo Mode):', Object.fromEntries(formData.entries()));
                    console.log('ℹ️ To enable real email delivery:');
                    console.log('   1. Get a free API key from https://web3forms.com');
                    console.log('   2. Replace "YOUR_ACCESS_KEY_HERE" in index.html');
                    resolve();
                }, 1500);
            });
        },

        async sendToApi(formData) {
            const response = await fetch(this.config.apiUrl, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message || 'Submission failed');
            }
            return result;
        },
        containsSpamPatterns(text) {
            if (!text) return false;

            // Common spam patterns
            const spamPatterns = [
                /\[url=/i,
                /\[link=/i,
                /<a\s+href/i,
                /viagra|cialis|casino|poker|lottery/i,
                /click here.*free/i,
                /earn.*\$\d+.*day/i,
                /http[s]?:\/\/.*http[s]?:\/\//i, // Multiple URLs
            ];

            return spamPatterns.some(pattern => pattern.test(text));
        },

        showNotification(message, type = 'success') {
            // Remove existing notifications
            document.querySelectorAll('.notification').forEach(n => n.remove());

            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        ${type === 'success'
                    ? '<path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                    : '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
                }
                    </svg>
                    <span>${message}</span>
                </div>
                <button class="notification-close" aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            `;

            // Add notification styles if not present
            if (!document.querySelector('#notification-styles')) {
                const styles = document.createElement('style');
                styles.id = 'notification-styles';
                styles.textContent = `
                    .notification {
                        position: fixed;
                        bottom: 24px;
                        right: 24px;
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        padding: 16px 20px;
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                        z-index: 1000;
                        animation: slideIn 0.3s ease;
                    }
                    
                    @keyframes slideIn {
                        from {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                    
                    .notification-content {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    
                    .notification-success .notification-content svg {
                        color: #10B981;
                    }
                    
                    .notification-error .notification-content svg {
                        color: #EF4444;
                    }
                    
                    .notification-content span {
                        font-size: 14px;
                        font-weight: 500;
                        color: #1F2937;
                    }
                    
                    .notification-close {
                        padding: 4px;
                        color: #9CA3AF;
                        cursor: pointer;
                        transition: color 0.2s;
                    }
                    
                    .notification-close:hover {
                        color: #4B5563;
                    }
                `;
                document.head.appendChild(styles);
            }

            document.body.appendChild(notification);

            // Close button
            notification.querySelector('.notification-close').addEventListener('click', () => {
                notification.remove();
            });

            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideIn 0.3s ease reverse';
                    setTimeout(() => notification.remove(), 300);
                }
            }, 5000);
        }
    };

    // ==========================================================================
    // Preloader
    // ==========================================================================

    const PreloaderSystem = {
        init() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    if (DOM.preloader) {
                        DOM.preloader.classList.add('hidden');
                    }
                }, CONFIG.preloaderDelay);
            });
        }
    };

    // ==========================================================================
    // Cursor Effects (Optional - for desktop)
    // ==========================================================================

    const CursorSystem = {
        init() {
            // Only for non-touch devices
            if ('ontouchstart' in window) return;

            // Add cursor follower for interactive elements
            document.querySelectorAll('a, button, .service-card, .portfolio-card').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    document.body.style.cursor = 'pointer';
                });

                el.addEventListener('mouseleave', () => {
                    document.body.style.cursor = 'default';
                });
            });
        }
    };

    // ==========================================================================
    // Parallax Effects (Subtle)
    // ==========================================================================

    const ParallaxSystem = {
        init() {
            // Only for larger screens
            if (window.innerWidth < 1024) return;

            const orbs = document.querySelectorAll('.hero-orb');

            window.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;

                orbs.forEach((orb, index) => {
                    const multiplier = index === 0 ? 1 : -0.5;
                    orb.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
                });
            }, { passive: true });
        }
    };

    // ==========================================================================
    // Typing Effect for Code Mockup
    // ==========================================================================

    const TypingSystem = {
        init() {
            const codeElement = document.querySelector('.mockup-code code');
            if (!codeElement) return;

            // Store original HTML
            const originalHTML = codeElement.innerHTML;

            // Simple cursor blink effect
            const style = document.createElement('style');
            style.textContent = `
                .mockup-code::after {
                    content: '|';
                    animation: blink 1s step-end infinite;
                    color: #F8F8F2;
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ==========================================================================
    // Service Worker Registration (for PWA capability)
    // ==========================================================================

    const PWASystem = {
        init() {
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    // Uncomment when you have a service worker file
                    // navigator.serviceWorker.register('/sw.js');
                });
            }
        }
    };

    // ==========================================================================
    // Performance Optimization
    // ==========================================================================

    const PerformanceSystem = {
        init() {
            // Lazy load images
            this.lazyLoadImages();

            // Defer non-critical operations
            this.deferOperations();
        },

        lazyLoadImages() {
            // Native lazy loading is already handled by the browser via loading="lazy" attribute in HTML.
            // No manual intervention needed as it was causing issues with undefined src.
        },

        deferOperations() {
            // Use requestIdleCallback for non-critical work
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    // Analytics, third-party scripts, etc.
                });
            }
        }
    };


    // ==========================================================================
    // Modal System
    // ==========================================================================

    const ModalSystem = {
        init() {
            this.bindModalTriggers();
            this.bindCloseEvents();
            this.updateModalLanguage();
        },

        bindModalTriggers() {
            document.querySelectorAll('[data-modal]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modalId = trigger.getAttribute('data-modal');
                    this.openModal(`modal-${modalId}`);
                });
            });
        },

        bindCloseEvents() {
            // Close on overlay click or close button
            document.querySelectorAll('[data-modal-close]').forEach(closer => {
                closer.addEventListener('click', () => {
                    const modal = closer.closest('.modal');
                    if (modal) {
                        this.closeModal(modal.id);
                    }
                });
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const activeModal = document.querySelector('.modal.active');
                    if (activeModal) {
                        this.closeModal(activeModal.id);
                    }
                }
            });
        },

        openModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.classList.add('modal-open');

                // Update content language
                this.updateModalContentLanguage(modal);

                // Focus management
                const closeBtn = modal.querySelector('.modal-close');
                if (closeBtn) {
                    closeBtn.focus();
                }
            }
        },

        closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');

                // Return focus to trigger
                const trigger = document.querySelector(`[data-modal="${modalId.replace('modal-', '')}"]`);
                if (trigger) {
                    trigger.focus();
                }
            }
        },

        updateModalLanguage() {
            // Listen for language changes
            const originalSetLanguage = LanguageSystem.setLanguage.bind(LanguageSystem);
            LanguageSystem.setLanguage = (lang) => {
                originalSetLanguage(lang);
                document.querySelectorAll('.modal').forEach(modal => {
                    this.updateModalContentLanguage(modal);
                });
            };
        },

        updateModalContentLanguage(modal) {
            const currentLang = LanguageSystem.currentLang;
            const esContent = modal.querySelector('[data-lang-content="es"]');
            const enContent = modal.querySelector('[data-lang-content="en"]');

            if (esContent && enContent) {
                if (currentLang === 'es') {
                    esContent.style.display = 'block';
                    enContent.style.display = 'none';
                } else {
                    esContent.style.display = 'none';
                    enContent.style.display = 'block';
                }
            }
        }
    };

    // ==========================================================================
    // Accessibility Improvements
    // ==========================================================================

    const AccessibilitySystem = {
        init() {
            // Focus visible styles
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });

            // Add focus visible styles
            const style = document.createElement('style');
            style.textContent = `
                .keyboard-navigation *:focus {
                    outline: 2px solid var(--color-primary);
                    outline-offset: 2px;
                }
                
                *:focus:not(:focus-visible) {
                    outline: none;
                }
                
                *:focus-visible {
                    outline: 2px solid var(--color-primary);
                    outline-offset: 2px;
                }
            `;
            document.head.appendChild(style);

            // Escape key closes mobile menu
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && DOM.navMenu?.classList.contains('active')) {
                    DOM.navToggle.click();
                }
            });
        }
    };

    // ==========================================================================
    // URL Clean System (Remove .html extension)
    // ==========================================================================

    const URLCleanSystem = {
        init() {
            // Remove .html from current URL without reload
            if (window.location.pathname.endsWith('.html')) {
                const cleanPath = window.location.pathname.replace(/\.html$/, '');
                window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
            }

            // Fix form resubmission alert: replace POST state with GET
            if (window.history.replaceState) {
                window.history.replaceState(null, '', window.location.href);
            }
        }
    };

    // ==========================================================================
    // Skeleton Loader System
    // ==========================================================================

    const SkeletonLoaderSystem = {
        init() {
            // Check for connection errors on page load
            this.checkConnectionOnLoad();

            // Monitor form submissions for errors
            this.monitorFormSubmissions();
        },

        checkConnectionOnLoad() {
            // This would check if critical resources failed to load
            window.addEventListener('error', (e) => {
                if (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK') {
                    console.warn('Resource failed to load:', e.target.src || e.target.href);
                    // Could show a connection error message here
                }
            }, true);
        },

        monitorFormSubmissions() {
            // Override the sendToApi method to handle connection errors
            const originalSendToApi = FormSystem.sendToApi;
            FormSystem.sendToApi = async function(formData) {
                try {
                    return await originalSendToApi.call(this, formData);
                } catch (error) {
                    if (!navigator.onLine || error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
                        SkeletonLoaderSystem.showConnectionError();
                    }
                    throw error;
                }
            };
        },

        showSkeleton(container) {
            const skeletonHTML = `
                <div class="skeleton-contact-form">
                    <div class="skeleton-form-group">
                        <div class="skeleton-loader skeleton-label"></div>
                        <div class="skeleton-loader skeleton-input"></div>
                    </div>
                    <div class="skeleton-form-group">
                        <div class="skeleton-loader skeleton-label"></div>
                        <div class="skeleton-loader skeleton-input"></div>
                    </div>
                    <div class="skeleton-form-group">
                        <div class="skeleton-loader skeleton-label"></div>
                        <div class="skeleton-loader skeleton-textarea"></div>
                    </div>
                    <div class="skeleton-loader skeleton-button"></div>
                </div>
            `;
            container.innerHTML = skeletonHTML;
        },

        showConnectionError() {
            const contactSection = document.querySelector('#contact');
            if (!contactSection) return;

            const currentLang = LanguageSystem.currentLang;
            const errorHTML = `
                <div class="connection-error">
                    <div class="connection-error-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <h3 class="connection-error-title" data-es="Error de conexión" data-en="Connection Error">
                        ${currentLang === 'es' ? 'Error de conexión' : 'Connection Error'}
                    </h3>
                    <p class="connection-error-message" data-es="No se pudo conectar con el servidor. Por favor verifica tu conexión a internet e intenta nuevamente."
                        data-en="Could not connect to the server. Please check your internet connection and try again.">
                        ${currentLang === 'es'
                            ? 'No se pudo conectar con el servidor. Por favor verifica tu conexión a internet e intenta nuevamente.'
                            : 'Could not connect to the server. Please check your internet connection and try again.'}
                    </p>
                    <div class="connection-error-actions">
                        <button onclick="location.reload()" class="btn btn-primary">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 4px;">
                                <path d="M14 8a6 6 0 11-12 0 6 6 0 0112 0z" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M8 4v4l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            <span data-es="Reintentar" data-en="Retry">
                                ${currentLang === 'es' ? 'Reintentar' : 'Retry'}
                            </span>
                        </button>
                        <a href="mailto:contacto@antonlogic.com" class="btn btn-outline">
                            <span data-es="Enviar email directo" data-en="Send direct email">
                                ${currentLang === 'es' ? 'Enviar email directo' : 'Send direct email'}
                            </span>
                        </a>
                    </div>
                </div>
            `;

            const formContainer = contactSection.querySelector('.contact-form-wrapper');
            if (formContainer) {
                formContainer.innerHTML = errorHTML;
            }
        },

        hideSkeleton(container, originalContent) {
            container.innerHTML = originalContent;
        }
    };

    // ==========================================================================
    // Services Tabs System
    // ==========================================================================

    const ServicesTabsSystem = {
        init() {
            this.setupTabs();
            this.handleHashNavigation();
        },

        setupTabs() {
            const tabButtons = document.querySelectorAll('.service-tab');
            if (!tabButtons.length) return;

            tabButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const serviceId = button.getAttribute('data-service');
                    this.switchTab(serviceId);

                    // Update URL hash for tracking
                    window.history.pushState(null, '', `#servicio-${serviceId}`);
                });
            });
        },

        switchTab(serviceId) {
            // Remove active class from all tabs and panels
            document.querySelectorAll('.service-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.service-tab-panel').forEach(panel => {
                panel.classList.remove('active');
            });

            // Add active class to selected tab and panel
            const selectedTab = document.querySelector(`.service-tab[data-service="${serviceId}"]`);
            const selectedPanel = document.querySelector(`.service-tab-panel[data-service="${serviceId}"]`);

            if (selectedTab) selectedTab.classList.add('active');
            if (selectedPanel) {
                selectedPanel.classList.add('active');

                // Scroll to tabs section smoothly
                setTimeout(() => {
                    selectedPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        },

        handleHashNavigation() {
            // Check if URL has a hash for direct navigation
            const hash = window.location.hash;
            if (hash && hash.startsWith('#servicio-')) {
                const serviceId = hash.replace('#servicio-', '');
                this.switchTab(serviceId);
            }

            // Handle browser back/forward buttons
            window.addEventListener('hashchange', () => {
                const hash = window.location.hash;
                if (hash && hash.startsWith('#servicio-')) {
                    const serviceId = hash.replace('#servicio-', '');
                    this.switchTab(serviceId);
                }
            });
        }
    };

    // ==========================================================================
    // Initialize Everything
    // ==========================================================================

    function init() {
        URLCleanSystem.init();
        PreloaderSystem.init();
        LanguageSystem.init();
        NavigationSystem.init();
        AnimationSystem.init();
        CounterSystem.init();
        FormSystem.init();
        SkeletonLoaderSystem.init();
        ServicesTabsSystem.init();
        ModalSystem.init();
        CursorSystem.init();
        ParallaxSystem.init();
        TypingSystem.init();
        PerformanceSystem.init();
        AccessibilitySystem.init();

        console.log('🚀 Anton Logic - Website initialized');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
