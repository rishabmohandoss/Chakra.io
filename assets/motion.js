/* Chakra.io motion layer (Motion, https://motion.dev). Progressive enhancement:
   without JS, a supported browser, or with reduced motion, the static site is unchanged.
   Rules: only transform/opacity/blur; no pink (magenta lives only in logo-mark.svg / favicon.svg). */
(() => {
  const M = window.Motion;
  if (!M) return;
  const { animate, inView, stagger } = M;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (reduced) { document.documentElement.classList.remove('intro-pending'); return; }

  /* 1. Kinetic headlines: every headline reveals word by word with the same spring-like ease. */
  const splitWords = (node) => {
    const words = [];
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const word = document.createElement('span');
          word.className = 'kw';
          word.textContent = part;
          frag.appendChild(word);
          words.push(word);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && !/^(BR|SUP)$/.test(child.tagName) && !child.classList.contains('asterisk')) {
        words.push(...splitWords(child));
      }
    });
    return words;
  };
  document.querySelectorAll('h1:not(.hero h1), h2:not(#supported-heading)').forEach((heading) => {
    const clone = heading.cloneNode(true);
    clone.querySelectorAll('br').forEach((br) => br.replaceWith(' '));
    clone.querySelectorAll('.asterisk').forEach((a) => a.remove());
    const label = clone.textContent.replace(/\s+/g, ' ').trim();
    heading.classList.remove('reveal');
    heading.classList.add('visible');
    const words = splitWords(heading);
    if (!words.length) return;
    heading.setAttribute('aria-label', label);
    words.forEach((w) => { w.setAttribute('aria-hidden', 'true'); w.style.opacity = '0'; });
    inView(heading, () => {
      animate(words, { opacity: [0, 1], y: ['0.38em', '0em'], filter: ['blur(9px)', 'blur(0px)'] },
        { duration: 0.95, delay: stagger(0.07), ease: [0.2, 0.7, 0.2, 1] });
    }, { amount: 0.35 });
  });

  /* 2. Living logo: information squares stream toward the boundary and are stopped there. */
  let markId = 0;
  const liveMark = (host, { parallax = false, zone = null } = {}) => {
    const img = host.querySelector('img');
    if (!img || !/logo-mark\.svg/.test(img.src)) return;
    fetch(img.src).then((r) => (r.ok ? r.text() : Promise.reject())).then((src) => {
      const n = ++markId;
      const box = document.createElement('div');
      box.innerHTML = src.replace(/id="(g|d)"/g, `id="$1${n}"`).replace(/url\(#(g|d)\)/g, `url(#$1${n})`);
      const svg = box.firstElementChild;
      if (!svg || svg.tagName.toLowerCase() !== 'svg') return;
      svg.setAttribute('aria-hidden', 'true');
      svg.classList.add('live-mark');
      img.replaceWith(svg);

      const runs = [];
      svg.querySelectorAll('g rect').forEach((rect) => {
        const x = +rect.getAttribute('x'), w = +rect.getAttribute('width'), o = +(rect.getAttribute('opacity') || 1);
        const travel = Math.min(100.5 - (x + w), 24);
        if (travel < 5) return;
        const duration = 3.8 + Math.random() * 2.6;
        runs.push(animate(rect, { x: [0, travel], opacity: [0, o, o, 0] },
          { duration, ease: 'linear', repeat: Infinity, delay: -Math.random() * duration, times: [0, 0.18, 0.82, 1] }));
      });
      const dot = [...svg.querySelectorAll('circle')];
      dot.forEach((c) => { c.style.transformOrigin = '103.8px 48px'; });
      if (dot.length) runs.push(animate(dot, { scale: [1, 1.4, 1] }, { duration: 0.6, repeat: Infinity, repeatDelay: 2.1, ease: 'easeOut' }));
      inView(svg, () => { runs.forEach((r) => r.play()); return () => runs.forEach((r) => r.pause()); });

      if (parallax && finePointer && zone) {
        let frame = 0, last = null;
        zone.addEventListener('pointermove', (e) => {
          last = e;
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            const b = zone.getBoundingClientRect();
            const px = (last.clientX - b.left) / b.width - 0.5, py = (last.clientY - b.top) / b.height - 0.5;
            animate(svg, { x: px * 10, y: py * 8 }, { type: 'spring', stiffness: 90, damping: 16 });
          });
        });
        zone.addEventListener('pointerleave', () => animate(svg, { x: 0, y: 0 }, { type: 'spring', stiffness: 90, damping: 16 }));
      }
    }).catch(() => {});
  };
  document.querySelectorAll('.topbar .mark').forEach((m) => liveMark(m));
  document.querySelectorAll('.core-glyph').forEach((m) => liveMark(m, { parallax: true, zone: document.querySelector('.hero') }));

  /* 3. Magnetic calls to action. */
  if (finePointer) {
    document.querySelectorAll('.contact-button, .nav-cta, .world-action, .text-link').forEach((el) => {
      el.setAttribute('data-magnetic', '');
      const spring = { type: 'spring', stiffness: 260, damping: 18 };
      el.addEventListener('pointermove', (e) => {
        const b = el.getBoundingClientRect();
        const dx = Math.max(-9, Math.min(9, (e.clientX - (b.left + b.width / 2)) * 0.22));
        const dy = Math.max(-6, Math.min(6, (e.clientY - (b.top + b.height / 2)) * 0.3));
        animate(el, { x: dx, y: dy }, spring);
      });
      el.addEventListener('pointerleave', () => animate(el, { x: 0, y: 0 }, spring));
    });
  }

  /* 4. Launch sequence (first page of a session): retro boot screen -> PRESS START -> CRT off -> space warp -> hero fades in (no zoom on the hero itself). */
  const hero = document.querySelector('.hero');
  const root = document.documentElement;
  const heroTitle = hero?.querySelector('h1');
  const assemble = (fast) => {
    root.classList.remove('intro-pending');
    const ease = 'easeOut', base = fast ? 0.6 : 1.1;
    if (heroTitle) animate(heroTitle, { opacity: [0, 1] }, { duration: base, ease });
    animate('.topbar', { opacity: [0, 1] }, { duration: base, delay: 0.2, ease });
    if (!hero) return;
    animate('.hero-art', { opacity: [0, 1] }, { duration: base + 0.4, delay: 0.15, ease });
    animate('.hero .eyebrow, .hero-bottom, .hero-index', { opacity: [0, 1] }, { duration: base, delay: stagger(0.12, { startDelay: 0.3 }), ease });
  };
  if (root.classList.contains('intro-pending')) {
    try { sessionStorage.setItem('chakraBooted', '1'); } catch (e) {}
    // Always land on the top of the page after the launch screen: no restored scroll, no hash jump,
    // and the page underneath can't scroll while the boot screen is up.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    toTop();
    root.classList.add('booting');
    const overlay = document.createElement('div');
    overlay.className = 'launch';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<canvas></canvas><div class="boot"><div class="boot-screen">'
      + '<div class="boot-title">CHAKRA.IO</div>'
      + '<div class="boot-sub">© 2026 CHAKRA INTELLIGENT SYSTEMS, INC.<br>AFTER AI™ / ENABLING THE INTELLIGENCE CONTINUUM</div>'
      + '<ul class="boot-log"></ul>'
      + '<div class="boot-bar">' + '<i></i>'.repeat(20) + '</div>'
      + '<div class="boot-start">▶ PRESS START</div>'
      + '<div class="boot-hint">ENTER / CLICK / TAP</div>'
      + '</div></div><button class="launch-skip" type="button">SKIP ⏎</button>';
    document.body.appendChild(overlay);
    const boot = overlay.querySelector('.boot'), log = overlay.querySelector('.boot-log');
    const cells = [...overlay.querySelectorAll('.boot-bar i')], startEl = overlay.querySelector('.boot-start');
    const lines = [
      ['> BOOT SEQUENCE v2026.10', ''],
      ['> MOUNTING ECOSYSTEM ........ ', 'OK'],
      ['> LOADING ROSA® .............. ', 'OK'],
      ['> LOADING HCI ................ ', 'OK'],
      ['> READINESS CHECK ............ ', 'OK'],
    ];
    const timers = [];
    const later = (ms, fn) => timers.push(setTimeout(fn, ms));
    lines.forEach(([txt, ok], i) => later(250 + i * 420, () => {
      const li = document.createElement('li');
      li.textContent = txt;
      if (ok) { const s = document.createElement('span'); s.className = 'ok'; s.textContent = ok; li.appendChild(s); }
      log.appendChild(li);
    }));
    cells.forEach((c, i) => later(300 + i * 105 + (i > 13 ? 180 : 0), () => c.classList.add('on')));
    later(2600, () => startEl.classList.add('blink'));

    /* warp starfield */
    const canvas = overlay.querySelector('canvas'), ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => { canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; };
    size(); addEventListener('resize', size);
    const colors = ['#ffffff', '#cfe0ff', '#8fb4ff', '#d9ff55'];
    const stars = Array.from({ length: 650 }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random(), c: colors[Math.random() < 0.08 ? 3 : Math.floor(Math.random() * 3)] }));
    const WARP = 1.9;
    let warpStart = 0, last = 0, done = false, revealed = false, launched = false;
    const finish = (fast) => {
      if (done) return; done = true;
      timers.forEach(clearTimeout);
      toTop();
      root.classList.remove('booting');
      if (!revealed) { revealed = true; assemble(fast); }
      animate(overlay, { opacity: 0 }, { duration: fast ? 0.3 : 0.7 }).then(() => overlay.remove());
    };
    const frame = (now) => {
      if (done && !overlay.isConnected) return;
      if (!warpStart) { warpStart = now; last = now; }
      const t = Math.max(0, (now - warpStart) / 1000), dt = Math.max(0, Math.min((now - last) / 1000, 0.05)); last = Math.max(last, now);
      const speed = t < 0.9 ? 0.3 + Math.pow(t / 0.9, 2) * 2.6 : Math.max(0.03, 2.9 * (1 - (t - 0.9) / 0.9));
      const w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2, f = Math.max(w, h) * 0.14;
      const bg = t < 0.95 ? 1 : Math.max(0, 1 - (t - 0.95) / 0.55);
      ctx.clearRect(0, 0, w, h);
      if (bg > 0) { ctx.fillStyle = `rgba(5,7,15,${bg})`; ctx.fillRect(0, 0, w, h); }
      for (const s of stars) {
        const pz = s.z;
        s.z -= speed * dt;
        if (s.z <= 0.02) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = 1; continue; }
        ctx.strokeStyle = s.c; ctx.globalAlpha = Math.min(1, 0.25 + (1 - s.z) * 1.4);
        ctx.lineWidth = Math.max(0.6, (1 - s.z) * 2.6) * dpr;
        ctx.beginPath(); ctx.moveTo(cx + (s.x / pz) * f, cy + (s.y / pz) * f); ctx.lineTo(cx + (s.x / s.z) * f + 0.5, cy + (s.y / s.z) * f + 0.5); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (t > 0.8 && !revealed) { revealed = true; toTop(); root.classList.remove('booting'); assemble(false); }
      if (t > WARP) finish(false);
      requestAnimationFrame(frame);
    };
    const launch = () => {
      if (launched || done) return; launched = true;
      timers.forEach(clearTimeout);
      cells.forEach((c) => c.classList.add('on'));
      startEl.classList.remove('blink'); startEl.style.opacity = '1';
      setTimeout(() => {
        boot.classList.add('off');
        overlay.classList.add('warping');
        requestAnimationFrame(frame);
        setTimeout(() => boot.remove(), 460);
      }, 160);
    };
    later(4200, launch);
    overlay.addEventListener('click', (e) => { if (!e.target.closest('.launch-skip')) launch(); });
    overlay.addEventListener('touchstart', launch, { once: true, passive: true });
    addEventListener('keydown', function onKey(e) {
      if (done) return removeEventListener('keydown', onKey);
      e.preventDefault();
      if (e.key === 'Escape') finish(true); else launch();
    });
    overlay.querySelector('.launch-skip').addEventListener('click', () => finish(true));
  } else if (hero) {
    assemble(true);
  }

  /* 4b. Vanta HALO behind the hero (desktop only, after the boot screen). three.js is ~600KB,
     so it is loaded lazily from local files and the effect is torn down while the hero is off screen.
     Colors are kept to the site's navy/blue: magenta belongs only to the logo boundary. */
  const loadScript = (src) => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  const haloEl = hero || document.querySelector('.world-hero');
  const haloOk = haloEl && window.matchMedia('(min-width: 801px)').matches && !!window.WebGLRenderingContext;
  let halo = null, haloLoading = null;
  const haloStart = () => {
    if (halo) return;
    haloLoading = haloLoading || loadScript('/Chakra.io/assets/vendor/three.r134.min.js').then(() => loadScript('/Chakra.io/assets/vendor/vanta.halo.min.js'));
    haloLoading.then(() => {
      if (halo || !window.VANTA) return;
      halo = window.VANTA.HALO({
        el: haloEl, THREE: window.THREE, mouseControls: true, touchControls: false, gyroControls: false,
        minHeight: 200, minWidth: 200,
        baseColor: 0x1d3f73, backgroundColor: 0x000000,
        amplitudeFactor: 1.1, ringFactor: 1.2, rotationFactor: 0.6, size: 1.35, xOffset: 0.2, yOffset: 0,
      });
      haloEl.classList.add('has-halo');
      animate(haloEl.querySelector('.vanta-canvas'), { opacity: [0, 0.36] }, { duration: 1.6 });
    }).catch(() => {});
  };
  const haloStop = () => { if (halo) { halo.destroy(); halo = null; haloEl.classList.remove('has-halo'); } };
  if (haloOk) {
    const whenBooted = () => new Promise((res) => {
      if (!root.classList.contains('intro-pending') && !document.querySelector('.launch')) return res();
      const iv = setInterval(() => { if (!document.querySelector('.launch')) { clearInterval(iv); res(); } }, 250);
    });
    whenBooted().then(() => inView(haloEl, () => { haloStart(); return () => haloStop(); }, { amount: 0.05 }));
  }

  /* 5. Scroll: fly through the hero, then each block pops in as it arrives. */
  const { scroll } = M;
  const beam = document.createElement('div');
  beam.className = 'scroll-beam';
  document.body.appendChild(beam);
  if (scroll) {
    scroll(animate(beam, { scaleX: [0, 1] }, { ease: 'linear' }));
    if (hero) {
      const copy = hero.querySelector('.hero-copy');
      if (copy) scroll(animate(copy, { scale: [1, 1.35], opacity: [1, 0], y: [0, -60] }, { ease: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
      const art = hero.querySelector('.hero-art');
      if (art) scroll(animate(art, { scale: [1, 1.5], opacity: [1, 0.15] }, { ease: 'linear' }), { target: hero, offset: ['start start', 'end start'] });
    }
  }
  const pops = [...document.querySelectorAll('.reveal, section:not(.hero) .section-kicker, .world-card, .gap-card, .route-row, .destination, .support-list>span')]
    .filter((el) => !el.closest('.hero') && !/^H[12]$/.test(el.tagName));
  pops.forEach((el) => {
    el.classList.remove('reveal'); el.classList.add('visible', 'flow');
    el.style.opacity = '0';
  });
  const groups = new Map();
  pops.forEach((el) => { const sec = el.closest('section, main, footer') || document.body; if (!groups.has(sec)) groups.set(sec, []); groups.get(sec).push(el); });
  groups.forEach((els) => els.forEach((el, i) => {
    const side = el.matches('.world-card, .gap-card') ? (i % 2 ? 40 : -40) : 0;
    inView(el, () => {
      animate(el, { opacity: [0, 1], y: [70, 0], x: [side, 0], scale: [0.93, 1], rotate: [side ? side / 20 : 0, 0] },
        { type: 'spring', stiffness: 110, damping: 17, mass: 0.9, delay: (i % 3) * 0.08, opacity: { duration: 0.5, ease: 'easeOut' } });
    }, { amount: 0.18 });
  }));
})();
