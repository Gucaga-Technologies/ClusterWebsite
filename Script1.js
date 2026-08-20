/* =============================================================================
   Pharma IT Cluster — site behaviour
   Small and dependency-free. Bootstrap handles collapse / modal / carousel.
   ============================================================================= */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --- Header condenses once the page is scrolled ------------------------ */
    function stickyHeader() {
        var header = document.getElementById('siteHeader');
        if (!header) return;
        var ticking = false;

        function update() {
            header.classList.toggle('is-stuck', window.scrollY > 12);
            ticking = false;
        }
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
        update();
    }

    /* --- Mark the active nav item (fallback for the markup-rendered state) -- */
    function activeNav() {
        var links = document.querySelectorAll('.site-nav .nav-link');
        for (var i = 0; i < links.length; i++) {
            if (links[i].classList.contains('active')) return;
        }
        var path = window.location.pathname.split('/').pop() || 'index.html';
        for (var j = 0; j < links.length; j++) {
            if (links[j].getAttribute('href') === path) {
                links[j].classList.add('active');
                links[j].setAttribute('aria-current', 'page');
            }
        }
    }

    /* --- Reveal content as it enters the viewport --------------------------- */
    var REVEAL_TARGETS = [
        '.home-page-about-container > *',
        '.home-page-synergy-system .container > *',
        '.home-page-target-market .container > *',
        '.home-page-featured-solutions .text-center > *',
        '.home-page-section',
        '.member-page-card',
        '.contact-page-reason',
        '.cluster-solution-feature-item',
        '.key-benefits-list li',
        '.event-card',
        '.target-market-icon-container',
        '.home-page-icon-container',
        '.private-members-section',
        '.about-us-container > *',
        '.coordinator-card'
    ].join(',');

    function revealOnScroll() {
        if (reduceMotion || !('IntersectionObserver' in window)) return;

        var all = document.querySelectorAll(REVEAL_TARGETS);
        var nodes = Array.prototype.filter.call(all, function (n) {
            /* carousel slides are display:none until active, so they would
               never intersect and would stay invisible forever */
            return !n.closest('.carousel-item');
        });
        if (!nodes.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        nodes.forEach(function (node, i) {
            node.classList.add('reveal');
            /* stagger siblings so groups cascade instead of popping in together */
            node.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
            observer.observe(node);
        });
    }

    /* --- Copyright year stays current -------------------------------------- */
    function currentYear() {
        var slots = document.querySelectorAll('[data-current-year]');
        for (var i = 0; i < slots.length; i++) {
            slots[i].textContent = new Date().getFullYear();
        }
    }

    /* --- Clickable table rows should also work for keyboard users ----------- */
    function tableRowKeyboard() {
        var rows = document.querySelectorAll('.product-table tbody tr[data-bs-toggle="modal"]');
        Array.prototype.forEach.call(rows, function (row) {
            row.setAttribute('tabindex', '0');
            row.setAttribute('role', 'button');
            row.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    row.click();
                }
            });
        });
    }

    /* --- Escape closes the event image lightboxes --------------------------- */
    function escapeClosesLightbox() {
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var boxes = document.querySelectorAll('.event-modal');
            Array.prototype.forEach.call(boxes, function (m) {
                if (m.style.display === 'block') m.style.display = 'none';
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        stickyHeader();
        activeNav();
        revealOnScroll();
        currentYear();
        tableRowKeyboard();
        escapeClosesLightbox();
    });
})();
