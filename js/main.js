'use strict';
/* VANSH GAJJAR PORTFOLIO - main.js */

// 1. PAGE LOADER
(function() {
  var loader = document.getElementById('loader');
  var line   = document.getElementById('ll');
  var pct    = document.getElementById('lp');
  if (!loader) return;
  var progress = 0;
  var interval = setInterval(function() {
    progress += Math.random() * 15;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    var v = Math.floor(progress);
    if(line) line.style.width = v + '%';
    if(pct) pct.textContent = v + '%';
    if (progress >= 100) { setTimeout(function(){ loader.classList.add('loaded'); }, 400); }
  }, 80);
  window.addEventListener('load', function() {
    clearInterval(interval);
    if(line) line.style.width = '100%';
    if(pct) pct.textContent = '100%';
    setTimeout(function(){ loader.classList.add('loaded'); }, 600);
  });
})();

// 2. CUSTOM CURSOR
(function() {
  var cursor = document.getElementById('cursor');
  var cf = document.getElementById('cf');
  if (!cursor || !cf) return;
  if (window.matchMedia('(pointer:coarse)').matches) return;
  var mx=0, my=0, fx=0, fy=0, raf=null;
  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    if (!raf) raf = requestAnimationFrame(follow);
  });
  function follow() {
    fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
    cf.style.left = fx + 'px'; cf.style.top = fy + 'px';
    raf = requestAnimationFrame(follow);
  }
  var hoverEls = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-item');
  hoverEls.forEach(function(el) {
    el.addEventListener('mouseenter', function(){ cf.classList.add('hover'); });
    el.addEventListener('mouseleave', function(){ cf.classList.remove('hover'); });
  });
})();

// 3. NAVIGATION
(function() {
  var nav    = document.getElementById('nav');
  var toggle = document.getElementById('menuToggle');
  var menu   = document.getElementById('mobileMenu');
  var close  = document.getElementById('mobileClose');
  if (!nav) return;
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  function openMenu() { menu.classList.add('open'); toggle.classList.add('open'); toggle.setAttribute('aria-expanded','true'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { menu.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); document.body.style.overflow = ''; }
  if(toggle) toggle.addEventListener('click', function(){ menu.classList.contains('open') ? closeMenu() : openMenu(); });
  if(close) close.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-nav-link').forEach(function(l){ l.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && menu.classList.contains('open')) closeMenu(); });
})();

// 4. ACTIVE NAV ON SCROLL
(function() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        navLinks.forEach(function(l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '-72px 0px 0px 0px' });
  sections.forEach(function(s){ obs.observe(s); });
})();

// 5. SCROLL REVEAL
(function() {
  var revealEls = document.querySelectorAll('.reveal-up, .reveal-line');
  if (!revealEls.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = el.dataset.delay || (i * 80);
        setTimeout(function(){ el.classList.add('revealed'); }, delay);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function(el){ obs.observe(el); });
})();

// 6. THESIS STICKY NAV ACTIVE STATE
(function() {
  var thesisSections = document.querySelectorAll('.thesis-section[id]');
  var thesisLinks    = document.querySelectorAll('.thesis-nav-link');
  if (!thesisSections.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        thesisLinks.forEach(function(l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-125px 0px 0px 0px' });
  thesisSections.forEach(function(s){ obs.observe(s); });
})();

// 7. SMOOTH ANCHOR SCROLLING
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 72;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();

// 8. PROJECT CARD STAGGER ON VIEW
(function() {
  var cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var index = Array.from(cards).indexOf(entry.target);
        setTimeout(function(){
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(function(c) {
    c.style.opacity = '0';
    c.style.transform = 'translateY(24px)';
    c.style.transition = 'opacity 0.6s cubic-bezier(0,0,0.2,1), transform 0.6s cubic-bezier(0,0,0.2,1)';
    obs.observe(c);
  });
})();

// 9. PROCESS STEP REVEAL
(function() {
  var steps = document.querySelectorAll('.process-step');
  if (!steps.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var index = Array.from(steps).indexOf(entry.target);
        setTimeout(function(){
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 120);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  steps.forEach(function(s) {
    s.style.opacity = '0';
    s.style.transform = 'translateY(20px)';
    s.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(s);
  });
})();

// 10. PROFILE CARDS REVEAL
(function() {
  var cards = document.querySelectorAll('.profile-card, .method-step, .skill-item');
  if (!cards.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(function(c, i) {
    c.style.opacity = '0';
    c.style.transform = 'translateY(16px)';
    c.style.transition = 'opacity 0.5s ease ' + (i * 60) + 'ms, transform 0.5s ease ' + (i * 60) + 'ms';
    obs.observe(c);
  });
})();

// 11. KEYBOARD NAVIGATION FOR MOBILE MENU
(function() {
  var menu   = document.getElementById('mobileMenu');
  var toggle = document.getElementById('menuToggle');
  if (!menu || !toggle) return;
  var focusable = 'a[href], button, [tabindex]:not([tabindex="-1"])';
  menu.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return;
    var els = Array.from(menu.querySelectorAll(focusable));
    if (!els.length) return;
    var first = els[0], last = els[els.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();

// 12. CONTACT ITEMS — LINK VALIDATION
(function() {
  var contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(function(item) {
    var val = item.querySelector('.contact-item-value');
    if (val && val.textContent.trim().startsWith('[')) {
      item.style.opacity = '0.5';
      item.removeAttribute('href');
      item.style.pointerEvents = 'none';
      item.title = 'Please update this contact detail';
    }
  });
})();