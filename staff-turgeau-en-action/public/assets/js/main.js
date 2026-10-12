const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const year = document.querySelector("[data-year]");

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 28);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    menuButton?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("open");
  }
});

if (year) year.textContent = new Date().getFullYear();

