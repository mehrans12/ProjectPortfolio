
(function () {
    'use strict';

    // --- DOM Elements ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const heroParticles = document.getElementById('heroParticles');
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    // ---- Navbar scroll effect ----
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();


    // ---- Hamburger toggle ----
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    // ---- Smooth scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                var offset = 80;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });


    // ---- Active nav link highlighting ----
    function highlightActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav-link');
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNav, { passive: true });
    highlightActiveNav();


    // ---- Hero Particles ----
    function createParticles() {
        if (!heroParticles) return;
        for (var i = 0; i < 30; i++) {
            var particle = document.createElement('div');
            particle.className = 'particle';
            var size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.bottom = '-10px';
            particle.style.animationDuration = (Math.random() * 12 + 8) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            heroParticles.appendChild(particle);
        }
    }

    createParticles();


    // ---- Dynamic title typing effect ----
    var dynamicTitle = document.getElementById('dynamicTitle');
    if (dynamicTitle) {
        var titles = [
            'beautiful websites',
            'Shopify stores',
            'WordPress sites',
            'web applications',
            'digital experiences'
        ];
        var titleIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var typeSpeed = 80;

        function typeTitle() {
            var current = titles[titleIndex];

            if (isDeleting) {
                dynamicTitle.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                dynamicTitle.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === current.length) {
                typeSpeed = 2000; // pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typeSpeed = 400; // pause before new word
            }

            setTimeout(typeTitle, typeSpeed);
        }

        setTimeout(typeTitle, 1500);
    }


    // ---- Scroll reveal animations ----
    function initRevealAnimations() {
        var elements = document.querySelectorAll(
            '.service-card, .project-card, .stat-card, .skill-card, .contact-card, .about-text, .about-stats, .section-header'
        );

        elements.forEach(function (el, index) {
            el.classList.add('reveal');
            // Add stagger delay based on siblings
            var siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
            var siblingIndex = siblings.indexOf(el);
            if (siblingIndex > 0 && siblingIndex < 5) {
                el.classList.add('reveal-delay-' + siblingIndex);
            }
        });
    }

    function handleReveal() {
        var reveals = document.querySelectorAll('.reveal');
        reveals.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    }

    initRevealAnimations();
    window.addEventListener('scroll', handleReveal, { passive: true });
    window.addEventListener('load', handleReveal);


    // ---- Animated stat counters ----
    var statCountersAnimated = false;

    function animateCounters() {
        if (statCountersAnimated) return;

        var statNumbers = document.querySelectorAll('.stat-number');
        if (!statNumbers.length) return;

        var firstStat = statNumbers[0];
        var rect = firstStat.getBoundingClientRect();
        if (rect.top > window.innerHeight - 80) return;

        statCountersAnimated = true;

        statNumbers.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            var suffix = el.getAttribute('data-suffix') || '';
            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                // Ease out cubic
                var easedProgress = 1 - Math.pow(1 - progress, 3);
                var current = Math.floor(easedProgress * target);
                el.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target + suffix;
                }
            }

            requestAnimationFrame(step);
        });
    }

    window.addEventListener('scroll', animateCounters, { passive: true });
    window.addEventListener('load', animateCounters);


    // ---- Skill ring animations ----
    function animateSkillRings() {
        var skillCards = document.querySelectorAll('.skill-card:not(.animated)');

        skillCards.forEach(function (card) {
            var rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                card.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateSkillRings, { passive: true });
    window.addEventListener('load', animateSkillRings);


    // ---- Contact form handling ----
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var btnSpan = submitBtn.querySelector('span');
            var btnSvg = submitBtn.querySelector('svg');
            var originalText = btnSpan.textContent;

            btnSpan.textContent = 'Sending...';
            btnSvg.style.display = 'none';
            submitBtn.disabled = true;

            // Simulate sending
            setTimeout(function () {
                btnSpan.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

                contactForm.reset();

                setTimeout(function () {
                    btnSpan.textContent = originalText;
                    btnSvg.style.display = '';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2500);
            }, 1500);
        });
    }


    // ---- Scroll indicator hide on scroll ----
    var scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = '';
            }
        }, { passive: true });
    }


    // ---- Prevent scroll when mobile menu is open ----
    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

})();
