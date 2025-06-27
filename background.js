// 🧠 Create and Style Canvas
const canvas = document.createElement('canvas');
canvas.id = "bg-canvas";
canvas.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
`;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let width, height, points = [];
let lineColor = "#00ffe0"; // default line color

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  generatePoints();
}
window.addEventListener("resize", resizeCanvas);

function generatePoints() {
  points = [];
  for (let i = 0; i < 80; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5
    });
  }
}

function drawNeural() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    p1.x += p1.vx;
    p1.y += p1.vy;

    if (p1.x < 0 || p1.x > width) p1.vx *= -1;
    if (p1.y < 0 || p1.y > height) p1.vy *= -1;

    ctx.beginPath();
    ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();

    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (dist < 120) {
        ctx.strokeStyle = `${lineColor}${Math.floor((1 - dist / 120) * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawNeural);
}

resizeCanvas();
drawNeural();

// 🌗 Theme Definitions
const themes = {
  dark: {
    '--bg-color': '#0f0f0f',
    '--text-color': '#ffffff',
    '--accent-color': '#FFD700',
    '--card-bg': 'rgba(255, 215, 0, 0.07)',
    '--glass-border': '#FFD700',
    animationColor: '#FFD700',
    subtitle: "AI & Data Science Enthusiast | Smart Systems Creator"
  },
  light: {
    '--bg-color': '#ffffff',
    '--text-color': '#111111',
    '--accent-color': '#00aaff',
    '--card-bg': 'rgba(0, 170, 255, 0.08)',
    '--glass-border': '#00aaff',
    animationColor: '#00aaff',
    subtitle: "Designing Simpler Lives with Smart & Clean Technology"
  }
};

// 🎨 Update neural line color
function setNeuralLineColor(color) {
  lineColor = color;
}

// 🌓 Apply Theme
function applyTheme(theme) {
  const root = document.documentElement;
  const selected = themes[theme];

  for (const key in selected) {
    if (key.startsWith('--')) {
      root.style.setProperty(key, selected[key]);
    }
  }

  // Subtitle update
  const subtitleEl = document.getElementById("subtitle");
  if (subtitleEl && selected.subtitle) {
    subtitleEl.textContent = selected.subtitle;
  }

  // Update background animation color
  setNeuralLineColor(selected.animationColor);
  localStorage.setItem("preferredTheme", theme);
}

// 🔁 Toggle Theme
function toggleTheme() {
  const current = localStorage.getItem("preferredTheme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  updateToggleIcon(next);
}

// 🔘 Update Toggle Icon
function updateToggleIcon(theme) {
  const icon = document.getElementById("themeToggle");
  if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

// 🚀 On Load
window.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("preferredTheme") || "dark";
  applyTheme(stored);
  updateToggleIcon(stored);
});
