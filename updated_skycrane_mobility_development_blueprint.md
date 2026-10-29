# SkyCrane Mobility — Modern Light Theme Blueprint & Web Architecture

## 1. Executive Summary & Design Philosophy

**SkyCrane Mobility** is an industrial heavy-lift drone logistics provider in the Philippines, utilizing platforms like the **DJI FlyCart 100** to transport critical cargo and structural components across hard-to-reach, elevation-restricted, and roadless environments.

### Modern Light Theme Aesthetics
To project high trust, technological precision, and environmental aviation authority, the website adopts a **Modern Light Theme** design system:
* **Background Canvas:** Custom animated video/GIF background (`assets/videos/drone-hero-bg.mp4` / `assets/images/drone-hero-bg.gif`) featuring the **DJI FlyCart 100 hovering smoothly on the right side** against bright daytime volumetric sky and clouds.
* **UI & Glassmorphism:** Clean off-whites (`#F8FAFC` to `#F1F5F9`) with frosted glassmorphic containers (`backdrop-blur-md bg-white/70 border border-white/60`).
* **Typography & Contrast:** Deep Slate Navy (`#0F172A`) for crisp, high-contrast legibility against light backgrounds.
* **Accent Colors:** Precision Sky Blue (`#0284C7`) for secondary badges and Safety Orange (`#F97316`) for primary action buttons and industrial safety branding.

---

## 2. Technical Stack & Multi-Stage Deployment Architecture

| Layer | Technology | Operational Purpose |
| --- | --- | --- |
| **Local Testing** | XAMPP (`htdocs/skycrane-mobility`) | Local Apache environment previewed via `http://localhost/skycrane-mobility`. |
| **IDE** | Antigravity IDE | AI-assisted code editor, syntax control, and file tree management. |
| **Hero Background** | Widescreen Video / GIF Loop | Custom clean video background featuring the DJI FlyCart 100 over daytime clouds. |
| **Frontend Stack** | HTML5 + Tailwind CSS + Vanilla JS | Ultra-fast rendering with zero server-side rendering latency. |
| **Interim Testing Domain** | **Netlify** (`skycrane-mobility.netlify.app`) | Free instant online testing domain via Netlify Drop, automatic SSL, image hosting, and native form collection. |
| **Production Edge** | Tencent EdgeOne Pages | Production global static CDN hosting with enterprise edge routing. |

---

## 3. Directory & File Structure (`C:/xampp/htdocs/skycrane-mobility/`)

```
skycrane-mobility/
├── index.html                  # Homepage (Video Hero, Left Text/Menu Overlay, Glass Cards)
├── about.html                  # Company Mission, Operational Safety & Compliance
├── solutions.html              # 4 Key Industrial Sectors (Interactive Light Grid)
├── fleet-dji-fc100.html        # DJI FlyCart 100 Technical Specs & Dual Payload Systems
├── contact.html                # Project Consultation & Quote Intake Form (Netlify Form)
├── css/
│   ├── styles.css              # Custom glassmorphism, animations, light theme variables
│   └── tailwind.min.css        # Tailwind CSS styling library
├── js/
│   ├── main.js                 # Mobile navbar toggle, smooth scroll, UI triggers
│   └── payload-calculator.js   # Interactive payload & altitude feasibility script
└── assets/
    ├── videos/
    │   └── drone-hero-bg.mp4   # Loop video of FlyCart 100 on right side over clouds
    ├── images/                 # WebP/PNG photography, equipment diagrams (< 200 KB)
    └── icons/                  # SVG specs icons (IP55, LiDAR, 85kg Capacity, Winch)
```

> **Asset & Image Hosting on Netlify:** Netlify supports all static video and image formats (`.mp4`, `.gif`, `.webp`, `.png`, `.jpg`, `.svg`) out of the box. All assets stored in `/assets/` will be served globally via Netlify's high-speed CDN.

---

## 4. Homepage Visual Architecture & Left Overlay Code (`index.html`)

The hero section uses a 2-column grid layout where the **left side contains the logo, text, buttons, and navigation bar**, while the **right side remains clear** so your hovering DJI FlyCart 100 background shows through.

### Complete Overlay Code Snippet:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkyCrane Mobility — Heavy-Lift UAV Logistics</title>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <style>
    .glass-panel {
      background: rgba(255, 255, 255, 0.70);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
  </style>
</head>
<body class="bg-slate-900 text-slate-800 overflow-x-hidden min-h-screen relative">

  <!-- LAYER 0: Custom Drone & Cloud Video/GIF Background -->
  <div class="fixed inset-0 z-0 overflow-hidden">
    <video autoplay loop muted playsinline class="w-full h-full object-cover">
      <source src="assets/videos/drone-hero-bg.mp4" type="video/mp4">
    </video>
  </div>

  <!-- LAYER 10: Left-Aligned UI Overlay Container -->
  <div class="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col justify-between p-6 lg:p-8">
    
    <!-- Top Navigation Header -->
    <header class="flex justify-between items-center glass-panel px-8 py-4 rounded-full shadow-lg">
      <div class="flex items-center gap-3 font-extrabold text-xl text-slate-900">
        <span class="text-2xl">🚁</span> SkyCrane Mobility
      </div>
      <nav class="hidden md:flex gap-8 font-semibold text-slate-700">
        <a href="index.html" class="text-sky-600">Home</a>
        <a href="solutions.html" class="hover:text-sky-600 transition">Solutions</a>
        <a href="fleet-dji-fc100.html" class="hover:text-sky-600 transition">Fleet Specs</a>
        <a href="contact.html" class="hover:text-sky-600 transition">Contact</a>
      </nav>
      <a href="contact.html" class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full shadow-md transition">
        Inquire Flight
      </a>
    </header>

    <!-- Center Hero Content Grid -->
    <main class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto py-12">
      <!-- LEFT COLUMN: Brand Title, Subtext & Action Buttons -->
      <div class="space-y-6">
        <span class="inline-block bg-sky-100/90 text-sky-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-sky-300">
          Heavy-Lift UAV Logistics • Philippines
        </span>
        <h1 class="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
          Heavy-Lift Aerial Logistics for Hard-to-Reach Environments
        </h1>
        <p class="text-lg text-slate-700 font-medium max-w-lg">
          Bypassing complex terrain, elevation constraints, and roadless sites across the Philippines with the DJI FlyCart 100.
        </p>
        <div class="flex flex-wrap gap-4 pt-2">
          <a href="contact.html" class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl transition">
            Request Flight Consultation
          </a>
          <a href="fleet-dji-fc100.html" class="glass-panel hover:bg-white/90 text-slate-900 font-bold px-8 py-3.5 rounded-2xl shadow-md transition">
            Explore Specs
          </a>
        </div>
      </div>

      <!-- RIGHT COLUMN: Open space allowing background DJI FlyCart 100 video to shine through -->
      <div class="hidden lg:block h-96"></div>
    </main>

    <!-- Bottom Floating Glassmorphic Metric Cards -->
    <footer class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
      <div class="glass-panel p-6 rounded-3xl shadow-lg space-y-1">
        <div class="text-3xl font-black text-slate-900">85 KG</div>
        <div class="text-sm font-bold text-slate-700">Max Dual-Battery Payload</div>
        <div class="text-xs text-slate-500">High-capacity cargo box & winch drop systems.</div>
      </div>

      <div class="glass-panel p-6 rounded-3xl shadow-lg space-y-1">
        <div class="text-3xl font-black text-slate-900">IP55 Rating</div>
        <div class="text-sm font-bold text-slate-700">All-Weather Protection</div>
        <div class="text-xs text-slate-500">Operates in heavy rain, dust, and $12\text{ m/s}$ wind.</div>
      </div>

      <div class="glass-panel p-6 rounded-3xl shadow-lg space-y-1">
        <div class="text-3xl font-black text-slate-900">6,000 M</div>
        <div class="text-sm font-bold text-slate-700">Operational Flight Ceiling</div>
        <div class="text-xs text-slate-500">Engineered for mountain power & infrastructure sites.</div>
      </div>
    </footer>

  </div>
</body>
</html>
```

---

## 5. Page Layouts & Functional Content Blueprint

### 5.1 `solutions.html` (4 Key Industrial Application Sectors)

| Industrial Sector | Primary Cargo Payloads | Terrain Barrier Overcome |
| --- | --- | --- |
| **Construction & Infrastructure** | Structural steel components, concrete mixes, rebar, high-elevation building gear. | Overcomes cliffs, ravines, and sites lacking conventional road infrastructure. |
| **Renewable Energy** | Solar panel arrays, high-voltage cabling reels, wind turbine service components. | Point-to-point delivery across unpaved, mountainous terrain ridges. |
| **Oil & Gas Support** | Specialized valve replacements, diagnostic equipment, urgent industrial spares. | Direct aerial transit into hazardous or remote facility perimeters. |
| **Emergency Relief** | Clean water filtration units, emergency medical kits, satellite comms gear. | Instant access when roads are severed by natural disasters or landslides. |

### 5.2 `fleet-dji-fc100.html` (Technical Equipment Showcase)
* **Dual Cargo System Toggle:**
  * *Dual-Battery Cargo Box Mode:* Up to $85\text{ kg}$ payload capacity for high-density transport.
  * *Flagship Winch Cable System:* $20\text{ m}$ retractable cable for precision hovering payload delivery where landing is impossible.
* **Environmental & All-Weather Resistance:**
  * Ingress Protection: IP55 certified against heavy rain and dust.
  * Operational Limits: $-20^\circ\text{C} \text{ to } 45^\circ\text{C}$ temperature range; up to $12\text{ m/s}$ wind resistance.
* **Active Aviation Safety Suite:**
  * Multi-directional vision system (Penta-Vision) + Front/Rear LiDAR + Millimeter-Wave Radar.
  * Automated emergency parachute system with independent power supply.

### 5.3 `contact.html` (Netlify Native Form Integration)
Add `data-netlify="true"` or `netlify` attribute to your HTML form tag to capture form submissions directly on Netlify:

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

Save this JavaScript code to power the live feasibility widget on `contact.html` or `index.html`:

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
      message: `Cargo weight (${cargoWeightKg} kg) exceeds single DJI FlyCart 100 capacity (85 kg). Multi-stage flight plan required.`
    };
  }

  if (flightAltitudeMeters > MAX_ALTITUDE_METERS) {
    return {
      status: "Altitude Limit Exceeded",
      badgeColor: "bg-red-100 text-red-800 border-red-300",
      message: `Flight site elevation (${flightAltitudeMeters} m) exceeds 6,000 m operational ceiling.`
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
2. Launch **XAMPP Control Panel** and start **Apache**.
3. Open your browser and preview the local site at: `http://localhost/skycrane-mobility/index.html`

### Stage 2: Free Online Testing on Netlify (`skycrane-mobility.netlify.app`)
1. Open **[Netlify Drop](https://app.netlify.com/drop)** in your web browser.
2. Drag and drop your entire `skycrane-mobility` folder into the upload zone.
3. **Customize Subdomain:** Go to **Site Configuration** > **Change Site Name** and set it to `skycrane-mobility`. Your online test URL becomes:
   `https://skycrane-mobility.netlify.app`
4. Verify form submissions directly inside Netlify’s dashboard under **Forms**.

### Stage 3: Production Edge Deployment (Tencent EdgeOne)
1. Verify relative internal links (e.g., `href="solutions.html"` and `src="js/main.js"`).
2. Log into **Tencent EdgeOne Console**.
3. Go to **EdgeOne Pages / Static Site Hosting** and click **Create Project**.
4. Upload your finalized project folder or link your **GitHub** repository.
5. Set root build output directory to `./`.
6. Click **Deploy** to issue your production SSL certificate and enable global CDN edge caching.

---

## 8. Launch Quality Checklist

* [ ] Video/GIF background (`drone-hero-bg.mp4`) loops cleanly with FlyCart 100 on the right.
* [ ] Left-side text, menu header, and buttons render sharply with high-contrast text (`#0F172A`).
* [ ] All media files in `/assets/` load fast on Netlify CDN.
* [ ] Test domain `https://skycrane-mobility.netlify.app` is live and fully responsive on mobile screens.
* [ ] Netlify Forms capture client quote requests seamlessly on `contact.html`.
* [ ] Relative internal links work properly across local XAMPP, Netlify, and live EdgeOne domain.