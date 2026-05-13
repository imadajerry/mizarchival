const menu = document.querySelector("#site-menu");
const navbar = document.querySelector(".topline");
const menuButtons = document.querySelectorAll("[aria-controls='site-menu']");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMenuState(isOpen) {
  menu.hidden = !isOpen;
  navbar.classList.toggle("nav-menu-open", isOpen);
  menuButtons.forEach((button) => {
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMenuState(menu.hidden);
  });
});

menu.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuState(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

function updateNavbarState() {
  const navHeight = navbar.offsetHeight;
  const sampleX = Math.min(window.innerWidth - 1, Math.max(0, window.innerWidth / 2));
  const sampleY = Math.min(window.innerHeight - 1, navHeight + 1);
  const sampledElement = document.elementFromPoint(sampleX, sampleY);
  const activeSection = sampledElement?.closest("[data-nav-theme]");
  const activeTheme = activeSection?.dataset.navTheme ?? "transparent";
  const isLightSection = activeTheme === "light";
  const isDarkSection = activeTheme === "dark";

  navbar.classList.toggle("nav-scrolled", isLightSection);
  navbar.classList.toggle("nav-clients", isDarkSection);
}

function syncNavbarHeight() {
  document.documentElement.style.setProperty("--nav-height", `${navbar.offsetHeight}px`);
  updateNavbarState();
}

function scrambleText(element) {
  const finalText = element.textContent.trim();
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/\\|[]{}";
  const duration = 1300;
  const frameRate = 32;
  const totalFrames = Math.ceil(duration / frameRate);
  let frame = 0;

  if (reduceMotion) {
    element.textContent = finalText;
    return;
  }

  const interval = window.setInterval(() => {
    const progress = frame / totalFrames;
    const resolvedCharacters = Math.floor(finalText.length * progress);

    element.textContent = finalText
      .split("")
      .map((character, index) => {
        if (character === " " || index < resolvedCharacters) {
          return character;
        }

        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join("");

    frame += 1;

    if (frame > totalFrames) {
      window.clearInterval(interval);
      element.textContent = finalText;
    }
  }, frameRate);
}

function setupSectionReveals() {
  const revealSections = document.querySelectorAll("main > section");

  revealSections.forEach((section) => {
    section.classList.add("reveal");
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealSections.forEach((section) => {
      section.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    },
  );

  revealSections.forEach((section) => {
    observer.observe(section);
  });
}

function setupFeaturedWorkCarousel() {
  const intro = document.querySelector(".intro");
  const track = document.querySelector(".featured-work-track");
  const slides = Array.from(document.querySelectorAll(".featured-work .project-shot"));
  const details = Array.from(document.querySelectorAll("[data-work-copy]"));
  const dots = Array.from(document.querySelectorAll(".featured-work-dot"));
  const previousButton = document.querySelector(".featured-work-prev");
  const nextButton = document.querySelector(".featured-work-next");

  if (!intro || !track || !previousButton || !nextButton || slides.length === 0) {
    return;
  }

  let activeIndex = 0;

  function renderCarousel() {
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    intro.classList.toggle("is-work-shifted", activeIndex > 0);
    previousButton.hidden = activeIndex === 0;
    nextButton.hidden = activeIndex === slides.length - 1;

    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", String(index !== activeIndex));
    });

    details.forEach((detail, index) => {
      detail.classList.toggle("is-active", index === activeIndex);
      detail.setAttribute("aria-hidden", String(index !== activeIndex));
    });

    dots.forEach((dot, index) => {
      dot.setAttribute("aria-current", String(index === activeIndex));
    });
  }

  previousButton.addEventListener("click", () => {
    activeIndex = Math.max(0, activeIndex - 1);
    renderCarousel();
  });

  nextButton.addEventListener("click", () => {
    activeIndex = Math.min(slides.length - 1, activeIndex + 1);
    renderCarousel();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      activeIndex = index;
      renderCarousel();
    });
  });

  // Touch / swipe support for mobile
  const viewport = document.querySelector(".featured-work-viewport");
  if (viewport) {
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    viewport.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
      isSwiping = false;
    }, { passive: true });

    viewport.addEventListener("touchmove", (e) => {
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
      if (dx > dy && dx > 10) {
        isSwiping = true;
        e.preventDefault(); // prevent vertical scroll during horizontal swipe
      }
    }, { passive: false });

    viewport.addEventListener("touchend", (e) => {
      if (!isSwiping) return;
      const swipeDistance = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance > 0) {
          activeIndex = Math.min(slides.length - 1, activeIndex + 1);
        } else {
          activeIndex = Math.max(0, activeIndex - 1);
        }
        renderCarousel();
      }
    }, { passive: true });
  }

  renderCarousel();
}

document.querySelectorAll("[data-scramble]").forEach(scrambleText);
setupSectionReveals();
setupFeaturedWorkCarousel();
syncNavbarHeight();
window.addEventListener("scroll", updateNavbarState, { passive: true });
window.addEventListener("resize", syncNavbarHeight);
