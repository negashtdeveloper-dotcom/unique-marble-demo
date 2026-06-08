/*!
 * Hoorak AI Widget — Unique Marble Edition  v1.0
 * Modes: Sales · Booking · Support · Estimation · Q&A
 * URL-aware + product card integration
 */
(function (global) {
  'use strict';

  /* ── Config ─────────────────────────────────────────────────── */
  var AVATAR = 'https://negashtdeveloper-dotcom.github.io/temple-of-heal/assets/hoorak-agent.png';
  var LOGO   = 'https://negashtdeveloper-dotcom.github.io/temple-of-heal/assets/hoorak-logo.png';

  /* ── CSS ─────────────────────────────────────────────────────── */
  var CSS = [
    '#hk{position:fixed;bottom:1.5rem;right:1.5rem;z-index:99999;display:flex;flex-direction:column;align-items:flex-end;gap:.75rem;font-family:"DM Sans",system-ui,sans-serif;}',
    '#hk *{box-sizing:border-box;margin:0;padding:0;font-family:inherit;}',

    /* Panel */
    '#hkp{width:370px;background:#fff;border-radius:1.25rem;box-shadow:0 20px 60px rgba(0,0,0,.18);display:flex;flex-direction:column;overflow:hidden;max-height:580px;transform:translateY(1rem) scale(.97);opacity:0;pointer-events:none;transition:transform .28s cubic-bezier(.34,1.4,.64,1),opacity .2s ease;}',
    '#hkp.hko{transform:translateY(0) scale(1);opacity:1;pointer-events:all;}',

    /* Header */
    '.hkh{background:#2C2420;padding:1rem 1.25rem .8rem;flex-shrink:0;}',
    '.hkht{display:flex;align-items:center;gap:.75rem;margin-bottom:.8rem;}',
    '.hkav{width:44px;height:44px;border-radius:50%;overflow:hidden;border:2.5px solid #C49B3C;flex-shrink:0;background:#1A1614;}',
    '.hkav img{width:100%;height:100%;object-fit:cover;}',
    '.hkai{flex:1;min-width:0;}',
    '.hkan{color:#fff;font-weight:700;font-size:.9rem;display:flex;align-items:center;gap:.35rem;}',
    '.hkod{width:8px;height:8px;border-radius:50%;background:#4ade80;flex-shrink:0;animation:hkP 2s infinite;}',
    '.hkat{color:rgba(255,255,255,.6);font-size:.75rem;margin-top:.1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.hkxb{background:rgba(255,255,255,.12);border:none;color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;transition:background .2s;flex-shrink:0;}',
    '.hkxb:hover{background:rgba(255,255,255,.24);}',

    /* Mode tabs */
    '.hkts{display:flex;gap:.3rem;flex-wrap:wrap;}',
    '.hkt{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.65);font-size:.7rem;font-weight:500;padding:.22rem .55rem;border-radius:999px;cursor:pointer;transition:all .15s;white-space:nowrap;line-height:1.5;}',
    '.hkt:hover{background:rgba(255,255,255,.2);color:#fff;}',
    '.hkt.hkta{background:#C49B3C;border-color:#C49B3C;color:#1a1a1a;font-weight:700;}',

    /* Body */
    '.hkb{flex:1;overflow-y:auto;padding:1rem;background:#f8f7f4;display:flex;flex-direction:column;gap:.75rem;min-height:0;}',
    '.hkb::-webkit-scrollbar{width:4px;}',
    '.hkb::-webkit-scrollbar-thumb{background:#ddd;border-radius:4px;}',

    /* Quick actions */
    '.hkq{display:grid;grid-template-columns:1fr 1fr;gap:.45rem;}',
    '.hkqb{background:#fff;border:1px solid #e2d9cc;color:#1A1A1A;font-size:.78rem;font-weight:500;padding:.55rem .7rem;border-radius:.7rem;cursor:pointer;text-align:left;line-height:1.35;transition:all .15s;}',
    '.hkqb:hover{background:#F9F5F0;border-color:#C49B3C;transform:translateY(-1px);box-shadow:0 3px 10px rgba(0,0,0,.08);}',

    /* Calculator panel */
    '.hkcalc{background:#fff;border:1px solid #e2d9cc;border-radius:.75rem;padding:.85rem;display:flex;flex-direction:column;gap:.6rem;}',
    '.hkcalc label{font-size:.75rem;font-weight:600;color:#5A4E45;}',
    '.hkcalc input,.hkcalc select{width:100%;padding:.45rem .7rem;border:1px solid #e2d9cc;border-radius:.5rem;font-size:.84rem;color:#1A1A1A;background:#f8f7f4;outline:none;}',
    '.hkcalc input:focus,.hkcalc select:focus{border-color:#2C2420;}',
    '.hkcalc-row{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;}',
    '.hkcalc-result{background:#2C2420;color:#fff;border-radius:.5rem;padding:.6rem .85rem;font-size:.85rem;font-weight:600;}',
    '.hkcalc-btn{background:#C49B3C;color:#fff;border:none;border-radius:.5rem;padding:.5rem;font-size:.83rem;font-weight:700;cursor:pointer;transition:background .2s;}',
    '.hkcalc-btn:hover{background:#a8842e;}',

    /* Messages */
    '.hkms{display:flex;flex-direction:column;gap:.6rem;}',
    '.hkm{max-width:85%;padding:.65rem .9rem;border-radius:1rem;font-size:.86rem;line-height:1.5;animation:hkF .22s ease;}',
    '.hkm.hkbot{background:#fff;border:1px solid #e2d9cc;border-bottom-left-radius:.3rem;align-self:flex-start;color:#1A1A1A;}',
    '.hkm.hkusr{background:#2C2420;color:#fff;border-bottom-right-radius:.3rem;align-self:flex-end;}',

    /* Typing */
    '.hkty{display:inline-flex;gap:4px;align-items:center;padding:.65rem .9rem;background:#fff;border:1px solid #e2d9cc;border-radius:1rem;border-bottom-left-radius:.3rem;width:fit-content;}',
    '.hkty span{width:7px;height:7px;border-radius:50%;background:#2C2420;display:inline-block;animation:hkD .9s infinite ease-in-out alternate;}',
    '.hkty span:nth-child(2){animation-delay:.15s;}',
    '.hkty span:nth-child(3){animation-delay:.3s;}',

    /* Input bar */
    '.hkib{display:flex;align-items:flex-end;gap:.5rem;padding:.75rem 1rem;border-top:1px solid #e8e0d5;background:#fff;flex-shrink:0;}',
    '.hkin{flex:1;border:1px solid #e2d9cc;border-radius:.65rem;padding:.55rem .85rem;font-size:.86rem;color:#1A1A1A;background:#f8f7f4;outline:none;resize:none;min-height:38px;max-height:90px;line-height:1.45;transition:border-color .2s;}',
    '.hkin:focus{border-color:#2C2420;background:#fff;}',
    '.hksb{width:38px;height:38px;border-radius:50%;background:#C49B3C;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .15s;}',
    '.hksb:hover{background:#a8842e;transform:scale(1.08);}',
    '.hksb svg{width:17px;height:17px;}',

    /* Footer */
    '.hkf{padding:.4rem 1rem;background:#fff;border-top:1px solid #f0e8df;display:flex;justify-content:center;flex-shrink:0;}',
    '.hkf a{display:inline-flex;align-items:center;gap:.35rem;font-size:.68rem;color:#aaa;text-decoration:none;transition:color .2s;}',
    '.hkf a:hover{color:#2C2420;}',
    '.hkfl{height:13px;opacity:.55;vertical-align:middle;}',

    /* Trigger */
    '#hktr{display:flex;align-items:center;gap:.55rem;justify-content:flex-end;}',
    '#hklb{background:#2C2420;color:#fff;font-size:.8rem;font-weight:600;padding:.42rem .95rem;border-radius:999px;cursor:pointer;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,.2);transition:background .2s,transform .15s;display:flex;align-items:center;gap:.35rem;}',
    '#hklb:hover{background:#1A1614;transform:translateY(-1px);}',
    '#hkbtn{width:58px;height:58px;border-radius:50%;background:#2C2420;border:3px solid #C49B3C;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(0,0,0,.22);position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s;flex-shrink:0;}',
    '#hkbtn:hover{transform:scale(1.08);box-shadow:0 8px 30px rgba(0,0,0,.28);}',
    '#hkbtn .hkbf{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:opacity .2s;}',
    '#hkbtn .hkbc{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#2C2420;opacity:0;transition:opacity .2s;color:#fff;font-size:1.3rem;}',
    '#hkbtn.hko .hkbc{opacity:1;}',
    '#hkbtn.hko .hkbf{opacity:0;}',
    '.hkrg{position:absolute;top:-2px;right:-2px;width:13px;height:13px;background:#4ade80;border-radius:50%;border:2px solid #fff;animation:hkP 2s infinite;}',
    '#hkbtn.hko .hkrg{display:none;}',

    /* Animations */
    '@keyframes hkP{0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,.45)}50%{box-shadow:0 0 0 8px rgba(74,222,128,0)}}',
    '@keyframes hkD{from{opacity:.2;transform:scale(.8)}to{opacity:1;transform:scale(1)}}',
    '@keyframes hkF{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}',

    /* Mobile */
    '@media(max-width:480px){#hkp{width:calc(100vw - 2rem);}#hk{bottom:1rem;right:1rem;}}',
  ].join('');

  /* ── Mode definitions ────────────────────────────────────────── */
  var MODES = {
    sales: {
      label: 'Sales', icon: '💼', tagline: 'Find the Right Material',
      welcome: "Hi! I'm Hoorak, your material advisor. Tell me about your project and I'll recommend the best stone, porcelain, or tile for your space.",
      quick: [
        { l: '🍳 Kitchen countertop',   m: "I need a countertop for my kitchen" },
        { l: '🛁 Bathroom surfaces',    m: "I'm renovating my bathroom" },
        { l: '🔥 Fireplace feature',    m: "I want a stone fireplace feature wall" },
        { l: '🏠 Floor & wall tiles',   m: "I need tiles for flooring or walls" },
      ],
      responses: [
        "Great choice! For kitchens, I usually recommend a polished porcelain slab — it's durable, stain-resistant, and easier to maintain than natural stone. Calacatta Gold and Panda are our most popular countertop choices. Would you like to see them in person?",
        "For bathrooms, you have beautiful options. Bianco Carrara gives a classic, clean look. For something dramatic, Nero Marquina with polished finish is stunning. What size is the bathroom? That'll help me narrow it down.",
        "Fireplace walls are a showstopper opportunity! Translucent Onyx backlit with warm LED is our most jaw-dropping option. Black porcelain like our Nero series also looks incredibly dramatic. Do you have a preferred color palette?",
        "For floors, porcelain tile is the go-to — especially our 24×48 format which makes spaces feel larger. Would you like me to match it with a complementary wall tile from our collection?",
        "I'd love to help you find the perfect material. Our showroom is open Mon–Sat and you can see and touch every material in person. Would you like to book a free consultation appointment?",
      ],
    },
    booking: {
      label: 'Booking', icon: '📅', tagline: 'Schedule Your Visit',
      welcome: "Hello! I'm Hoorak, your booking assistant. Let's get you into our showroom. What type of visit are you looking for?",
      quick: [
        { l: '🏛️ Showroom visit',      m: "I want to visit the showroom" },
        { l: '💻 Virtual consultation', m: "I prefer a virtual consultation" },
        { l: '📐 Bring my dimensions',  m: "I have my room dimensions ready" },
        { l: '🔄 Reschedule',            m: "I need to reschedule my appointment" },
      ],
      responses: [
        "Perfect! Our showroom is at Unit 208, 7250 Keele St in Vaughan. We're open Monday–Friday 9am–6pm and Saturday 10am–4pm. What day works best for you?",
        "Great — virtual consultations are available weekdays 10am–5pm via video call. I'll need your email to send the meeting link. What's a good day this week or next?",
        "Excellent — having your dimensions ready will make the consultation much more productive! Our team can calculate exactly how much material you'll need and give you an accurate quote on the spot. Would you like to book for this week?",
        "No problem! Tell me your current appointment date and I'll check what's available to rebook. We'll get you in at the best time for you.",
        "Wonderful! Could I get your name and a contact email so we can send you a confirmation with the showroom details and what to bring?",
      ],
    },
    support: {
      label: 'Support', icon: '🛟', tagline: "We're Here to Help",
      welcome: "Hi! I'm Hoorak. Have a question about care, delivery, or your order? I'm here to help.",
      quick: [
        { l: '🚚 Delivery & shipping',  m: "How does delivery work?" },
        { l: '🧽 Stone care tips',      m: "How do I care for my marble or porcelain?" },
        { l: '📦 Order status',         m: "I want to check my order status" },
        { l: '🔧 Custom fabrication',   m: "Do you offer custom cuts or fabrication?" },
      ],
      responses: [
        "We deliver across the GTA and surrounding areas. For larger orders (full slabs), delivery is typically included or available at a reduced rate. For small tile orders, delivery starts at $75. Would you like a delivery estimate for your location?",
        "Great question! For natural marble: seal annually, clean with pH-neutral cleaner, avoid acidic products (vinegar, lemon). For porcelain slabs: they're nearly maintenance-free — just mild soap and water. Would you like a full care guide emailed to you?",
        "To check your order, I'll need your name or order number. Alternatively, you can call us directly at +1 647-740-7403 and our team can look it up immediately.",
        "Yes! We offer professional fabrication and installation including custom edge profiles, cutouts (sinks, cooktops), and book-matching. Prices depend on the complexity of the cut. Would you like a fabrication quote?",
        "Is there anything else I can help with? Our team is also reachable by phone (+1 647-740-7403) or WhatsApp for urgent inquiries.",
      ],
    },
    estimate: {
      label: 'Estimate', icon: '📐', tagline: 'Calculate Your Project',
      welcome: "Hi! I'm Hoorak, your project calculator. Tell me your room dimensions and I'll calculate how much material you need — instantly.",
      quick: [
        { l: '🍳 Kitchen countertop',  m: "Calculate for my kitchen countertop" },
        { l: '🚿 Bathroom floor',      m: "Calculate for my bathroom floor" },
        { l: '🏠 Large floor area',    m: "Calculate for a large living area" },
        { l: '🔲 Feature wall',        m: "Calculate for a feature wall" },
      ],
      responses: [
        "For a kitchen countertop, I need the perimeter length in feet. A typical kitchen island (4×8 ft) = 32 sq ft of slab. Most of our 5×10 slabs cover 50 sq ft — one slab handles most islands with material to spare. What are your countertop dimensions?",
        "For bathroom floors, please give me the length × width in feet. Don't forget to add 10% waste for cuts and breakage. Example: a 8×10 ft bathroom = 80 sq ft + 8 sq ft waste = ~88 sq ft or about 16 tiles (24×24 format).",
        "Large floor areas: divide the total sq ft by the tile area. A 24×48 tile covers ~8 sq ft. So a 400 sq ft living room needs about 55 tiles + 10% extra = ~60 tiles. What's the area you're covering?",
        "Feature walls: height × width gives you sq ft. A standard 9ft × 12ft wall = 108 sq ft. Two of our 4×9 slabs would cover that beautifully with minimal waste. What are the wall dimensions?",
        "Let me run those numbers for you. Based on your dimensions, you'll need approximately [X] sq ft. I'd recommend adding 10–15% for waste. Would you like me to prepare a quote for that quantity?",
      ],
      showCalc: true,
    },
    qa: {
      label: 'Q&A', icon: '❓', tagline: 'Ask Anything',
      welcome: "Hi! I'm Hoorak. Ask me anything about our materials, services, or showroom — I'm happy to help!",
      quick: [
        { l: '🪨 Marble vs. Porcelain?', m: "What's the difference between marble and porcelain?" },
        { l: '💰 What are typical costs?', m: "What do slabs typically cost?" },
        { l: '📏 What sizes do you carry?', m: "What slab and tile sizes do you stock?" },
        { l: '🛻 Do you install?',          m: "Do you offer installation services?" },
      ],
      responses: [
        "Great question! Natural marble is unique — every slab is one-of-a-kind with natural veining. It's porous and needs sealing but has timeless beauty. Porcelain slabs mimic the look of marble but are harder, non-porous, and basically maintenance-free. For high-traffic kitchens, many designers now prefer porcelain for practicality.",
        "Material costs vary by type. Porcelain slabs typically range from $15–$40 per sq ft depending on the collection. Natural marble is $20–$80+ per sq ft. Translucent onyx is a premium product at $60–$150+ per sq ft. Fabrication and installation are priced separately. Want a specific quote?",
        "We stock porcelain slabs in 5×10, 4×9, and 4×8 formats. Tiles come in 12×24, 24×24, and 24×48 inch sizes. Natural stones vary by slab. We have 100+ materials in our showroom — best to visit and see them all!",
        "Yes! We offer full fabrication (custom cuts, edge profiles, sink cutouts) and professional installation across the GTA. We also offer material-only if you have your own installer. What works better for your project?",
        "Happy to answer more! What else can I help you with about our materials or services?",
      ],
    },
  };

  /* ── Build HTML ─────────────────────────────────────────────── */
  function tabsHTML() {
    return Object.keys(MODES).map(function (k) {
      var m = MODES[k];
      return '<button class="hkt" data-mode="' + k + '">' + m.icon + ' ' + m.label + '</button>';
    }).join('');
  }

  function quickHTML(mode) {
    return mode.quick.map(function (a) {
      return '<button class="hkqb" data-msg="' + a.m.replace(/"/g,'&quot;') + '">' + a.l + '</button>';
    }).join('');
  }

  function calcHTML() {
    return [
      '<div class="hkcalc" id="hk-calc">',
        '<div style="font-size:.8rem;font-weight:700;color:#1A1614;margin-bottom:.25rem;">📐 Instant Estimator</div>',
        '<div class="hkcalc-row">',
          '<div><label for="hk-len">Length (ft)</label><input id="hk-len" type="number" min="0" placeholder="e.g. 12" oninput="hkCalc()"></div>',
          '<div><label for="hk-wid">Width (ft)</label><input id="hk-wid" type="number" min="0" placeholder="e.g. 10" oninput="hkCalc()"></div>',
        '</div>',
        '<div><label for="hk-mat">Material type</label>',
          '<select id="hk-mat" onchange="hkCalc()">',
            '<option value="slab5x10">Porcelain Slab 5×10 (50 sq ft)</option>',
            '<option value="slab4x9">Porcelain Slab 4×9 (36 sq ft)</option>',
            '<option value="tile2448">Tile 24×48 (8 sq ft)</option>',
            '<option value="tile2424">Tile 24×24 (4 sq ft)</option>',
            '<option value="tile1224">Tile 12×24 (2 sq ft)</option>',
          '</select>',
        '</div>',
        '<div class="hkcalc-result" id="hk-result">Enter dimensions above ↑</div>',
        '<button class="hkcalc-btn" onclick="hkRequestQuote()">Request a Quote for This →</button>',
      '</div>',
    ].join('');
  }

  /* Calc logic exposed globally */
  global.hkCalc = function () {
    var l   = parseFloat(document.getElementById('hk-len').value) || 0;
    var w   = parseFloat(document.getElementById('hk-wid').value) || 0;
    var mat = document.getElementById('hk-mat').value;
    var sqft = l * w;
    if (!sqft) { document.getElementById('hk-result').textContent = 'Enter dimensions above ↑'; return; }

    var withWaste = Math.ceil(sqft * 1.12);
    var unitMap = { slab5x10: 50, slab4x9: 36, tile2448: 8, tile2424: 4, tile1224: 2 };
    var unitLabel = { slab5x10: 'slabs (5×10)', slab4x9: 'slabs (4×9)', tile2448: 'tiles (24×48)', tile2424: 'tiles (24×24)', tile1224: 'tiles (12×24)' };
    var unitArea = unitMap[mat];
    var units = Math.ceil(withWaste / unitArea);
    document.getElementById('hk-result').textContent =
      sqft + ' sq ft area → ' + withWaste + ' sq ft with waste → ~' + units + ' ' + unitLabel[mat];
  };

  global.hkRequestQuote = function () {
    var res = document.getElementById('hk-result');
    if (res && res.textContent && res.textContent !== 'Enter dimensions above ↑') {
      if (global.HoorakWidget) global.HoorakWidget.open('I need a quote for: ' + res.textContent);
    }
  };

  /* ── Widget controller ───────────────────────────────────────── */
  function Widget() {
    this.isOpen  = false;
    this.mode    = this.detectMode();
    this.ridx    = {};
    this.started = false;

    // Inject CSS
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    // Build widget
    var wrap = document.createElement('div');
    wrap.id = 'hk';
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Hoorak AI Assistant');
    wrap.innerHTML = [
      '<div id="hkp" aria-live="polite">',
        '<div class="hkh">',
          '<div class="hkht">',
            '<div class="hkav"><img src="' + AVATAR + '" alt="Hoorak" onerror="this.style.display=\'none\'"></div>',
            '<div class="hkai">',
              '<div class="hkan">Hoorak AI<span class="hkod"></span></div>',
              '<div class="hkat" id="hk-tag">Your stone advisor</div>',
            '</div>',
            '<button class="hkxb" id="hk-x" aria-label="Close">✕</button>',
          '</div>',
          '<div class="hkts" id="hk-tabs" role="tablist">' + tabsHTML() + '</div>',
        '</div>',
        '<div class="hkb" id="hk-body">',
          '<div id="hk-intro">',
            '<div class="hkms" id="hk-wmsg"></div>',
            '<div class="hkq" id="hk-quick"></div>',
          '</div>',
          '<div class="hkms" id="hk-msgs" style="display:none;"></div>',
        '</div>',
        '<div class="hkib">',
          '<textarea class="hkin" id="hk-in" rows="1" placeholder="Type a message…" aria-label="Message Hoorak"></textarea>',
          '<button class="hksb" id="hk-send" aria-label="Send">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="#1A1614" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">',
              '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
            '</svg>',
          '</button>',
        '</div>',
        '<div class="hkf">',
          '<a href="https://hoorak.com" target="_blank" rel="noopener">',
            'Powered by <img class="hkfl" src="' + LOGO + '" alt="Hoorak">',
          '</a>',
        '</div>',
      '</div>',
      '<div id="hktr">',
        '<span id="hklb" role="button" tabindex="0">✨ Ask Hoorak</span>',
        '<button id="hkbtn" aria-expanded="false" aria-label="Open Hoorak chat" aria-controls="hkp">',
          '<img class="hkbf" src="' + AVATAR + '" alt="Hoorak" onerror="this.style.display=\'none\'">',
          '<span class="hkbc" aria-hidden="true">✕</span>',
          '<span class="hkrg" aria-hidden="true"></span>',
        '</button>',
      '</div>',
    ].join('');
    document.body.appendChild(wrap);

    // Refs
    this.panel   = document.getElementById('hkp');
    this.body    = document.getElementById('hk-body');
    this.intro   = document.getElementById('hk-intro');
    this.wmsg    = document.getElementById('hk-wmsg');
    this.quick   = document.getElementById('hk-quick');
    this.msgs    = document.getElementById('hk-msgs');
    this.input   = document.getElementById('hk-in');
    this.send    = document.getElementById('hk-send');
    this.xbtn    = document.getElementById('hk-x');
    this.trbtn   = document.getElementById('hkbtn');
    this.label   = document.getElementById('hklb');
    this.tagEl   = document.getElementById('hk-tag');
    this.tabs    = document.querySelectorAll('.hkt');

    this.loadMode(this.mode);
    this.bind();
  }

  Widget.prototype.detectMode = function () {
    var path = location.pathname.toLowerCase();
    if (/booking|appointment|schedule/.test(path)) return 'booking';
    if (/quote|estimate|calculator/.test(path))    return 'estimate';
    if (/contact|support|help/.test(path))         return 'support';
    if (/product|slab|tile|stone|marble/.test(path)) return 'sales';
    return 'qa';
  };

  Widget.prototype.loadMode = function (modeId) {
    this.mode    = modeId;
    this.started = false;

    var m = MODES[modeId];
    this.tagEl.textContent = m.tagline;
    this.tabs.forEach(function (t) { t.classList.toggle('hkta', t.dataset.mode === modeId); });

    this.intro.style.display = '';
    this.msgs.style.display  = 'none';
    this.wmsg.innerHTML      = '';
    this.quick.innerHTML     = '';
    this.msgs.innerHTML      = '';

    this.addMsg(this.wmsg, m.welcome, 'bot');

    if (m.showCalc) {
      var calcWrap = document.createElement('div');
      calcWrap.innerHTML = calcHTML();
      this.wmsg.appendChild(calcWrap.firstChild);
    }

    this.quick.innerHTML = quickHTML(m);
    var self = this;
    this.quick.querySelectorAll('.hkqb').forEach(function (b) {
      b.addEventListener('click', function () { self.submit(b.dataset.msg); });
    });
  };

  Widget.prototype.toChat = function () {
    if (this.started) return;
    this.started          = true;
    this.intro.style.display = 'none';
    this.msgs.style.display  = '';
  };

  Widget.prototype.addMsg = function (container, text, role) {
    var el = document.createElement('div');
    el.className = 'hkm hk' + role;
    el.textContent = text;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    this.body.scrollTop = this.body.scrollHeight;
    return el;
  };

  Widget.prototype.typing = function () {
    var el = document.createElement('div');
    el.className = 'hkty';
    el.innerHTML = '<span></span><span></span><span></span>';
    this.msgs.appendChild(el);
    this.body.scrollTop = this.body.scrollHeight;
    return el;
  };

  Widget.prototype.getResp = function () {
    var arr = MODES[this.mode].responses;
    var idx = this.ridx[this.mode] || 0;
    var r   = arr[idx % arr.length];
    this.ridx[this.mode] = idx + 1;
    return r;
  };

  Widget.prototype.submit = function (text) {
    if (!text || !text.trim()) return;
    this.toChat();
    this.addMsg(this.msgs, text, 'usr');
    this.input.value = '';
    this.resize();

    var self = this;
    var t    = this.typing();
    setTimeout(function () {
      t.remove();
      self.addMsg(self.msgs, self.getResp(), 'bot');
    }, 850 + Math.random() * 550);
  };

  Widget.prototype.resize = function () {
    this.input.style.height = 'auto';
    this.input.style.height = Math.min(this.input.scrollHeight, 90) + 'px';
  };

  Widget.prototype.open = function (preMsg) {
    this.isOpen = true;
    this.panel.classList.add('hko');
    this.trbtn.classList.add('hko');
    this.trbtn.setAttribute('aria-expanded', 'true');
    if (preMsg) {
      var self = this;
      setTimeout(function () { self.submit(preMsg); }, 200);
    } else {
      this.input.focus();
    }
  };

  Widget.prototype.close = function () {
    this.isOpen = false;
    this.panel.classList.remove('hko');
    this.trbtn.classList.remove('hko');
    this.trbtn.setAttribute('aria-expanded', 'false');
  };

  Widget.prototype.toggle = function () { this.isOpen ? this.close() : this.open(); };

  Widget.prototype.bind = function () {
    var self = this;

    this.trbtn.addEventListener('click', function () { self.toggle(); });
    this.label.addEventListener('click', function () { self.toggle(); });
    this.label.addEventListener('keydown', function (e) { if (e.key==='Enter'||e.key===' ') self.toggle(); });
    this.xbtn.addEventListener('click', function () { self.close(); });

    document.addEventListener('click', function (e) {
      if (self.isOpen && !document.getElementById('hk').contains(e.target)) self.close();
    });
    document.addEventListener('keydown', function (e) { if (e.key==='Escape' && self.isOpen) self.close(); });

    this.send.addEventListener('click', function () { self.submit(self.input.value.trim()); });
    this.input.addEventListener('keydown', function (e) {
      if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); self.submit(self.input.value.trim()); }
    });
    this.input.addEventListener('input', function () { self.resize(); });

    this.tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { self.loadMode(tab.dataset.mode); });
    });
  };

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    if (document.getElementById('hk')) return;
    global.HoorakWidget = new Widget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window);
