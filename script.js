// ---------- Theme (remembers choice, falls back to system setting) ----------
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(saved || (prefersDark ? "dark" : "light"));

toggle.addEventListener("click", () => {
  applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// ---------- Mobile menu ----------
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-toggle");

menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("visible"));
}

// ---------- Highlight active nav link ----------
const links = [...menu.querySelectorAll("a")];
const sections = links.map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => spy.observe(s));

// ---------- Highlights carousel (auto-advances, pauses on hover/focus) ----------
const carousel = document.querySelector(".carousel");
if (carousel) {
  const slides = [...carousel.querySelectorAll(".slide")];
  const bar = carousel.querySelector(".progress span");
  let current = 0;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("aria-label", `Show highlight ${i + 1} of ${slides.length}`);
    dot.addEventListener("click", () => show(i));
    carousel.querySelector(".dots").appendChild(dot);
    return dot;
  });

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      s.classList.toggle("is-active", n === current);
      s.setAttribute("aria-hidden", n !== current);
    });
    dots.forEach((d, n) => d.setAttribute("aria-current", n === current));
    // Restart the progress bar animation for the new slide
    bar.style.animation = "none";
    void bar.offsetWidth;
    bar.style.animation = "";
  }

  bar.addEventListener("animationend", () => show(current + 1));
  carousel.querySelector(".prev").addEventListener("click", () => show(current - 1));
  carousel.querySelector(".next").addEventListener("click", () => show(current + 1));

  const pause = () => carousel.classList.add("is-paused");
  const resume = () => carousel.classList.remove("is-paused");
  carousel.addEventListener("mouseenter", pause);
  carousel.addEventListener("mouseleave", resume);
  carousel.addEventListener("focusin", pause);
  carousel.addEventListener("focusout", resume);

  show(0);
}

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
