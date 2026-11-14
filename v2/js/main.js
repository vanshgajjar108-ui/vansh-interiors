'use strict';
/* ==========================================================================
   OPTION 2: "RAW CONCRETE" — BRUTALIST JAVASCRIPT SYSTEM
   Interactive terminal loader, dual custom cursor, active HUD tracking,
   sticky thesis chapter indicator, mobile drawer modal.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. TERMINAL PRELOADER
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  const msg = document.getElementById('loaderMsg');

  const messages = [
    'PARSING SPATIAL PARAMETERS...',
    'INDEXING 6.4m GRID INVARIANTS...',
    'CALIBRATING TECTONIC MESHES...',
    'COMPILING ARCHITECTURAL SCHEMATICS...',
    'STUDIO ARCHIVE READY // ONLINE'
  ];

  let progress = 0;
  let msgIdx = 0;

  const timer = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 8;
    if (progress > 100) progress = 100;

    if (bar) bar.style.width = progress + '%';
    if (pct) pct.textContent = (progress < 10 ? '0' : '') + progress + '%';

    const nextMsgIdx = Math.min(Math.floor((progress / 100) * messages.length), messages.length - 1);
    if (nextMsgIdx !== msgIdx && msg) {
      msgIdx = nextMsgIdx;
      msg.textContent = messages[msgIdx];
    }

    if (progress === 100) {
      clearInterval(timer);
      setTimeout(() => {
        if (loader) loader.classList.add('loaded');
      }, 350);
    }
  }, 60);

  // 2. DUAL CUSTOM CURSOR
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (dot && ring && window.matchMedia('(min-width: 992px)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(renderRing);
    }
    requestAnimationFrame(renderRing);

    const interactiveTargets = document.querySelectorAll('a, button, .concrete-card, .prof-card, .p-card, .ct-link-row');
    interactiveTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('cursor--hover'));
    });
  }

  // 3. MOBILE DRAWER NAVIGATION
  const toggle = document.getElementById('menuToggle');
  const drawer = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('menuClose');
  const drawerLinks = document.querySelectorAll('.mob-link');

  function openDrawer() {
    drawer.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // 4. ACTIVE SECTION TRACKING (HUD NAV)
  const navLinks = document.querySelectorAll('.hud-link');
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.style.borderColor = 'var(--graphite)';
            link.style.background = 'var(--bone-dark)';
          } else if (!link.classList.contains('hud-link--cta')) {
            link.style.borderColor = 'transparent';
            link.style.background = 'transparent';
          }
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '-64px 0px 0px 0px' });

  sections.forEach((sec) => sectionObserver.observe(sec));

  // 5. STICKY THESIS CHAPTERS OBSERVER
  const thesisChapters = document.querySelectorAll('.th-chapter[id]');
  const thesisLinks = document.querySelectorAll('.tsb-link');

  const thesisObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        thesisLinks.forEach((link) => {
          const match = link.getAttribute('href') === `#${activeId}`;
          link.classList.toggle('active', match);
          if (match) {
            link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-120px 0px 0px 0px' });

  thesisChapters.forEach((ch) => thesisObserver.observe(ch));

  // 6. SMOOTH ANCHOR OFFSET SCROLL
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. GLITCH EFFECT RANDOMIZER (SUBTLE RAW TECTONIC TOUCH)
  const glitchBrands = document.querySelectorAll('.hud-glitch');
  glitchBrands.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
      setTimeout(() => { el.style.transform = 'none'; }, 120);
    });
  });
});