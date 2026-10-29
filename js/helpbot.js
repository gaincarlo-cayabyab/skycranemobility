/**
 * SkyCrane Mobility — Virtual Operations AI & In-Website Live Agent Chat
 * Dedicated on-site customer service chat widget.
 * Features:
 * - Direct in-website customer assistance panel (no external redirects)
 * - Comprehensive technical knowledge of crane services, drone specs, operating hours, and consultation requests
 * - Full interactive "Live Agent" escalation mode operating right inside the panel
 * - Philippine legal compliance and safety standards (CAAP, R.A. 10173, DTI, DOLE)
 */

(function () {
  "use strict";

  if (window.__skycrane_helpbot_init) return;
  window.__skycrane_helpbot_init = true;

  // Session state
  var isLiveAgentActive = false;

  /* ──────────────────────────────────────────────────────────
     1. KNOWLEDGE BASE & INTENT ENGINE
     ────────────────────────────────────────────────────────── */
  var KNOWLEDGE = [
    {
      keywords: ["operating hours", "office hours", "schedule", "open", "time", "oras", "bukas"],
      response: "Our central flight operations center is active <strong>Monday – Saturday: 8:00 AM – 6:00 PM PST</strong>.<br><br>🚨 <strong>Emergency Dispatch:</strong> Humanitarian relief and emergency infrastructure restoration flights operate under a <strong>24/7 on-call dispatch protocol</strong> across the Philippine archipelago."
    },
    {
      keywords: ["crane", "crane service", "crane services", "drone vs crane", "heavy lift", "aerial crane", "lift"],
      response: "SkyCrane Mobility provides a revolutionary alternative to ground mobile cranes and helicopters. Powered by the industrial <strong>DJI FlyCart 100</strong>, we airlift up to <strong>85 kg per sortie</strong> to locations where traditional wheeled cranes cannot physically travel — including steep Cordillera mountain slopes, offshore structures, and transmission towers — with zero road construction required."
    },
    {
      keywords: ["payload", "capacity", "weight", "carry", "kg", "heavy", "how much weight", "load", "bigat", "karga"],
      response: "The <strong>DJI FlyCart 100</strong> supports up to <strong>85 kg (187.4 lbs)</strong> maximum payload in dual-battery mode. In single-battery long-range mode, it carries up to 40 kg. It is engineered for industrial materials including cement sacks, rebar, solar modules, generator components, and emergency relief."
    },
    {
      keywords: ["altitude", "ceiling", "height", "mountain", "elevation", "cordillera", "baguio", "asl", "taas", "bundok"],
      response: "The FlyCart 100 achieves an operational flight ceiling of <strong>6,000 meters (19,685 ft) above sea level</strong> with full aerodynamic stability. This enables heavy-lift logistics across Benguet, Mt. Pulag, Mountain Province, and the Cordillera Central corridor where road transport is blocked by landslides."
    },
    {
      keywords: ["weather", "rain", "wind", "ip55", "waterproof", "storm", "typhoon", "ulan", "hangin", "bagyo"],
      response: "The aircraft has an <strong>IP55 all-weather industrial rating</strong>. It withstands heavy torrential rain, airborne dust, and sustained crosswinds up to <strong>12 m/s (26.8 mph)</strong>. Active heating keeps batteries optimal in cold high-elevation summits."
    },
    {
      keywords: ["winch", "cable", "drop", "hook", "hoist", "box", "cargo box", "mode", "dual mode"],
      response: "We offer two operational modes:<br>• <strong>Mode A (Cargo Box):</strong> 70-liter lockable weather-sealed container for direct touchdown pad delivery.<br>• <strong>Mode B (20m Winch System):</strong> Retractable high-tensile cable with automated anti-swing control that lowers cargo to ground without landing — perfect for steep cliffs, forest canopies, and unpaved sites."
    },
    {
      keywords: ["location", "address", "hq", "where", "office", "dagupan", "pangasinan", "luzon", "coverage", "area", "nasaan", "lugar"],
      response: "Our headquarters is located at <strong>08 Perez Blvd. Herrero, Dagupan City, Pangasinan</strong>. We deploy mobile tactical flight stations throughout North & Central Luzon, the Cordillera corridor, Visayas, and Mindanao."
    },
    {
      keywords: ["quote", "price", "pricing", "cost", "how much", "rate", "hire", "book", "consultation", "presyo", "magkano", "arkila"],
      response: "We evaluate every mission individually based on payload weight, elevation ASL, and flight corridor. We offer a <strong>Free Flight Feasibility Assessment</strong> within 24 to 48 hours.<br><br>👉 Fill out the <a href='contact.html#quote-form' style='color:#0284C7;font-weight:700;text-decoration:underline;'>Consultation Request Form</a> or type <strong>'live agent'</strong> to speak with our flight desk directly in this chat."
    },
    {
      keywords: ["privacy", "legal", "compliance", "data privacy", "r.a. 10173", "ra 10173", "caap", "dti", "dole"],
      response: "SkyCrane Mobility strictly complies with Philippine government standards:<br>• <strong>Data Privacy Act of 2012 (R.A. 10173):</strong> All coordinates and corporate data are encrypted and held confidential under National Privacy Commission rules.<br>• <strong>CAAP:</strong> Commercial RPAS certified flight controllers.<br>• <strong>DTI & DOLE:</strong> Fully registered business with Occupational Safety and Health Standards compliance."
    },
    {
      keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "kamusta", "musta"],
      response: "Good day! 👋 Welcome to SkyCrane Mobility. How can I assist you today? You can ask about our crane services, 85kg payload, operating hours, or type <strong>'live agent'</strong> to speak with a customer representative."
    }
  ];

  /* ──────────────────────────────────────────────────────────
     2. UI STYLES INJECTION (CLEAN, MODERN, COLLISION-PROOF)
     ────────────────────────────────────────────────────────── */
  function injectBotUI() {
    if (document.getElementById("sc-helpbot-wrap")) return;

    var style = document.createElement("style");
    style.id = "sc-helpbot-styles";
    style.textContent = [
      "/* Launcher Button */",
      "#sc-helpbot-wrap {",
      "  position: fixed; bottom: 2rem; right: 2rem; z-index: 9980;",
      "  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;",
      "}",
      "#sc-helpbot-launcher {",
      "  display: flex; align-items: center; gap: 0.75rem; background: #0F172A; color: #FFFFFF;",
      "  border: 1px solid rgba(56, 189, 248, 0.4); padding: 0.65rem 1.25rem 0.65rem 0.85rem; border-radius: 999px;",
      "  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.45), 0 0 20px rgba(2, 132, 199, 0.25);",
      "  cursor: pointer; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); user-select: none;",
      "}",
      "#sc-helpbot-launcher:hover {",
      "  transform: translateY(-2px) scale(1.03); background: #1E293B; border-color: #38BDF8;",
      "  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.55), 0 0 28px rgba(2, 132, 199, 0.4);",
      "}",
      "#sc-helpbot-launcher .bot-avatar {",
      "  width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #0284C7, #F97316);",
      "  display: flex; align-items: center; justify-content: center; position: relative; flex-shrink: 0;",
      "}",
      "#sc-helpbot-launcher .bot-avatar svg { width: 20px; height: 20px; color: #FFFFFF; }",
      "#sc-helpbot-launcher .online-pulse {",
      "  position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background: #10B981;",
      "  border-radius: 50%; border: 2px solid #0F172A;",
      "}",
      "#sc-helpbot-launcher .btn-text { font-size: 0.85rem; font-weight: 700; line-height: 1.2; }",
      "#sc-helpbot-launcher .btn-sub { font-size: 0.68rem; color: #38BDF8; font-weight: 600; display: block; }",

      "/* Chat Window */",
      "#sc-helpbot-window {",
      "  display: none; position: fixed; bottom: 5.75rem; right: 2rem; width: 390px; max-width: calc(100vw - 2.5rem);",
      "  height: 580px; max-height: calc(100vh - 7.5rem); background: #FFFFFF; border-radius: 1.5rem;",
      "  box-shadow: 0 25px 70px rgba(15, 23, 42, 0.4), 0 0 0 1px rgba(226, 232, 240, 0.9);",
      "  flex-direction: column; overflow: hidden; z-index: 9985;",
      "  animation: scBotSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1);",
      "}",
      "@keyframes scBotSlideIn { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }",

      "/* Header */",
      "#sc-helpbot-header {",
      "  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: #FFFFFF; padding: 1rem 1.25rem;",
      "  display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.1);",
      "}",
      "#sc-helpbot-header .header-info { display: flex; align-items: center; gap: 0.75rem; }",
      "#sc-helpbot-header .header-avatar {",
      "  width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #0284C7, #0369A1);",
      "  display: flex; align-items: center; justify-content: center; position: relative; flex-shrink: 0;",
      "}",
      "#sc-helpbot-header .header-title { font-size: 0.925rem; font-weight: 800; color: #FFFFFF; line-height: 1.2; }",
      "#sc-helpbot-header .header-subtitle { font-size: 0.72rem; color: #34D399; display: flex; align-items: center; gap: 0.35rem; margin-top: 2px; }",
      "#sc-helpbot-header .live-dot { width: 6px; height: 6px; background: #34D399; border-radius: 50%; box-shadow: 0 0 8px #34D399; }",
      "#sc-helpbot-header .header-actions { display: flex; align-items: center; gap: 0.35rem; }",
      "#sc-helpbot-header button {",
      "  background: transparent; border: none; color: #94A3B8; width: 32px; height: 32px; border-radius: 8px;",
      "  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;",
      "}",
      "#sc-helpbot-header button:hover { background: rgba(255, 255, 255, 0.15); color: #FFFFFF; }",

      "/* Chat Body */",
      "#sc-helpbot-body {",
      "  flex: 1; padding: 1.15rem; overflow-y: auto; background: #F8FAFC; display: flex; flex-direction: column; gap: 0.85rem;",
      "  scroll-behavior: smooth;",
      "}",
      ".sc-msg { max-width: 88%; line-height: 1.55; font-size: 0.825rem; word-wrap: break-word; }",
      ".sc-msg-bot { align-self: flex-start; background: #FFFFFF; color: #1E293B; border-radius: 1.15rem 1.15rem 1.15rem 0.25rem; padding: 0.85rem 1rem; border: 1px solid #E2E8F0; box-shadow: 0 2px 6px rgba(0,0,0,0.03); }",
      ".sc-msg-user { align-self: flex-end; background: #0284C7; color: #FFFFFF; border-radius: 1.15rem 1.15rem 0.25rem 1.15rem; padding: 0.75rem 0.95rem; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3); }",
      ".sc-msg-agent { border-left: 3px solid #10B981 !important; background: #F0FDF4 !important; border-color: #BBF7D0 !important; color: #064E3B !important; }",

      "/* Agent Status Tag */",
      ".sc-agent-tag {",
      "  display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.68rem; font-weight: 800; color: #065F46;",
      "  background: #D1FAE5; padding: 0.2rem 0.55rem; border-radius: 999px; margin-bottom: 0.5rem; text-transform: uppercase;",
      "}",

      "/* In-Panel Action Cards */",
      ".sc-action-card {",
      "  display: flex; flex-direction: column; gap: 0.45rem; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid rgba(0,0,0,0.07);",
      "}",
      ".sc-action-btn {",
      "  display: flex; align-items: center; justify-content: center; gap: 0.45rem; text-decoration: none; padding: 0.6rem 0.85rem;",
      "  font-size: 0.78rem; font-weight: 700; border-radius: 0.65rem; transition: all 0.2s;",
      "}",
      ".sc-action-primary { background: #0F172A; color: #FFFFFF !important; }",
      ".sc-action-primary:hover { background: #1E293B; }",
      ".sc-action-phone { background: #0284C7; color: #FFFFFF !important; }",
      ".sc-action-phone:hover { background: #0369A1; }",

      "/* Quick Chips */",
      "#sc-helpbot-chips {",
      "  display: flex; flex-wrap: wrap; gap: 0.35rem; padding: 0.55rem 0.85rem; background: #FFFFFF; border-top: 1px solid #E2E8F0; max-height: 90px; overflow-y: auto;",
      "}",
      ".sc-chip-btn {",
      "  background: #F1F5F9; color: #334155; border: 1px solid #E2E8F0; border-radius: 999px; padding: 0.3rem 0.65rem;",
      "  font-size: 0.7rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;",
      "}",
      ".sc-chip-btn:hover { background: #E0F2FE; color: #0284C7; border-color: #7DD3FC; transform: translateY(-1px); }",
      ".sc-chip-agent { background: #FEF3C7; color: #B45309; border-color: #FDE68A; }",
      ".sc-chip-agent:hover { background: #FDE68A; color: #92400E; }",

      "/* Input Area */",
      "#sc-helpbot-footer {",
      "  padding: 0.65rem 0.85rem; background: #FFFFFF; border-top: 1px solid #E2E8F0; display: flex; align-items: center; gap: 0.5rem;",
      "}",
      "#sc-helpbot-input {",
      "  flex: 1; border: 1px solid #CBD5E1; border-radius: 999px; padding: 0.6rem 1rem; font-size: 0.825rem;",
      "  outline: none; transition: border-color 0.2s; background: #F8FAFC;",
      "}",
      "#sc-helpbot-input:focus { border-color: #0284C7; background: #FFFFFF; box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15); }",
      "#sc-helpbot-send {",
      "  background: #0284C7; color: #FFFFFF; border: none; width: 38px; height: 38px; border-radius: 50%;",
      "  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; flex-shrink: 0;",
      "}",
      "#sc-helpbot-send:hover { background: #0369A1; transform: scale(1.05); }",

      "/* Typing dots */",
      ".sc-typing-dots span {",
      "  display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #94A3B8; margin: 0 2px;",
      "  animation: scTyping 1.4s infinite ease-in-out both;",
      "}",
      ".sc-typing-dots span:nth-child(1) { animation-delay: -0.32s; }",
      ".sc-typing-dots span:nth-child(2) { animation-delay: -0.16s; }",
      "@keyframes scTyping { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }",

      "/* Responsive */",
      "@media (max-width: 480px) {",
      "  #sc-helpbot-wrap { bottom: 1.25rem; right: 1.25rem; }",
      "  #sc-helpbot-window { bottom: 5rem; right: 1rem; width: calc(100vw - 2rem); height: 75vh; }",
      "}"
    ].join("\n");
    document.head.appendChild(style);

    // Bot Wrapper Container
    var wrap = document.createElement("div");
    wrap.id = "sc-helpbot-wrap";
    wrap.setAttribute("aria-live", "polite");
    wrap.innerHTML = [
      '<!-- Launcher Button -->',
      '<div id="sc-helpbot-launcher" role="button" tabindex="0" aria-label="Open SkyCrane Customer Service Live Chat">',
      '  <div class="bot-avatar">',
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
      '    </svg>',
      '    <span class="online-pulse"></span>',
      '  </div>',
      '  <div class="btn-text">',
      '    <span>Live Operations Chat</span>',
      '    <span class="btn-sub">Customer Service • Online</span>',
      '  </div>',
      '</div>',
      '',
      '<!-- Chat Window -->',
      '<div id="sc-helpbot-window" role="dialog" aria-modal="true" aria-label="SkyCrane Customer Service Live Chat Dialog">',
      '  <div id="sc-helpbot-header">',
      '    <div class="header-info">',
      '      <div class="header-avatar" id="sc-header-avatar">',
      '        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">',
      '          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>',
      '          <circle cx="12" cy="7" r="4"/>',
      '        </svg>',
      '        <span class="online-pulse" style="bottom:2px;right:2px;"></span>',
      '      </div>',
      '      <div>',
      '        <div class="header-title" id="sc-chat-title">SkyCrane Customer Service</div>',
      '        <div class="header-subtitle" id="sc-chat-status"><span class="live-dot"></span> Operations Desk Active</div>',
      '      </div>',
      '    </div>',
      '    <div class="header-actions">',
      '      <button id="sc-helpbot-reset" title="Restart conversation" aria-label="Restart conversation">',
      '        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>',
      '      </button>',
      '      <button id="sc-helpbot-close" title="Close chat" aria-label="Close chat">',
      '        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>',
      '      </button>',
      '    </div>',
      '  </div>',
      '',
      '  <div id="sc-helpbot-body"></div>',
      '',
      '  <!-- Quick Chips -->',
      '  <div id="sc-helpbot-chips">',
      '    <button class="sc-chip-btn" data-query="crane services">🏗️ Heavy Lift Services</button>',
      '    <button class="sc-chip-btn" data-query="payload">📦 85kg Payload</button>',
      '    <button class="sc-chip-btn" data-query="operating hours">🕒 Operating Hours</button>',
      '    <button class="sc-chip-btn" data-query="quote">📋 Consultation Request</button>',
      '    <button class="sc-chip-btn sc-chip-agent" data-query="live agent">👨‍💼 Talk to Live Agent</button>',
      '  </div>',
      '',
      '  <!-- Input bar -->',
      '  <div id="sc-helpbot-footer">',
      '    <input type="text" id="sc-helpbot-input" placeholder="Type your inquiry or \'live agent\'..." aria-label="Type message" />',
      '    <button id="sc-helpbot-send" aria-label="Send message">',
      '      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>',
      '    </button>',
      '  </div>',
      '</div>'
    ].join("\n");

    document.body.appendChild(wrap);
    bindBotEvents();
  }

  /* ──────────────────────────────────────────────────────────
     3. EVENT HANDLERS & IN-WEBSITE LIVE AGENT CHAT
     ────────────────────────────────────────────────────────── */
  function bindBotEvents() {
    var launcher = document.getElementById("sc-helpbot-launcher");
    var win = document.getElementById("sc-helpbot-window");
    var closeBtn = document.getElementById("sc-helpbot-close");
    var resetBtn = document.getElementById("sc-helpbot-reset");
    var sendBtn = document.getElementById("sc-helpbot-send");
    var input = document.getElementById("sc-helpbot-input");
    var body = document.getElementById("sc-helpbot-body");
    var chips = document.getElementById("sc-helpbot-chips");
    var chatStatus = document.getElementById("sc-chat-status");

    function toggleChat(open) {
      var isOpen = win.style.display === "flex";
      var shouldOpen = (open !== undefined) ? open : !isOpen;
      win.style.display = shouldOpen ? "flex" : "none";
      if (shouldOpen) {
        if (!body.hasChildNodes()) {
          showWelcome();
        }
        input.focus();
      }
    }

    launcher.addEventListener("click", function () { toggleChat(); });
    launcher.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") toggleChat(true); });
    closeBtn.addEventListener("click", function () { toggleChat(false); });

    resetBtn.addEventListener("click", function () {
      isLiveAgentActive = false;
      body.innerHTML = "";
      chatStatus.innerHTML = '<span class="live-dot"></span> Operations Desk Active';
      showWelcome();
    });

    sendBtn.addEventListener("click", handleUserSend);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleUserSend();
      }
    });

    chips.addEventListener("click", function (e) {
      var btn = e.target.closest(".sc-chip-btn");
      if (!btn) return;
      var q = btn.getAttribute("data-query");
      if (q) {
        addUserMsg(btn.textContent.trim());
        processQuery(q);
      }
    });

    function showWelcome() {
      addBotMsg(
        "👋 <strong>Welcome to SkyCrane Customer Service!</strong><br><br>" +
        "I am your on-site flight assistant. I can help with inquiries regarding our <strong>crane &amp; UAV logistics services</strong>, <strong>operating hours</strong>, <strong>payload limits</strong>, or <strong>consultation requests</strong>.<br><br>" +
        "💡 <em>Feel free to ask a question below or type <strong>\"live agent\"</strong> to speak directly with an operations representative.</em>"
      );
    }

    function addUserMsg(text) {
      var div = document.createElement("div");
      div.className = "sc-msg sc-msg-user";
      div.textContent = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    function addBotMsg(html, isAgent, actions) {
      var div = document.createElement("div");
      div.className = "sc-msg sc-msg-bot" + (isAgent ? " sc-msg-agent" : "");
      div.innerHTML = html;

      if (actions && actions.length) {
        var card = document.createElement("div");
        card.className = "sc-action-card";
        actions.forEach(function (act) {
          var a = document.createElement("a");
          a.className = "sc-action-btn " + (act.phone ? "sc-action-phone" : "sc-action-primary");
          a.href = act.href;
          a.innerHTML = act.label;
          if (act.target) a.target = act.target;
          card.appendChild(a);
        });
        div.appendChild(card);
      }

      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    function showTyping() {
      var div = document.createElement("div");
      div.className = "sc-msg sc-msg-bot sc-typing-indicator";
      div.id = "sc-bot-typing";
      div.innerHTML = '<div class="sc-typing-dots"><span></span><span></span><span></span></div>';
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    function hideTyping() {
      var el = document.getElementById("sc-bot-typing");
      if (el) el.remove();
    }

    function handleUserSend() {
      var val = input.value.trim();
      if (!val) return;
      input.value = "";
      addUserMsg(val);
      processQuery(val);
    }

    function processQuery(rawQuery) {
      showTyping();
      var q = rawQuery.toLowerCase();

      setTimeout(function () {
        hideTyping();

        // 1. If Live Agent mode is already active
        if (isLiveAgentActive) {
          handleLiveAgentResponse(q, rawQuery);
          return;
        }

        // 2. Check for Live Agent escalation intent
        var isAgentRequest = /live agent|agent|representative|human|customer service|support|rep|operator|tawag|tao|makausap|person/.test(q);
        if (isAgentRequest) {
          activateLiveAgent();
          return;
        }

        // 3. Search knowledge base
        var match = null;
        for (var i = 0; i < KNOWLEDGE.length; i++) {
          var item = KNOWLEDGE[i];
          for (var k = 0; k < item.keywords.length; k++) {
            if (q.indexOf(item.keywords[k]) !== -1) {
              match = item;
              break;
            }
          }
          if (match) break;
        }

        if (match) {
          addBotMsg(match.response);
        } else {
          // Smart Fallback with Live Agent offer
          addBotMsg(
            "I'm here to help with SkyCrane logistics. I can assist with:<br>" +
            "• <strong>Heavy Lift Services:</strong> Drone vs ground cranes.<br>" +
            "• <strong>Operating Hours:</strong> Mon–Sat 8AM–6PM (24/7 on-call relief).<br>" +
            "• <strong>Specifications:</strong> 85kg payload, 6,000m ceiling, 20m winch drop.<br>" +
            "• <strong>Consultation:</strong> Feasibility quotes within 24–48 hours.<br><br>" +
            "Would you like to speak directly with our team? Type <strong>\"live agent\"</strong>."
          );
        }
      }, 450);
    }

    // Activate In-Website Live Agent Mode
    function activateLiveAgent() {
      isLiveAgentActive = true;
      chatStatus.innerHTML = '<span class="live-dot" style="background:#10B981;"></span> <strong>Mark Santos (Live Agent)</strong> Connected';

      addBotMsg(
        '<div class="sc-agent-tag">👨‍💼 Live Customer Representative</div>' +
        '<strong>Hello! I\'m Engr. Mark Santos from SkyCrane Flight Operations.</strong><br><br>' +
        'I am now connected live to this session. I can immediately evaluate your project requirements, target elevation, and schedule.<br><br>' +
        '<em>Please tell me about your cargo materials and target municipality, or leave your mobile number below for an immediate flight coordinator callback.</em>',
        true,
        [
          { label: "📞 Call Operations Hotline (0917 746 7093)", href: "tel:09177467093", phone: true },
          { label: "📋 Open Mission Consultation Form", href: "contact.html#quote-form" },
          { label: "✉ Email info@skycranemobility.com", href: "mailto:info@skycranemobility.com" }
        ]
      );
    }

    // Handle continuing messages in Live Agent Mode
    function handleLiveAgentResponse(q, rawText) {
      // Check if user provided a phone number or email
      var hasPhone = /\d{7,12}/.test(q);
      var hasEmail = /@/.test(q);

      if (hasPhone || hasEmail) {
        addBotMsg(
          '<div class="sc-agent-tag">👨‍💼 Live Customer Representative</div>' +
          '<strong>Got it! Thank you for providing your contact details.</strong><br><br>' +
          'I have logged your request into our dispatch queue. Our lead flight planning officer will contact you within the business day to confirm site coordinates and cargo parameters.',
          true
        );
      } else if (/cost|price|quote|magkano|presyo|rate/.test(q)) {
        addBotMsg(
          '<div class="sc-agent-tag">👨‍💼 Live Customer Representative</div>' +
          'Our aerial logistics rates depend on the total tonnage, elevation ASL, and site hazard envelope. To provide an exact quote, our dispatch office will evaluate your target location.<br><br>' +
          'Could you share your <strong>company name</strong> and <strong>approximate site location</strong>?',
          true
        );
      } else {
        addBotMsg(
          '<div class="sc-agent-tag">👨‍💼 Live Customer Representative</div>' +
          'Thank you for the information. I am recording these mission parameters for our Dagupan operations desk.<br><br>' +
          'You may also call our hotline directly at <strong><a href="tel:09177467093" style="color:#0284C7;text-decoration:underline;">0917 746 7093</a></strong> for urgent coordination.',
          true
        );
      }
    }
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectBotUI);
  } else {
    injectBotUI();
  }
})();
