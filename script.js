const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const copyEmail = document.getElementById("copyEmail");
const copyFeedback = document.getElementById("copyFeedback");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

function updateThemeIcon() {
  themeToggle.textContent = root.getAttribute("data-theme") === "light" ? "☾" : "☀";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  if (nextTheme === "dark") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeIcon();
});

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

copyEmail.addEventListener("click", async () => {
  const contact = "GitHub: https://github.com/carloseduardobraz90-ship-it";
  try {
    await navigator.clipboard.writeText(contact);
    copyFeedback.textContent = "Contato copiado!";
  } catch {
    copyFeedback.textContent = contact;
  }
});
