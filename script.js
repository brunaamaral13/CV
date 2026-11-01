const revealItems = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

document.getElementById("print-cv")?.addEventListener("click", () => {
  window.print();
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canvas = document.getElementById("bg-particles");

if (canvas && !reduceMotion) {
  const ctx = canvas.getContext("2d");
  const particles = [];
  const count = 42;
  let width = 0;
  let height = 0;
  let rafId = 0;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };

  const createParticle = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.6 + 0.4,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -0.12 - Math.random() * 0.28,
    alpha: 0.15 + Math.random() * 0.35,
  });

  const init = () => {
    particles.length = 0;
    for (let i = 0; i < count; i += 1) {
      particles.push(createParticle());
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -10 || p.x < -10 || p.x > width + 10) {
        p.x = Math.random() * width;
        p.y = height + 10;
        p.alpha = 0.15 + Math.random() * 0.35;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(150, 190, 255, ${p.alpha})`;
      ctx.fill();
    }

    rafId = requestAnimationFrame(draw);
  };

  resize();
  init();
  draw();

  window.addEventListener("resize", () => {
    resize();
    init();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      draw();
    }
  });
}
