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

const slider = document.querySelector("[data-slider]");

if (slider) {
  const track = slider.querySelector("[data-slider-track]");
  const slides = [...slider.querySelectorAll("[data-slide]")];
  const previousButton = slider.querySelector("[data-slider-prev]");
  const nextButton = slider.querySelector("[data-slider-next]");
  const toggleButton = slider.querySelector("[data-slider-toggle]");
  const currentLabel = slider.querySelector("[data-slider-current]");
  const dotsContainer = slider.querySelector("[data-slider-dots]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentIndex = 0;
  let timer;
  let autoPlay = !reducedMotion.matches;
  let isInteracting = false;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Afficher l’affiche ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index, true));
    dotsContainer?.append(dot);
    return dot;
  });

  const updateToggle = () => {
    if (!toggleButton) return;
    toggleButton.textContent = autoPlay ? "Pause" : "Lecture";
    toggleButton.setAttribute("aria-label", autoPlay ? "Mettre le diaporama en pause" : "Relancer le diaporama automatique");
  };

  const stopTimer = () => {
    window.clearInterval(timer);
  };

  const startTimer = () => {
    stopTimer();
    if (autoPlay && !isInteracting && !document.hidden) {
      timer = window.setInterval(() => showSlide(currentIndex + 1), 6000);
    }
  };

  function showSlide(nextIndex, restart = false) {
    currentIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle("is-active", isActive);
      slide.hidden = !isActive;
      slide.setAttribute("aria-hidden", String(!isActive));
      dots[index]?.classList.toggle("is-active", isActive);
      dots[index]?.setAttribute("aria-current", isActive ? "true" : "false");
    });
    if (currentLabel) currentLabel.textContent = String(currentIndex + 1);
    if (restart) startTimer();
  }

  previousButton?.addEventListener("click", () => showSlide(currentIndex - 1, true));
  nextButton?.addEventListener("click", () => showSlide(currentIndex + 1, true));
  toggleButton?.addEventListener("click", () => {
    autoPlay = !autoPlay;
    updateToggle();
    startTimer();
  });

  track?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(currentIndex - 1, true);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(currentIndex + 1, true);
    }
  });

  slider.addEventListener("mouseenter", () => {
    isInteracting = true;
    stopTimer();
  });
  slider.addEventListener("mouseleave", () => {
    isInteracting = false;
    startTimer();
  });
  slider.addEventListener("focusin", () => {
    isInteracting = true;
    stopTimer();
  });
  slider.addEventListener("focusout", (event) => {
    if (!slider.contains(event.relatedTarget)) {
      isInteracting = false;
      startTimer();
    }
  });
  document.addEventListener("visibilitychange", startTimer);
  reducedMotion.addEventListener("change", (event) => {
    autoPlay = !event.matches;
    updateToggle();
    startTimer();
  });

  showSlide(0);
  updateToggle();
  startTimer();
}

