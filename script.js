(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- floor plan zone switcher ---------- */
  var zones = {
    lighting: { tag: 'Lighting', title: 'Circadian and scene lighting', body: "Every room is pre-set with morning, evening and away scenes, dimmed and colour-tuned automatically through the day, and overridden instantly from a wall panel or app." },
    climate: { tag: 'Climate', title: 'Room by room climate', body: "Each zone holds its own schedule and target temperature, learning occupancy patterns so rooms are never heated or cooled empty." },
    security: { tag: 'Security', title: 'Perimeter and alarm', body: "Cameras, sensors and the alarm panel report into one system, with alerts sent straight to your phone wherever you are." },
    access: { tag: 'Access', title: 'Smart entry and gates', body: "Doors, gates and garage open by keypad, phone or fingerprint, with a log of who came and went and temporary codes for guests." },
    energy: { tag: 'Energy', title: 'Consumption and solar ready', body: "Live power draw per circuit, with wiring left ready for solar and battery storage to be added without reopening the walls." }
  };
  var nodes = document.querySelectorAll('.node');
  var tag = document.querySelector('.plan-caption .tag');
  var title = document.getElementById('capTitle');
  var body = document.getElementById('capBody');

  function selectZone(key) {
    var z = zones[key];
    if (!z) return;
    tag.textContent = 'Zone, ' + z.tag;
    title.textContent = z.title;
    body.textContent = z.body;
    nodes.forEach(function (n) { n.setAttribute('aria-pressed', n.dataset.key === key ? 'true' : 'false'); });
  }
  nodes.forEach(function (n) {
    n.addEventListener('click', function () { selectZone(n.dataset.key); });
    n.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectZone(n.dataset.key); }
    });
  });

  /* ---------- contact form ---------- */
  var form = document.getElementById('enquiryForm');
  var toast = document.getElementById('formToast');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      toast.classList.add('show');
      form.reset();
      document.getElementById('tier').value = 'Comfort';
    });
  }

  /* ---------- stat count-up ---------- */
  document.querySelectorAll('.stat .num[data-count]').forEach(function (el) {
    var target = parseInt(el.dataset.count, 10);
    if (reduceMotion) { el.textContent = target; return; }
    var start = null;
    var duration = 1200;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(progress * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  /* ---------- hero parallax ---------- */
  var heroImg = document.getElementById('heroImg');
  var hero = document.querySelector('.hero');
  if (heroImg && hero && !reduceMotion) {
    window.addEventListener('scroll', function () {
      var rect = hero.getBoundingClientRect();
      var offset = Math.max(-40, Math.min(40, rect.top * -0.08));
      heroImg.style.setProperty('--parallax', offset + 'px');
    }, { passive: true });
  }

  /* ---------- staggered scroll reveal ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var groups = document.querySelectorAll('.tiers, .cap-grid, .gallery-grid, .process, .trust-grid');
    groups.forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (child, i) {
        child.classList.add('reveal', 'pre');
        child.style.transitionDelay = (i * 90) + 'ms';
      });
    });
    var singles = document.querySelectorAll('.section-head, .callout, .contact-grid');
    singles.forEach(function (s) { s.classList.add('reveal', 'pre'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('pre');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }
})();
