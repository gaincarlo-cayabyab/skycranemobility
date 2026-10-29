/**
 * SkyCrane Mobility — js/payload-calculator.js
 * Interactive Payload & Altitude Feasibility Engine
 * DJI FlyCart 100 | Light Theme | Blueprint-Specified Logic
 *
 * Exposes:
 *   evaluateFlightFeasibility(cargoWeightKg, flightAltitudeMeters) → ResultObject
 *   SkyCraneCalc.init(config)  — auto-wires a form UI if IDs are provided
 */

(function (global) {
  "use strict";

  /* ── Operational Constants ──────────────────────────────── */
  var LIMITS = {
    MAX_DUAL_BATTERY_PAYLOAD_KG : 85,
    MAX_ALTITUDE_METERS          : 6000,
    WARNING_PAYLOAD_THRESHOLD_KG : 70,   // advisory threshold (82% of max)
    WARNING_ALTITUDE_THRESHOLD_M : 4500  // advisory altitude zone
  };

  /* ── Core Evaluation Function ───────────────────────────── */
  /**
   * Evaluates whether a flight mission is feasible given cargo weight
   * and site elevation for the DJI FlyCart 100 dual-battery configuration.
   *
   * @param  {number} cargoWeightKg        - Cargo/payload weight in kilograms
   * @param  {number} flightAltitudeMeters - Target site elevation in meters ASL
   * @returns {{ status: string, badgeColor: string, message: string, severity: string }}
   */
  function evaluateFlightFeasibility(cargoWeightKg, flightAltitudeMeters) {

    /* ── 1. Input Validation ─────────────────────────────── */
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

    /* ── 2. Hard Limit: Payload Exceeded ─────────────────── */
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

    /* ── 3. Hard Limit: Altitude Ceiling Exceeded ─────────── */
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

    /* ── 4. Advisory: Both near limits ────────────────────── */
    if (cargoWeightKg > LIMITS.WARNING_PAYLOAD_THRESHOLD_KG &&
        flightAltitudeMeters > LIMITS.WARNING_ALTITUDE_THRESHOLD_M) {
      return {
        status    : "Advisory — High Load at Altitude",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        message   : "Cargo weight (" + cargoWeightKg.toFixed(1) + " kg) and site elevation (" +
                    flightAltitudeMeters.toFixed(0) + " m) are both approaching operational limits. " +
                    "This configuration is technically within specifications but requires detailed mission planning. " +
                    "A pre-flight site survey and battery performance assessment is strongly recommended.",
        severity  : "warning"
      };
    }

    if (cargoWeightKg > LIMITS.WARNING_PAYLOAD_THRESHOLD_KG) {
      return {
        status    : "Advisory — Heavy Payload",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        message   : "Cargo weight (" + cargoWeightKg.toFixed(1) + " kg) is within the operational envelope but " +
                    "above " + LIMITS.WARNING_PAYLOAD_THRESHOLD_KG + " kg. Flight range and battery life will be reduced. " +
                    "Confirm route distance and battery configuration before deployment.",
        severity  : "warning"
      };
    }

    if (flightAltitudeMeters > LIMITS.WARNING_ALTITUDE_THRESHOLD_M) {
      return {
        status    : "Advisory — High Elevation",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
        message   : "Site elevation (" + flightAltitudeMeters.toFixed(0) + " m ASL) is within limits but above " +
                    LIMITS.WARNING_ALTITUDE_THRESHOLD_M.toLocaleString() + " m. " +
                    "Air density reduction may affect lift performance. Pre-mission payload adjustment may be recommended.",
        severity  : "warning"
      };
    }

    /* ── 5. Approved ─────────────────────────────────────── */
    return {
      status    : "Flight Profile Approved ✓",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      message   : "Payload weight (" + cargoWeightKg.toFixed(1) + " kg) and operational altitude (" +
                  flightAltitudeMeters.toFixed(0) + " m ASL) are within approved DJI FlyCart 100 dual-battery " +
                  "flight parameters. Proceed to schedule your consultation.",
      severity  : "success"
    };
  }

  /* ── Auto-Wire UI Helper ─────────────────────────────────── */
  /**
   * Optionally auto-wires the calculator to existing DOM elements.
   * Call SkyCraneCalc.init({ ... }) with element IDs to bind.
   *
   * @param {object} config
   * @param {string} config.payloadInputId  - ID of cargo weight <input>
   * @param {string} config.altitudeInputId - ID of altitude <input>
   * @param {string} config.buttonId        - ID of evaluate <button>
   * @param {string} config.resultPanelId   - ID of result container element
   * @param {string} config.badgeId         - ID of badge element
   * @param {string} config.messageId       - ID of message element
   */
  function initCalculatorUI(config) {
    var cfg = config || {};
    var btnId    = cfg.buttonId        || "calc-evaluate-btn";
    var btn      = document.getElementById(btnId);
    if (!btn) return; // Calculator not present on this page

    btn.addEventListener("click", function () {
      var weight   = parseFloat((document.getElementById(cfg.payloadInputId  || "input-payload-weight") || {}).value);
      var altitude = parseFloat((document.getElementById(cfg.altitudeInputId || "input-altitude")       || {}).value) || 0;

      var result = evaluateFlightFeasibility(weight, altitude);

      var panel  = document.getElementById(cfg.resultPanelId || "calc-result-panel");
      var badge  = document.getElementById(cfg.badgeId       || "calc-status-badge");
      var msgEl  = document.getElementById(cfg.messageId     || "calc-message");

      if (panel)  panel.classList.remove("hidden");
      if (badge)  { badge.className = "calc-result-badge " + result.badgeColor; badge.textContent = result.status; }
      if (msgEl)  msgEl.textContent = result.message;
    });
  }

  /* ── Exports ─────────────────────────────────────────────── */
  // Expose core function globally (referenced by index.html inline script)
  global.evaluateFlightFeasibility = evaluateFlightFeasibility;

  // Expose namespaced API
  global.SkyCraneCalc = {
    evaluate : evaluateFlightFeasibility,
    init     : initCalculatorUI,
    LIMITS   : LIMITS
  };

  // Auto-init on DOMContentLoaded if the default button exists
  document.addEventListener("DOMContentLoaded", function () {
    initCalculatorUI({});
  });

})(window);
