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
    // ══════════════════════════════════════════════════════════════════════════
    // 🇵🇭 1. HIGHLAND MOUNTAIN RIDGES (LUZON, VISAYAS, MINDANAO)
    // ══════════════════════════════════════════════════════════════════════════
    "luzon-highland-cordillera": {
      name: "Cordillera Central Mountain Ridge (Benguet / Mt. Province / Baguio 1,200m–2,926m ASL)",
      label: "🏔️ Cordillera Highland Ridge — Luzon (Benguet / Mt. Province / Ifugao)",
      convDays: 1.55, convDirect: 1.28, skyDays: 0.95, skyDirect: 1.12,
      defaultRoad: 480000,
      challenge: "🏔️ Luzon: Cordillera Central (1,200m–2,926m ASL) • Benguet, Mt. Province, Ifugao, Kalinga • 35–55% grade • Landslide-prone Halsema corridor • ₱480k road infill eliminated"
    },
    "luzon-highland-zambales-pinatubo": {
      name: "Zambales Mountain Range / Mt. Pinatubo Lahar Corridor (Clark–Pampanga–Zambales)",
      label: "🌋 Zambales–Pinatubo Lahar & Volcanic Corridor — Luzon (Clark / Zambales)",
      convDays: 1.35, convDirect: 1.20, skyDays: 0.85, skyDirect: 1.05,
      defaultRoad: 380000,
      challenge: "🌋 Luzon: Zambales & Pinatubo Lahar Zone • Active seasonal lahar channels sever roads • Mt. Tapulao slope (2,037m ASL) • ₱380k lahar road construction eliminated"
    },
    "luzon-highland-bicol-volcano": {
      name: "Bicol Volcanic Arc — Mayon Danger Zones, Mt. Isarog & Mt. Bulusan (Albay / Sorsogon)",
      label: "🌋 Bicol Volcanic Belt — Luzon (Mayon / Mt. Isarog / Mt. Bulusan)",
      convDays: 1.40, convDirect: 1.22, skyDays: 0.90, skyDirect: 1.08,
      defaultRoad: 420000,
      challenge: "🌋 Luzon–Bicol: Mayon Permanent Danger Zone (6km radius) • Volcanic debris & steep pyroclastic slopes sever access routes • ₱420k road works bypassed"
    },
    "visayas-highland-panay-negros": {
      name: "Panay Central Mountain Range / Negros Volcanic Belt (Mt. Madja-as / Mt. Kanlaon 2,465m)",
      label: "🏔️ Panay & Negros Highland Ridge — Visayas (Antique / Capiz / Negros)",
      convDays: 1.45, convDirect: 1.22, skyDays: 0.92, skyDirect: 1.08,
      defaultRoad: 440000,
      challenge: "🏔️ Visayas: Mt. Madja-as (Antique) & Mt. Kanlaon (Negros) • Covers Antique, Capiz, Iloilo uplands & Negros Occidental ridges • Trail-only access • ₱440k road infill bypassed"
    },
    "visayas-highland-leyte-samar": {
      name: "Eastern Samar & Leyte Central Ridgeline — Elevated Interior Terrain (400m–1,100m ASL)",
      label: "🏔️ Leyte & Samar Highland Interior — Eastern Visayas (400m–1,100m ASL)",
      convDays: 1.35, convDirect: 1.18, skyDays: 0.88, skyDirect: 1.05,
      defaultRoad: 350000,
      challenge: "🏔️ Eastern Visayas: Leyte central ridge & Samar forested highlands • Post-typhoon road washouts, unstable clay embankments • ₱350k road reinforcement eliminated"
    },
    "mindanao-highland-bukidnon-kitanglad": {
      name: "Kitanglad–Kalatungan Mountain Range (Bukidnon / Lanao del Sur 1,400m–2,938m ASL)",
      label: "🏔️ Bukidnon–Kitanglad Highland Plateau — Mindanao (1,400m–2,938m ASL)",
      convDays: 1.45, convDirect: 1.22, skyDays: 0.90, skyDirect: 1.05,
      defaultRoad: 430000,
      challenge: "🏔️ Mindanao: Mt. Dulang-dulang & Mt. Kitanglad Protected Landscape (2,938m ASL) • DENR Protected Area, zero heavy machinery access • ₱430k mountain track bypassed"
    },
    "mindanao-highland-davao-apo": {
      name: "Mount Apo Massif — Davao del Sur / North Cotabato BTS Tower & Solar Slopes (2,954m ASL)",
      label: "🌋 Mt. Apo Massif — Mindanao (Davao del Sur / Cotabato — 2,954m PH Highest)",
      convDays: 1.55, convDirect: 1.30, skyDays: 0.95, skyDirect: 1.12,
      defaultRoad: 500000,
      challenge: "🌋 Mindanao: Mt. Apo (2,954m — PH Highest Peak) • Davao del Sur & Cotabato telecom BTS summits • Solfataric volcanic terrain & NIPAS protected slopes • ₱500k road bypass"
    },
    "mindanao-highland-hamiguitan-lanao": {
      name: "Mt. Hamiguitan UNESCO Range / Lanao del Norte–Sur Elevated Terrain (1,100m–1,620m ASL)",
      label: "🏔️ Lanao–Mt. Hamiguitan Highland — Mindanao (Davao Oriental / Lanao)",
      convDays: 1.30, convDirect: 1.15, skyDays: 0.85, skyDirect: 1.02,
      defaultRoad: 370000,
      challenge: "🏔️ Mindanao: Mt. Hamiguitan UNESCO World Heritage Range (Davao Oriental) & Lanao ridge • Protected pygmy forest canopy prohibits bulldozing • ₱370k road cost bypassed"
    },

    // ══════════════════════════════════════════════════════════════════════════
    // 🌴 2. DENSE JUNGLE & PROTECTED FOREST CORRIDORS
    // ══════════════════════════════════════════════════════════════════════════
    "luzon-jungle-sierra-madre": {
      name: "Sierra Madre Mountain Range — Dense Rainforest Corridor (Cagayan / Aurora / Quezon)",
      label: "🌴 Sierra Madre Rainforest — Luzon (Cagayan / Aurora / Quezon — Zero Road / DENR)",
      convDays: 1.75, convDirect: 1.38, skyDays: 1.08, skyDirect: 1.18,
      defaultRoad: 620000,
      challenge: "🌴 Luzon: Sierra Madre (longest range in PH) • Cagayan to Quezon • 100% DENR NIPAS • Zero bulldozer clearance allowed • Typhoon river flash-floods • ₱620k road cutting bypassed"
    },
    "mindanao-jungle-pantaron-agusan": {
      name: "Pantaron Mountain Range / Agusan Marsh Wildlife Sanctuary — Central Mindanao Forest",
      label: "🌴 Pantaron–Agusan Marsh Jungle — Mindanao (Undisturbed Canopy / Swamp Basin)",
      convDays: 1.80, convDirect: 1.40, skyDays: 1.10, skyDirect: 1.20,
      defaultRoad: 650000,
      challenge: "🌴 Mindanao: Pantaron Range + Agusan Marsh (PH deepest swamp forest) • Floating peat bogs block trucks • 100% aerial vertical winch delivery • ₱650k civil works eliminated"
    },
    "mindanao-jungle-liguasan-cotabato": {
      name: "Liguasan Marsh / Cotabato River Basin — Maguindanao / Sultan Kudarat Flood Wetland",
      label: "🌾 Liguasan Marsh Flood Basin — Mindanao (Maguindanao / Cotabato — Seasonal Wetland)",
      convDays: 1.55, convDirect: 1.28, skyDays: 1.00, skyDirect: 1.10,
      defaultRoad: 520000,
      challenge: "🌾 Mindanao: Liguasan Marsh (2nd largest freshwater wetland in PH) • 4–6 months seasonal flooding blocks ground freight • Floating solar array logistics • ₱520k road bypass"
    },

    // ══════════════════════════════════════════════════════════════════════════
    // 🌾 3. AGRICULTURAL FLATLANDS & FARMLAND PLAINS
    // ══════════════════════════════════════════════════════════════════════════
    "luzon-agri-central-luzon": {
      name: "Central Luzon Agricultural Plain — Pampanga / Nueva Ecija / Tarlac / Bulacan",
      label: "🌾 Central Luzon Grain Belt Flatlands (Pampanga / Nueva Ecija / Tarlac / Bulacan)",
      convDays: 0.75, convDirect: 0.88, skyDays: 0.65, skyDirect: 0.90,
      defaultRoad: 180000,
      challenge: "🌾 Luzon: Central Luzon Grain Belt • Unpaved farm-to-market clay tracks • Zero soil compaction on irrigation embankments & rice table arrays • ₱180k track infill saved"
    },
    "luzon-agri-cagayan-valley": {
      name: "Cagayan Valley River Basin Lowland Plains — Cagayan / Isabela / Quirino / Nueva Vizcaya",
      label: "🌾 Cagayan Valley River Basin Plains (Cagayan / Isabela / Quirino / Nueva Vizcaya)",
      convDays: 0.78, convDirect: 0.87, skyDays: 0.68, skyDirect: 0.90,
      defaultRoad: 175000,
      challenge: "🌾 Luzon: Cagayan Valley (widest river basin in PH) • Isabela & Cagayan agri-solar corridor • Seasonal Cagayan River overflow submerges farm roads • ₱175k road grading saved"
    },
    "luzon-agri-ilocos-coast": {
      name: "Ilocos Coastal Plain & Pangasinan Lowlands — Region I Agri & Wind/Solar Belt",
      label: "🌾 Ilocos Coastal Plain & Pangasinan Lowlands — Northern Luzon (Region I)",
      convDays: 0.72, convDirect: 0.88, skyDays: 0.62, skyDirect: 0.90,
      defaultRoad: 190000,
      challenge: "🌾 Luzon: Ilocos Region & Pangasinan coastal plains • Narrow farm bridges unable to support heavy mobile crane trucks • Direct field staging • ₱190k road reinforcement saved"
    },
    "visayas-agri-iloilo-capiz": {
      name: "Iloilo & Capiz Lowland Agricultural Plains — Panay Island Agri-Solar Belt",
      label: "🌾 Iloilo & Capiz Agricultural Plains — Visayas (Panay Island Agri-Solar Belt)",
      convDays: 0.75, convDirect: 0.87, skyDays: 0.65, skyDirect: 0.90,
      defaultRoad: 170000,
      challenge: "🌾 Visayas–Panay: Iloilo & Capiz rice/sugarcane plains • Soft alluvial soil collapses under heavy wheeled trucks • Zero crop damage during harvest season • ₱170k saved"
    },
    "mindanao-agri-davao-cotabato": {
      name: "Davao del Norte & South Cotabato Agricultural Lowlands — Fruit Plantation Corridor",
      label: "🌾 Davao–Cotabato Agricultural Basin — Mindanao (Banana / Pineapple / Corn Flatlands)",
      convDays: 0.78, convDirect: 0.88, skyDays: 0.68, skyDirect: 0.90,
      defaultRoad: 185000,
      challenge: "🌾 Mindanao: Davao del Norte–South Cotabato agri-basin • Plantation access lane congestion • Pre-harvest solar array installation with zero road blockages • ₱185k saved"
    },

    // ══════════════════════════════════════════════════════════════════════════
    // 🏝️ 4. OFF-GRID ISLANDS & INTER-ISLAND CHANNELS
    // ══════════════════════════════════════════════════════════════════════════
    "palawan-mimaropa-island": {
      name: "Palawan & MIMAROPA Off-Grid Island — El Nido / Coron / Romblon / Mindoro Coral Coast",
      label: "🏝️ Palawan / MIMAROPA Off-Grid Island (El Nido / Coron / Romblon / Mindoro Coast)",
      convDays: 1.45, convDirect: 1.22, skyDays: 0.90, skyDirect: 1.05,
      defaultRoad: 360000,
      challenge: "🏝️ Palawan–MIMAROPA: Coral reef barriers prevent LCT barge landing • Karst lagoons <1m depth • Bypasses shallow barge grounding & banca re-handling • ₱360k saved"
    },
    "visayas-island-leyte-samar-siargao": {
      name: "Eastern Visayas & CARAGA Off-Grid Island Clusters — Leyte Gulf / Samar / Siargao / Dinagat",
      label: "🏝️ Eastern Visayas & Siargao Island Chain (Leyte Gulf / Samar / Dinagat / CARAGA)",
      convDays: 1.38, convDirect: 1.18, skyDays: 0.88, skyDirect: 1.05,
      defaultRoad: 330000,
      challenge: "🏝️ Eastern Visayas–CARAGA: Leyte Gulf islands, Samar islets & Siargao off-grid microgrids • Remote island barangays without cargo piers • ₱330k marine charter cost eliminated"
    },
    "barmm-basulta-island": {
      name: "BARMM — Sulu Archipelago & Tawi-Tawi Island Chains: Sitangkai / Sibutu / Basilan",
      label: "🏝️ BARMM / Sulu–Tawi-Tawi Off-Grid Island (BASULTA Archipelago — Southernmost PH)",
      convDays: 1.65, convDirect: 1.35, skyDays: 1.05, skyDirect: 1.15,
      defaultRoad: 580000,
      challenge: "🏝️ BARMM–BASULTA: Tawi-Tawi & Sulu archipelago (Sitangkai/Sibutu) • NPC-SPUG diesel replacement solar microgrids • Extreme inter-island freight distance • ₱580k freight saved"
    },
    "cebu-bohol-negros-island": {
      name: "Central Visayas Off-Grid Island & Highland Resort Access — Cebu Outlying / Bohol / Negros",
      label: "🏝️ Cebu / Bohol / Negros Oriental Off-Grid Island & Highland Resort (Central Visayas)",
      convDays: 1.35, convDirect: 1.18, skyDays: 0.85, skyDirect: 1.03,
      defaultRoad: 320000,
      challenge: "🏝️ Central Visayas: Cebu outlying islands, Bohol remote upland barangays & Negros Oriental coastal solar • Shallow-draft passenger boat only routes • ₱320k barge costs bypassed"
    },

    // ══════════════════════════════════════════════════════════════════════════
    // 🏢 5. URBAN ELEVATED ROOFTOP & INDUSTRIAL SPECIAL ECOZONES
    // ══════════════════════════════════════════════════════════════════════════
    "urban-metro-manila-ncr": {
      name: "Metro Manila NCR — Industrial, Commercial & High-Rise Rooftop Solar (BGC / Makati / Caloocan)",
      label: "🏢 Metro Manila / NCR Industrial Rooftop (BGC / Makati / Pasig / Caloocan / MMDA Zone)",
      convDays: 0.65, convDirect: 0.95, skyDays: 0.45, skyDirect: 0.82,
      defaultRoad: 140000,
      challenge: "🏢 NCR: Metro Manila 15m–45m rooftop delivery • MMDA-mandated street closure permits (₱80k+) • Eliminates overnight crane lane closures & overhead line hazards • ₱140k saved"
    },
    "urban-cebu-davao-cdo": {
      name: "Metro Cebu (Mandaue/Lapu-Lapu) / Metro Davao / Cagayan de Oro — Commercial Rooftops",
      label: "🏢 Metro Cebu / Metro Davao / CDO Commercial Rooftop (MEPZ / Davao Industrial / CDO)",
      convDays: 0.70, convDirect: 0.94, skyDays: 0.50, skyDirect: 0.85,
      defaultRoad: 150000,
      challenge: "🏢 Visayas–Mindanao Urban: Cebu MEPZ II, Davao Industrial & CDO Uptown rooftops • City street heavy crane restrictions • Direct rooftop staging via flight sortie • ₱150k saved"
    },
    "urban-calabarzon-industrial": {
      name: "CALABARZON Special Economic Zone Rooftops — Laguna Technopark / First PHIP / LIMA / Cavite",
      label: "🏢 CALABARZON Industrial Estate Rooftop (Laguna Technopark / First PHIP / LIMA / Cavite)",
      convDays: 0.68, convDirect: 0.94, skyDays: 0.48, skyDirect: 0.83,
      defaultRoad: 145000,
      challenge: "🏢 CALABARZON: Laguna Technopark / LIMA / Cavite Ecozone manufacturing roofs • Multi-tenant park traffic coordination • 15m–40m vertical staging • ₱145k crane costs eliminated"
    },
    "urban-clark-subic-ecozones": {
      name: "Clark Freeport Zone / Subic Bay Freeport — Warehouse Roof, Hangar & Elevated Solar Platform",
      label: "🏢 Clark Freeport Zone / Subic Bay Freeport — Warehouse Roof, Hangar & Platform (Luzon)",
      convDays: 0.70, convDirect: 0.93, skyDays: 0.50, skyDirect: 0.84,
      defaultRoad: 150000,
      challenge: "🏢 Clark–Subic: CEZA & SBMA economic zone platforms • Wide-span aviation hangars & warehouse roofs • Direct aerial drop with zero forklift mast height limits • ₱150k saved"
    },
    "urban-iloilo-bacolod-city": {
      name: "Iloilo City CBD & Bacolod City Industrial Park — Commercial & Mixed-Use Building Rooftops",
      label: "🏢 Iloilo City / Bacolod City Rooftop & Mixed-Use Building (Western Visayas)",
      convDays: 0.72, convDirect: 0.95, skyDays: 0.52, skyDirect: 0.86,
      defaultRoad: 148000,
      challenge: "🏢 Western Visayas Urban: Iloilo CBD & Bacolod City commercial rooftop solar • Hospital, mall & school installations • Zero city traffic disruption & zero crane permits • ₱148k saved"
    },

    // ══════════════════════════════════════════════════════════════════════════
    // BACKWARD COMPATIBILITY ALIASES
    // ══════════════════════════════════════════════════════════════════════════
    "moderate": {
      name: "Central Luzon Agricultural Plain (Tarlac / Pampanga)",
      label: "",
      convDays: 0.75, convDirect: 0.88, skyDays: 0.65, skyDirect: 0.90,
      defaultRoad: 180000,
      challenge: "🌾 Central Luzon agricultural corridor"
    },
    "steep": {
      name: "Cordillera Mountain Ridge (Benguet / Mt. Province)",
      label: "",
      convDays: 1.20, convDirect: 1.10, skyDays: 0.95, skyDirect: 1.00,
      defaultRoad: 450000,
      challenge: "🏔️ Cordillera highland ridge (Benguet / Mt. Province)"
    },
    "extreme": {
      name: "Sierra Madre Rainforest (Zero Road Access / DENR)",
      label: "",
      convDays: 1.65, convDirect: 1.30, skyDays: 1.15, skyDirect: 1.15,
      defaultRoad: 600000,
      challenge: "🌴 Sierra Madre rainforest basin (Zero road access)"
    },
    "cordillera-highland": {
      name: "Cordillera Central Mountain Ridge",
      label: "",
      convDays: 1.55, convDirect: 1.28, skyDays: 0.95, skyDirect: 1.12,
      defaultRoad: 480000,
      challenge: "🏔️ Luzon: Cordillera Central (1,200m–2,926m ASL)"
    },
    "sierra-madre-jungle": {
      name: "Sierra Madre Mountain Range",
      label: "",
      convDays: 1.75, convDirect: 1.38, skyDays: 1.08, skyDirect: 1.18,
      defaultRoad: 620000,
      challenge: "🌴 Luzon: Sierra Madre (Zero road access / DENR NIPAS)"
    },
    "visayas-island": {
      name: "Palawan & MIMAROPA Off-Grid Island",
      label: "",
      convDays: 1.45, convDirect: 1.22, skyDays: 0.90, skyDirect: 1.05,
      defaultRoad: 360000,
      challenge: "🏝️ Palawan–MIMAROPA: Coral reef barrier"
    },
    "mindanao-volcanic": {
      name: "Mindanao Highland / Mt. Apo BTS Slope",
      label: "",
      convDays: 1.45, convDirect: 1.22, skyDays: 0.90, skyDirect: 1.05,
      defaultRoad: 430000,
      challenge: "🌋 Mindanao: Highland Plateau / Mt. Apo BTS Slopes"
    },
    "central-luzon-foothills": {
      name: "Central & Northern Luzon Rolling Foothills",
      label: "",
      convDays: 0.75, convDirect: 0.88, skyDays: 0.65, skyDirect: 0.90,
      defaultRoad: 180000,
      challenge: "🌾 Pangasinan & Central Luzon agricultural plain"
    },
    "urban-rooftop": {
      name: "Metro Manila & CALABARZON Industrial Rooftop",
      label: "",
      convDays: 0.65, convDirect: 0.95, skyDays: 0.45, skyDirect: 0.82,
      defaultRoad: 140000,
      challenge: "🏢 Metro Manila & CALABARZON industrial rooftops"
    }
  };

  function calculateTIPC(params) {
    var p = params || {};
    var panels       = Math.max(10, parseInt(p.panelsCount, 10) || 240);
    var panelWeight  = Math.max(15, parseFloat(p.panelWeightKg) || 30);
    var terrain      = p.terrainType || "luzon-highland-cordillera"; // 25 Philippine terrain profiles
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
