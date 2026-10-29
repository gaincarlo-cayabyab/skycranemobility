# SkyCrane Mobility — Modern Light Theme Blueprint & 3D Cloud Web Architecture

## 1. Executive Summary & Design Philosophy

**SkyCrane Mobility** is an industrial heavy-lift drone logistics provider in the Philippines, utilizing platforms like the **DJI FlyCart 100** to transport cargo across hard-to-reach, elevation-restricted, and roadless environments.

### Modern Light Theme Aesthetics
To project high trust, technological precision, and environmental aviation authority, the website adopts a **Modern Light Theme** design system:
* **Backgrounds:** Clean, airy off-whites (`#F8FAFC` to `#F1F5F9`) paired with subtle glassmorphic elements (`backdrop-blur-md bg-white/70`).
* **Typography & Contrast:** Slate Navy (`#0F172A`) for high-contrast legibility against light backgrounds.
* **Accent Colors:** Precision Sky Blue (`#0284C7`) and Safety Orange (`#F97316`) for call-to-action highlights and industrial safety branding.
* **3D Atmospheric Realism:** Interactive 3D volumetric sky and clouds rendered in real time behind the hero section to evoke high-altitude heavy-lift flight operations.

---

## 2. Technical Stack & Multi-Stage Deployment Architecture

| Layer | Technology | Operational Purpose |
| --- | --- | --- |
| **Local Testing** | XAMPP (`htdocs/skycrane-mobility`) | Local Apache environment previewed via `http://localhost/skycrane-mobility`. |
| **IDE** | Antigravity IDE | AI-assisted code editor, syntax control, and file tree management. |
| **3D Rendering** | Three.js + Vanta.js (`VANTA.CLOUDS`) | Interactive 3D WebGL cloud canvas for realistic aerial depth. |
| **Frontend Framework** | HTML5 + Tailwind CSS + Vanilla JS | Ultra-fast rendering with zero server-side rendering latency. |
| **Interim Testing Domain** | **Netlify** (`skycrane-mobility.netlify.app`) | Free instant testing domain via Netlify Drop, automatic SSL, image serving, and native form collection. |
| **Production Edge** | Tencent EdgeOne Pages | Production global static CDN hosting with enterprise edge routing. |

---

## 3. Directory & File Structure (`C:/xampp/htdocs/skycrane-mobility/`)

```
skycrane-mobility/
├── index.html                  # Homepage (3D Cloud Hero, Glass Cards, Specs Overview)
├── about.html                  # Company Mission, Operational Safety & Compliance
├── solutions.html              # 4 Key Industrial Sectors (Interactive Light Grid)
├── fleet-dji-fc100.html        # DJI FlyCart 100 Technical Specs & Dual Payload Systems
├── contact.html                # Project Consultation & Quote Intake Form
├── css/
│   ├── styles.css              # Custom glassmorphism, animations, light theme variables
│   └── tailwind.min.css        # Tailwind CSS styling library
├── js/
│   ├── main.js                 # Mobile navbar toggle, smooth scroll, UI triggers
│   ├── clouds-3d.js            # Three.js / Vanta 3D cloud initialization logic
│   └── payload-calculator.js   # Interactive payload & altitude feasibility script
└── assets/
    ├── images/                 # WebP/PNG photography, equipment diagrams (< 200 KB)
    └── icons/                  # SVG specs icons (IP55, LiDAR, 85kg Capacity, Winch)
```

> **Asset & Image Hosting on Netlify:** Netlify supports all static image formats (`.webp`, `.png`, `.jpg`, `.svg`) out of the box. All images stored in `/assets/images/` will be served globally via Netlify's high-speed CDN.

---

## 4. 3D Real Cloud Background Integration Guide

To render realistic 3D volumetric clouds in a light daytime environment, include **Three.js** and **Vanta Clouds** via CDN or local scripts inside `<head>`:

```html
<!-- Three.js Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
<!-- Vanta Clouds WebGL Plugin -->
<script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js"></script>
```

### JS Initialization (`js/clouds-3d.js`)
Initialize the 3D cloud canvas inside the hero background element (`#hero-cloud-canvas`):

```javascript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize 3D Real Cloud Canvas in Light Theme Palette
  VANTA.CLOUDS({
    el: "#hero-cloud-canvas",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    skyColor: 0x60a5fa,        /* Vibrant light sky blue */
    cloudColor: 0xffffff,      /* Crisp white volumetric clouds */
    cloudShadowColor: 0x93c5fd,/* Soft blue cloud shadows */
    sunColor: 0xfdba74,        /* Warm subtle sunlight tint */
    sunGlareColor: 0xffedd5,   /* Natural sunlight glow */
    sunlightColor: 0xffffff,   /* Bright daylight illumination */
    speed: 0.80                /* Smooth drifting motion */
  });
});
```

---

## 5. Page Layouts & Functional Content Blueprint

### 5.1 `index.html` (Light Glassmorphism & 3D Hero)
* **3D Hero Banner (`#hero-cloud-canvas`):**
  * Full-width WebGL interactive cloud canvas background.
  * Overlay: Glassmorphic panel (`backdrop-blur-md bg-white/75 border border-white/60 shadow-xl rounded-2xl`).
  * Title: *"Heavy-Lift Aerial Logistics for Hard-to-Reach Environments"*
  * Subtitle: *"Bypassing complex terrain and infrastructure barriers in the Philippines using the DJI FlyCart 100."*
  * CTAs: `[Request Flight Consultation]` (Safety Orange button) | `[Explore Fleet Specs]` (Outline Blue button).
* **Live Operational Metrics Bar:**
  * Clean stat blocks: $85\text{ kg}$ Max Dual-Battery Payload | $6,000\text{ m}$ Operational Ceiling | IP55 All-Weather Protection | $12\text{ m/s}$ Wind Resistance.
* **Sector Preview Grid:** Light elevate-on-hover cards introducing Construction, Renewable Energy, Oil & Gas, and Emergency Relief.

### 5.2 `solutions.html` (4 Key Application Sectors)

| Industrial Sector | Primary Cargo Payloads | Terrain Barrier Overcome |
| --- | --- | --- |
| **Construction & Infrastructure** | Structural steel components, concrete mixes, rebar, high-elevation building gear. | Overcomes cliffs, ravines, and sites lacking conventional road infrastructure. |
| **Renewable Energy** | Solar panel arrays, high-voltage cabling reels, wind turbine service components. | Point-to-point delivery across unpaved, mountainous terrain ridges. |
| **Oil & Gas Support** | Specialized valve replacements, diagnostic equipment, urgent industrial spares. | Direct aerial transit into hazardous or remote facility perimeters. |
| **Emergency Relief** | Clean water filtration units, emergency medical kits, satellite comms gear. | Instant access when roads are severed by natural disasters or landslides. |

### 5.3 `fleet-dji-fc100.html` (Equipment Technical Showcase)
* **Dual Cargo System Toggle:**
  * *Dual-Battery Cargo Box Mode:* Up to $85\text{ kg}$ payload capacity for high-density transport.
  * *Flagship Winch Cable System:* $20\text{ m}$ retractable cable for precision hovering payload delivery where landing is impossible.
* **Environmental & All-Weather Resistance:**
  * Ingress Protection: IP55 certified against heavy rain and dust.
  * Temperature Range: Operating capability from $-20^\circ\text{C} \text{ to } 45^\circ\text{C}$.
  * Wind Resistance: Operational stability in winds up to $12\text{ m/s}$.
* **Active Aviation Safety Suite:**
  * Multi-directional vision system (Penta-Vision) + Front/Rear LiDAR + Millimeter-Wave Radar.
  * Automated emergency parachute system with independent power supply.

### 5.4 `contact.html` (Netlify Native Form Integration)
To receive customer inquiry form submissions automatically on Netlify without setting up a backend server, add `data-netlify="true"` or `netlify` attribute to your HTML form tag:

```html
<form name="quote-request" method="POST" data-netlify="true" action="/thank-you.html">
  <input type="hidden" name="form-name" value="quote-request" />
  
  <label class="block text-slate-800 font-medium mb-1">Company / Organization</label>
  <input type="text" name="company" required class="w-full p-3 rounded-lg border border-slate-200 mb-4" />
  
  <label class="block text-slate-800 font-medium mb-1">Estimated Payload Weight</label>
  <select name="payload" class="w-full p-3 rounded-lg border border-slate-200 mb-4">
    <option value="0-30kg">0 - 30 kg</option>
    <option value="30-60kg">30 - 60 kg</option>
    <option value="60-85kg">60 - 85 kg (Max FlyCart 100 Envelope)</option>
  </select>

  <button type="submit" class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition">
    Submit Consultation Request
  </button>
</form>
```

---

## 6. Interactive Payload Feasibility Engine (`js/payload-calculator.js`)

Save this code to power the live feasibility widget on `contact.html` or `index.html`:

```javascript
/**
 * SkyCrane Mobility - Light Theme Payload Feasibility Calculator
 */
function evaluateFlightFeasibility(cargoWeightKg, flightAltitudeMeters) {
  const MAX_DUAL_BATTERY_PAYLOAD_KG = 85;
  const MAX_ALTITUDE_METERS = 6000;

  if (isNaN(cargoWeightKg) || cargoWeightKg <= 0) {
    return {
      status: "Invalid Input",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      message: "Please enter a valid positive cargo weight in kilograms."
    };
  }

  if (cargoWeightKg > MAX_DUAL_BATTERY_PAYLOAD_KG) {
    return {
      status: "Over Single-Drone Limit",
      badgeColor: "bg-red-100 text-red-800 border-red-300",
      message: `Cargo weight (${cargoWeightKg} kg) exceeds the single DJI FlyCart 100 capacity (85 kg). Multi-stage flight plan required.`
    };
  }

  if (flightAltitudeMeters > MAX_ALTITUDE_METERS) {
    return {
      status: "Altitude Limit Exceeded",
      badgeColor: "bg-red-100 text-red-800 border-red-300",
      message: `Flight site elevation (${flightAltitudeMeters} m) exceeds the 6,000 m operational ceiling.`
    };
  }

  return {
    status: "Flight Profile Approved",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    message: "Payload weight and operational altitude are within approved flight parameters."
  };
}
```

---

## 7. Execution Plan: Local Setup → Netlify Interim Testing → EdgeOne Production

```
┌─────────────────────────┐      ┌─────────────────────────┐      ┌─────────────────────────┐
│     Stage 1: Local      │      │ Stage 2: Netlify Test   │      │   Stage 3: Production   │
│  XAMPP & Antigravity    ├─────►│  Netlify Drop & Domain  ├─────►│  Tencent EdgeOne CDN    │
│ (http://localhost/...)  │      │(skycrane-mobility...app)│      │   (Production Domain)   │
└─────────────────────────┘      └─────────────────────────┘      └─────────────────────────┘
```

### Stage 1: Local Development in XAMPP & Antigravity IDE
1. Open **Antigravity IDE** and open workspace path: `C:/xampp/htdocs/skycrane-mobility/`.
2. Launch the **XAMPP Control Panel** and start the **Apache** service.
3. Open your browser and preview the local site at:
   `http://localhost/skycrane-mobility/index.html`

### Stage 2: Free Online Testing on Netlify (`skycrane-mobility.netlify.app`)
1. Open **[Netlify Drop](https://app.netlify.com/drop)** in your web browser.
2. Drag and drop the entire `skycrane-mobility` folder into the upload dropzone.
3. Netlify will instantly upload your HTML, CSS, JavaScript, WebP images, and 3D libraries.
4. **Customize Subdomain:** Go to **Site Configuration** > **Change Site Name** and set it to `skycrane-mobility`. Your online test URL will become:
   `https://skycrane-mobility.netlify.app`
5. Test form submissions directly inside Netlify’s dashboard under **Forms**.

### Stage 3: Production Edge Deployment (Tencent EdgeOne)
1. Verify all relative internal links (e.g., `href="solutions.html"` and `src="js/clouds-3d.js"`).
2. Log into the **Tencent EdgeOne Console**.
3. Go to **EdgeOne Pages / Static Site Hosting** and click **Create Project**.
4. Upload your finalized project folder or link your **GitHub** repository.
5. Set the root build output directory to `./`.
6. Click **Deploy** to issue your production SSL certificate and enable global CDN caching.

---

## 8. Launch Quality Checklist

* [ ] 3D Cloud background (`VANTA.CLOUDS`) renders smoothly at 60 FPS without layout shifts.
* [ ] All images (`.webp`, `.png`, `.jpg`) in `/assets/images/` load cleanly on Netlify CDN.
* [ ] Test domain `https://skycrane-mobility.netlify.app` is live and accessible on mobile devices.
* [ ] Netlify Forms capture client quote requests seamlessly on `contact.html`.
* [ ] Relative internal links work properly across local XAMPP, Netlify, and live EdgeOne domain.