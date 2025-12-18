/**
 * main.js
 * ----------
 * Lightweight JavaScript for company profile website
 * Progressive enhancement (site works without JS)
 */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Smooth scroll
     ========================= */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  window.addEventListener("scroll", () => {
    document
      .querySelector(".site-header")
      .classList.toggle("scrolled", window.scrollY > 10);
  });

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-menu");

  let isOpen = false;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    nav.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Close when clicking a link
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      isOpen = false;
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Click outside closes dropdown
  document.addEventListener("click", () => {
    if (!isOpen) return;
    isOpen = false;
    nav.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
  });

  // Prevent inside clicks from closing
  nav.addEventListener("click", e => e.stopPropagation());

  /* =========================
     Footer year
     ========================= */
  const yearEl = document.querySelector("#year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================
     Fade-in on scroll
     ========================= */
  const fadeElements = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show immediately
    fadeElements.forEach((el) => el.classList.add("visible"));
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  });

  /* =========================
     Mobile navigation
     ========================= */
  const navToggle = document.querySelector("#nav-toggle");
  const navMenu = document.querySelector("#nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu after clicking a link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================
     Contact form
     ========================= */
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  const submitBtn = document.querySelector("#submit-btn");

  if (form && status && submitBtn) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Loading state
      submitBtn.disabled = true;
      submitBtn.classList.add("loading");
      status.textContent = "";

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.textContent = "Thank you! Your message has been sent.";
          status.style.color = "green";
          form.reset();
        } else {
          status.textContent =
            "Oops! Something went wrong. Please try again.";
          status.style.color = "red";
        }
      } catch {
        status.textContent =
          "Network error. Please try again later.";
        status.style.color = "red";
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove("loading");
      }
    });
  }

  /* =========================
     Future enhancements
     ========================= */
  // - analytics
  // - theme toggle
});