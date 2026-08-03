const page = document.body;
const counter = document.querySelector(".intro__counter");

let progress = 0;
const progressTimer = window.setInterval(() => {
  progress += Math.ceil((100 - progress) * 0.13);
  if (progress >= 99) progress = 100;
  if (counter) counter.textContent = String(progress).padStart(2, "0");
  if (progress === 100) window.clearInterval(progressTimer);
}, 70);

window.addEventListener("load", () => {
  window.setTimeout(() => page.classList.add("is-ready"), 120);
});

const canvas = document.querySelector("#field");
const ctx = canvas?.getContext("2d");
let width = 0;
let height = 0;
let dpr = Math.min(window.devicePixelRatio || 1, 2);
let mouseX = 0.68;
let mouseY = 0.45;
let frame = 0;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  width = window.innerWidth;
  height = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawField() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  frame += 0.005;

  const originX = width * mouseX;
  const originY = height * mouseY;

  for (let i = 0; i < 11; i += 1) {
    const offset = (i - 5) * Math.max(24, width * 0.027);
    const wave = Math.sin(frame * 2 + i * 0.62) * 24;
    const gradient = ctx.createLinearGradient(width * 0.28, 0, width, 0);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.48, `rgba(224,218,207,${0.025 + i * 0.0015})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.beginPath();
    ctx.moveTo(width * 0.3, height + 120);
    ctx.bezierCurveTo(
      originX * 0.72 + offset,
      originY + 250 + wave,
      originX + offset * 0.3,
      originY - 230 - wave,
      width + 100,
      -100
    );
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  window.requestAnimationFrame(drawField);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("pointermove", (event) => {
  mouseX += (event.clientX / window.innerWidth - mouseX) * 0.08;
  mouseY += (event.clientY / window.innerHeight - mouseY) * 0.08;
});

resizeCanvas();
drawField();

const checkout = document.querySelector("[data-checkout]");
const note = document.querySelector(".checkout-note");
const closeNote = document.querySelector("[data-close]");

checkout?.addEventListener("click", (event) => {
  event.preventDefault();
  if (note) note.hidden = false;
});

closeNote?.addEventListener("click", () => {
  if (note) note.hidden = true;
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && note) note.hidden = true;
});
