/**
 * SkyCrane Mobility — js/main.js
 * Advanced interactive behaviors, scroll progress, number counters,
 * multi-directional scroll reveals, and interactive mode switchers.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    // ── 1. Scroll Progress Bar ───────────────────────────────
    var progressBar = document.getElementById("scroll-progress-bar");
    if (!progressBar) {
      progressBar = document.createElement("div");
      progressBar.id = "scroll-progress-bar";
      document.body.prepend(progressBar);
    }

    // ── 2. Back to Top Button ────────────────────────────────
    var backToTop = document.getElementById("back-to-top");
    if (!backToTop) {
      backToTop = document.createElement("button");
      backToTop.id = "back-to-top";
      backToTop.setAttribute("aria-label", "Scroll back to top");
      backToTop.innerHTML = '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>';
      document.body.appendChild(backToTop);
    }

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", function () {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollPercent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (progressBar) {
        progressBar.style.width = scrollPercent + "%";
      }
      if (backToTop) {
        if (window.scrollY > 400) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      }
    }, { passive: true });

    // ── 3. Mobile Hamburger Menu Toggle ──────────────────────
    var hamBtn = document.getElementById("hamburger-btn");
    var mobileMenu = document.getElementById("mobile-menu");

    if (hamBtn && mobileMenu) {
      hamBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = mobileMenu.classList.toggle("open");
        hamBtn.classList.toggle("open", isOpen);
        hamBtn.setAttribute("aria-expanded", isOpen.toString());
      });

      document.addEventListener("click", function (e) {
        if (!mobileMenu.contains(e.target) && !hamBtn.contains(e.target) && mobileMenu.classList.contains("open")) {
          mobileMenu.classList.remove("open");
          hamBtn.classList.remove("open");
          hamBtn.setAttribute("aria-expanded", "false");
        }
      });

      mobileMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mobileMenu.classList.remove("open");
          hamBtn.classList.remove("open");
          hamBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // ── 4. Active Nav Link Auto-Highlight ────────────────────
    var currentPath = window.location.pathname.split("/").pop() || "index.html";
    if (currentPath === "") currentPath = "index.html";

    var navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (href) {
        var cleanHref = href.split("#")[0].split("/").pop();
        if (cleanHref === currentPath) {
          link.classList.add("active");
        } else if (currentPath === "" && cleanHref === "index.html") {
          link.classList.add("active");
        }
      }
    });

    // ── 5. Animated Number Counter ───────────────────────────
    function animateCounters() {
      var counters = document.querySelectorAll("[data-counter]:not(.counted)");
      counters.forEach(function (counter) {
        var rect = counter.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.92) {
          counter.classList.add("counted");
          var target = parseFloat(counter.getAttribute("data-counter"));
          var suffix = counter.getAttribute("data-suffix") || "";
          var prefix = counter.getAttribute("data-prefix") || "";
          var hasComma = counter.getAttribute("data-comma") === "true";
          var duration = 1600;
          var startTime = performance.now();

          function step(now) {
            var progress = Math.min((now - startTime) / duration, 1);
            // Ease-out cubic
            var ease = 1 - Math.pow(1 - progress, 3);
            var currentVal = Math.round(target * ease);
            var displayVal = hasComma ? currentVal.toLocaleString() : currentVal.toString();
            counter.textContent = prefix + displayVal + suffix;
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              counter.textContent = prefix + (hasComma ? target.toLocaleString() : target) + suffix;
            }
          }
          requestAnimationFrame(step);
        }
      });
    }

    window.addEventListener("scroll", animateCounters, { passive: true });
    animateCounters(); // Run initial check

    // ── 6. Multi-Directional Scroll Reveal Observer ──────────
    var revealSelector = ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale";
    var revealEls = document.querySelectorAll(revealSelector);

    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("visible");
      });
    }

    // ── 7. Interactive Fleet Mode Switcher (Fleet page) ──────
    var tabBox = document.getElementById("tab-mode-box");
    var tabWinch = document.getElementById("tab-mode-winch");
    var modeBoxView = document.getElementById("mode-box-view");
    var modeWinchView = document.getElementById("mode-winch-view");

    if (tabBox && tabWinch && modeBoxView && modeWinchView) {
      tabBox.addEventListener("click", function () {
        tabBox.classList.add("active");
        tabWinch.classList.remove("active");
        modeBoxView.classList.remove("hidden");
        modeWinchView.classList.add("hidden");
      });

      tabWinch.addEventListener("click", function () {
        tabWinch.classList.add("active");
        tabBox.classList.remove("active");
        modeWinchView.classList.remove("hidden");
        modeBoxView.classList.add("hidden");
      });
    }

    // ── 8. Smooth Anchor Scrolling ───────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var targetId = this.getAttribute("href");
        if (targetId.length > 1) {
          var targetElem = document.querySelector(targetId);
          if (targetElem) {
            e.preventDefault();
            targetElem.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });

  });
})();
