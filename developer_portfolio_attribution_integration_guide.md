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
<!-- 2. HIGH-TECH EXECUTIVE DEVELOPER POPUP MODAL (LIGHT THEME) -->
<!-- ========================================================= -->
<div id="devModal" style="display:none;position:fixed;inset:0;background:rgba(15,23,42,0.8);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);align-items:center;justify-content:center;padding:1rem;z-index:99999;" onclick="if(event.target===this)closeDevModal()">
  <div class="dev-modal-card" style="background:#FFFFFF;border-radius:1.5rem;max-width:520px;width:100%;padding:1.65rem 1.75rem;position:relative;color:#0F172A;box-shadow:0 25px 70px rgba(15,23,42,0.4), 0 0 0 1px rgba(226,232,240,0.9);overflow:hidden;">
    
    <!-- Subtle Ambient Top Light Accent -->
    <div style="position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#0284c7 0%,#06b6d4 50%,#f97316 100%);"></div>

    <!-- Crisp Light Close Button -->
    <button type="button" onclick="closeDevModal()" aria-label="Close modal" style="position:absolute;top:1rem;right:1rem;width:34px;height:34px;border-radius:50%;background:#F1F5F9;border:1px solid #E2E8F0;color:#64748B;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>

    <!-- Header Section -->
    <div style="display:flex;align-items:flex-start;gap:0.9rem;margin-bottom:1rem;padding-right:1.75rem;">
      <div style="width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#0F172A 0%,#1E293B 100%);padding:2px;border:2px solid #0284C7;box-shadow:0 6px 18px rgba(2,132,199,0.25);flex-shrink:0;display:flex;align-items:center;justify-content:center;">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <path d="M8 10L3 16L8 22" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M24 10L29 16L24 22" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19 6L13 26" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
        </svg>
      </div>

      <div style="min-width:0;flex:1;">
        <div style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.22rem 0.65rem;border-radius:999px;background:#EFF6FF;border:1px solid #BFDBFE;font-size:0.67rem;font-weight:800;color:#0284C7;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.3rem;">
          <span style="width:6px;height:6px;border-radius:50%;background:#0284C7;display:inline-block;" class="animate-pulse"></span>
          Full-Stack Web Development &amp; IT Solutions
        </div>
        <h3 style="font-size:clamp(1.15rem, 3.5vw, 1.35rem);font-weight:900;color:#0F172A;margin:0 0 0.15rem;letter-spacing:-0.02em;display:flex;align-items:center;gap:0.4rem;font-family:'Outfit',sans-serif;">
          Engineered by Gain Carlo
          <svg style="width:18px;height:18px;color:#0284C7;flex-shrink:0;" fill="currentColor" viewBox="0 0 24 24" title="Verified Systems Engineer"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </h3>
        <p style="font-size:0.78rem;color:#64748B;font-weight:600;margin:0;">Gain Carlo Cayabyab &bull; Lead Systems Architect</p>
      </div>
    </div>

    <!-- Brief Bio / Credit Note -->
    <p style="font-size:0.8125rem;color:#334155;line-height:1.6;margin:0 0 1rem;padding:0.85rem 1rem;border-radius:0.75rem;background:#F8FAFC;border:1px solid #E2E8F0;">
      Specializing in full-stack technical engineering, high-performance responsive UI/UX architecture, performance optimization, and custom automated workflow development.
    </p>

    <!-- Technical Competencies Pills -->
    <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:1.15rem;">
      <span style="font-size:0.68rem;font-weight:700;background:#F1F5F9;border:1px solid #E2E8F0;color:#334155;padding:0.25rem 0.6rem;border-radius:0.4rem;">Full-Stack Web Apps</span>
      <span style="font-size:0.68rem;font-weight:700;background:#EFF6FF;border:1px solid #BFDBFE;color:#1E40AF;padding:0.25rem 0.6rem;border-radius:0.4rem;">Algorithms &amp; Math Models</span>
      <span style="font-size:0.68rem;font-weight:700;background:#ECFEFF;border:1px solid #A5F3FC;color:#0E7490;padding:0.25rem 0.6rem;border-radius:0.4rem;">Responsive UI/UX</span>
      <span style="font-size:0.68rem;font-weight:700;background:#F0FDF4;border:1px solid #BBF7D0;color:#166534;padding:0.25rem 0.6rem;border-radius:0.4rem;">Custom Workflow Development</span>
    </div>

    <!-- Contact & Action Buttons (Strictly 3 Channels Only) -->
    <div style="border-top:1px solid #E2E8F0;padding-top:1rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;">
        <span style="font-size:0.68rem;font-weight:800;color:#64748B;text-transform:uppercase;letter-spacing:0.06em;">Direct Contact Channels:</span>
        <span style="font-size:0.68rem;color:#16A34A;font-weight:700;display:flex;align-items:center;gap:0.35rem;">
          <span style="width:6px;height:6px;border-radius:50%;background:#16A34A;display:inline-block;box-shadow:0 0 0 2px rgba(22,163,74,0.2);"></span>
          Available for New Projects
        </span>
      </div>

      <!-- 1. Direct Phone Call with Copy Micro-Feature -->
      <div style="display:flex;align-items:center;gap:0.5rem;padding:0.7rem 0.9rem;border-radius:0.85rem;background:#FFFFFF;border:1.5px solid #E2E8F0;margin-bottom:0.65rem;box-shadow:0 2px 4px rgba(15,23,42,0.03);transition:all 0.2s;">
        <a href="tel:09937052927" style="display:flex;align-items:center;gap:0.65rem;flex:1;min-width:0;text-decoration:none;" title="Click to call +63 993 705 2927">
          <div style="width:38px;height:38px;border-radius:10px;background:#EFF6FF;border:1px solid #BFDBFE;color:#0284C7;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          </div>
          <div style="min-width:0;">
            <div style="font-size:0.625rem;text-transform:uppercase;font-weight:800;color:#0284C7;letter-spacing:0.06em;">Direct Phone Call</div>
            <div style="color:#0F172A;font-size:0.95rem;font-family:monospace;font-weight:800;letter-spacing:0.02em;">+63 993 705 2927</div>
          </div>
        </a>
        <button type="button" onclick="copyDevPhone(this)" title="Copy phone number" style="padding:0.45rem 0.75rem;border-radius:8px;background:#F8FAFC;border:1px solid #CBD5E1;color:#334155;font-size:0.72rem;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:0.35rem;transition:all 0.2s;">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span class="copy-lbl">Copy</span>
        </button>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;">
        <!-- 2. Email Inquiry with Official Gmail Logo -->
        <a href="mailto:gaincarlocskycrane@gmail.com?subject=Full-Stack%20Web%20Inquiry%20via%20Developer%20Portfolio" style="display:flex;align-items:center;gap:0.65rem;padding:0.7rem 0.85rem;border-radius:0.85rem;background:#FFFFFF;border:1.5px solid #E2E8F0;text-decoration:none;box-shadow:0 2px 4px rgba(15,23,42,0.03);transition:all 0.2s;">
          <div style="width:36px;height:36px;border-radius:10px;background:#F8FAFC;border:1px solid #E2E8F0;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
              <path d="M45 16.2V37C45 38.6569 43.6569 40 42 40H35V23.7L45 16.2Z" fill="#34A853"/>
              <path d="M3 16.2V37C3 38.6569 4.34315 40 6 40H13V23.7L3 16.2Z" fill="#4285F4"/>
              <path d="M35 12V23.7L24 15.5L13 23.7V12L24 4L35 12Z" fill="#EA4335"/>
              <path d="M3 16.2L13 23.7V12L4.32 5.69C3.54 5.13 3 5.81 3 6.67V16.2Z" fill="#C5221F"/>
              <path d="M45 16.2L35 23.7V12L43.68 5.69C44.46 5.13 45 5.81 45 6.67V16.2Z" fill="#FBBC04"/>
            </svg>
          </div>
          <div style="min-width:0;">
            <div style="font-size:0.625rem;text-transform:uppercase;font-weight:800;color:#EA4335;letter-spacing:0.06em;">Gmail Inquiry</div>
            <div style="color:#0F172A;font-size:0.8rem;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Send Message</div>
          </div>
        </a>

        <!-- 3. Facebook Profile with Official Facebook Logo -->
        <a href="https://www.facebook.com/share/1DrAJee1Bs/" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:0.65rem;padding:0.7rem 0.85rem;border-radius:0.85rem;background:#FFFFFF;border:1.5px solid #E2E8F0;text-decoration:none;box-shadow:0 2px 4px rgba(15,23,42,0.03);transition:all 0.2s;">
          <div style="width:36px;height:36px;border-radius:10px;background:#F0F6FF;border:1px solid #BFDBFE;color:#1877F2;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </div>
          <div style="min-width:0;">
            <div style="font-size:0.625rem;text-transform:uppercase;font-weight:800;color:#1877F2;letter-spacing:0.06em;">Facebook</div>
            <div style="color:#0F172A;font-size:0.8rem;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">View Profile</div>
          </div>
        </a>
      </div>
    </div>

    <!-- Footer Line inside Modal -->
    <div style="margin-top:1.15rem;padding-top:0.75rem;border-top:1px solid #E2E8F0;text-align:center;">
      <p style="font-size:0.7rem;color:#94A3B8;margin:0;line-height:1.4;">
        &copy; 2026 Gain Carlo Cayabyab. Built with high performance &amp; precision.
      </p>
    </div>

  </div>
</div>
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