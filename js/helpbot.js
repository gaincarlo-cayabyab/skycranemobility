/**
 * SkyCrane Mobility — Virtual Operations AI Assistant (Help Bot)
 * Dedicated on-site chatbot with comprehensive knowledge base of SkyCrane fleet,
 * payload limits, terrain, operations, and automated "Live Agent" escalation.
 * 
 * Engineered for SkyCrane Mobility (https://skycranemobility.com)
 */

(function () {
  "use strict";

  // Prevent multiple initializations
  if (window.__skycrane_helpbot_init) return;
  window.__skycrane_helpbot_init = true;

  /* ──────────────────────────────────────────────────────────
     1. KNOWLEDGE BASE & INTENT MATCHING
     ────────────────────────────────────────────────────────── */
  var KNOWLEDGE = [
    {
      keywords: ["live agent", "agent", "human", "representative", "customer service", "support", "talk to human", "talk to person", "real person", "operator", "customer rep", "rep", "tawag", "tao", "makausap"],
      isLiveAgent: true,
      title: "Connecting to Live Operations Desk",
      response: "Connecting you directly to a SkyCrane Operations Representative. Our flight operations team is standing by to evaluate your mission parameters.",
      actions: [
        { label: "📞 Call Operations Hotline (0917 746 7093)", href: "tel:09177467093", primary: true },
        { label: "💬 Chat via WhatsApp Desk", href: "https://api.whatsapp.com/send?phone=639937052927&text=Hello%20SkyCrane%20Operations%2C%20I%20am%20requesting%20a%20Live%20Customer%20Representative%20for%20mission%20inquiry.", target: "_blank" },
        { label: "✉ Email info@skycranemobility.com", href: "mailto:info@skycranemobility.com?subject=Live%20Agent%20Inquiry%20via%20Help%20Bot" },
        { label: "📋 Open Mission Consultation Form", href: "contact.html#quote-form" }
      ]
    },
    {
      keywords: ["payload", "capacity", "weight", "carry", "kg", "heavy", "how much weight", "load", "bigat", "karga"],
      response: "The <strong>DJI FlyCart 100</strong> has a maximum dual-battery payload capacity of <strong>85 kg</strong> (187.4 lbs). In single-battery emergency long-range mode, it carries up to 40 kg. It is engineered specifically for heavy industrial components such as cement bags, steel rebar, solar panels, and emergency supplies."
    },
    {
      keywords: ["altitude", "ceiling", "height", "mountain", "elevation", "cordillera", "baguio", "asl", "taas", "bundok"],
      response: "The FlyCart 100 achieves an operational flight ceiling of <strong>6,000 meters (19,685 ft) above sea level</strong> with full flight stability. This enables uninterrupted logistics over high-altitude mountain passes such as Benguet, Mt. Pulag, Mountain Province, and the Cordillera Central corridor where road transport is slow or impassable."
    },
    {
      keywords: ["weather", "rain", "wind", "ip55", "waterproof", "storm", "typhoon", "ulan", "hangin", "bagyo"],
      response: "The aircraft is rated at <strong>IP55 all-weather protection</strong>. It operates reliably in heavy rainfall, dense industrial dust, and sustained crosswinds up to <strong>12 m/s (26.8 mph)</strong>. Active battery heating allows reliable flights in cold high-elevation environments."
    },
    {
      keywords: ["winch", "cable", "drop", "crane", "hook", "hoist", "box", "cargo box", "mode", "dual mode"],
      response: "SkyCrane operates in two mission configurations:<br>• <strong>Mode A (Cargo Box):</strong> 70-liter lockable weather-sealed carbon composite container for direct landing deliveries.<br>• <strong>Mode B (20m Winch System):</strong> Retractable steel cable with automatic anti-swing algorithm that lowers cargo safely without landing — essential for steep mountain slopes, dense forest canopies, and offshore vessels."
    },
    {
      keywords: ["location", "address", "hq", "where", "office", "dagupan", "pangasinan", "luzon", "coverage", "area", "nasaan", "lugar"],
      response: "Our central flight operations headquarters is located at <strong>08 Perez Blvd. Herrero, Dagupan City, Pangasinan</strong>. While rooted in Dagupan, SkyCrane Mobility deploys mobile mission teams nationwide across North & Central Luzon, the Visayas islands, and Mindanao."
    },
    {
      keywords: ["quote", "price", "pricing", "cost", "how much", "rate", "hire", "book", "consultation", "presyo", "magkano", "arkila"],
      response: "Every aerial mission has custom parameters (cargo weight, elevation ASL, flight distance, and hazard terrain). We provide a <strong>free flight feasibility assessment and quote</strong> within 24 to 48 hours.<br><br>👉 You can submit your site coordinates and cargo specs on our <a href='contact.html#quote-form' style='color:#0284c7;font-weight:700;text-decoration:underline;'>Consultation Form</a>, or type <strong>'live agent'</strong> to speak with our flight desk immediately."
    },
    {
      keywords: ["construction", "energy", "solar", "oil", "gas", "mining", "relief", "disaster", "emergency", "medical", "industries"],
      response: "SkyCrane Mobility serves four core Philippine industries:<br>1. <strong>Construction & Civil Works:</strong> Cement, aggregates, and structural rebar delivery.<br>2. <strong>Renewable Energy:</strong> Solar panels, inverters, and power transmission tower gear.<br>3. <strong>Oil, Gas & Mining:</strong> Remote replacement valves, pipeline seals, and drills.<br>4. <strong>Disaster Relief:</strong> Rapid post-typhoon food, water purification, and satellite comms drops."
    },
    {
      keywords: ["safety", "caap", "license", "permit", "certified", "crash", "parachute", "fail safe"],
      response: "Safety is aerospace-grade:<br>• <strong>CAAP Compliant</strong> certified drone flight operations.<br>• Built-in <strong>dual active radar</strong> and binocular vision for 360° obstacle sensing.<br>• Integrated <strong>pyrotechnic parachute recovery system</strong> that deploys automatically in emergencies.<br>• Dual redundant batteries, antennas, and GPS/RTK navigation links."
    },
    {
      keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "kamusta", "musta"],
      response: "Hello! Welcome to SkyCrane Mobility Operations. How can I assist you with your heavy-lift logistics today? Ask me about payload limits, winch drops, operating areas, or type <strong>'live agent'</strong> to speak with our flight planners."
    }
  ];

  /* ──────────────────────────────────────────────────────────
     2. CHATBOT HTML & CSS INJECTION
     ────────────────────────────────────────────────────────── */
  function injectBotUI() {
    // If elements already exist, do not re-inject
    if (document.getElementById("sc-helpbot-wrap")) return;

    var style = document.createElement("style");
    style.id = "sc-helpbot-styles";
    style.textContent = [
      "#sc-helpbot-wrap { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9998; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }",
      
      "/* Launcher Button */",
      "#sc-helpbot-launcher {",
      "  display: flex; align-items: center; gap: 0.65rem; background: #0F172A; color: #FFFFFF;",
      "  border: 1px solid rgba(56, 189, 248, 0.35); padding: 0.6rem 1.15rem 0.6rem 0.85rem; border-radius: 999px;",
      "  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.45), 0 0 20px rgba(2, 132, 199, 0.3);",
      "  cursor: pointer; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);",
      "}",
      "#sc-helpbot-launcher:hover {",
      "  transform: translateY(-2px) scale(1.03); background: #1E293B; border-color: #38BDF8;",
      "  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.55), 0 0 28px rgba(2, 132, 199, 0.45);",
      "}",
      "#sc-helpbot-launcher .bot-avatar {",
      "  width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #0284C7, #F97316);",
      "  display: flex; align-items: center; justify-content: center; position: relative;",
      "}",
      "#sc-helpbot-launcher .bot-avatar svg { width: 20px; height: 20px; color: #FFFFFF; }",
      "#sc-helpbot-launcher .online-pulse {",
      "  position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background: #10B981;",
      "  border-radius: 50%; border: 2px solid #0F172A;",
      "}",
      "#sc-helpbot-launcher .btn-text { font-size: 0.825rem; font-weight: 700; letter-spacing: -0.01em; display: flex; flex-direction: column; text-align: left; line-height: 1.25; }",
      "#sc-helpbot-launcher .btn-sub { font-size: 0.68rem; color: #38BDF8; font-weight: 500; }",

      "/* Chat Window */",
      "#sc-helpbot-window {",
      "  display: none; position: fixed; bottom: 5.5rem; right: 1.5rem; width: 380px; max-width: calc(100vw - 2rem);",
      "  height: 560px; max-height: calc(100vh - 7rem); background: #FFFFFF; border-radius: 1.25rem;",
      "  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(226, 232, 240, 0.9);",
      "  flex-direction: column; overflow: hidden; z-index: 9999;",
      "  animation: scBotSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1);",
      "}",
      "@keyframes scBotSlideIn { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }",

      "/* Header */",
      "#sc-helpbot-header {",
      "  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: #FFFFFF; padding: 1rem 1.15rem;",
      "  display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.1);",
      "}",
      "#sc-helpbot-header .header-info { display: flex; align-items: center; gap: 0.75rem; }",
      "#sc-helpbot-header .header-avatar {",
      "  width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #0284C7, #0369A1);",
      "  display: flex; align-items: center; justify-content: center; position: relative;",
      "}",
      "#sc-helpbot-header .header-title { font-size: 0.9rem; font-weight: 800; color: #FFFFFF; line-height: 1.2; }",
      "#sc-helpbot-header .header-subtitle { font-size: 0.7rem; color: #34D399; display: flex; align-items: center; gap: 0.3rem; margin-top: 2px; }",
      "#sc-helpbot-header .live-dot { width: 6px; height: 6px; background: #34D399; border-radius: 50%; box-shadow: 0 0 8px #34D399; }",
      "#sc-helpbot-header .header-actions { display: flex; align-items: center; gap: 0.35rem; }",
      "#sc-helpbot-header button {",
      "  background: transparent; border: none; color: #94A3B8; width: 30px; height: 30px; border-radius: 6px;",
      "  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;",
      "}",
      "#sc-helpbot-header button:hover { background: rgba(255, 255, 255, 0.12); color: #FFFFFF; }",

      "/* Body & Messages */",
      "#sc-helpbot-body {",
      "  flex: 1; padding: 1rem; overflow-y: auto; background: #F8FAFC; display: flex; flex-direction: column; gap: 0.75rem;",
      "  scroll-behavior: smooth;",
      "}",
      ".sc-msg { max-width: 86%; line-height: 1.5; font-size: 0.825rem; word-wrap: break-word; }",
      ".sc-msg-bot { align-self: flex-start; background: #FFFFFF; color: #1E293B; border-radius: 1rem 1rem 1rem 0.25rem; padding: 0.75rem 0.95rem; border: 1px solid #E2E8F0; box-shadow: 0 2px 6px rgba(0,0,0,0.03); }",
      ".sc-msg-user { align-self: flex-end; background: #0284C7; color: #FFFFFF; border-radius: 1rem 1rem 0.25rem 1rem; padding: 0.65rem 0.9rem; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3); }",
      ".sc-msg-liveagent { border-left: 3px solid #10B981 !important; background: #F0FDF4 !important; border-color: #BBF7D0 !important; }",

      "/* Action Links inside Bot Bubbles */",
      ".sc-action-card {",
      "  display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid rgba(0,0,0,0.06);",
      "}",
      ".sc-action-btn {",
      "  display: flex; align-items: center; justify-content: center; gap: 0.4rem; text-decoration: none; padding: 0.55rem 0.8rem;",
      "  font-size: 0.75rem; font-weight: 700; border-radius: 0.6rem; transition: all 0.2s;",
      "}",
      ".sc-action-primary { background: #0F172A; color: #FFFFFF !important; }",
      ".sc-action-primary:hover { background: #1E293B; }",
      ".sc-action-secondary { background: #E0F2FE; color: #0284C7 !important; border: 1px solid #BAE6FD; }",
      ".sc-action-secondary:hover { background: #BAE6FD; }",

      "/* Quick Prompt Chips */",
      "#sc-helpbot-chips {",
      "  display: flex; flex-wrap: wrap; gap: 0.35rem; padding: 0.5rem 0.85rem; background: #FFFFFF; border-top: 1px solid #E2E8F0; max-height: 88px; overflow-y: auto;",
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
      "  flex: 1; border: 1px solid #CBD5E1; border-radius: 999px; padding: 0.55rem 0.95rem; font-size: 0.825rem;",
      "  outline: none; transition: border-color 0.2s;",
      "}",
      "#sc-helpbot-input:focus { border-color: #0284C7; box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15); }",
      "#sc-helpbot-send {",
      "  background: #0284C7; color: #FFFFFF; border: none; width: 36px; height: 36px; border-radius: 50%;",
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
      "  #sc-helpbot-wrap { bottom: 1rem; right: 1rem; }",
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
      '<div id="sc-helpbot-launcher" role="button" tabindex="0" aria-label="Open SkyCrane Flight Operations AI Assistant">',
      '  <div class="bot-avatar">',
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '      <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>',
      '      <rect x="4" y="8" width="16" height="12" rx="4"/>',
      '      <line x1="9" y1="13" x2="9.01" y2="13" stroke-width="3"/>',
      '      <line x1="15" y1="13" x2="15.01" y2="13" stroke-width="3"/>',
      '      <path d="M10 17h4"/>',
      '    </svg>',
      '    <span class="online-pulse"></span>',
      '  </div>',
      '  <div class="btn-text">',
      '    <span>Flight Assistant</span>',
      '    <span class="btn-sub">Ask Specs or "Live Agent"</span>',
      '  </div>',
      '</div>',
      '',
      '<!-- Chat Window -->',
      '<div id="sc-helpbot-window" role="dialog" aria-modal="true" aria-label="SkyCrane Flight Operations AI Assistant Dialog">',
      '  <div id="sc-helpbot-header">',
      '    <div class="header-info">',
      '      <div class="header-avatar">',
      '        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">',
      '          <rect x="4" y="8" width="16" height="12" rx="3"/>',
      '          <circle cx="9" cy="13" r="1.5" fill="white"/>',
      '          <circle cx="15" cy="13" r="1.5" fill="white"/>',
      '          <path d="M10 17h4" stroke-linecap="round"/>',
      '          <path d="M12 2v6" stroke-linecap="round"/>',
      '        </svg>',
      '        <span class="online-pulse" style="bottom:2px;right:2px;"></span>',
      '      </div>',
      '      <div>',
      '        <div class="header-title">SkyCrane Operations AI</div>',
      '        <div class="header-subtitle"><span class="live-dot"></span> Online • FlyCart 100 Flight Desk</div>',
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
      '    <button class="sc-chip-btn" data-query="payload">📦 85kg Payload</button>',
      '    <button class="sc-chip-btn" data-query="winch vs box">🪝 20m Winch Drop</button>',
      '    <button class="sc-chip-btn" data-query="altitude">🏔️ 6,000m Altitude</button>',
      '    <button class="sc-chip-btn" data-query="weather">🌧️ IP55 All-Weather</button>',
      '    <button class="sc-chip-btn" data-query="location">📍 Dagupan HQ & Areas</button>',
      '    <button class="sc-chip-btn" data-query="quote">📋 Request Quote</button>',
      '    <button class="sc-chip-btn sc-chip-agent" data-query="live agent">👨‍💼 Live Agent</button>',
      '  </div>',
      '',
      '  <!-- Input bar -->',
      '  <div id="sc-helpbot-footer">',
      '    <input type="text" id="sc-helpbot-input" placeholder="Ask a question or type \'live agent\'..." aria-label="Type message" />',
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
     3. BOT LOGIC & EVENT HANDLERS
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
      body.innerHTML = "";
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
        "👋 <strong>Hello! I am the SkyCrane Flight Operations Assistant.</strong><br><br>" +
        "I know all about our <strong>DJI FlyCart 100</strong> heavy-lift fleet (85 kg payload, 6,000m ceiling, IP55 rain/wind resistance, and 20m winch drop).<br><br>" +
        "💡 <em>Feel free to type any inquiry below, tap the topic pills, or type <strong>\"live agent\"</strong> whenever you need to connect with human dispatch.</em>"
      );
    }

    function addUserMsg(text) {
      var div = document.createElement("div");
      div.className = "sc-msg sc-msg-user";
      div.textContent = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    function addBotMsg(html, isLiveAgent, actions) {
      var div = document.createElement("div");
      div.className = "sc-msg sc-msg-bot" + (isLiveAgent ? " sc-msg-liveagent" : "");
      div.innerHTML = html;

      if (actions && actions.length) {
        var card = document.createElement("div");
        card.className = "sc-action-card";
        actions.forEach(function (act) {
          var a = document.createElement("a");
          a.className = "sc-action-btn " + (act.primary ? "sc-action-primary" : "sc-action-secondary");
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

        // 1. Check for Live Agent escalation
        var isAgent = /live agent|agent|representative|human|customer service|support|rep|operator|tawag|tao|makausap/.test(q);
        if (isAgent) {
          var agentItem = KNOWLEDGE[0];
          addBotMsg(
            "👨‍💼 <strong>SkyCrane Live Operations Desk Escalation:</strong><br>" + agentItem.response,
            true,
            agentItem.actions
          );
          // If Tawk.to is available, we can also trigger it if loaded
          if (typeof window.Tawk_API !== "undefined" && typeof window.Tawk_API.maximize === "function") {
            try { window.Tawk_API.maximize(); } catch (err) {}
          }
          return;
        }

        // 2. Search knowledge base
        var match = null;
        for (var i = 1; i < KNOWLEDGE.length; i++) {
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
          // Smart Fallback
          addBotMsg(
            "I'm specialized in SkyCrane heavy-lift drone logistics. I can assist with:<br>" +
            "• <strong>Payload Limits:</strong> Up to 85 kg dual-battery capacity.<br>" +
            "• <strong>Winch Mode:</strong> 20m drop cable for slope/canopy deliveries.<br>" +
            "• <strong>Ceiling:</strong> 6,000m ASL mountain flights.<br>" +
            "• <strong>Location:</strong> Dagupan City, Pangasinan HQ + Nationwide dispatch.<br><br>" +
            "👉 If you need direct assistance from a flight specialist, please type <strong>\"live agent\"</strong> or call <strong>0917 746 7093</strong>."
          );
        }
      }, 420);
    }
  }

  // Self-initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectBotUI);
  } else {
    injectBotUI();
  }
})();

