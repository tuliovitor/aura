/* ══════════════════════════════════════════════════
   STUDIO AURA — app.js
   GSAP + ScrollTrigger — Build Sequence + UI Logic
══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  setupHeader();
  setupSmoothScroll();
  setupReveal();
  setupBuildSequence();
  setupForm();
});

/* ── HEADER ── */
function setupHeader() {
  const header = document.getElementById('site-header');
  const burger = document.getElementById('burger-btn');
  const overlay = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('[data-mobile-link]');

  const hero = document.getElementById('hero');
  window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

header.classList.toggle('scrolled', window.scrollY > 10);

  // Burger toggle
  function openMenu() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  mobileLinks.forEach(l => l.addEventListener('click', closeMenu));

  // Hero entrance
  gsap.from('.hero__eyebrow', { autoAlpha: 0, y: 20, duration: 1, delay: 0.4, ease: 'power3.out' });
  gsap.from('.hero__headline', { autoAlpha: 0, y: 32, duration: 1.1, delay: 0.6, ease: 'power3.out' });
  gsap.from('.hero__sub', { autoAlpha: 0, y: 20, duration: 1, delay: 0.85, ease: 'power3.out' });
  gsap.from('.hero__cta', { autoAlpha: 0, y: 16, duration: 0.8, delay: 1.1, ease: 'power3.out' });
}

/* ── SMOOTH SCROLL (custom GSAP — desktop only) ── */
function setupSmoothScroll() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  const content = document.getElementById('smooth-content');

  let currentY = 0;
  let targetY = 0;
  const ease = 0.085;

  // Body height must equal content's layout height (use getBoundingClientRect to avoid recursion)
  function resize() {
    content.style.transform = 'none'; // reset before measuring
    const h = content.getBoundingClientRect().height;
    document.body.style.height = h + 'px';
    content.style.transform = `translateY(${-currentY}px)`;
  }

  function tick() {
    targetY = window.scrollY;
    currentY += (targetY - currentY) * ease;
    // Clamp so we can't scroll past end
    currentY = Math.max(0, Math.min(currentY, document.body.scrollHeight - window.innerHeight));

    const round = Math.round(currentY * 100) / 100;
    content.style.transform = `translateY(${-round}px)`;

    ScrollTrigger.update();
    requestAnimationFrame(tick);
  }

  // Proxy ScrollTrigger to our virtual scroller
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(v) {
      if (arguments.length) { currentY = v; window.scrollTo(0, v); }
      return currentY;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: 'transform'
  });

  window.addEventListener('resize', () => { resize(); ScrollTrigger.refresh(); });
  window.addEventListener('pageshow', () => { ScrollTrigger.refresh(); });

  // CRITICAL: resize() at DOMContentLoaded fires before images load.
  // ResizeObserver re-syncs body height every time the content grows (images loading in).
  // This is the exact cause of the scroll-blocked-at-portfolio bug.
  const ro = new ResizeObserver(() => {
    resize();
    ScrollTrigger.refresh();
  });
  ro.observe(content);

  // Also sync on full load (fonts + images all settled)
  window.addEventListener('load', () => {
    resize();
    ScrollTrigger.refresh();
  });

  resize();
  requestAnimationFrame(tick);
}

/* ── REVEAL ── */
function setupReveal() {
  const items = document.querySelectorAll('.reveal-item');
  if (!items.length) return;

  ScrollTrigger.batch(items, {
    onEnter: batch => batch.forEach((el, i) => {
      setTimeout(() => el.classList.add('is-revealed'), i * 80);
    }),
    start: 'top 88%',
    once: true
  });
}

/* ══════════════════════════════════════════════════
   BUILD SEQUENCE
   Video scrubbed by scroll — reversed direction
   (descending = end→start, ascending = start→end)
══════════════════════════════════════════════════ */
function setupBuildSequence() {
  const section = document.getElementById('build-sequence');
  const video = document.getElementById('build-video');
  const block1 = document.getElementById('block-1');
  const block2 = document.getElementById('block-2');
  const block3 = document.getElementById('block-3');
  const progFill = document.getElementById('build-progress-fill');

  if (!section || !video) return;

  // --- Wait for video metadata ---
  function init() {
    const dur = video.duration;
    if (!dur || isNaN(dur)) { video.addEventListener('loadedmetadata', init, { once: true }); return; }

    // Set video to end so it scrolls backwards (end → start as user scrolls down)
    video.currentTime = dur;

    // Pin distance = 300vh for a long scrub feel
    const pinDist = window.innerHeight * 3;

    // Proxy-aware scroller
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const scrollerOpts = isMobile ? {} : { scroller: document.body };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'center center',
        end: `+=${pinDist}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        ...scrollerOpts,
        onUpdate(self) {
          // Drive video time: progress 0 = video end, progress 1 = video start
          const p = self.progress;
          video.currentTime = dur * (1 - p);

          // Progress bar
          if (progFill) progFill.style.width = (p * 100) + '%';
        },
        onLeave() {
          video.currentTime = 0;
          if (progFill) progFill.style.width = '100%';
        },
        onLeaveBack() {
          video.currentTime = dur;
          if (progFill) progFill.style.width = '0%';
        },
        onRefresh(self) {
          // Sync frame to current progress after refresh / F5
          const p = self.progress;
          video.currentTime = dur * (1 - p);
        }
      }
    });

    // ── Text blocks synced to timeline progress ──
    // Block 1: appears at p=0.05, leaves at p=0.32
    tl.fromTo(block1,
      { autoAlpha: 0, x: -24 },
      { autoAlpha: 1, x: 0, duration: 0.12, ease: 'power2.out' },
      0.05
    )
      .to(block1,
        { autoAlpha: 0, x: -16, duration: 0.1, ease: 'power2.in' },
        0.30
      );

    // Block 2: appears at p=0.38, leaves at p=0.65
    tl.fromTo(block2,
      { autoAlpha: 0, x: 24 },
      { autoAlpha: 1, x: 0, duration: 0.12, ease: 'power2.out' },
      0.38
    )
      .to(block2,
        { autoAlpha: 0, x: 16, duration: 0.1, ease: 'power2.in' },
        0.63
      );

    // Block 3: appears at p=0.70, leaves at p=0.95
    tl.fromTo(block3,
      { autoAlpha: 0, x: -24 },
      { autoAlpha: 1, x: 0, duration: 0.12, ease: 'power2.out' },
      0.70
    )
      .to(block3,
        { autoAlpha: 0, x: -16, duration: 0.1, ease: 'power2.in' },
        0.93
      );

    // Refresh after full setup so positions are accurate
    ScrollTrigger.refresh();

    // Handle F5 mid-page: sync on pageshow
    window.addEventListener('pageshow', () => {
      ScrollTrigger.refresh();
    });
  }

  // Trigger init: if already loaded use currentTime trick
  if (video.readyState >= 1) {
    init();
  } else {
    video.addEventListener('loadedmetadata', init, { once: true });
  }
}

/* ── FORM ── */
function setupForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'form-name', errId: 'error-name', msg: 'Por favor, insira seu nome.' },
      { id: 'form-email', errId: 'error-email', msg: 'Por favor, insira um e-mail válido.' },
      { id: 'form-message', errId: 'error-message', msg: 'Por favor, escreva uma mensagem.' }
    ];

    fields.forEach(({ id, errId, msg }) => {
      const input = document.getElementById(id);
      const err = document.getElementById(errId);
      const val = input.value.trim();
      const isEmail = id === 'form-email';
      const ok = isEmail ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) : val.length > 0;

      err.textContent = ok ? '' : msg;
      input.style.borderBottomColor = ok ? '' : '#ffb4ab';
      if (!ok) valid = false;
    });

    if (!valid) return;

    // Simulate send
    const btn = form.querySelector('#form-submit');
    btn.disabled = true;
    btn.style.opacity = '0.6';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.style.opacity = '';
      success.hidden = false;
      gsap.from(success, { autoAlpha: 0, y: 8, duration: 0.5, ease: 'power2.out' });
      setTimeout(() => { success.hidden = true; }, 6000);
    }, 900);
  });
}
