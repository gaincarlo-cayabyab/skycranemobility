/**
 * SkyCrane Mobility — js/main.js
 * Advanced interactive behaviors, scroll progress, number counters,
 * multi-directional scroll reveals, and interactive mode switchers.
 */
(function () {

  // ═══ Premium Toast Notification (replaces browser alert) ═══
  function showToast(message, type) {
    var existing = document.getElementById('skycrane-toast');
    if (existing) existing.remove();
    var colors = {
      error:   { bg: 'rgba(239,68,68,0.97)',  border: '#EF4444', icon: '⚠️' },
      warning: { bg: 'rgba(245,158,11,0.97)', border: '#F59E0B', icon: '⚡' },
      info:    { bg: 'rgba(14,165,233,0.97)',  border: '#0EA5E9', icon: 'ℹ️' }
    };
    var c = colors[type] || colors.error;
    var toast = document.createElement('div');
    toast.id = 'skycrane-toast';
    toast.setAttribute('role', 'alert');
    toast.style.cssText = [
      'position:fixed', 'top:1.25rem', 'left:50%', 'transform:translateX(-50%)',
      'background:' + c.bg, 'border:1px solid ' + c.border,
      'color:#fff', 'font-family:inherit', 'font-size:0.9rem', 'font-weight:600',
      'padding:0.85rem 1.5rem 0.85rem 1.15rem', 'border-radius:0.75rem',
      'box-shadow:0 8px 32px rgba(0,0,0,0.45)', 'z-index:999999',
      'display:flex', 'align-items:flex-start', 'gap:0.6rem',
      'max-width:min(92vw,480px)', 'line-height:1.45',
      'animation:scToastIn 0.28s cubic-bezier(0.34,1.56,0.64,1)'
    ].join(';');
    if (!document.getElementById('skycrane-toast-style')) {
      var style = document.createElement('style');
      style.id = 'skycrane-toast-style';
      style.textContent = '@keyframes scToastIn{from{opacity:0;transform:translateX(-50%) translateY(-14px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
      document.head.appendChild(style);
    }
    toast.innerHTML = '<span style="font-size:1.1rem;flex-shrink:0;margin-top:1px">' + c.icon + '</span><span>' + message + '</span>';
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = 'background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;font-size:1rem;margin-left:0.75rem;flex-shrink:0;line-height:1;';
    closeBtn.onclick = function() { toast.remove(); };
    toast.appendChild(closeBtn);
    document.body.appendChild(toast);
    setTimeout(function() { if (toast.parentNode) toast.style.animation = 'scToastIn 0.22s ease reverse forwards'; setTimeout(function() { toast.remove(); }, 220); }, 5000);
  }

  // ═══ SkyCrane Form Notification Email Template Generator ═══
  window.generateSkyCraneEmailHtml = function(data) {
    var logoUrl = data.logoUrl || "https://skycranemobility.com/assets/images/logo.png";
    var badge = data.badge || (data.isConsultation ? "New Mission Consultation" : "New Website Subscriber");
    var requestType = data.requestType || (data.isConsultation ? "Mission Consultation Request" : "Operations Briefing Subscription");
    var email = data.email || "";
    var date = data.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
    var notes = data.notes || "";
    var company = data.company || "";
    var phone = data.phone || "";
    var location = data.location || "";

    // Conditional rendering: include notes block only if notes, company, or details exist
    var notesBlock = "";
    if (data.isConsultation && (notes || company || phone || location)) {
      var details = [];
      if (company) details.push("<strong>Company / Organization:</strong> " + company);
      if (phone) details.push("<strong>Phone:</strong> " + phone);
      if (location) details.push("<strong>Mission Location:</strong> " + location);
      if (notes) details.push("<strong>Scope / Notes:</strong> " + notes);

      notesBlock = '<div style="margin-top: 24px;">' +
        '<span style="display: block; margin-bottom: 8px; font-weight: 600; color: #64748b; font-size: 14px;">Consultation Notes / Scope:</span>' +
        '<div style="margin-top: 8px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px; font-size: 14px; color: #334155; line-height: 1.6;">' +
          details.join("<br>") +
        '</div>' +
      '</div>';
    }

    return '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>SkyCrane Mobility Form Submission</title></head>' +
    '<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">' +
      '<div style="max-width:600px;margin:30px auto;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);border:1px solid #e2e8f0;">' +
        '<div style="background-color:#0f172a;padding:24px 32px;text-align:center;">' +
          '<img src="' + logoUrl + '" alt="SkyCrane Mobility Logo" style="max-height:48px;width:auto;vertical-align:middle;">' +
          '<div style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.5px;margin-top:8px;text-transform:uppercase;">SkyCrane Mobility</div>' +
          '<div style="display:inline-block;padding:4px 12px;background-color:#2563eb;color:#ffffff;font-size:12px;font-weight:600;border-radius:9999px;text-transform:uppercase;letter-spacing:0.5px;margin-top:12px;">' + badge + '</div>' +
        '</div>' +
        '<div style="padding:32px;">' +
          '<h2 style="font-size:18px;font-weight:600;color:#0f172a;margin-top:0;margin-bottom:20px;border-bottom:2px solid #f1f5f9;padding-bottom:8px;">Submission Details</h2>' +
          '<table style="width:100%;border-collapse:collapse;">' +
            '<tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:600;color:#64748b;width:35%;">Request Type</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#0f172a;width:65%;"><strong>' + requestType + '</strong></td></tr>' +
            '<tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:600;color:#64748b;width:35%;">Corporate Email</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#0f172a;width:65%;"><a href="mailto:' + email + '" style="color:#2563eb;text-decoration:none;">' + email + '</a></td></tr>' +
            '<tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:14px;font-weight:600;color:#64748b;width:35%;">Submission Date</td><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#0f172a;width:65%;">' + date + '</td></tr>' +
          '</table>' +
          notesBlock +
        '</div>' +
        '<div style="background-color:#f8fafc;padding:20px 32px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;">' +
          'This is an automated operational notification from <strong>SkyCrane Mobility Website Form Engine</strong>.<br>© 2026 SkyCrane Mobility Corporation. All rights reserved.' +
        '</div>' +
      '</div>' +
    '</body>' +
    '</html>';
  };



  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // ── Video Autoplay Guarantee (iOS / Android power saving fallback) ──
    var videos = document.querySelectorAll("video");
    videos.forEach(function (v) {
      v.muted = true;
      v.defaultMuted = true;
      var p = v.play();
      if (p !== undefined) {
        p.catch(function () {
          // Autoplay blocked by mobile battery/data saver; poster image remains visible
        });
      }
    });


    // ── 1. Scroll Progress Bar ───────────────────────────────
    var progressBar = document.getElementById("scroll-progress-bar");
    if (!progressBar) {
      progressBar = document.createElement("div");
      progressBar.id = "scroll-progress-bar";
      document.body.prepend(progressBar);
    }

    // ── 2. Back to Top Button ────────────────────────────────
    var backToTop = document.getElementById("back-to-top") || document.querySelector(".back-to-top");
    if (!backToTop) {
      backToTop = document.createElement("button");
      backToTop.id = "back-to-top";
      backToTop.className = "back-to-top";
      backToTop.setAttribute("aria-label", "Scroll back to top");
      backToTop.innerHTML = '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>';
      document.body.appendChild(backToTop);
    } else {
      backToTop.classList.add("back-to-top");
    }
    // Enforce bottom-left floating placement to prevent collision with right-side chat widget
    backToTop.style.setProperty("position", "fixed", "important");
    backToTop.style.setProperty("bottom", "24px", "important");
    backToTop.style.setProperty("left", "24px", "important");
    backToTop.style.setProperty("right", "auto", "important");
    backToTop.style.setProperty("z-index", "9999", "important");

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // High-performance rAF-throttled scroll handler (zero lag on desktop & mobile)
    var _scrollTicking = false;
    function updateScrollEffects() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      if (progressBar) {
        progressBar.style.width = scrollPercent + "%";
      }
      if (backToTop) {
        if (scrollY > 350) {
          backToTop.classList.add("visible");
          backToTop.classList.add("is-visible");
        } else {
          backToTop.classList.remove("visible");
          backToTop.classList.remove("is-visible");
        }
      }
      _scrollTicking = false;
    }

    window.addEventListener("scroll", function () {
      if (!_scrollTicking) {
        _scrollTicking = true;
        requestAnimationFrame(updateScrollEffects);
      }
    }, { passive: true });
    requestAnimationFrame(updateScrollEffects);

    // ── 3. Mobile Navigation Sidebar Drawer & Backdrop ───────
    var hamBtn = document.getElementById("hamburger-btn");
    var mobileMenu = document.getElementById("mobile-menu");
    var mobileCloseBtn = document.getElementById("mobile-menu-close");
    var mobileBackdrop = document.getElementById("mobile-menu-backdrop");

    // Auto-create backdrop overlay if not present in markup
    if (!mobileBackdrop) {
      mobileBackdrop = document.createElement("div");
      mobileBackdrop.id = "mobile-menu-backdrop";
      mobileBackdrop.className = "mobile-menu-backdrop";
      mobileBackdrop.setAttribute("aria-hidden", "true");
      document.body.appendChild(mobileBackdrop);
    } else if (mobileBackdrop.parentElement !== document.body) {
      document.body.appendChild(mobileBackdrop);
    }

    // Guarantee mobileMenu is a direct child of <body> to avoid CSS backdrop-filter / overflow traps
    if (mobileMenu && mobileMenu.parentElement !== document.body) {
      document.body.appendChild(mobileMenu);
    }

    function openMobileDrawer() {
      if (mobileMenu) {
        mobileMenu.classList.add("open");
        mobileMenu.setAttribute("aria-hidden", "false");
      }
      if (mobileBackdrop) {
        mobileBackdrop.classList.add("open");
      }
      if (hamBtn) {
        hamBtn.classList.add("open");
        hamBtn.setAttribute("aria-expanded", "true");
      }
      document.body.style.overflow = "hidden";
    }

    function closeMobileDrawer() {
      if (mobileMenu) {
        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");
      }
      if (mobileBackdrop) {
        mobileBackdrop.classList.remove("open");
      }
      if (hamBtn) {
        hamBtn.classList.remove("open");
        hamBtn.setAttribute("aria-expanded", "false");
      }
      document.body.style.overflow = "";
    }

    if (hamBtn) {
      hamBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = mobileMenu && mobileMenu.classList.contains("open");
        if (isOpen) {
          closeMobileDrawer();
        } else {
          openMobileDrawer();
        }
      });
    }

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeMobileDrawer();
      });
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener("click", function () {
        closeMobileDrawer();
      });
    }

    // Close when clicking any nav link inside drawer
    if (mobileMenu) {
      mobileMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          closeMobileDrawer();
        });
      });
    }

    // Auto close drawer if resized to desktop viewport
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains("open")) {
        closeMobileDrawer();
      }
    });

    // ── 4. Active Nav Link Auto-Highlight ────────────────────
    var currentPath = window.location.pathname.split("/").pop() || "index.html";
    if (currentPath === "") currentPath = "index.html";

    var navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link, .mobile-nav-item");
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

    // ── 5. Animated Number Counter (IntersectionObserver — zero scroll thrash) ──
    function runCounter(counter) {
      if (counter.classList.contains("counted")) return;
      counter.classList.add("counted");
      var target = parseFloat(counter.getAttribute("data-counter"));
      var suffix = counter.getAttribute("data-suffix") || "";
      var prefix = counter.getAttribute("data-prefix") || "";
      var hasComma = counter.getAttribute("data-comma") === "true";
      var duration = 1400;
      var startTime = performance.now();

      function step(now) {
        var progress = Math.min((now - startTime) / duration, 1);
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

    var counterEls = document.querySelectorAll("[data-counter]");
    if (counterEls.length > 0) {
      if ("IntersectionObserver" in window) {
        var counterObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              runCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: "0px 0px 50px 0px" });

        counterEls.forEach(function (c) {
          counterObserver.observe(c);
        });
      } else {
        counterEls.forEach(runCounter);
      }
    }

    // ── 6. Multi-Directional Scroll Reveal Observer (Pre-emptive Lookahead) ──
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
        { threshold: 0.05, rootMargin: "0px 0px 60px 0px" }
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

    // ── 9. Consultation Request Form Submission & Philippine Legal Validation (Task 2.B & 3) ──
    var consultationForm = document.getElementById("consultation-form") || document.getElementById("quote-form") || document.getElementById("contactForm");
    if (consultationForm) {
      consultationForm.addEventListener("submit", function (e) {
        if (typeof window.handleConsultationSubmission === "function") {
          window.handleConsultationSubmission(consultationForm, e);
        }
      });
    }

    // ── 10. Newsletter Briefing Form AJAX Handler (Task 2.A & Task 3.1) ──
    const briefingForm = document.getElementById("briefing-form") || document.querySelector('form[name="newsletter-briefing"]') || document.querySelector('form[name="newsletter-subscription"]');
    const briefingContainer = document.getElementById("briefing-container") || briefingForm?.parentElement;

    if (briefingForm) {
      // Store original form HTML so it can be restored on reset
      var origFormHTML = briefingForm.outerHTML;

      briefingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailInput = document.getElementById("briefing-email") || briefingForm.querySelector('input[type="email"]');
        const submittedEmail = emailInput ? emailInput.value.trim() : "";

        if (!submittedEmail || !submittedEmail.includes("@") || !submittedEmail.includes(".")) {
          showToast('Please enter a valid email address (e.g., name@company.com).', 'error');
          if (emailInput) emailInput.focus();
          return;
        }

        // Forward subscriber to Zoho Mail
        try {
          fetch("https://formsubmit.co/ajax/info@skycranemobility.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              _subject: "New SkyCrane Air Mobility Briefing Subscriber!",
              _cc: "gaincarlocayabyab12@gmail.com",
              _template: "table",
              _autoresponse: "Thank you for subscribing to the SkyCrane Air Mobility Briefing. You are registered to receive our monthly flight logs, regional corridor routes, and UAV technical briefings.",
              Request_Type: "Operations Briefing Subscription",
              Subscriber_Email: submittedEmail,
              Source_Page: window.location.href,
              Timestamp: new Date().toLocaleString()
            })
          }).catch(function (err) {
            console.log("Subscriber dispatch note:", err);
          });
        } catch (e) {}

        // Persist subscriber locally
        try {
          var subs = JSON.parse(localStorage.getItem("skycrane_newsletter_subscribers") || "[]");
          subs.push({ email: submittedEmail, date: new Date().toISOString() });
          localStorage.setItem("skycrane_newsletter_subscribers", JSON.stringify(subs));
        } catch (e) {}

        // Render Task 3.1 Briefing Success UI
        renderBriefingSuccess(submittedEmail);
      });

      function renderBriefingSuccess(email) {
        if (!briefingContainer) return;
        briefingContainer.innerHTML = `
          <div class="briefing-confirmed-card" style="padding: 1.5rem; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(52, 211, 153, 0.35); border-radius: 12px; margin-bottom: 1rem; animation: scFadeIn 0.3s ease;">
            <h4 style="color: #34D399; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>✓</span> Briefing Access Confirmed
            </h4>
            <p style="font-weight: bold; color: #ffffff; font-size: 0.875rem; word-break: break-all; margin-bottom: 0.5rem;">${email}</p>
            <p style="font-size: 0.8125rem; color: #94A3B8; line-height: 1.5; margin-bottom: 1.15rem;">
              You are registered to receive our monthly flight logs, regional corridor routes, and UAV technical briefings.
            </p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button id="reset-briefing-btn" class="btn btn-glass text-xs py-2 px-3 rounded-lg text-white font-bold" style="cursor: pointer; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1);">
                Subscribe another email
              </button>
              <a href="contact.html" class="btn btn-orange text-xs py-2 px-3 rounded-lg font-bold" style="text-decoration: none;">
                Request Mission Consultation →
              </a>
            </div>
          </div>
        `;

        document.getElementById("reset-briefing-btn")?.addEventListener("click", function () {
          briefingContainer.innerHTML = origFormHTML;
          // Re-bind submit on restored form
          const newForm = briefingContainer.querySelector("form");
          if (newForm) {
            newForm.addEventListener("submit", function (ev) {
              ev.preventDefault();
              const inp = newForm.querySelector('input[type="email"]');
              if (inp && inp.value) renderBriefingSuccess(inp.value.trim());
            });
          }
        });
      }
    }

  });


    // ── Global Modal Controllers (Accessible from anywhere) ─────
  
  // Auto-open whitepaper modal on hash
  if (window.location.hash === "#whitepaper" || window.location.hash === "#whitepaperModal") {
    setTimeout(function() {
      if (typeof window.openWhitepaperModal === "function") {
        window.openWhitepaperModal();
      }
    }, 350);
  }

  window.openLegalModal = function () {
    var m = document.getElementById("legalModal");
    if (m) {
      m.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  };

  window.closeLegalModal = function () {
    var m = document.getElementById("legalModal");
    if (m) {
      m.style.display = "none";
      document.body.style.overflow = "";
    }
  };

  window.openDevModal = function () {
    var m = document.getElementById("devModal");
    if (m) {
      m.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  };

  window.closeDevModal = function () {
    var m = document.getElementById("devModal");
    if (m) {
      m.style.display = "none";
      document.body.style.overflow = "";
    }
  };

  window.openWhitepaperModal = function () {
    var m = document.getElementById("whitepaperModal");
    if (m) {
      m.style.display = "flex";
      document.body.style.overflow = "hidden";
    } else {
      window.location.href = "index.html#case-study";
    }
  };

  window.closeWhitepaperModal = function () {
    var m = document.getElementById("whitepaperModal");
    if (m) {
      m.style.display = "none";
      document.body.style.overflow = "";
    }
  };

  window.switchWpTab = function (tab) {
    var tabs = ["mfg", "cg"];
    tabs.forEach(function (t) {
      var btn = document.getElementById("wp-tab-" + t);
      var panel = document.getElementById("wp-panel-" + t);
      if (t === tab) {
        if (btn) {
          btn.classList.add("active");
          btn.setAttribute("aria-selected", "true");
        }
        if (panel) panel.classList.remove("hidden");
      } else {
        if (btn) {
          btn.classList.remove("active");
          btn.setAttribute("aria-selected", "false");
        }
        if (panel) panel.classList.add("hidden");
      }
    });
  };

  
  // ═══ Global Consultation Form Submission Handler ═══
  window.handleConsultationSubmission = function (formEl, event) {
    if (event) {
      if (typeof event.preventDefault === "function") event.preventDefault();
      if (typeof event.stopPropagation === "function") event.stopPropagation();
    }
    if (!formEl) formEl = document.getElementById("consultation-form") || document.getElementById("quote-form");
    if (!formEl) return false;

    // Validate fields with clear, friendly Toast alerts
    var companyInput = formEl.querySelector("#company") || document.getElementById("company");
    var nameInput    = formEl.querySelector("#full-name") || formEl.querySelector("#name") || document.getElementById("full-name");
    var phoneInput   = formEl.querySelector("#phone") || document.getElementById("phone");
    var emailInput   = formEl.querySelector("#email") || document.getElementById("email");
    var locInput     = formEl.querySelector("#location") || document.getElementById("location");
    var payloadInput = formEl.querySelector("#payload") || document.getElementById("payload");
    var systemInput  = formEl.querySelector("#payload-system") || document.getElementById("payload-system");
    var dateInput    = formEl.querySelector("#target-date") || document.getElementById("target-date");
    var msgInput     = formEl.querySelector("#message") || document.getElementById("message");
    var privacyConsent = formEl.querySelector("#privacy-consent") || document.getElementById("privacy-consent");
    var submitBtn    = formEl.querySelector("#btn-submit-consultation") || document.getElementById("btn-submit-consultation");

    var company = companyInput ? companyInput.value.trim() : "";
    var name    = nameInput ? nameInput.value.trim() : "";
    var phone   = phoneInput ? phoneInput.value.trim() : "";
    var email   = emailInput ? emailInput.value.trim() : "";
    var loc     = locInput ? locInput.value.trim() : "";
    var payload = payloadInput ? payloadInput.value : "";
    var system  = systemInput ? systemInput.value : "";
    var targetDate = dateInput ? dateInput.value : "";
    var msg     = msgInput ? msgInput.value.trim() : "";

    function warn(text, el) {
      if (typeof showToast === "function") {
        showToast(text, "warning");
      } else {
        showToast(text, "warning");
      }
      if (el) {
        try {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus();
        } catch (e) {}
      }
    }

    if (!company) {
      warn("Please enter your Company or Organization name.", companyInput);
      return false;
    }
    if (!name) {
      warn("Please enter the Contact Person name and role.", nameInput);
      return false;
    }
    if (!phone) {
      warn("Please enter your contact phone number for flight coordinator callback.", phoneInput);
      return false;
    }
    if (!email || !email.includes("@") || !email.includes(".")) {
      warn("Please enter a valid corporate email address (e.g., name@company.com).", emailInput);
      return false;
    }
    if (!loc) {
      warn("Please provide the target site location or municipality.", locInput);
      return false;
    }
    if (privacyConsent && !privacyConsent.checked) {
      warn("Compliance Required: Please check the box agreeing to the Data Privacy Act of 2012 (R.A. 10173).", privacyConsent);
      return false;
    }

    // Prevent double submissions
    if (submitBtn && submitBtn.disabled) return false;

    // Visual button loading state
    var origBtnHTML = submitBtn ? submitBtn.innerHTML : "Submit Consultation Request →";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.75";
      submitBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:0.5rem;"><svg style="animation:spin 1s linear infinite;width:18px;height:18px;" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity:0.25;"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg> Transmitting Mission Feasibility Data...</span>';
    }

    // 1. Persist lead locally in localStorage
    try {
      var leads = JSON.parse(localStorage.getItem("skycrane_consultation_leads") || "[]");
      leads.push({
        company: company,
        name: name,
        phone: phone,
        email: email,
        location: loc,
        payload: payload,
        system: system,
        targetDate: targetDate,
        message: msg,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem("skycrane_consultation_leads", JSON.stringify(leads));
    } catch (e) {
      console.warn("Storage warning:", e);
    }

    // 2. Dispatch via FormSubmit with full lowercase email compatibility
    try {
      fetch("https://formsubmit.co/ajax/info@skycranemobility.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: "New Mission Consultation Request - " + company,
          _cc: "gaincarlocayabyab12@gmail.com",
          _replyto: email,
          email: email,
          _template: "table",
          _autoresponse: "Thank you for contacting SkyCrane Mobility. Your flight consultation request has been received by our flight operations desk. A CAAP-certified flight coordinator will reach out to you shortly.",
          Request_Type: "Mission Consultation Request",
          Company_Organization: company,
          Contact_Person: name,
          Phone_Number: phone,
          Email_Address: email,
          Target_Site_Location: loc || "Not specified",
          Cargo_Payload_Envelope: payload || "Not specified",
          Delivery_System: system || "Not specified",
          Target_Timeline: targetDate || "Not specified",
          Mission_Scope_Details: msg || "General consultation requested",
          Submission_URL: window.location.href,
          Submitted_At: new Date().toLocaleString()
        })
      }).catch(function (netErr) {
        console.log("Form forwarding note:", netErr);
      });
    } catch (e) {}

    // 3. Complete UI transition: show custom modal, reset button & form
    setTimeout(function () {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.innerHTML = origBtnHTML;
      }
      formEl.reset();
      if (typeof window.showConsultationSuccessModal === "function") {
        window.showConsultationSuccessModal(name, company, email, phone, loc);
      }
      if (typeof showToast === "function") {
        showToast("Consultation Request Logged! A flight coordinator will contact you shortly.", "info");
      }
    }, 450);

    return false;
  };


  window.showConsultationSuccessModal = function (name, company, email, phone, location) {
    var m = document.getElementById("consultationSuccessModal") || document.getElementById("successModal") || document.getElementById("feasibilityModal");
    var detailsEl = document.getElementById("success-modal-details");
    if (detailsEl) {
      detailsEl.innerHTML = [
        '<div><strong>Client:</strong> ' + (name || 'Project Representative') + '</div>',
        '<div><strong>Company:</strong> ' + (company || 'Confidential Enterprise') + '</div>',
        '<div><strong>Dispatch Contact:</strong> ' + (phone || 'Registered Phone') + ' &bull; ' + (email || 'info@skycranemobility.com') + '</div>',
        location ? '<div><strong>Site Location:</strong> ' + location + '</div>' : ''
      ].filter(Boolean).join('');
    }
    if (m) {
      m.style.display = "flex";
      m.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  };

  window.closeConsultationSuccessModal = function () {
    var m = document.getElementById("consultationSuccessModal") || document.getElementById("successModal") || document.getElementById("feasibilityModal");
    if (m) {
      m.style.display = "none";
      m.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  // Keyboard accessibility: ESC closes any open modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      window.closeLegalModal();
      window.closeDevModal();
      window.closeConsultationSuccessModal();
      if (typeof window.closeWhitepaperModal === "function") window.closeWhitepaperModal();
    }
  });

})();


  // ── Global Newsletter Subscription Handler (Static & GitHub Pages Compatible) ──
  window.handleNewsletterSubscription = function (formEl) {
    if (!formEl) return false;
    var emailInput = formEl.querySelector('input[type="email"]');
    var submitBtn  = formEl.querySelector('button[type="submit"]');
    var emailVal   = emailInput ? emailInput.value.trim() : "";

    if (!emailVal || !emailVal.includes("@") || !emailVal.includes(".")) {
      showToast("Please enter a valid corporate email address (e.g., name@company.com).", "error");
      if (emailInput) emailInput.focus();
      return false;
    }

    var origBtnText = submitBtn ? submitBtn.innerHTML : "Subscribe";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.75";
      submitBtn.innerHTML = "Subscribing...";
    }

    // Persist subscriber locally (zero data loss on GitHub Pages)
    try {
      var key = "skycrane_newsletter_subscribers";
      var current = JSON.parse(localStorage.getItem(key) || "[]");
      current.push({
        email: emailVal,
        date: new Date().toISOString(),
        page: window.location.pathname
      });
      localStorage.setItem(key, JSON.stringify(current));
    } catch (e) {
      console.warn("Subscriber storage note:", e);
    }

    // Attempt FormSubmit forwarding in background (sends email alert to admin)
    try {
      fetch("https://formsubmit.co/ajax/info@skycranemobility.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: "New SkyCrane Air Mobility Briefing Subscriber!",
          subscriber_email: emailVal,
          source_page: window.location.href,
          timestamp: new Date().toLocaleString()
        })
      }).catch(function(err) {
        console.log("FormSubmit network note:", err);
      });
    } catch (e) {}

    // Show premium confirmation card & hide the form inputs
    setTimeout(function () {
      formEl.style.display = "none";

      var existingBox = formEl.parentNode.querySelector(".newsletter-success-box");
      if (existingBox) existingBox.remove();
      var oldMsg = formEl.parentNode.querySelector(".newsletter-feedback-msg");
      if (oldMsg) oldMsg.remove();

      var successCard = document.createElement("div");
      successCard.className = "newsletter-success-box";
      successCard.innerHTML = [
        '<div class="success-icon">',
        '  <svg style="width:18px;height:18px;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',
        '</div>',
        '<div class="success-title">Briefing Access Confirmed</div>',
        '<div class="success-email">' + emailVal + '</div>',
        '<div class="success-desc">You are registered to receive our monthly flight logs, regional corridor routes, and UAV technical briefings.</div>',
        '<button type="button" class="success-reset-btn">Subscribe another email</button>'
      ].join('');

      formEl.insertAdjacentElement("afterend", successCard);

      // Reset button state on form
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.innerHTML = origBtnText;
      }
      formEl.reset();

      // Bind reset button
      var resetBtn = successCard.querySelector(".success-reset-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", function () {
          successCard.remove();
          formEl.style.display = "";
          var newInp = formEl.querySelector('input[type="email"]');
          if (newInp) newInp.focus();
        });
      }
    }, 280);

    return false;
  };
