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
<!-- 2. DISCRETE DEVELOPER POPUP MODAL                          -->
<!-- ========================================================= -->
<div id="devModal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
  <div class="bg-white rounded-2xl max-w-md w-full p-6 text-slate-800 shadow-2xl relative animate-fadeIn">
    <!-- Close Button -->
    <button onclick="closeDevModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    
    <span class="text-xs font-semibold uppercase tracking-wider text-amber-600">Web & Systems Developer</span>
    <h3 class="text-xl font-bold text-slate-900 mt-1">Gain Carlo Cayabyab</h3>
    <p class="text-sm text-slate-600 mt-2 leading-relaxed">
      Specializing in high-performance web applications, custom business portals, and cloud integrations built with modern web technologies and Antigravity IDE.
    </p>
    
    <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
      <span class="text-slate-500 font-medium">Available for freelance projects</span>
      <a href="mailto:gaincarlo@example.com?subject=Freelance%20Inquiry" class="bg-slate-900 text-white font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
        Inquire Work
      </a>
    </div>
  </div>
</div>

<!-- ========================================================= -->
<!-- 3. JAVASCRIPT FOR MODAL & CONSOLE EASTER EGG             -->
<!-- ========================================================= -->
<script>
  function openDevModal() {
    document.getElementById('devModal').classList.remove('hidden');
  }

  function closeDevModal() {
    document.getElementById('devModal').classList.add('hidden');
  }

  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('devModal');
    if (event.target === modal) {
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