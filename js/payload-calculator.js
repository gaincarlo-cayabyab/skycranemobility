/**
 * SkyCrane Mobility — js/payload-calculator.js
 * Dual Mission Engineering & Economic Calculator Engine:
 * 1. Flight Feasibility Analyzer (Payload Weight & Altitude Limits)
 * 2. Total Installed Project Cost (TIPC) Economic Model (EPC Solar & Remote Cargo)
 *
 * Roadmap Specification Compliance:
 * Section 3 & 4.3 — Total Installed Project Cost (TIPC) Savings Engine
 * Company: SkyCrane Mobility Corporation (OPC)
 * Lead Architect: Gain Carlo Cayabyab
 */

(function (global) {
  "use strict";

  /* ── 1. Flight Feasibility Constants ─────────────────────── */
  var LIMITS = {
    MAX_DUAL_BATTERY_PAYLOAD_KG : 85,
    MAX_ALTITUDE_METERS          : 6000,
    WARNING_PAYLOAD_THRESHOLD_KG : 70,   // advisory threshold (82% of max)
    WARNING_ALTITUDE_THRESHOLD_M : 4500  // advisory altitude zone
  };

  /* ── 2. Core Flight Feasibility Evaluation ────────────────── */
  function evaluateFlightFeasibility(cargoWeightKg, flightAltitudeMeters) {
    if (typeof cargoWeightKg !== "number" || isNaN(cargoWeightKg)) {
      cargoWeightKg = parseFloat(cargoWeightKg);
    }
    if (typeof flightAltitudeMeters !== "number" || isNaN(flightAltitudeMeters)) {
      flightAltitudeMeters = parseFloat(flightAltitudeMeters) || 0;
    }

    if (isNaN(cargoWeightKg) || cargoWeightKg <= 0) {
      return {
        status    : "Invalid Input",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        message   : "Please enter a valid positive cargo weight in kilograms.",
        severity  : "invalid"
      };
    }

    if (flightAltitudeMeters < 0) {
      return {
        status    : "Invalid Input",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        message   : "Site elevation cannot be negative. Enter a valid altitude in meters above sea level.",
        severity  : "invalid"
      };
    }

    if (cargoWeightKg > LIMITS.MAX_DUAL_BATTERY_PAYLOAD_KG) {
      return {
        status    : "Over Single-Drone Limit",
        badgeColor: "bg-red-100 text-red-800 border-red-300",
        message   : "Cargo weight (" + cargoWeightKg.toFixed(1) + " kg) exceeds the single DJI FlyCart 100 " +
                    "dual-battery capacity of " + LIMITS.MAX_DUAL_BATTERY_PAYLOAD_KG + " kg. " +
                    "A multi-stage flight plan or tandem-drone operation is required. Contact us to design a custom solution.",
        severity  : "error"
      };
    }

    if (flightAltitudeMeters > LIMITS.MAX_ALTITUDE_METERS) {
      return {
        status    : "Altitude Ceiling Exceeded",
        badgeColor: "bg-red-100 text-red-800 border-red-300",
        message   : "Site elevation (" + flightAltitudeMeters.toFixed(0) + " m ASL) exceeds the DJI FlyCart 100 " +
                    "operational ceiling of " + LIMITS.MAX_ALTITUDE_METERS.toLocaleString() + " m. " +
                    "This mission is outside standard flight parameters. Please contact us for specialist assessment.",
        severity  : "error"
      };
    }

    if (cargoWeightKg > LIMITS.WARNING_PAYLOAD_THRESHOLD_KG &&
        flightAltitudeMeters > LIMITS.WARNING_ALTITUDE_THRESHOLD_M) {
      return {
        status    : "Advisory — High Load at Altitude",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        message   : "Cargo weight (" + cargoWeightKg.toFixed(1) + " kg) and site elevation (" +
                    flightAltitudeMeters.toFixed(0) + " m) are both approaching operational limits. " +
                    "This configuration is technically within specifications but requires detailed mission planning.",
        severity  : "warning"
      };
    }

    if (cargoWeightKg > LIMITS.WARNING_PAYLOAD_THRESHOLD_KG) {
      return {
        status    : "Advisory — Heavy Payload",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        message   : "Cargo weight (" + cargoWeightKg.toFixed(1) + " kg) is within the operational envelope but " +
                    "above " + LIMITS.WARNING_PAYLOAD_THRESHOLD_KG + " kg. Flight range and battery life will be reduced.",
        severity  : "warning"
      };
    }

    if (flightAltitudeMeters > LIMITS.WARNING_ALTITUDE_THRESHOLD_M) {
      return {
        status    : "Advisory — High Elevation",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        message   : "Site elevation (" + flightAltitudeMeters.toFixed(0) + " m ASL) is within limits but above " +
                    LIMITS.WARNING_ALTITUDE_THRESHOLD_M.toLocaleString() + " m. " +
                    "Air density reduction may affect lift performance.",
        severity  : "warning"
      };
    }

    return {
      status    : "Flight Profile Approved ✓",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      message   : "Payload weight (" + cargoWeightKg.toFixed(1) + " kg) and operational altitude (" +
                  flightAltitudeMeters.toFixed(0) + " m ASL) are within approved DJI FlyCart 100 dual-battery " +
                  "flight parameters. Proceed to schedule your consultation.",
      severity  : "success"
    };
  }

  /* ── 3. TIPC (Total Installed Project Cost) Economic Engine ── */
  /**
   * Calculates Total Installed Project Cost comparison between conventional
   * ground transport and SkyCrane aerial logistics based on the economic
   * roadmap model (Section 3).
   *
   * Baseline (132 kWp Solar / 240 modules / 500m elevation / ₱300k road):
   * Conventional TIPC: ₱150k Direct + ₱200k Prelims (10d) + ₱300k Roads = ₱650,000
   * SkyCrane TIPC:     ₱419k Direct + ₱100k Prelims (5d)  + ₱0 Roads    = ₱519,000
   * Net Savings:       ₱131,000 (20.2% Net TIPC Reduction), 5 days saved (50% compression)
   */
  var terrainMultipliers = {
      // 🇵🇭 Comprehensive Philippine Topographical Profiles & Logistics Realities
      "cordillera-highland": {
        name: "Cordillera Mountain Ridge (Benguet / Mt. Province 1,200m–2,500m ASL)",
        convDays: 1.50,
        convDirect: 1.25,
        skyDays: 0.95,
        skyDirect: 1.10,
        defaultRoad: 450000,
        challenge: "🏔️ Benguet & Mt. Province (1,200m–2,500m ASL): 30–50% rock grade • Bypasses landslide-prone Halsema corridor • ₱450k road infill eliminated"
      },
      "sierra-madre-jungle": {
        name: "Sierra Madre Dense Rainforest & River Basin (Zero Road Access / DENR NIPAS)",
        convDays: 1.70,
        convDirect: 1.35,
        skyDays: 1.05,
        skyDirect: 1.15,
        defaultRoad: 600000,
        challenge: "🌴 Sierra Madre Basin: Zero road access • Protected DENR NIPAS canopy transit • ₱600k bulldozer road cutting eliminated"
      },
      "visayas-island": {
        name: "Visayas & Palawan Off-Grid Island / Karst Ravine (Inter-Island Channel)",
        convDays: 1.40,
        convDirect: 1.20,
        skyDays: 0.90,
        skyDirect: 1.05,
        defaultRoad: 350000,
        challenge: "🏝️ Palawan & Visayas Karst Island: Inter-island coral reef barrier • Eliminates shallow barge stranding & banca re-handling"
      },
      "mindanao-volcanic": {
        name: "Mindanao Highland Plateau & Mt. Apo BTS Slope (Bukidnon / Davao 800m–2,000m ASL)",
        convDays: 1.30,
        convDirect: 1.15,
        skyDays: 0.85,
        skyDirect: 1.00,
        defaultRoad: 400000,
        challenge: "🌋 Bukidnon & Mt. Apo BTS Slopes (800m–2,000m ASL): Remote telecom tower pad delivery • Bypasses impassable volcanic mud trails"
      },
      "central-luzon-foothills": {
        name: "Central & Northern Luzon Rolling Foothills (Pangasinan / Tarlac / Zambales)",
        convDays: 0.80,
        convDirect: 0.90,
        skyDays: 0.70,
        skyDirect: 0.92,
        defaultRoad: 200000,
        challenge: "🌾 Pangasinan & Tarlac Foothills: Unpaved farm-to-market dirt tracks • Zero soil compaction on agricultural solar tables"
      },
      "urban-rooftop": {
        name: "Metro Manila & CALABARZON Elevated Industrial Rooftop (Commercial Facility)",
        convDays: 0.70,
        convDirect: 0.95,
        skyDays: 0.50,
        skyDirect: 0.85,
        defaultRoad: 150000,
        challenge: "🏢 Metro Manila & CALABARZON Industrial Rooftops: 15m–35m vertical lift • Eliminates heavy mobile crane street closures & permits"
      },

      // Backwards Compatibility Aliases
      "moderate": {
        name: "Central & Northern Luzon Rolling Foothills",
        convDays: 0.80,
        convDirect: 0.90,
        skyDays: 0.70,
        skyDirect: 0.92,
        defaultRoad: 200000,
        challenge: "🌾 Pangasinan & Tarlac Foothills: Unpaved farm-to-market dirt tracks"
      },
      "steep": {
        name: "Cordillera Mountain Ridge (Benguet / Mt. Province)",
        convDays: 1.20,
        convDirect: 1.10,
        skyDays: 0.95,
        skyDirect: 1.00,
        defaultRoad: 450000,
        challenge: "🏔️ Benguet & Mt. Province (1,200m–2,500m ASL): 30–50% rock grade"
      },
      "extreme": {
        name: "Sierra Madre Dense Rainforest & River Basin",
        convDays: 1.65,
        convDirect: 1.30,
        skyDays: 1.15,
        skyDirect: 1.15,
        defaultRoad: 600000,
        challenge: "🌴 Sierra Madre Basin: Zero road access • Protected DENR NIPAS canopy transit"
      }
    };

  function calculateTIPC(params) {
    var p = params || {};
    var panels       = Math.max(10, parseInt(p.panelsCount, 10) || 240);
    var panelWeight  = Math.max(15, parseFloat(p.panelWeightKg) || 30);
    var terrain      = p.terrainType || "steep"; // "moderate", "steep", "extreme"
    var roadCost     = (p.roadCost !== undefined && p.roadCost !== null) ? Math.max(0, parseFloat(p.roadCost)) : 300000;
    var prelimDaily  = (p.prelimDaily !== undefined && p.prelimDaily !== null) ? Math.max(0, parseFloat(p.prelimDaily)) : 20000;

    // Terrain Multipliers
    
    var mult = terrainMultipliers[terrain] || terrainMultipliers.steep;

    // Scale Factor based on baseline 240 panels
    var scale = panels / 240;

    // Aerial Lifts Calculation (dual-panel carriage: 2 panels x 30kg + rigging = 70kg)
    var totalCargoKg = panels * panelWeight;
    var maxLiftKg    = 70; // safe dual-battery payload with rigging fixture
    var totalFlights = Math.ceil(totalCargoKg / maxLiftKg);

    // 1. Conventional Ground Transport
    var convDays    = Math.max(3, Math.round(10 * scale * mult.convDays));
    var convPrelims = convDays * prelimDaily;
    var convDirect  = Math.round(150000 * scale * mult.convDirect);
    var convRoads   = Math.round(roadCost);
    var convTIPC    = convDirect + convPrelims + convRoads;

    // 2. SkyCrane Aerial Logistics (50% Schedule Compression, Zero Road Construction)
    var skyDays     = Math.max(2, Math.round(5 * scale * mult.skyDays));
    var skyPrelims  = skyDays * prelimDaily;
    var skyDirect   = Math.round(419000 * scale * mult.skyDirect);
    var skyRoads    = 0; // ZERO ROAD BUILDING
    var skyTIPC     = skyDirect + skyPrelims + skyRoads;

    // 3. Financial Net Variances
    var directPremium   = skyDirect - convDirect;
    var prelimSavings   = convPrelims - skyPrelims;
    var roadSavings     = convRoads - skyRoads;
    var netSavings      = convTIPC - skyTIPC;
    var netSavingsPct   = convTIPC > 0 ? (netSavings / convTIPC) * 100 : 0;
    var daysSaved       = Math.max(0, convDays - skyDays);
    var compressionPct  = convDays > 0 ? Math.round((daysSaved / convDays) * 100) : 50;

    return {
      inputs: {
        panels       : panels,
        panelWeight  : panelWeight,
        terrain      : terrain,
        roadCost     : roadCost,
        prelimDaily  : prelimDaily,
        totalCargoKg : totalCargoKg,
        totalFlights : totalFlights
      },
      conventional: {
        days       : convDays,
        direct     : convDirect,
        prelims    : convPrelims,
        roads      : convRoads,
        totalTIPC  : convTIPC
      },
      skycrane: {
        days       : skyDays,
        direct     : skyDirect,
        prelims    : skyPrelims,
        roads      : skyRoads,
        totalTIPC  : skyTIPC,
        totalFlights: totalFlights
      },
      impact: {
        directPremium : directPremium,
        prelimSavings : prelimSavings,
        roadSavings   : roadSavings,
        netSavings    : netSavings,
        netSavingsPct : netSavingsPct,
        daysSaved     : daysSaved,
        compressionPct: compressionPct,
        isSavings     : netSavings > 0
      }
    };
  }

  /* ── 4. UI Wiring Helpers ─────────────────────────────────── */
  function formatPHP(amount) {
    return '₱' + Math.abs(Math.round(amount)).toLocaleString();
  }

  function initTIPCCalculatorUI() {
    var root = document.getElementById("tipc-calculator-container");
    if (!root) return;

    var inputPanels   = document.getElementById("tipc-input-panels");
    var sliderPanels  = document.getElementById("tipc-slider-panels");
    var selectTerrain = document.getElementById("tipc-select-terrain");
    var inputRoads    = document.getElementById("tipc-input-roads");
    var sliderRoads   = document.getElementById("tipc-slider-roads");

    if (!inputPanels || !sliderPanels) return;

    function refreshTIPC() {
      var panels   = parseInt(inputPanels.value, 10) || 240;
      var terrain  = selectTerrain ? selectTerrain.value : "steep";
      var roadCost = inputRoads ? (parseFloat(inputRoads.value) || 0) : 300000;

      var result = calculateTIPC({
        panelsCount: panels,
        terrainType: terrain,
        roadCost   : roadCost
      });

      // Update Net Savings Banner
      var netSavingsEl = document.getElementById("tipc-val-net-savings");
      var savingsPctEl = document.getElementById("tipc-val-savings-pct");
      var daysSavedEl  = document.getElementById("tipc-val-days-saved");
      var flightsEl    = document.getElementById("tipc-val-flights");
      var terrainDescEl = document.getElementById("tipc-terrain-description");
      if (terrainDescEl && mult && mult.challenge) {
        terrainDescEl.textContent = mult.challenge;
      }

      if (netSavingsEl) {
        netSavingsEl.textContent = (result.impact.isSavings ? "Save " : "+") + formatPHP(result.impact.netSavings);
      }
      if (savingsPctEl) {
        savingsPctEl.textContent = result.impact.isSavings
          ? result.impact.netSavingsPct.toFixed(1) + "% Net TIPC Cost Reduction"
          : "Direct Freight Configuration";
      }
      if (daysSavedEl) {
        daysSavedEl.textContent = result.impact.daysSaved + " Days Saved (" + result.impact.compressionPct + "% Faster)";
      }
      if (flightsEl) {
        flightsEl.textContent = result.skycrane.totalFlights + " Aerial Lifts (" + (result.inputs.totalCargoKg / 1000).toFixed(1) + " Tons)";
      }

      // Update Breakdown Table / Cards
      var convDirectEl  = document.getElementById("tipc-conv-direct");
      var convPrelimEl  = document.getElementById("tipc-conv-prelims");
      var convRoadsEl   = document.getElementById("tipc-conv-roads");
      var convTotalEl   = document.getElementById("tipc-conv-total");

      var skyDirectEl   = document.getElementById("tipc-sky-direct");
      var skyPrelimEl   = document.getElementById("tipc-sky-prelims");
      var skyRoadsEl    = document.getElementById("tipc-sky-roads");
      var skyTotalEl    = document.getElementById("tipc-sky-total");

      if (convDirectEl) convDirectEl.textContent = formatPHP(result.conventional.direct);
      if (convPrelimEl) convPrelimEl.textContent = formatPHP(result.conventional.prelims) + " (" + result.conventional.days + "d)";
      if (convRoadsEl)  convRoadsEl.textContent  = formatPHP(result.conventional.roads);
      if (convTotalEl)  convTotalEl.textContent  = formatPHP(result.conventional.totalTIPC);

      if (skyDirectEl) skyDirectEl.textContent = formatPHP(result.skycrane.direct);
      if (skyPrelimEl) skyPrelimEl.textContent = formatPHP(result.skycrane.prelims) + " (" + result.skycrane.days + "d)";
      if (skyRoadsEl)  skyRoadsEl.textContent  = "₱0 (Eliminated)";
      if (skyTotalEl)  skyTotalEl.textContent  = formatPHP(result.skycrane.totalTIPC);

      // Comparison Visual Bars
      var maxTIPC = Math.max(result.conventional.totalTIPC, result.skycrane.totalTIPC, 1);
      var convBar = document.getElementById("tipc-bar-conv");
      var skyBar  = document.getElementById("tipc-bar-sky");
      if (convBar) convBar.style.width = Math.min(100, (result.conventional.totalTIPC / maxTIPC) * 100) + "%";
      if (skyBar)  skyBar.style.width  = Math.min(100, (result.skycrane.totalTIPC / maxTIPC) * 100) + "%";

      // CTA Link with prefilled params
      var ctaBtn = document.getElementById("btn-tipc-consult-cta");
      if (ctaBtn) {
        var query = "?panels=" + panels + "&terrain=" + encodeURIComponent(terrain) + "&savings=" + Math.round(result.impact.netSavings);
        ctaBtn.setAttribute("href", "contact.html" + query);
      }
    }

    // Sync input <-> slider for panels
    sliderPanels.addEventListener("input", function () {
      inputPanels.value = this.value;
      refreshTIPC();
    });
    inputPanels.addEventListener("input", function () {
      sliderPanels.value = this.value;
      refreshTIPC();
    });

    // Sync input <-> slider for roads
    if (sliderRoads && inputRoads) {
      sliderRoads.addEventListener("input", function () {
        inputRoads.value = this.value;
        refreshTIPC();
      });
      inputRoads.addEventListener("input", function () {
        sliderRoads.value = this.value;
        refreshTIPC();
      });
    }

    if (selectTerrain) {
      selectTerrain.addEventListener("change", function () {
        var terrain = selectTerrain.value;
        var mult = terrainMultipliers[terrain] || terrainMultipliers["cordillera-highland"] || terrainMultipliers.steep;
        if (mult && mult.defaultRoad !== undefined && inputRoads && sliderRoads) {
          inputRoads.value = mult.defaultRoad;
          sliderRoads.value = mult.defaultRoad;
        }
        refreshTIPC();
      });
    }

    // Run initial calculation
    refreshTIPC();
  }

  /* ── 5. Flight Feasibility UI Helper ──────────────────────── */
  function initFlightFeasibilityUI() {
    var btn = document.getElementById("calc-evaluate-btn");
    var weightInput   = document.getElementById("input-payload-weight");
    var weightSlider  = document.getElementById("slider-payload");
    var altInput      = document.getElementById("input-altitude");
    var altSlider     = document.getElementById("slider-altitude");

    // Sync weight input & slider
    if (weightInput && weightSlider) {
      weightSlider.addEventListener("input", function () { weightInput.value = this.value; });
      weightInput.addEventListener("input", function () { weightSlider.value = this.value; });
    }
    // Sync altitude input & slider
    if (altInput && altSlider) {
      altSlider.addEventListener("input", function () { altInput.value = this.value; });
      altInput.addEventListener("input", function () { altSlider.value = this.value; });
    }

    if (!btn) return;

    btn.addEventListener("click", function () {
      var weight   = parseFloat((document.getElementById("input-payload-weight") || {}).value) || 0;
      var altitude = parseFloat((document.getElementById("input-altitude") || {}).value) || 0;
      var result   = evaluateFlightFeasibility(weight, altitude);

      var panel    = document.getElementById("calc-result-panel");
      var badge    = document.getElementById("calc-status-badge");
      var msgEl    = document.getElementById("calc-message");
      var pBar     = document.getElementById("calc-payload-bar");
      var pPct     = document.getElementById("calc-payload-pct");
      var aBar     = document.getElementById("calc-alt-bar");
      var aPct     = document.getElementById("calc-alt-pct");

      if (panel) panel.classList.remove("hidden");
      if (badge) {
        badge.className = "result-badge " + result.badgeColor;
        badge.textContent = result.status;
      }
      if (msgEl) msgEl.textContent = result.message;

      var pUsage = Math.min(100, Math.round((weight / LIMITS.MAX_DUAL_BATTERY_PAYLOAD_KG) * 100));
      var aUsage = Math.min(100, Math.round((altitude / LIMITS.MAX_ALTITUDE_METERS) * 100));

      if (pBar) pBar.style.width = pUsage + "%";
      if (pPct) pPct.textContent = pUsage + "%";
      if (aBar) aBar.style.width = aUsage + "%";
      if (aPct) aPct.textContent = aUsage + "%";
    });
  }

  /* ── 6. Exports & Auto-Init ───────────────────────────────── */
  global.evaluateFlightFeasibility = evaluateFlightFeasibility;
  global.calculateTIPC             = calculateTIPC;
  global.formatPHP                 = formatPHP;

  global.SkyCraneCalc = {
    terrainMultipliers: terrainMultipliers,
    evaluate     : evaluateFlightFeasibility,
    calculateTIPC: calculateTIPC,
    formatPHP    : formatPHP,
    LIMITS       : LIMITS
  };

  document.addEventListener("DOMContentLoaded", function () {
    initFlightFeasibilityUI();
    initTIPCCalculatorUI();
  });

})(window);


window.switchCalcTab = function(tab) {
    var tipcPanel      = document.getElementById('panel-tipc-savings');
    var profilePanel   = document.getElementById('panel-flight-profile');
    var btnTipc        = document.getElementById('tab-btn-tipc');
    var btnFeasibility = document.getElementById('tab-btn-feasibility');
    if (!tipcPanel || !profilePanel) return;

    if (tab === 'tipc') {
      profilePanel.classList.add('hidden');
      profilePanel.style.display = 'none';
      tipcPanel.classList.remove('hidden');
      tipcPanel.classList.add('visible');
      tipcPanel.style.display = 'block';
      tipcPanel.style.opacity = '1';
      tipcPanel.style.transform = 'none';

      if (btnTipc) {
        btnTipc.classList.add('active', 'tab-orange');
        btnTipc.setAttribute('aria-selected', 'true');
      }
      if (btnFeasibility) {
        btnFeasibility.classList.remove('active', 'tab-orange');
        btnFeasibility.setAttribute('aria-selected', 'false');
      }
    } else {
      tipcPanel.classList.add('hidden');
      tipcPanel.style.display = 'none';
      profilePanel.classList.remove('hidden');
      profilePanel.classList.add('visible');
      profilePanel.style.display = 'block';
      profilePanel.style.opacity = '1';
      profilePanel.style.transform = 'none';

      if (btnFeasibility) {
        btnFeasibility.classList.add('active');
        btnFeasibility.classList.remove('tab-orange');
        btnFeasibility.setAttribute('aria-selected', 'true');
      }
      if (btnTipc) {
        btnTipc.classList.remove('active', 'tab-orange');
        btnTipc.setAttribute('aria-selected', 'false');
      }
    }
  };
