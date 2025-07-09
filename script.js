// === Dark Mode Toggle with LocalStorage ===
const toggleBtn = document.getElementById('toggle-dark-mode');
const darkIcon = document.getElementById('dark-icon');

function updateDarkIcon() {
  if (darkIcon) {
    darkIcon.textContent = document.body.classList.contains('dark-mode') ? '🌞' : '🌙';
  }
}

// Load saved dark mode preference
if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark-mode');
}
updateDarkIcon();

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
  updateDarkIcon();
});

// === Back to Top Button ===
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Fade-In on Scroll ===
const fadeEls = document.querySelectorAll('.fade-in');
const onScrollFade = () => {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', onScrollFade);
window.addEventListener('load', onScrollFade);

// === Stars Background (Run if canvas exists) ===
const canvas = document.getElementById('stars-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      d: Math.random() * 1.5
    }));
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function twinkle() {
    stars.forEach(star => {
      star.r += (Math.random() - 0.5) * 0.1;
      star.r = Math.max(0.5, Math.min(star.r, 2));
    });
  }

  function animateStars() {
    drawStars();
    twinkle();
    requestAnimationFrame(animateStars);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animateStars();
}

// === External Link Confirmation ===
document.querySelectorAll('a[href^="http"]').forEach(link => {
  if (!link.href.includes(window.location.hostname)) {
    link.addEventListener('click', e => {
      const confirmLeave = confirm('You are about to leave the site. Continue?');
      if (!confirmLeave) e.preventDefault();
    });
  }
});

// === Smooth Page Transition ===
document.querySelectorAll('a[href]').forEach(link => {
  if (link.hostname === window.location.hostname) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('page-out');
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    });
  }
});

VanillaTilt.init(document.querySelectorAll(".project-card, .nav-button"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
  scale: 1.05,
});

VanillaTilt.init(document.querySelectorAll(".tilt-img"), {
  max: 20,
  speed: 500,
  scale: 1.08,
  glare: true,
  "max-glare": 0.25,
});

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;

  document.querySelector('.fancy-gradient').style.transform = `translate(${x * 30}px, ${y * 30}px)`;
  document.querySelector('.bokeh-layer').style.transform = `translate(${x * 60}px, ${y * 60}px)`;
  document.querySelector('.parallax-waves').style.transform = `translate(${x * 40}px, ${y * 20}px)`;
});

const floatEls = document.querySelectorAll('.float-on-scroll');
const onScrollFloat = () => {
  floatEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', onScrollFloat);
window.addEventListener('load', onScrollFloat);




