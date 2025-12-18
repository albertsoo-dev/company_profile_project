/**
 * main.js
 * -------------
 * Lightweight JavaScript for company profile website
 * Progressive enhancement only (site works without JS)
 */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Smooth scroll
     ========================= */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  const yearEl = document.querySelector("#year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================
   Mobile navigation
  ========================= */
  const navToggle = document.querySelector("#nav-toggle");
  const navMenu = document.querySelector("#nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });
  }


  /* =========================
     Contact form handling
     ========================= */
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  const submitBtn = document.querySelector("#submit-btn");

  if (!form || !status || !submitBtn) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.textContent = "";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
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
    } catch (error) {
      status.textContent =
        "Network error. Please try again later.";
      status.style.color = "red";
    } finally {
      // Restore button
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });

  /* =========================
     Future enhancements
     ========================= */
  // - mobile menu toggle
  // - animations
  // - analytics
});