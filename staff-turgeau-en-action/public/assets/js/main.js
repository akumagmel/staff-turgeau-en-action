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

const shuffleItems = (items) => {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }
  return items;
};

const slider = document.querySelector("[data-slider]");

if (slider) {
  const track = slider.querySelector("[data-slider-track]");
  const previousButton = slider.querySelector("[data-slider-prev]");
  const nextButton = slider.querySelector("[data-slider-next]");
  const toggleButton = slider.querySelector("[data-slider-toggle]");
  const currentLabel = slider.querySelector("[data-slider-current]");
  const totalLabel = slider.querySelector("[data-slider-total]");
  const dotsContainer = slider.querySelector("[data-slider-dots]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const slides = [...slider.querySelectorAll("[data-slide]")];

  // Keep the approved editorial order, with the marketplace launch first.

  slides.forEach((slide, index) => {
    track?.insertBefore(slide, previousButton);
    slide.setAttribute("aria-label", `${index + 1} sur ${slides.length}`);
  });

  if (totalLabel) totalLabel.textContent = String(slides.length);

  let currentIndex = 0;
  let timer;
  let autoPlay = !reducedMotion.matches;
  let isInteracting = false;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Afficher l’information ${index + 1}`);
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

const newsSlider = document.querySelector("[data-news-slider]");

if (newsSlider) {
  const track = newsSlider.querySelector("[data-news-track]");
  const previousButton = newsSlider.querySelector("[data-news-prev]");
  const nextButton = newsSlider.querySelector("[data-news-next]");
  const toggleButton = newsSlider.querySelector("[data-news-toggle]");
  const currentLabel = newsSlider.querySelector("[data-news-current]");
  const totalLabel = newsSlider.querySelector("[data-news-total]");
  const dotsContainer = newsSlider.querySelector("[data-news-dots]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const emptyState = document.querySelector("[data-news-empty]");
  const slides = [...newsSlider.querySelectorAll("[data-news-slide]")];

  if (slides.length === 0) {
    newsSlider.hidden = true;
    if (emptyState) emptyState.hidden = false;
  } else {
    slides.forEach((slide, index) => {
      slide.setAttribute("aria-label", `${index + 1} sur ${slides.length}`);
    });
    if (totalLabel) totalLabel.textContent = String(slides.length);

    let currentIndex = 0;
    let timer;
    let autoPlay = !reducedMotion.matches;
    let isInteracting = false;

    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.className = "news-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Afficher l’actualité ${index + 1}`);
      dot.addEventListener("click", () => showNewsSlide(index, true));
      dotsContainer?.append(dot);
      return dot;
    });

    const updateToggle = () => {
      if (!toggleButton) return;
      toggleButton.textContent = autoPlay ? "Pause" : "Lecture";
      toggleButton.setAttribute("aria-label", autoPlay ? "Mettre les actualités en pause" : "Relancer le diaporama d’actualités");
    };

    const stopTimer = () => window.clearInterval(timer);

    const startTimer = () => {
      stopTimer();
      if (autoPlay && !isInteracting && !document.hidden && slides.length > 1) {
        timer = window.setInterval(() => showNewsSlide(currentIndex + 1), 8500);
      }
    };

    function showNewsSlide(nextIndex, restart = false) {
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

    previousButton?.addEventListener("click", () => showNewsSlide(currentIndex - 1, true));
    nextButton?.addEventListener("click", () => showNewsSlide(currentIndex + 1, true));
    toggleButton?.addEventListener("click", () => {
      autoPlay = !autoPlay;
      updateToggle();
      startTimer();
    });

    track?.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showNewsSlide(currentIndex - 1, true);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNewsSlide(currentIndex + 1, true);
      }
    });

    newsSlider.addEventListener("mouseenter", () => {
      isInteracting = true;
      stopTimer();
    });
    newsSlider.addEventListener("mouseleave", () => {
      isInteracting = false;
      startTimer();
    });
    newsSlider.addEventListener("focusin", () => {
      isInteracting = true;
      stopTimer();
    });
    newsSlider.addEventListener("focusout", (event) => {
      if (!newsSlider.contains(event.relatedTarget)) {
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

    showNewsSlide(0);
    updateToggle();
    startTimer();
  }
}

const fieldSlider = document.querySelector("[data-field-slider]");

if (fieldSlider) {
  const track = fieldSlider.querySelector("[data-field-track]");
  const previousButton = fieldSlider.querySelector("[data-field-prev]");
  const nextButton = fieldSlider.querySelector("[data-field-next]");
  const toggleButton = fieldSlider.querySelector("[data-field-toggle]");
  const currentLabel = fieldSlider.querySelector("[data-field-current]");
  const totalLabel = fieldSlider.querySelector("[data-field-total]");
  const thumbnailsContainer = fieldSlider.querySelector("[data-field-thumbnails]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const slides = shuffleItems([...fieldSlider.querySelectorAll("[data-field-slide]")]);

  slides.forEach((slide, index) => {
    track?.insertBefore(slide, track.querySelector(".field-count"));
    slide.setAttribute("aria-label", `${index + 1} sur ${slides.length}`);
  });

  if (totalLabel) totalLabel.textContent = String(slides.length);

  let currentIndex = 0;
  let timer;
  let autoPlay = !reducedMotion.matches;
  let isInteracting = false;

  const thumbnails = slides.map((slide, index) => {
    const sourceImage = slide.querySelector("img");
    const button = document.createElement("button");
    const image = document.createElement("img");
    button.className = "field-thumb";
    button.type = "button";
    button.setAttribute("aria-label", `Afficher la photo de terrain ${index + 1}`);
    image.src = sourceImage?.getAttribute("src") || "";
    image.alt = "";
    button.append(image);
    button.addEventListener("click", () => showFieldSlide(index, true));
    thumbnailsContainer?.append(button);
    return button;
  });

  const updateToggle = () => {
    if (!toggleButton) return;
    toggleButton.textContent = autoPlay ? "Pause" : "Lecture";
    toggleButton.setAttribute("aria-label", autoPlay ? "Mettre le diaporama de terrain en pause" : "Relancer le diaporama de terrain");
  };

  const stopTimer = () => window.clearInterval(timer);

  const startTimer = () => {
    stopTimer();
    if (autoPlay && !isInteracting && !document.hidden) {
      timer = window.setInterval(() => showFieldSlide(currentIndex + 1), 6500);
    }
  };

  function showFieldSlide(nextIndex, restart = false) {
    currentIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle("is-active", isActive);
      slide.hidden = !isActive;
      slide.setAttribute("aria-hidden", String(!isActive));
      thumbnails[index]?.classList.toggle("is-active", isActive);
      thumbnails[index]?.setAttribute("aria-current", isActive ? "true" : "false");
    });
    const activeThumbnail = thumbnails[currentIndex];
    if (thumbnailsContainer && activeThumbnail) {
      thumbnailsContainer.scrollTo({
        left: Math.max(0, activeThumbnail.offsetLeft - thumbnailsContainer.clientWidth / 2 + activeThumbnail.clientWidth / 2),
        behavior: "smooth"
      });
    }
    if (currentLabel) currentLabel.textContent = String(currentIndex + 1);
    if (restart) startTimer();
  }

  previousButton?.addEventListener("click", () => showFieldSlide(currentIndex - 1, true));
  nextButton?.addEventListener("click", () => showFieldSlide(currentIndex + 1, true));
  toggleButton?.addEventListener("click", () => {
    autoPlay = !autoPlay;
    updateToggle();
    startTimer();
  });

  track?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showFieldSlide(currentIndex - 1, true);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showFieldSlide(currentIndex + 1, true);
    }
  });

  fieldSlider.addEventListener("mouseenter", () => {
    isInteracting = true;
    stopTimer();
  });
  fieldSlider.addEventListener("mouseleave", () => {
    isInteracting = false;
    startTimer();
  });
  fieldSlider.addEventListener("focusin", () => {
    isInteracting = true;
    stopTimer();
  });
  fieldSlider.addEventListener("focusout", (event) => {
    if (!fieldSlider.contains(event.relatedTarget)) {
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

  showFieldSlide(0);
  updateToggle();
  startTimer();
}


const videoSlideshow = document.querySelector("[data-video-slider]");
if (videoSlideshow) {
  const slides = [...videoSlideshow.querySelectorAll("[data-video-slide]")];
  const thumbnails = videoSlideshow.querySelector("[data-video-thumbs]");
  const label = videoSlideshow.querySelector("[data-video-current]");
  let current = 0;
  const buttons = slides.map((slide, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "video-slide-thumb";
    button.setAttribute("aria-label", "Afficher la vidéo " + (index + 1));
    const image = document.createElement("img");
    image.src = slide.querySelector("video").poster;
    image.alt = "";
    image.loading = "lazy";
    const title = document.createElement("span");
    title.textContent = slide.querySelector("h3").textContent;
    button.append(image, title);
    button.addEventListener("click", () => showVideoSlide(index, true));
    thumbnails.append(button);
    return button;
  });
  function showVideoSlide(index, playSelected = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      if (!active) slide.querySelector("video")?.pause();
      slide.hidden = !active;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      buttons[i].setAttribute("aria-current", String(active));
    });
    label.textContent = String(current + 1);
    if (playSelected) {
      const video = slides[current].querySelector("video");
      if (video) {
        if (video.ended) video.currentTime = 0;
        const playback = video.play();
        playback?.catch(() => {
          // Native controls remain available if the browser blocks playback.
        });
      }
    }
  }
  videoSlideshow.querySelector("[data-video-prev]").addEventListener("click", () => showVideoSlide(current - 1, true));
  videoSlideshow.querySelector("[data-video-next]").addEventListener("click", () => showVideoSlide(current + 1, true));
  videoSlideshow.querySelector("[data-video-track]").addEventListener("keydown", (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showVideoSlide(current + (event.key === "ArrowLeft" ? -1 : 1), true);
    }
  });
  showVideoSlide(0);
}
