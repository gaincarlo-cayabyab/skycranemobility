# Developer Portfolio & Attribution Integration Guide
*Designed for subtle, professional developer branding on SkyCrane Mobility (built with HTML, Tailwind CSS, and JS).*

---

## 1. Branding & Copy Options

### Recommended Developer Name Options
* **Option 2 (Freelance Brand):** Gain Carlo Cayabyab | Web Systems & Design

### Footer Attribution Wording Options
* **Option C (Tech Stack Focus):** `Engineered & Developed by Gain Carlo Cayabyab

---

## 2. Micro-Portfolio Bio Details

* **Headline:** Gain Carlo Cayabyab — Custom Web & Business System Developer
* **Tagline:** High-performance web applications, custom corporate portals, and automated digital workflows built for speed and security.
* **Core Capabilities:**
  * **Custom Web Development:** Light-theme, responsive layouts built with HTML5, Tailwind CSS, and JavaScript.
  * **Fast Cloud Deployment:** Static web hosting, DNS management, and SSL orchestration via Netlify and OpenSRS.
  * **Business Workflows:** Document Management Systems (DMS), supplier procurement hubs, and cloud integrations (Google Workspace & Zoho).
* **Contact Email:** `gaincarlo@example.com` *(replace with your preferred freelance contact email)*

---

## 3. Implementation Guidelines (Low-Profile Design)

1. **Footer Placement:** Position the credit inside the bottom copyright bar of your footer.
2. **Low Contrast:** Use a muted text color (e.g., `text-slate-500` or `opacity-50`) so it does not distract from SkyCrane Mobility’s main content.
3. **Hover Reveal:** Increase contrast smoothly only when a visitor hovers over the developer link (`hover:opacity-100` or `hover:text-white`).
4. **Interactive Modal:** Clicking the name opens a sleek, lightweight pop-up modal displaying your freelance capabilities and contact button.

---

## 4. All-in-One Code Block

Copy and paste the code below directly into your website file (before the closing `</body>` tag):

```html
<!-- ========================================================= -->
<!-- 1. FOOTER ATTRIBUTION (Place inside your <footer> element) -->
<!-- ========================================================= -->
<div class="border-t border-slate-800 bg-slate-900 py-6 text-slate-400">
  <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs">
    <p>&copy; 2026 SkyCrane Mobility Corporation. All rights reserved.</p>
    
    <!-- Discrete Developer Credit Link -->
    <p class="mt-2 md:mt-0 opacity-50 hover:opacity-100 transition-opacity duration-200">
      Engineered by 
      <button onclick="openDevModal()" class="underline decoration-slate-600 hover:text-white transition-colors">
        Gain Carlo
      </button>
    </p>
  </div>
</div>

<!-- ========================================================= -->
<!-- 2. HIGH-TECH INDUSTRIAL DEVELOPER POPUP MODAL               -->
<!-- ========================================================= -->
<div id="devModal" style="display:none;position:fixed;inset:0;background:rgba(2,6,23,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);align-items:center;justify-content:center;padding:1rem;z-index:99999;" onclick="if(event.target===this)closeDevModal()">
  <div class="dev-modal-card" style="background:rgba(2,6,23,0.96);border:1px solid rgba(30,41,59,0.9);box-shadow:0 25px 60px -15px rgba(0,0,0,0.85), 0 0 35px -5px rgba(6,182,212,0.18);border-radius:1.5rem;max-width:500px;width:100%;padding:1.5rem 1.75rem;position:relative;color:#f8fafc;overflow:hidden;">
    
    <!-- Ambient Cyan / Sky Background Glow Accents -->
    <div style="position:absolute;top:-60px;right:-60px;width:180px;height:180px;background:radial-gradient(circle,rgba(6,182,212,0.18) 0%,transparent 70%);pointer-events:none;"></div>
    <div style="position:absolute;bottom:-60px;left:-60px;width:180px;height:180px;background:radial-gradient(circle,rgba(14,165,233,0.15) 0%,transparent 70%);pointer-events:none;"></div>

    <!-- Crisp Close Button -->
    <button type="button" onclick="closeDevModal()" aria-label="Close modal" style="position:absolute;top:1rem;right:1rem;width:34px;height:34px;border-radius:50%;background:rgba(30,41,59,0.8);border:1px solid rgba(71,85,105,0.6);color:#94a3b8;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>

    <!-- Header Section -->
    <div style="display:flex;align-items:flex-start;gap:0.9rem;margin-bottom:1rem;padding-right:1.75rem;">
      <div style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#06b6d4 0%,#0369a1 100%);padding:2px;box-shadow:0 8px 24px rgba(6,182,212,0.3);flex-shrink:0;">
        <div style="width:100%;height:100%;background:#020617;border-radius:12px;display:flex;align-items:center;justify-content:center;">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M8 10L3 16L8 22" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24 10L29 16L24 22" stroke="#0ea5e9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 6L13 26" stroke="#f8fafc" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <div style="min-width:0;flex:1;">
        <div style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.2rem 0.65rem;border-radius:999px;background:rgba(8,51,68,0.7);border:1px solid rgba(6,182,212,0.35);font-size:0.65rem;font-weight:800;color:#67e8f9;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.35rem;">
          <span style="width:6px;height:6px;border-radius:50%;background:#06b6d4;display:inline-block;" class="animate-pulse"></span>
          Full-Stack Web Development &amp; IT Solutions
        </div>
        <h3 style="font-size:clamp(1.15rem, 3.5vw, 1.35rem);font-weight:900;color:#ffffff;margin:0 0 0.2rem;letter-spacing:-0.02em;display:flex;align-items:center;gap:0.4rem;font-family:'Outfit',sans-serif;">
          Engineered by Gain Carlo
          <svg style="width:17px;height:17px;color:#06b6d4;flex-shrink:0;" fill="currentColor" viewBox="0 0 24 24" title="Verified Systems Engineer"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </h3>
        <p style="font-size:0.75rem;color:#94a3b8;font-weight:600;margin:0;">Gain Carlo Cayabyab &bull; Lead Systems Architect</p>
      </div>
    </div>

    <!-- Brief Bio / Credit Note -->
    <p style="font-size:0.8125rem;color:#cbd5e1;line-height:1.6;margin:0 0 1rem;padding:0.75rem 0.9rem;border-radius:0.75rem;background:rgba(15,23,42,0.65);border:1px solid rgba(51,65,85,0.65);">
      Specializing in full-stack technical engineering, high-performance responsive UI/UX architecture, performance optimization, and custom automated workflow development.
    </p>

    <!-- Technical Competencies Pills -->
    <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:1.15rem;">
      <span style="font-size:0.68rem;font-weight:700;background:#0f172a;border:1px solid #334155;color:#cbd5e1;padding:0.2rem 0.55rem;border-radius:0.4rem;">Full-Stack Web Apps</span>
      <span style="font-size:0.68rem;font-weight:700;background:rgba(8,51,68,0.5);border:1px solid rgba(6,182,212,0.3);color:#67e8f9;padding:0.2rem 0.55rem;border-radius:0.4rem;">Algorithms &amp; Math Models</span>
      <span style="font-size:0.68rem;font-weight:700;background:rgba(12,74,110,0.5);border:1px solid rgba(14,165,233,0.3);color:#7dd3fc;padding:0.2rem 0.55rem;border-radius:0.4rem;">Responsive UI/UX</span>
      <span style="font-size:0.68rem;font-weight:700;background:#0f172a;border:1px solid #334155;color:#cbd5e1;padding:0.2rem 0.55rem;border-radius:0.4rem;">Custom Workflow Development</span>
    </div>

    <!-- Contact & Action Buttons (Strictly 3 Channels Only) -->
    <div style="border-top:1px solid rgba(51,65,85,0.7);padding-top:1rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;">
        <span style="font-size:0.68rem;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">Direct Contact Channels:</span>
        <span style="font-size:0.68rem;color:#34d399;font-weight:700;display:flex;align-items:center;gap:0.35rem;">
          <span style="width:6px;height:6px;border-radius:50%;background:#34d399;display:inline-block;box-shadow:0 0 6px #34d399;"></span>
          Available for New Projects
        </span>
      </div>

      <!-- 1. Direct Phone Call with Copy Micro-Feature -->
      <div style="display:flex;align-items:center;gap:0.5rem;padding:0.65rem 0.85rem;border-radius:0.75rem;background:rgba(15,23,42,0.9);border:1px solid #334155;margin-bottom:0.65rem;transition:all 0.2s;">
        <a href="tel:09937052927" style="display:flex;align-items:center;gap:0.65rem;flex:1;min-width:0;text-decoration:none;" title="Click to call +63 993 705 2927">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(6,182,212,0.12);border:1px solid rgba(6,182,212,0.35);color:#06b6d4;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          </div>
          <div style="min-width:0;">
            <div style="font-size:0.625rem;text-transform:uppercase;font-weight:800;color:#06b6d4;letter-spacing:0.06em;">Direct Phone Call</div>
            <div style="color:#ffffff;font-size:0.875rem;font-family:monospace;font-weight:800;letter-spacing:0.02em;">+63 993 705 2927</div>
          </div>
        </a>
        <button type="button" onclick="copyDevPhone(this)" title="Copy phone number" style="padding:0.4rem 0.65rem;border-radius:6px;background:#1e293b;border:1px solid #475569;color:#cbd5e1;font-size:0.7rem;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:0.35rem;transition:all 0.2s;">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span class="copy-lbl">Copy</span>
        </button>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
        <!-- 2. Email Inquiry -->
        <a href="mailto:gaincarlocskycrane@gmail.com?subject=Full-Stack%20Web%20Inquiry%20via%20Developer%20Portfolio" style="display:flex;align-items:center;gap:0.65rem;padding:0.65rem 0.85rem;border-radius:0.75rem;background:rgba(15,23,42,0.9);border:1px solid #334155;text-decoration:none;transition:all 0.2s;">
          <div style="width:34px;height:34px;border-radius:8px;background:rgba(14,165,233,0.12);border:1px solid rgba(14,165,233,0.35);color:#0ea5e9;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <div style="min-width:0;">
            <div style="font-size:0.625rem;text-transform:uppercase;font-weight:800;color:#38bdf8;letter-spacing:0.06em;">Email Inquiry</div>
            <div style="color:#ffffff;font-size:0.75rem;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Send Message</div>
          </div>
        </a>

        <!-- 3. Facebook Profile -->
        <a href="https://www.facebook.com/share/1DrAJee1Bs/" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:0.65rem;padding:0.65rem 0.85rem;border-radius:0.75rem;background:rgba(15,23,42,0.9);border:1px solid #334155;text-decoration:none;transition:all 0.2s;">
          <div style="width:34px;height:34px;border-radius:8px;background:rgba(24,119,242,0.15);border:1px solid rgba(24,119,242,0.4);color:#60a5fa;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </div>
          <div style="min-width:0;">
            <div style="font-size:0.625rem;text-transform:uppercase;font-weight:800;color:#60a5fa;letter-spacing:0.06em;">Facebook</div>
            <div style="color:#ffffff;font-size:0.75rem;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">View Profile</div>
          </div>
        </a>
      </div>
    </div>

    <!-- Footer Line inside Modal -->
    <div style="margin-top:1.15rem;padding-top:0.75rem;border-top:1px solid rgba(30,41,59,0.9);text-align:center;">
      <p style="font-size:0.68rem;color:#64748b;margin:0;line-height:1.4;">
        &copy; 2026 Gain Carlo Cayabyab. Built with high performance &amp; precision.
      </p>
    </div>

  </div>
</div>

<!-- ========================================================= -->
<!-- 3. JAVASCRIPT FOR MODAL & CONSOLE EASTER EGG             -->
<!-- ========================================================= -->
<script>
  function openDevModal() {
    var m = document.getElementById('devModal');
    if (m) {
      m.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDevModal() {
    var m = document.getElementById('devModal');
    if (m) {
      m.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  function copyDevPhone(btn) {
    var phone = "+639937052927";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phone);
    } else {
      var ta = document.createElement("textarea");
      ta.value = phone;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
    }
    if (btn) {
      var lbl = btn.querySelector(".copy-lbl");
      if (lbl) {
        var orig = lbl.textContent;
        lbl.textContent = "Copied ✓";
        btn.style.color = "#34d399";
        btn.style.borderColor = "#34d399";
        setTimeout(function () {
          lbl.textContent = orig;
          btn.style.color = "";
          btn.style.borderColor = "";
        }, 2000);
      }
    }
  }

  // Keyboard accessibility: ESC closes modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeDevModal();
    }
  });

  // Console Easter Egg for tech-savvy users inspecting the site
  console.log(
    "%c Designed & Engineered by Gain Carlo Cayabyab | Web Systems Developer ",
    "background: #0f172a; color: #38bdf8; font-size: 11px; font-weight: bold; padding: 6px 12px; border-radius: 4px;"
  );
</script>
```