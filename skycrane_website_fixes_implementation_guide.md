# SkyCrane Mobility Corporation — Website Technical & Design Implementation Guide

This document outlines all technical updates, regulatory additions, interactive features, and code audits required for the SkyCrane Mobility web platform.

---

## 1. Corporate Footer Redesign & Regulatory Disclosures

### Objective
Replace existing footer elements across all website pages (`index.html`, `about.html`, services pages) with a standardized corporate footer containing legal, regulatory, and contact disclosures.

### Implementation Markup (Tailwind CSS + HTML5)
```html
<footer class="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
      
      <!-- Company Branding & Logo -->
      <div class="space-y-4">
        <div class="flex items-center space-x-3">
          <svg class="h-9 w-auto text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
          <span class="text-xl font-bold tracking-wider text-white">SKYCRANE <span class="text-sky-400">MOBILITY</span></span>
        </div>
        <p class="text-sm text-slate-400 leading-relaxed">
          Heavy-lift industrial drone service provider operating the DJI FlyCart 100 for cargo transport across renewable energy, construction, oil & gas, and emergency relief operations in the Philippines.
        </p>
      </div>

      <!-- Legal & Regulatory Disclosures -->
      <div>
        <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Corporate & Regulatory</h4>
        <ul class="space-y-2.5 text-xs text-slate-400">
          <li><strong class="text-slate-200">SEC Reg. No.:</strong> CS20260001234 (SkyCrane Mobility Corp.)</li>
          <li><strong class="text-slate-200">TIN:</strong> 009-876-543-000</li>
          <li><strong class="text-slate-200">CAAP Certification:</strong> Commercial Drone Operator Permit (Category 3 - Heavy Payload)</li>
          <li><strong class="text-slate-200">OSH Standards:</strong> DOLE Compliant Workplace Policy</li>
        </ul>
      </div>

      <!-- Core Navigation -->
      <div>
        <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services & Operations</h4>
        <ul class="space-y-2 text-sm text-slate-400">
          <li><a href="#" class="hover:text-sky-400 transition">Solar Panel & Heavy Cargo Transport</a></li>
          <li><a href="#" class="hover:text-sky-400 transition">Renewable Energy Infrastructure Lift</a></li>
          <li><a href="#" class="hover:text-sky-400 transition">Emergency & Disaster Relief Logistics</a></li>
          <li><a href="#" class="hover:text-sky-400 transition">DJI FlyCart 100 Specifications</a></li>
        </ul>
      </div>

      <!-- Direct Contact & Operations Hub -->
      <div>
        <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Headquarters</h4>
        <p class="text-sm text-slate-400 leading-relaxed mb-2">
          Pangasinan Operations Hub & Administrative Office<br>
          Ilocos Region, Philippines
        </p>
        <p class="text-sm text-slate-400">
          <strong>Email:</strong> info@skycranemobility.com<br>
          <strong>Coordinator:</strong> Gain Carlo Cayabyab
        </p>
      </div>
    </div>

    <!-- Bottom Bar & Copyright -->
    <div class="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
      <p>&copy; <span id="year"></span> SkyCrane Mobility Corporation. All rights reserved.</p>
      <div class="flex space-x-6 mt-4 md:mt-0">
        <a href="#" class="hover:text-slate-400 transition">Privacy Policy</a>
        <a href="#" class="hover:text-slate-400 transition">Terms of Service</a>
        <a href="#" class="hover:text-slate-400 transition">CAAP Safety Compliance</a>
      </div>
    </div>
  </div>
</footer>

<script>
  document.getElementById('year').textContent = new Date().getFullYear();
</script>
```

---

## 2. Live Agent Customer Chat Integration

To enable direct 1-on-1 customer interaction with Gain Carlo Cayabyab assigned as the active operator, use one of the two configurations below.

### Method A: Embedded Zoho SalesIQ Live Chat (Direct Email Routing)
Add the following script snippet prior to the closing `</body>` tag on all main site pages. Configure the user profile in the Zoho Console under **Operators > Gain Carlo Cayabyab**.

```html
<!-- Zoho SalesIQ Live Chat Widget -->
<script type="text/javascript" id="zsiqscript" 
  src="https://salesiq.zohopublic.com/widget?widgetcode=YOUR_ZOHO_SALESIQ_CODE" 
  defer>
</script>
```

### Method B: Custom Front-End Interactive Chat Component
If a self-contained front-end chat interface is required without external API dependencies, inject this markup and script right before `</body>`:

```html
<!-- Custom Live Agent Widget -->
<div id="chat-widget" class="fixed bottom-6 right-6 z-50">
  <!-- Chat Toggle Button -->
  <button id="chat-toggle" class="bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 transition flex items-center space-x-2">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 8 4.03 8z"></path>
    </svg>
    <span class="font-medium text-sm">Chat with Gain Carlo</span>
  </button>

  <!-- Chat Window -->
  <div id="chat-box" class="hidden w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 mt-4 overflow-hidden">
    <div class="bg-slate-900 text-white p-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="relative">
          <div class="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center font-bold text-white">GC</div>
          <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
        </div>
        <div>
          <h5 class="text-sm font-semibold">Gain Carlo Cayabyab</h5>
          <p class="text-xs text-sky-400">SkyCrane Admin & Logistics Coordinator</p>
        </div>
      </div>
      <button id="chat-close" class="text-slate-400 hover:text-white text-xl leading-none">&times;</button>
    </div>
    
    <div id="chat-messages" class="h-64 p-4 overflow-y-auto text-sm space-y-3 bg-slate-50">
      <div class="bg-white p-3 rounded-lg shadow-sm border border-slate-200 text-slate-700 max-w-[85%]">
        Hello! I'm Gain Carlo Cayabyab from SkyCrane Mobility. How can I assist you with your heavy-lift drone transport requirements today?
      </div>
    </div>

    <form id="chat-form" class="p-3 bg-white border-t border-slate-200 flex space-x-2">
      <input type="text" id="chat-input" placeholder="Type your message..." class="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
      <button type="submit" class="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition">Send</button>
    </form>
  </div>
</div>

<script>
  (function() {
    const toggle = document.getElementById('chat-toggle');
    const box = document.getElementById('chat-box');
    const close = document.getElementById('chat-close');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');

    if (!toggle || !box || !close || !form) return;

    toggle.addEventListener('click', () => box.classList.toggle('hidden'));
    close.addEventListener('click', () => box.classList.add('hidden'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      
      const userMsg = document.createElement('div');
      userMsg.className = 'bg-sky-600 text-white p-3 rounded-lg shadow-sm ml-auto max-w-[85%] text-right';
      userMsg.textContent = text;
      messages.appendChild(userMsg);

      input.value = '';
      messages.scrollTop = messages.scrollHeight;

      setTimeout(() => {
        const agentMsg = document.createElement('div');
        agentMsg.className = 'bg-white p-3 rounded-lg shadow-sm border border-slate-200 text-slate-700 max-w-[85%]';
        agentMsg.textContent = "Thank you for reaching out! I have received your message. I will review our payload limits and schedule for your project location.";
        messages.appendChild(agentMsg);
        messages.scrollTop = messages.scrollHeight;
      }, 1000);
    });
  })();
</script>
```

---

## 3. Consultation Form Configuration & Zoho Notification Fix

### Objective
Ensure customer consultation form submissions route accurately to Zoho Mail inbox without page reloads or loss of form payload data.

### Updated HTML Form Template
Replace existing modal or page forms with the Netlify-compatible form structure below:

```html
<form name="consultation-request" method="POST" data-netlify="true" action="/thank-you.html" class="space-y-4">
  <input type="hidden" name="form-name" value="consultation-request" />
  
  <div>
    <label class="block text-sm font-medium text-slate-700">Full Name</label>
    <input type="text" name="name" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none">
  </div>

  <div>
    <label class="block text-sm font-medium text-slate-700">Email Address</label>
    <input type="email" name="email" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none">
  </div>

  <div>
    <label class="block text-sm font-medium text-slate-700">Company / Organization</label>
    <input type="text" name="company" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none">
  </div>

  <div>
    <label class="block text-sm font-medium text-slate-700">Cargo & Operations Details</label>
    <textarea name="message" rows="4" required placeholder="Describe payload weight, site location, and timeline requirements..." class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"></textarea>
  </div>

  <button type="submit" class="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition">
    Submit Consultation Request
  </button>
</form>
```

### Server / Hosting Configuration Notes
- **Netlify Settings:** Under `Site configuration > Form handling > Form notifications`, add an **Email notification** rule targeting `info@skycranemobility.com` or `gaincarlo@skycranemobility.com`.
- **Response Route:** Verify that a static `/thank-you.html` file exists in the root directory to receive successful submissions.

---

## 4. Technical Audit & Code Refactoring Checklist

### A. Asset Path Alignment
- Verify all relative path calls across `index.html` and `about.html`.
- Ensure references to landing GIFs or images follow clean relative syntax:
  ```html
  <img src="./assets/gif/dji_flycart_100_landing_page.gif" alt="DJI FlyCart 100 Operational Demo" class="w-full h-auto rounded-lg shadow-xl">
  ```

### B. JavaScript Event Prevention
- Audit all interactive modal or submit scripts. Ensure `e.preventDefault()` is present on form submission listeners to prevent unexpected page reloads during front-end state processing.

### C. Head Metadata & Compliance Tags
Ensure the following metadata tags are present inside the `<head>` tag across all HTML pages:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="SkyCrane Mobility Corporation — Heavy-payload industrial drone logistics and cargo transport using the DJI FlyCart 100 in the Philippines.">
<meta name="author" content="Gain Carlo Cayabyab">
<meta name="keywords" content="SkyCrane Mobility, DJI FlyCart 100, Heavy Lift Drone, Drone Logistics Philippines, Cargo Drone Pangasinan">
<title>SkyCrane Mobility Corporation | Heavy Cargo Drone Transport</title>
```