# Antigravity Task & Code Integration Specifications

This document contains all requested HTML, JS, copy, and structural modifications for **SkyCrane Mobility**. Pass these instructions to Antigravity IDE to update the codebase and push to GitHub.

---

## Task 1: Footer Copy & Terminology Simplification

Update all footer instances across all HTML pages (`index.html`, `about.html`, etc.) with the following changes:

1. **Remove Email:** Delete `dispatch@skycranemobility.com`. Keep only `info@skycranemobility.com`.
2. **Simplify Address Label:** 
   * Change label `Hangar Base:` to `Main Office:`
   * Value: `08 BDEE Bldg., Perez Blvd., Herrero, Dagupan City, Pangasinan`
3. **Simplify & Expand Service Reach:**
   * Change label `Primary Corridors:` to `Service Coverage:`
   * Value: `Nationwide (Philippines) • Primary Hub: Northern Luzon`

---

## Task 2: Netlify Form Markup (HTML)

Ensure forms use Netlify attributes so Netlify's build engine automatically detects and handles submissions.

### A. Newsletter Briefing Form (`newsletter-briefing`)
Replace or update the footer newsletter form with:

```html
<form 
  id="briefing-form" 
  name="newsletter-briefing" 
  method="POST" 
  data-netlify="true" 
  netlify-honeypot="bot-field"
  action="/#success"
>
  <!-- Netlify Hidden Form Name Tag -->
  <input type="hidden" name="form-name" value="newsletter-briefing" />
  
  <!-- Anti-Spam Honeypot Field -->
  <p class="hidden" style="display:none;">
    <label>Don’t fill this out if you are human: <input name="bot-field" /></label>
  </p>

  <div class="input-group">
    <input 
      type="email" 
      name="email" 
      id="briefing-email" 
      placeholder="Enter corporate email..." 
      required 
    />
    <button type="submit" class="btn-subscribe">Subscribe</button>
  </div>
</form>
```

### B. Mission Consultation Form (`mission-consultation`)
Replace or update your consultation modal/page form with:

```html
<form 
  id="consultation-form" 
  name="mission-consultation" 
  method="POST" 
  data-netlify="true" 
  netlify-honeypot="bot-field"
  action="/#consultation-success"
>
  <!-- Netlify Hidden Form Name Tag -->
  <input type="hidden" name="form-name" value="mission-consultation" />
  
  <!-- Anti-Spam Honeypot Field -->
  <p class="hidden" style="display:none;">
    <label>Don’t fill this out: <input name="bot-field" /></label>
  </p>

  <div class="form-group">
    <label for="full_name">Full Name</label>
    <input type="text" id="full_name" name="full_name" placeholder="John Doe" required />
  </div>

  <div class="form-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" name="email" placeholder="name@company.com" required />
  </div>

  <div class="form-group">
    <label for="phone">Phone Number</label>
    <input type="tel" id="phone" name="phone" placeholder="+63 9XX XXX XXXX" required />
  </div>

  <div class="form-group">
    <label for="mission_details">Mission / Payload Details</label>
    <textarea id="mission_details" name="mission_details" rows="4" placeholder="Specify location, estimated lift capacity, and timeline..." required></textarea>
  </div>

  <button type="submit" class="btn-primary">Request Mission Consultation</button>
</form>
```

---

## Task 3: AJAX Form Handling & UI Reset Script (JS)

Add or replace the form event handlers in your main JavaScript file (e.g., `main.js` or `app.js`) to support seamless AJAX form submission without page reloads:

```javascript
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Newsletter Briefing Form AJAX Handler ---
  const briefingForm = document.getElementById('briefing-form');
  const briefingContainer = document.getElementById('briefing-container') || briefingForm?.parentElement;

  if (briefingForm) {
    briefingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(briefingForm);
      const submittedEmail = document.getElementById('briefing-email').value;

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then((response) => {
        if (response.ok) {
          renderBriefingSuccess(submittedEmail);
        } else {
          alert('Submission failed. Please try again.');
        }
      })
      .catch((error) => console.error('Form submit error:', error));
    });
  }

  function renderBriefingSuccess(email) {
    if (!briefingContainer) return;
    briefingContainer.innerHTML = `
      <div class="briefing-confirmed-card" style="padding: 1.5rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
        <h4 style="color: #4CAF50; margin-bottom: 0.5rem;">✓ Briefing Access Confirmed</h4>
        <p style="font-weight: bold; color: #ffffff;">${email}</p>
        <p style="font-size: 0.9rem; color: #cccccc; margin-bottom: 1rem;">
          You are registered to receive our monthly flight logs, regional corridor routes, and UAV technical briefings.
        </p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button id="reset-briefing-btn" class="btn-secondary" style="padding: 0.5rem 1rem; cursor: pointer;">
            Subscribe another email
          </button>
          <a href="#consultation-modal" class="btn-primary" style="padding: 0.5rem 1rem; text-decoration: none;">
            Request Mission Consultation
          </a>
        </div>
      </div>
    `;

    document.getElementById('reset-briefing-btn')?.addEventListener('click', () => {
      location.reload();
    });
  }

  // --- 2. Mission Consultation Form AJAX Handler ---
  const consultationForm = document.getElementById('consultation-form');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(consultationForm);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then((response) => {
        if (response.ok) {
          alert('Thank you! Your mission consultation request has been logged. Our operations team will contact you shortly.');
          consultationForm.reset();
        } else {
          alert('Failed to send consultation request. Please try again.');
        }
      })
      .catch((error) => console.error('Consultation form error:', error));
    });
  }

});
```

---

## Task 4: Founder & Visual Asset Mapping

Verify that the following image paths and attributes are present:

1. **`Image 8`**: `skycrane-dji-image-8.jpg` – Heavy Cargo Payload Transit (Solutions & Fleet Specs).
2. **`Image 9`**: `skycrane-dji-image-9.jpg` – Founder Jerry B. Dee performing pre-flight UAV checks (About Us / Leadership).
3. **`Image 10`**: `skycrane-dji-image-10.jpg` – Agri-Tech Spraying & Survey Drone (Precision Agriculture).
4. **`Image 11`**: `skycrane-dji-image-11.jpg` – Founder & CEO Jerry B. Dee with enterprise fleet (Home Hero / Founder Note).