// West Ham Surplus Store – script.js

// ── Floating background particles ──────────────────────────────────────────
(function createParticles() {
  const container = document.getElementById('bgParticles');
  const COUNT = 12;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 200 + 60; // 60–260px
    const left = Math.random() * 100;       // 0–100%
    const duration = Math.random() * 14 + 10; // 10–24s
    const delay = Math.random() * -20;       // stagger

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(p);
  }
})();

// ── Ripple effect on link cards ────────────────────────────────────────────
document.querySelectorAll('.link-card').forEach(card => {
  card.addEventListener('pointerdown', function (e) {
    if (this.classList.contains('link-card--disabled')) return;

    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(180,145,60,0.14);
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      transform: scale(0);
      animation: rippleAnim 0.55s ease-out forwards;
      pointer-events: none;
    `;

    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// Inject ripple keyframes into document
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(1); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

// ── Passive scroll-based subtle parallax on logo ───────────────────────────
const logoCard = document.getElementById('logoCard');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      if (logoCard) {
        logoCard.style.transform = `translateY(${scrollY * 0.12}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
