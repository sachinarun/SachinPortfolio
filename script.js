/* ══════════════════════════════════════════════════════
   SACHIN A — CYBERSECURITY PORTFOLIO
   script.js  |  All interactivity
   ══════════════════════════════════════════════════════ */

'use strict';

/* ─── WAIT FOR DOM ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════
     1. PARTICLES.JS BACKGROUND
  ═══════════════════════════════════════ */
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 65, density: { enable: true, value_area: 900 } },
        color:  { value: ['#00E5FF', '#7C3AED', '#a78bfa'] },
        shape:  { type: 'circle' },
        opacity: {
          value: 0.35,
          random: true,
          anim: { enable: true, speed: 0.6, opacity_min: 0.08, sync: false }
        },
        size: {
          value: 2.5,
          random: true,
          anim: { enable: true, speed: 1.5, size_min: 0.3, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 140,
          color: '#00E5FF',
          opacity: 0.09,
          width: 1
        },
        move: {
          enable: true, speed: 0.8, direction: 'none',
          random: true, straight: false, out_mode: 'out',
          attract: { enable: false }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true,  mode: 'grab'  },
          onclick:  { enable: true,  mode: 'push'  },
          resize:   true
        },
        modes: {
          grab:  { distance: 160, line_linked: { opacity: 0.25 } },
          push:  { particles_nb: 2 }
        }
      },
      retina_detect: true
    });
  }

  /* ═══════════════════════════════════════
     2. TYPED.JS ANIMATION
  ═══════════════════════════════════════ */
  const typedEl = document.getElementById('typed-output');
  if (typedEl && typeof Typed !== 'undefined') {
    new Typed(typedEl, {
      strings: [
        'Cyber Security Student',
        'Application Security Enthusiast',
        'Full Stack Developer',
        'AI Learner',
        'Ethical Hacker-in-Training'
      ],
      typeSpeed:   55,
      backSpeed:   30,
      backDelay:   2200,
      startDelay:  400,
      loop:        true,
      cursorChar:  '',      // we have our own cursor in HTML
      showCursor:  false
    });
  }

  /* ═══════════════════════════════════════
     3. AOS — ANIMATE ON SCROLL
  ═══════════════════════════════════════ */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration:   750,
      easing:     'ease-out-cubic',
      once:       true,
      offset:     80,
      disable:    window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }

  /* ═══════════════════════════════════════
     4. STICKY NAVBAR + SCROLL SPY
  ═══════════════════════════════════════ */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');

  const handleNavScroll = () => {
    /* Sticky style */
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    /* Scroll Spy */
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });

    /* Back-to-top button */
    //backTop.classList.toggle('visible', window.scrollY > 400);
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  /* ═══════════════════════════════════════
     5. SMOOTH SCROLL for NAV LINKS
  ═══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      navLinksMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ═══════════════════════════════════════
     6. HAMBURGER MOBILE MENU
  ═══════════════════════════════════════ */
  const hamburger    = document.getElementById('hamburger');
  const navLinksMenu = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinksMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
  });

  /* Close menu on outside click */
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && navLinksMenu.classList.contains('open')) {
      navLinksMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ═══════════════════════════════════════
     7. DARK / LIGHT MODE TOGGLE
  ═══════════════════════════════════════ */
  const darkToggle = document.getElementById('darkToggle');
  const themeIcon  = document.getElementById('themeIcon');

  const savedTheme = localStorage.getItem('sachin-theme') || 'dark';
  if (savedTheme === 'light') applyLight();

  darkToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
      applyDark();
    } else {
      applyLight();
    }
  });

  function applyLight() {
    document.body.classList.add('light-mode');
    themeIcon.className = 'fas fa-sun';
    localStorage.setItem('sachin-theme', 'light');
  }
  function applyDark() {
    document.body.classList.remove('light-mode');
    themeIcon.className = 'fas fa-moon';
    localStorage.setItem('sachin-theme', 'dark');
  }

  /* ═══════════════════════════════════════
     8. ANIMATED COUNTERS
  ═══════════════════════════════════════ */
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  let countersStarted = false;

  const startCounters = () => {
    if (countersStarted) return;
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      countersStarted = true;
      statNums.forEach(el => animateCounter(el));
    }
  };

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();

    const tick = now => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', startCounters, { passive: true });
  startCounters();

  /* ═══════════════════════════════════════
     9. SKILL BARS — ANIMATE ON SCROLL
  ═══════════════════════════════════════ */
  const skillFills = document.querySelectorAll('.skill-fill[data-width]');
  let skillsAnimated = false;

  const animateSkills = () => {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      skillsAnimated = true;
      skillFills.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, i * 80);
      });
    }
  };

  window.addEventListener('scroll', animateSkills, { passive: true });
  animateSkills();

  /* ═══════════════════════════════════════
     10. PROJECT FILTER
  ═══════════════════════════════════════ */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cats = card.dataset.category.split(' ');
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hidden', !show);
        /* Micro-animation on reveal */
        if (show) {
          card.style.animation = 'none';
          void card.offsetWidth; // reflow
          card.style.animation = '';
        }
      });
    });
  });

  /* ═══════════════════════════════════════
     11. TIMELINE TABS
  ═══════════════════════════════════════ */
  const tabBtns     = document.querySelectorAll('.tab-btn[data-tab]');
  const tabContents = document.querySelectorAll('.timeline-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      tabContents.forEach(c => { c.classList.remove('active'); c.hidden = true; });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const target = document.getElementById('tab-' + btn.dataset.tab);
      if (target) { target.classList.add('active'); target.hidden = false; }
    });
  });

  /* ═══════════════════════════════════════
     12. CONTACT FORM VALIDATION + TOAST
  ═══════════════════════════════════════ */
  const sendBtn = document.getElementById('sendBtn');

  const getField   = id => document.getElementById(id);
  const getError   = id => document.getElementById(id + 'Error');
  const setError   = (field, errEl, msg) => {
    field.classList.add('error');
    errEl.textContent = msg;
  };
  const clearError = (field, errEl) => {
    field.classList.remove('error');
    errEl.textContent = '';
  };

  /* Clear errors on input */
  ['contactName','contactEmail','contactSubject','contactMessage'].forEach(id => {
    const el = getField(id);
    if (el) {
      el.addEventListener('input', () => {
        clearError(el, document.getElementById(id.replace('contact','').toLowerCase()+'Error')
          || document.getElementById(id.slice(7).toLowerCase()+'Error')
          || { textContent:'' });
      });
    }
  });

  if (sendBtn) {
    sendBtn.addEventListener('click', handleFormSubmit);
  }

  function handleFormSubmit() {
    const name    = getField('contactName');
    const email   = getField('contactEmail');
    const subject = getField('contactSubject');
    const message = getField('contactMessage');

    const nameErr    = getError('name');
    const emailErr   = getError('email');
    const subjectErr = getError('subject');
    const messageErr = getError('message');

    let valid = true;

    // Name
    if (!name.value.trim()) {
      setError(name, nameErr, 'Please enter your name.');
      valid = false;
    } else { clearError(name, nameErr); }

    // Email
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      setError(email, emailErr, 'Please enter your email.');
      valid = false;
    } else if (!emailRx.test(email.value.trim())) {
      setError(email, emailErr, 'Please enter a valid email address.');
      valid = false;
    } else { clearError(email, emailErr); }

    // Subject
    if (!subject.value.trim()) {
      setError(subject, subjectErr, 'Please enter a subject.');
      valid = false;
    } else { clearError(subject, subjectErr); }

    // Message
    if (!message.value.trim() || message.value.trim().length < 10) {
      setError(message, messageErr, 'Message must be at least 10 characters.');
      valid = false;
    } else { clearError(message, messageErr); }

    if (!valid) {
      showToast('Please fix the errors above.', true);
      return;
    }

    /* Simulate sending */
    sendBtn.disabled = true;
sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

emailjs.send(
  "service_v5b7ea5",
  "template_160m08g",
  {
    name: name.value,
    email: email.value,
    title: subject.value,
    message: message.value,
    time: new Date().toLocaleString()
  }
)
.then(() => {

  sendBtn.disabled = false;
  sendBtn.innerHTML =
    '<i class="fas fa-paper-plane"></i> Send Message';

  name.value = "";
  email.value = "";
  subject.value = "";
  message.value = "";

  showToast("✅ Message Sent Successfully!");

})
.catch((error) => {

  console.log(error);
  alert(JSON.stringify(error));

  sendBtn.disabled = false;
  sendBtn.innerHTML =
    '<i class="fas fa-paper-plane"></i> Send Message';

});
  }

  /* ═══════════════════════════════════════
     13. TOAST NOTIFICATION
  ═══════════════════════════════════════ */
  const toastEl  = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer;

  function showToast(msg, isError = false) {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastMsg.textContent = msg;
    toastEl.querySelector('.toast-icon').className = isError
      ? 'fas fa-exclamation-circle toast-icon'
      : 'fas fa-check-circle toast-icon';
    toastEl.classList.toggle('error-toast', isError);
    toastEl.classList.add('show');
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 4000);
  }

  /* ═══════════════════════════════════════
     14. BACK TO TOP BUTTON
  ═══════════════════════════════════════ */
  const backTop = document.getElementById('backTop');
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ═══════════════════════════════════════
     15. FOOTER YEAR
  ═══════════════════════════════════════ */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ═══════════════════════════════════════
     16. NAVBAR LINK RIPPLE EFFECT
  ═══════════════════════════════════════ */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;border-radius:50%;
        transform:scale(0);animation:ripple .5s linear;
        background:rgba(0,229,255,.18);pointer-events:none;
        width:80px;height:80px;
        left:${e.offsetX - 40}px;top:${e.offsetY - 40}px;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 520);
    });
  });

  /* Ripple keyframe (injected once) */
  if (!document.getElementById('ripple-style')) {
    const st = document.createElement('style');
    st.id = 'ripple-style';
    st.textContent = '@keyframes ripple{to{transform:scale(4);opacity:0;}}';
    document.head.appendChild(st);
  }

  /* ═══════════════════════════════════════
     17. TYPED CURSOR BLINK (manual CSS fallback)
  ═══════════════════════════════════════ */
  const cursor = document.querySelector('.typed-cursor');
  if (cursor) {
    setInterval(() => cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0', 530);
  }

  /* ═══════════════════════════════════════
     18. CERTIFICATE CARD TILT (subtle)
  ═══════════════════════════════════════ */
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ═══════════════════════════════════════
     19. PROJECT CARD — MAGNETIC EFFECT
  ═══════════════════════════════════════ */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left - rect.width  / 2) / rect.width  * 6;
      const y    = (e.clientY - rect.top  - rect.height / 2) / rect.height * 6;
      card.style.transform = `translateY(-4px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  /* ═══════════════════════════════════════
     20. GLITCH EFFECT on NAME (hero) — subtle
  ═══════════════════════════════════════ */
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
      .hero-name { position:relative; }
      @keyframes glitch-clip1 {
        0%,90%,100% { clip-path:inset(0 0 100% 0); transform:translate(0); }
        92%  { clip-path:inset(5% 0 72% 0);   transform:translate(-3px,1px); }
        94%  { clip-path:inset(42% 0 40% 0);  transform:translate(3px,-1px); }
        96%  { clip-path:inset(78% 0 5% 0);   transform:translate(-2px,0); }
        98%  { clip-path:inset(0 0 100% 0);   transform:translate(0); }
      }
    `;
    document.head.appendChild(glitchStyle);
  }

  /* ═══════════════════════════════════════
     21. KEYBOARD ACCESSIBILITY
  ═══════════════════════════════════════ */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      navLinksMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ═══════════════════════════════════════
     22. LAZY IMAGE LOADING (native)
  ═══════════════════════════════════════ */
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', () => { img.style.opacity = '1'; });
    img.style.opacity = '0';
    img.style.transition = 'opacity .4s ease';
    if (img.complete) img.style.opacity = '1';
  });

  /* ═══════════════════════════════════════
     23. ACTIVE SECTION HIGHLIGHT IN NAV
         (IntersectionObserver version for precision)
  ═══════════════════════════════════════ */
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ═══════════════════════════════════════
     ALL DONE — console signature
  ═══════════════════════════════════════ */
  console.log(
    '%c Sachin A | Cyber Security Portfolio ',
    'background:#00E5FF;color:#050816;font-weight:bold;font-size:14px;padding:6px 14px;border-radius:6px;font-family:monospace'
  );
  console.log('%c Built with HTML · CSS · Vanilla JS', 'color:#7C3AED;font-size:11px;');

}); 


