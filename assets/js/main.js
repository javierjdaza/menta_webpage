/* Clínica Menta — interacciones
   - Menú móvil
   - Carrusel de testimonios
*/
(() => {
  "use strict";

  /* ---- Menú móvil ---- */
  const initNav = () => {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("nav");

    const close = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") close();
    });
  };

  /* ---- Carrusel de testimonios ---- */
  const initSlider = () => {
    const track = document.getElementById("slider-track");
    const dotsBox = document.getElementById("slider-dots");
    if (!track) return;

    const slides = track.children.length;
    let current = 0;
    let timer;

    const dots = Array.from({ length: slides }, (_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Testimonio ${i + 1}`);
      dot.addEventListener("click", () => go(i));
      dotsBox.appendChild(dot);
      return dot;
    });

    const render = () => {
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.setAttribute("aria-selected", String(i === current)));
    };

    const go = (i) => {
      current = (i + slides) % slides;
      render();
      restart();
    };

    const restart = () => {
      clearInterval(timer);
      timer = setInterval(() => go(current + 1), 6000);
    };

    document.querySelector(".slider__nav--prev").addEventListener("click", () => go(current - 1));
    document.querySelector(".slider__nav--next").addEventListener("click", () => go(current + 1));

    render();
    restart();
  };

  /* ---- Reveal al hacer scroll ---- */
  const initReveal = () => {
    const items = document.querySelectorAll(".reveal");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => observer.observe(el));
  };

  /* ---- Año del footer ---- */
  const initYear = () => {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  };

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initSlider();
    initReveal();
    initYear();
  });
})();
