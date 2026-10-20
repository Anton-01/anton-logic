/* ==========================================================================
   Anton Logic — JavaScript
   Mega-menú, menú móvil, selector de idioma, anclas del sitio anterior
   y formulario de contacto. Sin animaciones.
   ========================================================================== */

(function () {
    'use strict';

    // Debe coincidir con la clave que lee el script en línea del <head>
    const LANG_KEY = 'antonlogic-lang-v2';
    const LANG = document.documentElement.lang.slice(0, 2) === 'en' ? 'en' : 'es';
    const desktop = window.matchMedia('(min-width: 1081px)');

    function store(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            /* almacenamiento no disponible: se ignora */
        }
    }

    // ==========================================================================
    // Navegación: mega-menú de Servicios y menú móvil
    // ==========================================================================

    const Navigation = {
        init() {
            this.header = document.getElementById('site-header');
            this.toggle = document.getElementById('menu-toggle');
            this.megaBtn = document.getElementById('mega-btn');
            this.mega = document.getElementById('mega-servicios');
            if (!this.header) return;

            this.megaBtn.addEventListener('click', (e) => {
                // Con ratón en escritorio el panel ya se abrió al pasar el puntero:
                // el clic no debe cerrarlo. Con teclado (detail 0) o en móvil, alterna.
                if (desktop.matches && e.detail > 0) this.setMega(true);
                else this.setMega(this.mega.hidden);
            });

            const item = this.megaBtn.closest('li');
            item.addEventListener('mouseenter', () => { if (desktop.matches) this.setMega(true); });
            item.addEventListener('mouseleave', () => { if (desktop.matches) this.setMega(false); });

            this.toggle.addEventListener('click', () => this.setMenu(!this.header.classList.contains('is-open')));

            document.addEventListener('keydown', (e) => {
                if (e.key !== 'Escape') return;
                if (!this.mega.hidden) {
                    this.setMega(false);
                    this.megaBtn.focus();
                } else if (this.header.classList.contains('is-open')) {
                    this.setMenu(false);
                    this.toggle.focus();
                }
            });

            document.addEventListener('click', (e) => {
                if (!this.header.contains(e.target)) {
                    this.setMega(false);
                    this.setMenu(false);
                }
            });

            desktop.addEventListener('change', () => {
                this.setMega(false);
                this.setMenu(false);
            });
        },

        setMega(open) {
            this.megaBtn.setAttribute('aria-expanded', String(open));
            this.mega.hidden = !open;
        },

        setMenu(open) {
            this.header.classList.toggle('is-open', open);
            this.toggle.setAttribute('aria-expanded', String(open));
        }
    };

    // ==========================================================================
    // Selector de idioma
    // Cada idioma tiene su URL (/ y /en/). Se recuerda la elección explícita;
    // nunca se redirige según el idioma del navegador, para que los buscadores
    // indexen ambas versiones.
    // ==========================================================================

    const LanguageSelect = {
        init() {
            this.root = document.querySelector('[data-lang-select]');
            if (!this.root) return;
            this.button = this.root.querySelector('.lang-button');
            this.menu = this.root.querySelector('.lang-menu');
            this.links = Array.from(this.menu.querySelectorAll('a'));
            this.menu.hidden = true;

            this.button.addEventListener('click', () => this.setOpen(this.menu.hidden));

            this.button.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.setOpen(true);
                    this.focusLink(e.key === 'ArrowDown' ? 0 : this.links.length - 1);
                }
            });

            this.menu.addEventListener('keydown', (e) => {
                const index = this.links.indexOf(document.activeElement);
                if (e.key === 'ArrowDown') { e.preventDefault(); this.focusLink((index + 1) % this.links.length); }
                if (e.key === 'ArrowUp') { e.preventDefault(); this.focusLink((index - 1 + this.links.length) % this.links.length); }
                if (e.key === 'Home') { e.preventDefault(); this.focusLink(0); }
                if (e.key === 'End') { e.preventDefault(); this.focusLink(this.links.length - 1); }
                if (e.key === 'Escape') { e.stopPropagation(); this.setOpen(false); this.button.focus(); }
            });

            this.root.addEventListener('focusout', (e) => {
                if (!this.root.contains(e.relatedTarget)) this.setOpen(false);
            });

            document.addEventListener('click', (e) => {
                if (!this.root.contains(e.target)) this.setOpen(false);
            });

            this.links.forEach(link => {
                link.addEventListener('click', () => {
                    store(LANG_KEY, link.getAttribute('data-lang'));
                    // Conserva la sección actual al cambiar de idioma
                    if (location.hash && !link.hash) link.hash = location.hash;
                });
            });
        },

        setOpen(open) {
            this.menu.hidden = !open;
            this.button.setAttribute('aria-expanded', String(open));
        },

        focusLink(index) {
            this.links[index].focus();
        }
    };

    // ==========================================================================
    // Anclas del sitio anterior
    // Redirige enlaces antiguos (marcadores, buscadores, redes) a la sección
    // o página equivalente y limpia la URL. '' = inicio de la página.
    // ==========================================================================

    const LEGACY_ANCHORS = {
        home: '',
        portfolio: '#work',
        'cta-services': '#services',
        contact: 'contact.html',
        'services-hero': '',
        'servicios-principales': '',
        'services-all': '',
        'servicio-consultoria-tecnica': '#consultoria',
        'servicio-software-medida': '#desarrollo',
        'servicio-desarrollo-web': '#desarrollo',
        'servicio-apis-backend': '#desarrollo',
        'servicio-sistemas-legacy': '#modernizacion',
        'servicio-desarrollo-marca': '',
        'servicio-publicidad-especializada': '',
        'faq-hero': '',
        'faq-content': '',
        'privacy-hero': '',
        'privacy-content': '',
        'terms-hero': '',
        'terms-content': ''
    };

    const LegacyAnchors = {
        init() {
            this.resolve();
            window.addEventListener('hashchange', () => this.resolve());
        },

        resolve() {
            const id = decodeURIComponent(location.hash.slice(1));
            if (!id || document.getElementById(id) || !(id in LEGACY_ANCHORS)) return;

            const target = LEGACY_ANCHORS[id];
            if (target.endsWith('.html')) {
                const base = location.pathname.replace(/[^/]*$/, '');
                location.replace(base + target);
                return;
            }

            const el = target && document.getElementById(target.slice(1));
            history.replaceState(null, '', location.pathname + location.search + (el ? target : ''));
            if (el) el.scrollIntoView();
            else window.scrollTo(0, 0);
        }
    };

    // ==========================================================================
    // Formulario de contacto (Web3Forms + Cloudflare Turnstile)
    // ==========================================================================

    const MESSAGES = {
        es: {
            required: 'Completa este campo.',
            name: 'Escribe al menos 2 caracteres.',
            email: 'Escribe un email válido, por ejemplo nombre@empresa.com.',
            invalid: 'Revisa los campos marcados.',
            sending: 'Enviando…',
            success: 'Gracias. Recibí tu mensaje y te responderé en menos de 24 horas.',
            error: 'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme a contacto@antonlogic.com.',
            wait: 'Espera unos segundos antes de enviar otro mensaje.',
            spam: 'Tu mensaje contiene contenido no permitido. Revisa los enlaces e inténtalo de nuevo.'
        },
        en: {
            required: 'Fill in this field.',
            name: 'Enter at least 2 characters.',
            email: 'Enter a valid email, for example name@company.com.',
            invalid: 'Check the highlighted fields.',
            sending: 'Sending…',
            success: 'Thank you. I received your message and will reply within 24 hours.',
            error: 'The message could not be sent. Try again or email me at contacto@antonlogic.com.',
            wait: 'Wait a few seconds before sending another message.',
            spam: 'Your message contains disallowed content. Check the links and try again.'
        }
    };

    const ContactForm = {
        config: {
            apiUrl: 'https://api.web3forms.com/submit',
            minSubmitInterval: 30,
            turnstileSiteKey: '0x4AAAAAACiJfSLnqGKRMtIa'
        },
        lastSubmitTime: 0,
        turnstileWidgetId: null,
        turnstileResolve: null,
        turnstileReject: null,

        init() {
            this.form = document.getElementById('contact-form');
            if (!this.form) return;

            this.status = this.form.querySelector('.form-status');
            this.submitButton = this.form.querySelector('[type="submit"]');
            this.fields = Array.from(this.form.querySelectorAll('.field input, .field select, .field textarea'));

            this.form.setAttribute('novalidate', '');
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));

            this.fields.forEach(field => {
                field.addEventListener('blur', () => {
                    if (field.value !== '') this.validateField(field);
                });
                field.addEventListener('input', () => {
                    if (field.getAttribute('aria-invalid') === 'true') this.validateField(field);
                });
            });

            this.initTurnstile();
        },

        t(key) {
            return MESSAGES[LANG][key];
        },

        validateField(field) {
            const value = field.value.trim();
            let message = '';

            if (field.required && value === '') {
                message = this.t('required');
            } else if (field.name === 'name' && value.length < 2) {
                message = this.t('name');
            } else if (field.type === 'email' && value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
                message = this.t('email');
            }

            const error = document.getElementById(`${field.id}-error`);
            if (error) error.textContent = message;
            field.setAttribute('aria-invalid', String(message !== ''));
            return message === '';
        },

        setStatus(message, state) {
            this.status.textContent = message;
            this.status.setAttribute('data-state', state);
        },

        initTurnstile() {
            const render = () => {
                const container = document.getElementById('turnstile-widget');
                if (!container || typeof turnstile === 'undefined' || this.turnstileWidgetId !== null) return;

                this.turnstileWidgetId = turnstile.render(container, {
                    sitekey: this.config.turnstileSiteKey,
                    size: 'invisible',
                    theme: 'light',
                    callback: (token) => {
                        const tokenField = document.getElementById('turnstile-token');
                        if (tokenField) tokenField.value = token;
                        if (this.turnstileResolve) this.turnstileResolve(token);
                        this.turnstileResolve = this.turnstileReject = null;
                    },
                    'error-callback': () => {
                        if (this.turnstileReject) this.turnstileReject(new Error('Turnstile challenge failed'));
                        this.turnstileResolve = this.turnstileReject = null;
                    }
                });
            };

            if (typeof turnstile !== 'undefined') render();
            else window.addEventListener('load', render);
        },

        getTurnstileToken() {
            return new Promise((resolve, reject) => {
                if (typeof turnstile === 'undefined' || this.turnstileWidgetId === null) {
                    resolve(null);
                    return;
                }
                this.turnstileResolve = resolve;
                this.turnstileReject = reject;
                turnstile.reset(this.turnstileWidgetId);
                turnstile.execute(this.turnstileWidgetId);
            });
        },

        containsSpamPatterns(text) {
            if (!text) return false;
            const patterns = [
                /\[url=/i,
                /\[link=/i,
                /<a\s+href/i,
                /viagra|cialis|casino|poker|lottery/i,
                /click here.*free/i,
                /earn.*\$\d+.*day/i,
                /https?:\/\/.*https?:\/\//i
            ];
            return patterns.some(pattern => pattern.test(text));
        },

        async handleSubmit(e) {
            e.preventDefault();
            const formData = new FormData(this.form);

            // Campo trampa: los bots lo rellenan, las personas no lo ven
            if (formData.get('botcheck')) return;

            const invalid = this.fields.filter(field => !this.validateField(field));
            if (invalid.length > 0) {
                this.setStatus(this.t('invalid'), 'error');
                invalid[0].focus();
                return;
            }

            if (Date.now() - this.lastSubmitTime < this.config.minSubmitInterval * 1000) {
                this.setStatus(this.t('wait'), 'error');
                return;
            }

            if (this.containsSpamPatterns(formData.get('message'))) {
                this.setStatus(this.t('spam'), 'error');
                return;
            }

            const label = this.submitButton.textContent;
            this.submitButton.disabled = true;
            this.submitButton.setAttribute('aria-busy', 'true');
            this.submitButton.textContent = this.t('sending');
            this.setStatus('', '');

            try {
                try {
                    const token = await this.getTurnstileToken();
                    if (token) formData.set('cf-turnstile-response', token);
                } catch (turnstileError) {
                    console.warn('Turnstile verification skipped:', turnstileError);
                }

                const response = await fetch(this.config.apiUrl, { method: 'POST', body: formData });
                const result = await response.json();
                if (!result.success) throw new Error(result.message || 'Submission failed');

                this.lastSubmitTime = Date.now();
                this.form.reset();
                this.fields.forEach(field => field.removeAttribute('aria-invalid'));
                this.setStatus(this.t('success'), 'success');
            } catch (error) {
                console.error('Form submission error:', error);
                this.setStatus(this.t('error'), 'error');
            } finally {
                this.submitButton.disabled = false;
                this.submitButton.removeAttribute('aria-busy');
                this.submitButton.textContent = label;
            }
        }
    };

    function init() {
        Navigation.init();
        LanguageSelect.init();
        LegacyAnchors.init();
        ContactForm.init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
