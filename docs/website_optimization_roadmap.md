# SkyCrane Mobility - Website Optimization & UI Implementation Roadmap

## 1. Executive Summary
This document provides the technical and design specifications for upgrading the SkyCrane Mobility web application. Designed around the operational capabilities of the flagship **DJI FlyCart 100** heavy-lift drone, this roadmap establishes high-impact UI patterns, resolves floating widget conflicts, optimizes front-end performance, and enhances B2B trust signals for enterprise clients in the Philippines.

---

## 2. UI Conflict Resolution: Floating Action Components

### Problem Statement
Overlapping fixed-position elements at the bottom-right corner of the screen (`bottom: 20px; right: 20px`) create visual clutter and cause click collision between the floating customer chat widget (e.g., Zoho SalesIQ / WhatsApp) and the "Back to Top" navigation button.

### Chosen Optimal Solution
**Option A: Relocate "Back to Top" to Bottom-Left (Recommended)**
Moving the "Back to Top" trigger to the bottom-left corner cleanly partitions website navigation utilities from direct customer engagement widgets, resulting in a balanced mobile and desktop viewport layout.

#### CSS Specification
```css
/* Back to Top Floating Button */
.back-to-top {
  position: fixed;
  bottom: 24px;
  left: 24px;
  right: auto;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #0F172A; /* Dark Slate Primary */
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  visibility: hidden;
  z-index: 99; /* Below modal backdrops (1000+), above page content */
}

.back-to-top.is-visible {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  background-color: #2563EB; /* Accent Blue Hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
}

@media (max-width: 640px) {
  .back-to-top {
    bottom: 18px;
    left: 18px;
    width: 42px;
    height: 42px;
  }
}
```

#### JavaScript Toggle Implementation
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (!backToTopBtn) return;

  const handleScroll = () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
```

---

## 3. Hero Section & Value Proposition Refinement

### Key Objectives
* Communicate core heavy-payload lift service capabilities within $3\text{ seconds}$ of initial load.
* Target enterprise decision-makers in infrastructure, energy, and emergency response across the Philippines.

### Content & Layout Architecture
1. **Primary Headline:**  
   *"Industrial Heavy-Payload Drone Logistics & Transport in the Philippines"*
2. **Subheadline:**  
   *"Deploying the DJI FlyCart 100 for high-capacity material delivery, remote utility construction, and rapid emergency lifelines—up to $40\text{ kg}$ payload capacity."*
3. **Call-To-Action (CTA) Cluster:**
   * Primary Button: `"Request Mission Feasibility & Quote"` (Routes to interactive intake form).
   * Secondary Button: `"Download Capability Brief (PDF)"`.
4. **Hero Media Background:**
   * Replace static backgrounds or animated GIFs with high-efficiency video loops (`.mp4` / `.webm` encoded at $1080\text{p}$, file size $< 5\text{MB}$, with attributes `muted`, `autoplay`, `loop`, `playsinline`).

---

## 4. Safety, CAAP Regulatory Credentials & Insurance Integration

Corporate clients require explicit proof of compliance and liability mitigation prior to operational engagement.

### Dedicated Trust & Compliance Bar (Post-Hero Section)
Place a prominent trust strip immediately beneath the Hero banner featuring verified badges:

* **CAAP Operator Certification:** Civil Aviation Authority of the Philippines compliance status badge & Remote Pilot License credentials.
* **Commercial Liability Insurance:** Badges indicating comprehensive hull & third-party liability coverage (e.g., Pioneer, Malayan, PAJ, Petrogen).
* **Zero-Incident Safety Record:** Quantifiable safety metrics (e.g., $100\%$ flight compliance, certified risk mitigation protocols).

---

## 5. Sector-Specific Landing Sections & Technical Versatility

### Service Sector Categorization
Provide dedicated operational use-case cards:
1. **Renewable Energy & Solar:** Heavy equipment transport for mountain/roof installations.
2. **Power Line Stringing & Utilities:** Cable pulling and tower construction material lift.
3. **Construction & Civil Engineering:** Remote site gravel, concrete, and steel rebar delivery.
4. **Disaster Relief & Lifeline Logistics:** Rapid deployment of emergency supplies across impassable terrain.

### Asset Capability Showcase: DJI FlyCart 100 Dual Configuration
Highlight the two distinct payload operational modes:
* **Cargo Box Mode:** Secure, weather-resistant enclosed transport with $70\text{L}$ volume capacity.
* **Smart Winch System Mode:** Precision aerial dropping/retrieval with automatic cable anti-sway control for unapproachable terrain.

---

## 6. Technical Performance & Core Web Vitals Optimization Checklist

### Target Performance Benchmarks
* **Largest Contentful Paint (LCP):** $< 2.5\text{ seconds}$
* **Cumulative Layout Shift (CLS):** $< 0.1$
* **Interaction to Next Paint (INP):** $< 200\text{ ms}$

### Asset Optimization Rules
1. **GIF Elimination:** Convert legacy GIFs to HTML5 silent looping videos or WebP/AVIF animated image stacks to reduce payload size by up to $80\%$.
2. **Lazy Loading:** Apply `loading="lazy"` and `decoding="async"` to all non-critical images.
3. **Dimension Enforcement:** Explicitly set `width` and `height` attributes on image/video containers to preserve aspect ratio and eliminate CLS.
4. **Header Styling:** Implement a sticky light header using CSS `backdrop-filter: blur(8px)` with high contrast navigation elements.

---

## 7. Directives for Developer / "Antigravity"

> **Instructions for Antigravity / Development Lead:**
> 1. Pull the latest repository updates from the main branch.
> 2. Create a feature branch: `feature/website-optimization-specs`.
> 3. Implement the bottom-left floating button layout and JS scroll toggle as defined in Section 2.
> 4. Add the regulatory trust section (CAAP credentials & Insurance badges) directly under the Hero component.
> 5. Optimize media assets (replacing GIFs with WebM/MP4 video clips).
> 6. Push the updated specification file (`docs/website_optimization_roadmap.md`) and codebase changes to GitHub and submit a Pull Request for review.