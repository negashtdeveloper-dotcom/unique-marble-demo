/*!
 * Hoorak AI Widget — Unique Marble Edition  v2.0
 * ─────────────────────────────────────────────────────────────
 * Improvements over v1:
 *  • Avatar beside every bot message
 *  • Typewriter effect on welcome message
 *  • Proactive popup after 20 s idle (with notification badge)
 *  • Full-width quick-action cards (not cramped 2-col grid)
 *  • "Back to suggestions" button once chat starts
 *  • Gradient header + gold send button
 *  • Message timestamps
 *  • WhatsApp escalation in footer
 *  • Redesigned sq-ft calculator (tool feel, not form feel)
 *  • Smooth spring open/close + staggered card entry
 *  • Mobile-first sizing (full-width on ≤ 480 px)
 * ─────────────────────────────────────────────────────────────
 */
(function (W) {
  'use strict';

  var AVATAR  = 'https://negashtdeveloper-dotcom.github.io/temple-of-heal/assets/hoorak-agent.png';
  var LOGO    = 'https://negashtdeveloper-dotcom.github.io/temple-of-heal/assets/hoorak-logo.png';
  var WA_LINK = 'https://wa.me/16477407403';

  /* ── Palette tokens ─────────────────────────────────────────── */
  var C = {
    hdr1: '#1A1614', hdr2: '#2E2825',
    gold: '#C49B3C', goldH: '#A8842E',
    goldLt: '#F5EDD5',
    bg: '#F7F4F0', white: '#FFFFFF',
    border: '#E4DDD5',
    text: '#1C1815', textMid: '#5A4E45', textLt: '#9A8A7A',
    userBg: '#2C2420',
    green: '#22C55E',
  };

  /* ══════════════════════════════════════════════════════════════
     CSS
  ══════════════════════════════════════════════════════════════ */
  var CSS = '\
#hkW{position:fixed;bottom:1.5rem;right:1.5rem;z-index:2147483647;\
  display:flex;flex-direction:column;align-items:flex-end;gap:.65rem;\
  font-family:"DM Sans",system-ui,sans-serif;}\
#hkW *{box-sizing:border-box;margin:0;padding:0;font-family:inherit;}\
\
/* ── Panel ───────────────────────────────────────────── */\
#hkPanel{\
  width:400px;background:'+C.white+';border-radius:1.5rem;\
  box-shadow:0 24px 80px rgba(0,0,0,.22),0 4px 16px rgba(0,0,0,.08);\
  display:flex;flex-direction:column;overflow:hidden;\
  max-height:620px;\
  transform:translateY(14px) scale(.96);opacity:0;pointer-events:none;\
  transition:transform .32s cubic-bezier(.34,1.45,.64,1),opacity .22s ease;\
  transform-origin:bottom right;\
}\
#hkPanel.hkOpen{\
  transform:translateY(0) scale(1);opacity:1;pointer-events:all;\
}\
\
/* ── Header ──────────────────────────────────────────── */\
.hkHdr{\
  background:linear-gradient(160deg,'+C.hdr1+' 0%,'+C.hdr2+' 100%);\
  padding:1.1rem 1.1rem .85rem;flex-shrink:0;\
}\
.hkHdrTop{display:flex;align-items:center;gap:.8rem;margin-bottom:.85rem;}\
.hkAv{\
  position:relative;flex-shrink:0;\
  width:46px;height:46px;\
}\
.hkAv img{\
  width:46px;height:46px;border-radius:50%;object-fit:cover;\
  object-position:top center;\
  border:2.5px solid '+C.gold+';\
  display:block;\
}\
.hkDot{\
  position:absolute;bottom:0;right:0;\
  width:12px;height:12px;border-radius:50%;\
  background:'+C.green+';border:2px solid '+C.hdr1+';\
}\
.hkAgentInfo{flex:1;min-width:0;}\
.hkAgentName{\
  color:#fff;font-weight:700;font-size:.92rem;letter-spacing:.01em;\
  display:flex;align-items:center;gap:.4rem;\
}\
.hkBadge{\
  font-size:.62rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;\
  background:'+C.gold+';color:'+C.hdr1+';padding:.1rem .45rem;\
  border-radius:999px;flex-shrink:0;\
}\
.hkAgentSub{color:rgba(255,255,255,.55);font-size:.75rem;margin-top:.15rem;}\
.hkHdrBtns{display:flex;gap:.4rem;align-items:center;}\
.hkIconBtn{\
  width:30px;height:30px;border-radius:50%;\
  background:rgba(255,255,255,.1);border:none;color:rgba(255,255,255,.7);\
  display:flex;align-items:center;justify-content:center;\
  cursor:pointer;font-size:.9rem;transition:background .18s,color .18s;\
  flex-shrink:0;\
}\
.hkIconBtn:hover{background:rgba(255,255,255,.22);color:#fff;}\
\
/* ── Mode tabs ───────────────────────────────────────── */\
.hkTabs{\
  display:flex;gap:.3rem;overflow-x:auto;padding-bottom:.15rem;\
  scrollbar-width:none;\
}\
.hkTabs::-webkit-scrollbar{display:none;}\
.hkTab{\
  flex-shrink:0;\
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);\
  color:rgba(255,255,255,.6);font-size:.7rem;font-weight:600;\
  padding:.28rem .7rem;border-radius:999px;\
  cursor:pointer;transition:all .16s;white-space:nowrap;line-height:1.5;\
}\
.hkTab:hover{background:rgba(255,255,255,.18);color:#fff;}\
.hkTab.hkTabOn{\
  background:'+C.gold+';border-color:'+C.gold+';\
  color:'+C.hdr1+';font-weight:700;\
}\
\
/* ── Chat area ───────────────────────────────────────── */\
.hkChat{\
  flex:1;overflow-y:auto;padding:.9rem 1rem;\
  background:'+C.bg+';display:flex;flex-direction:column;\
  gap:.55rem;min-height:0;scroll-behavior:smooth;\
}\
.hkChat::-webkit-scrollbar{width:3px;}\
.hkChat::-webkit-scrollbar-thumb{background:#d8d0c8;border-radius:3px;}\
\
/* ── Message rows ────────────────────────────────────── */\
.hkRow{display:flex;align-items:flex-end;gap:.5rem;animation:hkFadeUp .22s ease both;}\
.hkRow.hkBotRow{justify-content:flex-start;}\
.hkRow.hkUsrRow{justify-content:flex-end;}\
.hkMsgAv{\
  width:28px;height:28px;border-radius:50%;\
  object-fit:cover;object-position:top center;\
  flex-shrink:0;opacity:0;\
  border:1.5px solid '+C.border+';\
  transition:opacity .3s;\
}\
.hkMsgAv.hkAvVis{opacity:1;}\
\
/* ── Bubbles ─────────────────────────────────────────── */\
.hkBubble{\
  max-width:78%;padding:.7rem .95rem;\
  font-size:.875rem;line-height:1.55;\
  position:relative;\
}\
.hkBubble.hkBot{\
  background:'+C.white+';color:'+C.text+';\
  border:1px solid '+C.border+';\
  border-radius:1.1rem 1.1rem 1.1rem .25rem;\
  box-shadow:0 2px 8px rgba(0,0,0,.06);\
}\
.hkBubble.hkUsr{\
  background:'+C.userBg+';color:#fff;\
  border-radius:1.1rem 1.1rem .25rem 1.1rem;\
  box-shadow:0 2px 8px rgba(0,0,0,.12);\
}\
.hkTime{\
  display:block;font-size:.65rem;\
  margin-top:.3rem;opacity:.5;text-align:right;\
}\
.hkBubble.hkBot .hkTime{text-align:left;}\
\
/* ── Typing indicator ────────────────────────────────── */\
.hkTyping{\
  display:inline-flex;gap:5px;align-items:center;\
  padding:.7rem .95rem;\
  background:'+C.white+';border:1px solid '+C.border+';\
  border-radius:1.1rem 1.1rem 1.1rem .25rem;\
  box-shadow:0 2px 8px rgba(0,0,0,.06);\
  width:fit-content;\
}\
.hkTyping span{\
  width:7px;height:7px;border-radius:50%;\
  background:'+C.goldH+';display:inline-block;\
  animation:hkDot .85s infinite ease-in-out alternate;\
}\
.hkTyping span:nth-child(2){animation-delay:.17s;}\
.hkTyping span:nth-child(3){animation-delay:.34s;}\
\
/* ── Quick-action cards (full-width) ─────────────────── */\
.hkQuick{\
  display:flex;flex-direction:column;gap:.4rem;\
  animation:hkFadeUp .3s ease both;\
}\
.hkQCard{\
  background:'+C.white+';border:1.5px solid '+C.border+';\
  border-radius:.85rem;padding:.7rem 1rem;\
  display:flex;align-items:center;gap:.65rem;\
  cursor:pointer;text-align:left;\
  transition:border-color .18s,box-shadow .18s,transform .18s,background .18s;\
  animation:hkFadeUp .25s ease both;\
}\
.hkQCard:hover{\
  border-color:'+C.gold+';background:'+C.goldLt+';\
  box-shadow:0 4px 16px rgba(196,155,60,.18);\
  transform:translateY(-1px);\
}\
.hkQIcon{\
  font-size:1.2rem;flex-shrink:0;\
  width:34px;height:34px;border-radius:.55rem;\
  background:'+C.bg+';display:flex;align-items:center;justify-content:center;\
}\
.hkQLabel{font-size:.84rem;font-weight:600;color:'+C.text+';flex:1;line-height:1.3;}\
.hkQArrow{\
  font-size:.85rem;color:'+C.goldH+';\
  flex-shrink:0;transition:transform .18s;\
}\
.hkQCard:hover .hkQArrow{transform:translateX(3px);}\
\
/* ── Calculator ──────────────────────────────────────── */\
.hkCalc{\
  background:'+C.white+';border:1.5px solid '+C.border+';\
  border-radius:1rem;overflow:hidden;\
  animation:hkFadeUp .3s ease both;\
}\
.hkCalcHdr{\
  background:'+C.hdr1+';color:#fff;\
  padding:.6rem 1rem;font-size:.78rem;font-weight:700;\
  display:flex;align-items:center;gap:.4rem;\
}\
.hkCalcBody{padding:.85rem;display:flex;flex-direction:column;gap:.6rem;}\
.hkCalcRow{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;}\
.hkCalcLabel{font-size:.72rem;font-weight:700;color:'+C.textMid+';margin-bottom:.2rem;text-transform:uppercase;letter-spacing:.04em;}\
.hkCalcInput{\
  width:100%;padding:.5rem .7rem;\
  border:1.5px solid '+C.border+';border-radius:.6rem;\
  font-size:.88rem;color:'+C.text+';background:'+C.bg+';outline:none;\
  transition:border-color .18s;\
}\
.hkCalcInput:focus{border-color:'+C.gold+';background:#fff;}\
.hkCalcResult{\
  background:linear-gradient(135deg,'+C.hdr1+','+C.hdr2+'80);\
  color:#fff;border-radius:.6rem;\
  padding:.65rem .9rem;font-size:.82rem;line-height:1.5;\
}\
.hkCalcResult strong{color:'+C.gold+';font-size:1.05rem;}\
.hkCalcBtn{\
  width:100%;padding:.6rem;border-radius:.6rem;\
  background:'+C.gold+';color:#fff;border:none;\
  font-size:.82rem;font-weight:700;cursor:pointer;\
  transition:background .18s,transform .15s;\
}\
.hkCalcBtn:hover{background:'+C.goldH+';transform:translateY(-1px);}\
\
/* ── Input bar ───────────────────────────────────────── */\
.hkInputBar{\
  display:flex;align-items:flex-end;gap:.5rem;\
  padding:.7rem .9rem;\
  border-top:1px solid '+C.border+';background:'+C.white+';\
  flex-shrink:0;\
}\
.hkBackBtn{\
  display:none;flex-shrink:0;\
  background:'+C.bg+';border:1.5px solid '+C.border+';\
  color:'+C.textMid+';font-size:.72rem;font-weight:600;\
  padding:.35rem .65rem;border-radius:999px;\
  cursor:pointer;white-space:nowrap;transition:all .18s;\
  align-items:center;gap:.25rem;\
}\
.hkBackBtn.hkVisible{display:flex;}\
.hkBackBtn:hover{border-color:'+C.gold+';color:'+C.goldH+';}\
.hkInput{\
  flex:1;border:1.5px solid '+C.border+';\
  border-radius:.75rem;padding:.55rem .85rem;\
  font-size:.875rem;color:'+C.text+';background:'+C.bg+';\
  outline:none;resize:none;min-height:40px;max-height:96px;\
  line-height:1.5;transition:border-color .18s,background .18s;\
}\
.hkInput:focus{border-color:'+C.gold+';background:#fff;}\
.hkSendBtn{\
  width:40px;height:40px;border-radius:50%;\
  background:linear-gradient(135deg,'+C.gold+','+C.goldH+'80);\
  border:none;cursor:pointer;flex-shrink:0;\
  display:flex;align-items:center;justify-content:center;\
  box-shadow:0 3px 10px rgba(196,155,60,.35);\
  transition:transform .15s,box-shadow .18s;\
}\
.hkSendBtn:hover{transform:scale(1.1);box-shadow:0 5px 16px rgba(196,155,60,.5);}\
.hkSendBtn svg{width:17px;height:17px;fill:none;stroke:#fff;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;}\
\
/* ── Footer ──────────────────────────────────────────── */\
.hkFtr{\
  padding:.45rem 1rem;background:'+C.white+';\
  border-top:1px solid #f0e8df;\
  display:flex;align-items:center;justify-content:space-between;\
  flex-shrink:0;\
}\
.hkFtrBrand{display:inline-flex;align-items:center;gap:.35rem;font-size:.68rem;color:#bbb;text-decoration:none;transition:color .18s;}\
.hkFtrBrand:hover{color:'+C.goldH+';}\
.hkFtrLogo{height:12px;opacity:.5;vertical-align:middle;}\
.hkFtrWa{\
  display:inline-flex;align-items:center;gap:.3rem;\
  font-size:.68rem;font-weight:600;\
  color:#25D366;text-decoration:none;transition:opacity .18s;\
}\
.hkFtrWa:hover{opacity:.75;}\
\
/* ── Proactive popup ─────────────────────────────────── */\
#hkProactive{\
  background:'+C.white+';border-radius:1.1rem;\
  box-shadow:0 12px 40px rgba(0,0,0,.16);\
  padding:1rem 1.1rem .85rem;\
  max-width:280px;border:1px solid '+C.border+';\
  animation:hkSlideUp .3s cubic-bezier(.22,1,.36,1) both;\
  position:relative;\
}\
.hkProClose{\
  position:absolute;top:.55rem;right:.65rem;\
  background:none;border:none;color:'+C.textLt+';\
  font-size:.9rem;cursor:pointer;line-height:1;\
  transition:color .15s;\
}\
.hkProClose:hover{color:'+C.text+';}\
.hkProAv{\
  width:36px;height:36px;border-radius:50%;\
  object-fit:cover;object-position:top center;\
  border:2px solid '+C.gold+';\
  margin-bottom:.6rem;display:block;\
}\
.hkProMsg{\
  font-size:.85rem;font-weight:600;color:'+C.text+';\
  line-height:1.4;margin-bottom:.75rem;\
}\
.hkProSub{font-size:.78rem;color:'+C.textMid+';margin-bottom:.75rem;line-height:1.45;}\
.hkProBtn{\
  width:100%;padding:.55rem .9rem;border-radius:.65rem;\
  background:'+C.gold+';color:#fff;border:none;\
  font-size:.82rem;font-weight:700;cursor:pointer;\
  transition:background .18s;\
}\
.hkProBtn:hover{background:'+C.goldH+';}\
\
/* ── Trigger ─────────────────────────────────────────── */\
#hkTrigRow{display:flex;align-items:center;gap:.6rem;justify-content:flex-end;}\
#hkLabel{\
  background:'+C.hdr1+';color:#fff;\
  font-size:.8rem;font-weight:700;\
  padding:.45rem 1rem;border-radius:999px;\
  cursor:pointer;white-space:nowrap;\
  box-shadow:0 4px 18px rgba(0,0,0,.22);\
  transition:background .2s,transform .15s;\
  display:flex;align-items:center;gap:.4rem;\
  letter-spacing:.01em;\
}\
#hkLabel:hover{background:'+C.userBg+';transform:translateY(-1px);}\
#hkTrig{\
  position:relative;\
  width:60px;height:60px;border-radius:50%;\
  background:'+C.hdr1+';\
  border:3px solid '+C.gold+';\
  cursor:pointer;flex-shrink:0;\
  box-shadow:0 6px 24px rgba(0,0,0,.24);\
  transition:transform .2s,box-shadow .2s;\
  overflow:visible;\
}\
#hkTrig:hover{transform:scale(1.08);box-shadow:0 8px 32px rgba(0,0,0,.3);}\
.hkTrigFace{\
  width:100%;height:100%;border-radius:50%;\
  object-fit:cover;object-position:top center;\
  display:block;transition:opacity .2s;\
  overflow:hidden;\
}\
.hkTrigX{\
  position:absolute;inset:0;border-radius:50%;\
  display:flex;align-items:center;justify-content:center;\
  background:'+C.hdr1+';opacity:0;transition:opacity .2s;\
  color:#fff;font-size:1.25rem;\
}\
#hkTrig.hkOpen .hkTrigX{opacity:1;}\
#hkTrig.hkOpen .hkTrigFace{opacity:0;}\
.hkRing{\
  position:absolute;top:-2px;right:-2px;\
  width:14px;height:14px;\
  background:'+C.green+';border-radius:50%;\
  border:2.5px solid #fff;\
  animation:hkPulse 2s infinite;\
}\
.hkNotif{\
  position:absolute;top:-4px;left:-4px;\
  width:18px;height:18px;\
  background:#ef4444;border-radius:50%;\
  border:2px solid #fff;\
  display:none;align-items:center;justify-content:center;\
  font-size:.62rem;font-weight:700;color:#fff;\
}\
.hkNotif.hkShow{display:flex;animation:hkBounce .5s cubic-bezier(.34,1.56,.64,1);}\
#hkTrig.hkOpen .hkRing{display:none;}\
\
/* ── Keyframes ───────────────────────────────────────── */\
@keyframes hkPulse{\
  0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.4)}\
  50%{box-shadow:0 0 0 9px rgba(34,197,94,0)}\
}\
@keyframes hkDot{\
  from{opacity:.2;transform:scale(.75)}\
  to{opacity:1;transform:scale(1)}\
}\
@keyframes hkFadeUp{\
  from{opacity:0;transform:translateY(10px)}\
  to{opacity:1;transform:translateY(0)}\
}\
@keyframes hkSlideUp{\
  from{opacity:0;transform:translateY(16px)}\
  to{opacity:1;transform:translateY(0)}\
}\
@keyframes hkBounce{\
  from{transform:scale(0)}\
  to{transform:scale(1)}\
}\
@keyframes hkWobble{\
  0%,100%{transform:scale(1) rotate(0)}\
  20%{transform:scale(1.1) rotate(-5deg)}\
  40%{transform:scale(1.1) rotate(5deg)}\
  60%{transform:scale(1.05) rotate(-3deg)}\
  80%{transform:scale(1.05) rotate(3deg)}\
}\
\
/* ── Mobile ──────────────────────────────────────────── */\
@media(max-width:480px){\
  #hkPanel{width:calc(100vw - 1.5rem);max-height:70vh;}\
  #hkW{bottom:1rem;right:.75rem;}\
  #hkProactive{max-width:calc(100vw - 3rem);}\
}';

  /* ══════════════════════════════════════════════════════════════
     MODE DEFINITIONS
  ══════════════════════════════════════════════════════════════ */
  var MODES = {
    sales: {
      id:'sales', label:'Sales', icon:'💼', tagline:'Find Your Perfect Stone',
      welcome:'Hi! I\'m Hoorak — your personal material advisor. Tell me about your project and I\'ll match you with the ideal stone, porcelain, or tile. 🏛️',
      actions:[
        {icon:'🍳', label:'Kitchen countertop',   msg:'I need a countertop for my kitchen'},
        {icon:'🛁', label:'Bathroom renovation',  msg:'I\'m renovating my bathroom'},
        {icon:'🔥', label:'Fireplace feature wall',msg:'I want a stone fireplace feature wall'},
        {icon:'🏠', label:'Flooring or wall tiles',msg:'I need tiles for flooring or walls'},
      ],
      responses:[
        'Great choice! For kitchens, polished porcelain slabs are the gold standard — durable, stain-resistant, and incredibly elegant. Our Calacatta Gold and Panda are the most popular. Would you like to see them in person at our showroom?',
        'For bathrooms, Bianco Carrara gives a timeless spa feel. For drama, Nero Marquina with polished finish is absolutely stunning. What\'s the approximate size of the space?',
        'Fireplace walls are a statement piece! Our Translucent Onyx backlit with warm LED is breathtaking. Black porcelain like Nero Marquina is also extremely dramatic. Any preferred colour palette — light, dark, or warm tones?',
        'For floors, 24×48 porcelain makes spaces feel larger and is essentially maintenance-free. I can also suggest matching wall tiles from the same collection. What\'s the area in square feet?',
        'I\'d love to help you choose the perfect material! Our showroom at 7250 Keele St (Vaughan) is open Mon–Sat. Would you like to book a free consultation?',
      ],
    },
    booking: {
      id:'booking', label:'Booking', icon:'📅', tagline:'Schedule Your Visit',
      welcome:'Hello! I\'m Hoorak, your booking assistant. I\'ll get you into our showroom — or arrange a virtual consultation — in just a few messages. 🗓️',
      actions:[
        {icon:'🏛️', label:'Book a showroom visit',      msg:'I want to visit the showroom'},
        {icon:'💻', label:'Virtual consultation',       msg:'I\'d prefer a virtual consultation'},
        {icon:'📐', label:'I have my dimensions ready', msg:'I have my room dimensions and want a quote'},
        {icon:'🔄', label:'Reschedule my appointment',  msg:'I need to reschedule my appointment'},
      ],
      responses:[
        'Perfect! Our showroom is at Unit 208, 7250 Keele St in Vaughan. Hours: Mon–Fri 9am–6pm · Sat 10am–4pm. What day works best for you this week or next?',
        'Great — we offer video consultations on weekdays 10am–5pm. We\'ll email you a video link. What\'s your preferred day and a good email address to reach you?',
        'Excellent — having your dimensions will make the consultation very productive! Our team can calculate exact quantities and give you an on-the-spot quote. What works for you — morning or afternoon?',
        'No problem at all! What was your original appointment date? I\'ll find the next available slot for you.',
        'Wonderful! Can I get your name and email so I can send you a confirmation with showroom details and a checklist of what to bring?',
      ],
    },
    support: {
      id:'support', label:'Support', icon:'🛟', tagline:"We're Here to Help",
      welcome:'Hi! I\'m Hoorak — here to answer questions about care, delivery, installation, or your order. What can I help with today? 🤝',
      actions:[
        {icon:'🚚', label:'Delivery & shipping info',    msg:'How does delivery work?'},
        {icon:'🧽', label:'Stone care & maintenance',    msg:'How do I care for my marble or porcelain?'},
        {icon:'🔧', label:'Custom fabrication options',  msg:'Do you offer custom cuts or fabrication?'},
        {icon:'📦', label:'Check my order status',      msg:'I want to check my order status'},
      ],
      responses:[
        'We deliver across the Greater Toronto Area and surrounding regions. For full-slab orders, delivery is typically included or available at a flat rate. For smaller tile orders, delivery starts at $75. Want an estimate for your postal code?',
        'For natural marble: seal annually with a stone-specific sealer, clean with pH-neutral soap, and avoid acid (vinegar, lemon, bleach). For porcelain: it\'s virtually maintenance-free — just mild soap and water. Want the full care guide emailed to you?',
        'Absolutely! We offer professional fabrication including custom edge profiles (eased, beveled, waterfall), sink and cooktop cutouts, and book-matched slabs. Pricing depends on complexity. Would you like a fabrication quote?',
        'To look up your order, I\'ll need your name or order number. Alternatively, call us directly at +1 647-740-7403 — our team can pull it up immediately.',
        'You can also reach our team via WhatsApp for quick updates — it\'s often the fastest way for urgent questions. Is there anything else I can help with?',
      ],
    },
    estimate: {
      id:'estimate', label:'Estimate', icon:'📐', tagline:'Project Calculator',
      welcome:'Hi! I\'m Hoorak — your project calculator. Enter your room dimensions and I\'ll instantly tell you how much material you need, with zero guesswork. 🔢',
      actions:[
        {icon:'🍳', label:'Kitchen countertop area',    msg:'Calculate sq ft for my kitchen countertop'},
        {icon:'🚿', label:'Bathroom floor area',       msg:'Calculate sq ft for my bathroom floor'},
        {icon:'🏠', label:'Large open-plan floor',     msg:'Calculate sq ft for a living or dining area'},
        {icon:'🪨', label:'Feature wall coverage',    msg:'Calculate sq ft for a feature wall'},
      ],
      responses:[
        'For a kitchen countertop: measure length × width for each section (island, perimeter). A typical 4×8 ft island = 32 sq ft. One of our 5×10 slabs covers 50 sq ft — enough for most islands with material to spare for edges. What are your countertop dimensions?',
        'For bathroom floors: length × width, then add 10% for waste/cuts. Example: 8×10 ft bath = 80 sq ft → ~88 sq ft needed → about 11 tiles in 24×48 format. What\'s your bathroom size?',
        'Large floor areas work best with 24×48 tiles (each covers ~8 sq ft). A 400 sq ft living room ÷ 8 = 50 tiles + 10% extra = ~55 tiles. Shall I calculate your specific area?',
        'Feature wall: height × width gives sq ft. A standard 9ft × 12ft wall = 108 sq ft. Two of our 4×9 slabs (each 36 sq ft) = 72 sq ft, so you\'d need 3 slabs for coverage plus a partial 4th. What are the wall dimensions?',
        'Based on those numbers you\'ll need approximately that quantity. I\'d always recommend adding 12% for waste and future repairs. Would you like me to prepare a quote for that amount?',
      ],
      showCalc: true,
    },
    qa: {
      id:'qa', label:'Q&A', icon:'❓', tagline:'Ask Me Anything',
      welcome:'Hi! I\'m Hoorak. Ask me anything — materials, sizing, pricing, installation, care. I\'m here to help you make a confident decision. ✨',
      actions:[
        {icon:'🪨', label:'Marble vs. Porcelain?',      msg:'What is the difference between marble and porcelain?'},
        {icon:'💰', label:'What do slabs typically cost?',msg:'What are typical slab prices?'},
        {icon:'📏', label:'What sizes do you carry?',   msg:'What slab and tile sizes do you stock?'},
        {icon:'🛻', label:'Do you offer installation?', msg:'Do you offer installation services?'},
      ],
      responses:[
        'Great question! Natural marble is unique — every slab has one-of-a-kind veining. It\'s porous and needs annual sealing, but has timeless, irreplaceable beauty. Porcelain mimics marble\'s look but is harder, non-porous, and essentially maintenance-free. For busy kitchens, many designers now choose porcelain for its practicality.',
        'Material costs vary by type. Porcelain slabs: ~$15–$40/sq ft depending on collection. Natural marble: ~$20–$80+/sq ft. Translucent onyx (premium): ~$60–$150+/sq ft. Fabrication and installation are priced separately. Want a specific quote?',
        'We stock porcelain slabs in 5×10, 4×9, and 4×8 ft formats. Tiles come in 12×24, 24×24, and 24×48 inch sizes. Natural stone varies by slab availability. We have 100+ materials in our showroom — best to visit and compare in person!',
        'Yes! We offer full fabrication (custom edge profiles, sink cutouts, book-matching) and professional installation across the GTA. We also offer material-only supply if you have your own installer. What works better for your project?',
        'Happy to answer more! What else is on your mind about our materials or services?',
      ],
    },
  };

  /* ══════════════════════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════════════════════ */
  function now() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
  }

  function easeOut(t) { return 1 - (1-t)*(1-t); }

  /* Typewriter: types text into el one character at a time */
  function typewrite(el, text, done) {
    var i = 0;
    el.textContent = '';
    var tid = setInterval(function () {
      el.textContent += text[i++];
      if (i >= text.length) { clearInterval(tid); if (done) done(); }
    }, 18);
    return tid;
  }

  /* Build a bot message row (with avatar) */
  function makeBotRow(text, avSrc, showAv) {
    var row = document.createElement('div');
    row.className = 'hkRow hkBotRow';

    var av = document.createElement('img');
    av.className = 'hkMsgAv' + (showAv ? ' hkAvVis' : '');
    av.src = avSrc; av.alt = 'Hoorak';

    var bub = document.createElement('div');
    bub.className = 'hkBubble hkBot';

    var p = document.createElement('span');
    p.style.display = 'block';
    bub.appendChild(p);

    var ts = document.createElement('span');
    ts.className = 'hkTime';
    ts.textContent = now();
    bub.appendChild(ts);

    row.appendChild(av); row.appendChild(bub);
    return { row:row, textEl:p, av:av };
  }

  /* Build a user message row */
  function makeUsrRow(text) {
    var row = document.createElement('div');
    row.className = 'hkRow hkUsrRow';
    var bub = document.createElement('div');
    bub.className = 'hkBubble hkUsr';
    bub.textContent = text;
    var ts = document.createElement('span');
    ts.className = 'hkTime'; ts.style.color = 'rgba(255,255,255,.45)';
    ts.textContent = now();
    bub.appendChild(ts);
    row.appendChild(bub);
    return row;
  }

  /* Build typing indicator row */
  function makeTypingRow() {
    var row = document.createElement('div');
    row.className = 'hkRow hkBotRow';
    var av = document.createElement('img');
    av.className = 'hkMsgAv hkAvVis';
    av.src = AVATAR; av.alt = '';
    var ty = document.createElement('div');
    ty.className = 'hkTyping';
    ty.innerHTML = '<span></span><span></span><span></span>';
    row.appendChild(av); row.appendChild(ty);
    return row;
  }

  /* Build quick-action cards */
  function makeQuickCards(actions, onPick) {
    var wrap = document.createElement('div');
    wrap.className = 'hkQuick';
    actions.forEach(function (a, i) {
      var card = document.createElement('button');
      card.className = 'hkQCard';
      card.style.animationDelay = (i * 0.06) + 's';
      card.innerHTML =
        '<span class="hkQIcon">' + a.icon + '</span>' +
        '<span class="hkQLabel">' + a.label + '</span>' +
        '<span class="hkQArrow">→</span>';
      card.addEventListener('click', function () { onPick(a.msg); });
      wrap.appendChild(card);
    });
    return wrap;
  }

  /* Build sq-ft calculator */
  function makeCalc(onRequest) {
    var wrap = document.createElement('div');
    wrap.className = 'hkCalc';
    wrap.innerHTML =
      '<div class="hkCalcHdr">📐 Instant Sq-Ft Calculator</div>' +
      '<div class="hkCalcBody">' +
        '<div class="hkCalcRow">' +
          '<div><div class="hkCalcLabel">Length (ft)</div>' +
            '<input class="hkCalcInput" id="hkLen" type="number" min="0" placeholder="e.g. 12"></div>' +
          '<div><div class="hkCalcLabel">Width (ft)</div>' +
            '<input class="hkCalcInput" id="hkWid" type="number" min="0" placeholder="e.g. 10"></div>' +
        '</div>' +
        '<div>' +
          '<div class="hkCalcLabel">Material format</div>' +
          '<select class="hkCalcInput" id="hkMat">' +
            '<option value="50">Porcelain Slab 5×10 (50 sq ft)</option>' +
            '<option value="36">Porcelain Slab 4×9 (36 sq ft)</option>' +
            '<option value="8">Tile 24×48 (8 sq ft / tile)</option>' +
            '<option value="4">Tile 24×24 (4 sq ft / tile)</option>' +
            '<option value="2">Tile 12×24 (2 sq ft / tile)</option>' +
          '</select>' +
        '</div>' +
        '<div class="hkCalcResult" id="hkResult">Enter dimensions to calculate ↑</div>' +
        '<button class="hkCalcBtn" id="hkCalcReq">Request a Quote for This →</button>' +
      '</div>';

    function calc() {
      var l = parseFloat(document.getElementById('hkLen').value) || 0;
      var w = parseFloat(document.getElementById('hkWid').value) || 0;
      var u = parseInt(document.getElementById('hkMat').value, 10);
      if (!l || !w) { document.getElementById('hkResult').innerHTML = 'Enter dimensions to calculate ↑'; return; }
      var sqft = l * w;
      var withWaste = Math.ceil(sqft * 1.12);
      var units = Math.ceil(withWaste / u);
      var unitWord = u >= 36 ? 'slabs' : 'tiles';
      document.getElementById('hkResult').innerHTML =
        '<strong>' + sqft + ' sq ft</strong> area &nbsp;→&nbsp; ' +
        '<strong>' + withWaste + ' sq ft</strong> with 12% waste &nbsp;→&nbsp; ' +
        '<strong>' + units + ' ' + unitWord + '</strong> needed';
    }

    wrap.querySelector('#hkLen').addEventListener('input', calc);
    wrap.querySelector('#hkWid').addEventListener('input', calc);
    wrap.querySelector('#hkMat').addEventListener('change', calc);
    wrap.querySelector('#hkCalcReq').addEventListener('click', function () {
      var r = document.getElementById('hkResult');
      if (r && r.textContent.indexOf('Enter') === -1) onRequest('I need a quote for: ' + r.textContent.trim());
    });

    return wrap;
  }

  /* ══════════════════════════════════════════════════════════════
     WIDGET CLASS
  ══════════════════════════════════════════════════════════════ */
  function Widget() {
    this.isOpen    = false;
    this.mode      = this._detectMode();
    this.started   = false;   // user sent at least one message
    this.ridx      = {};      // response rotation index per mode
    this.proShown  = false;

    this._injectCSS();
    this._buildDOM();
    this._loadMode(this.mode, true);
    this._bind();
    this._scheduleProactive();
  }

  /* ── URL-based mode detection ─────────────────────────────── */
  Widget.prototype._detectMode = function () {
    var p = location.pathname.toLowerCase();
    if (/booking|appointment|schedule/.test(p)) return 'booking';
    if (/quote|estimate|calc/.test(p))           return 'estimate';
    if (/contact|support|help/.test(p))          return 'support';
    if (/product|slab|tile|stone|marble/.test(p)) return 'sales';
    return 'qa';
  };

  /* ── CSS injection ────────────────────────────────────────── */
  Widget.prototype._injectCSS = function () {
    var el = document.createElement('style');
    el.textContent = CSS;
    document.head.appendChild(el);
  };

  /* ── Build widget DOM ─────────────────────────────────────── */
  Widget.prototype._buildDOM = function () {
    var self = this;

    /* Root wrapper */
    var root = document.createElement('div');
    root.id = 'hkW';
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', 'Hoorak AI Assistant');

    /* ── Panel ── */
    root.innerHTML =
      /* Panel */
      '<div id="hkPanel">' +
        '<div class="hkHdr">' +
          '<div class="hkHdrTop">' +
            '<div class="hkAv">' +
              '<img src="' + AVATAR + '" alt="Hoorak" onerror="this.style.opacity=.3">' +
              '<span class="hkDot"></span>' +
            '</div>' +
            '<div class="hkAgentInfo">' +
              '<div class="hkAgentName">Hoorak AI <span class="hkBadge">Live</span></div>' +
              '<div class="hkAgentSub" id="hkTagline">Your stone advisor · Replies instantly</div>' +
            '</div>' +
            '<div class="hkHdrBtns">' +
              '<button class="hkIconBtn" id="hkCloseBtn" aria-label="Close chat">✕</button>' +
            '</div>' +
          '</div>' +
          '<div class="hkTabs" id="hkTabs" role="tablist"></div>' +
        '</div>' +
        '<div class="hkChat" id="hkChat"></div>' +
        '<div class="hkInputBar">' +
          '<button class="hkBackBtn" id="hkBack" title="Back to suggestions">← Menu</button>' +
          '<textarea class="hkInput" id="hkInput" rows="1" placeholder="Type a message…" aria-label="Message Hoorak"></textarea>' +
          '<button class="hkSendBtn" id="hkSend" aria-label="Send message">' +
            '<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="white" stroke-width="0"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="hkFtr">' +
          '<a class="hkFtrBrand" href="https://hoorak.com" target="_blank" rel="noopener">' +
            'Powered by <img class="hkFtrLogo" src="' + LOGO + '" alt="Hoorak">' +
          '</a>' +
          '<a class="hkFtrWa" href="' + WA_LINK + '" target="_blank" rel="noopener">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
            'WhatsApp' +
          '</a>' +
        '</div>' +
      '</div>' +

      /* Trigger row */
      '<div id="hkTrigRow">' +
        '<span id="hkLabel" role="button" tabindex="0" aria-label="Chat with Hoorak AI">✨ Ask Hoorak</span>' +
        '<button id="hkTrig" aria-expanded="false" aria-controls="hkPanel" aria-label="Open Hoorak AI chat">' +
          '<img class="hkTrigFace" src="' + AVATAR + '" alt="Hoorak" onerror="this.style.opacity=.3">' +
          '<span class="hkTrigX" aria-hidden="true">✕</span>' +
          '<span class="hkRing" aria-hidden="true"></span>' +
          '<span class="hkNotif" id="hkNotif" aria-hidden="true">1</span>' +
        '</button>' +
      '</div>';

    document.body.appendChild(root);

    /* Build mode tabs */
    var tabsEl = document.getElementById('hkTabs');
    Object.keys(MODES).forEach(function (k) {
      var m = MODES[k];
      var t = document.createElement('button');
      t.className = 'hkTab';
      t.dataset.mode = k;
      t.setAttribute('role', 'tab');
      t.innerHTML = m.icon + ' ' + m.label;
      t.addEventListener('click', function () { self._loadMode(k, false); });
      tabsEl.appendChild(t);
    });

    /* Cache refs */
    this.root     = root;
    this.panel    = document.getElementById('hkPanel');
    this.chat     = document.getElementById('hkChat');
    this.tagline  = document.getElementById('hkTagline');
    this.tabs     = document.querySelectorAll('.hkTab');
    this.inputEl  = document.getElementById('hkInput');
    this.sendBtn  = document.getElementById('hkSend');
    this.closeBtn = document.getElementById('hkCloseBtn');
    this.backBtn  = document.getElementById('hkBack');
    this.trigBtn  = document.getElementById('hkTrig');
    this.label    = document.getElementById('hkLabel');
    this.notif    = document.getElementById('hkNotif');
  };

  /* ── Load / switch mode ───────────────────────────────────── */
  Widget.prototype._loadMode = function (modeId, isInit) {
    var self = this;
    var m    = MODES[modeId];
    this.mode    = modeId;
    this.started = false;

    /* Update tabs */
    this.tabs.forEach(function (t) {
      t.classList.toggle('hkTabOn', t.dataset.mode === modeId);
    });

    /* Update header tagline */
    this.tagline.textContent = m.tagline + ' · Replies instantly';

    /* Clear chat */
    this.chat.innerHTML = '';

    /* Hide back button */
    this.backBtn.classList.remove('hkVisible');

    /* Bot welcome row with typewriter */
    var bot = makeBotRow('', AVATAR, true);
    this.chat.appendChild(bot.row);

    var delay = isInit ? 400 : 150;
    var self2 = self;

    setTimeout(function () {
      typewrite(bot.textEl, m.welcome, function () {
        /* After typewriter, show avatar smoothly */
        bot.av.classList.add('hkAvVis');

        /* Calculator (estimate mode) */
        if (m.showCalc) {
          var calc = makeCalc(function (msg) { self2._submit(msg); });
          self2.chat.appendChild(calc);
        }

        /* Quick action cards */
        var cards = makeQuickCards(m.actions, function (msg) { self2._submit(msg); });
        self2.chat.appendChild(cards);
        self2._scrollBottom();
      });
    }, delay);
  };

  /* ── Show typing indicator then bot reply ─────────────────── */
  Widget.prototype._botReply = function (text) {
    var self = this;
    var tRow = makeTypingRow();
    this.chat.appendChild(tRow);
    this._scrollBottom();

    var delay = 850 + Math.random() * 600;
    setTimeout(function () {
      tRow.remove();
      var bot = makeBotRow('', AVATAR, true);
      self.chat.appendChild(bot.row);
      typewrite(bot.textEl, text, function () { self._scrollBottom(); });
      self._scrollBottom();
    }, delay);
  };

  /* ── Get next canned response ─────────────────────────────── */
  Widget.prototype._getResp = function () {
    var arr = MODES[this.mode].responses;
    var idx = this.ridx[this.mode] || 0;
    var r   = arr[idx % arr.length];
    this.ridx[this.mode] = idx + 1;
    return r;
  };

  /* ── Submit a message ─────────────────────────────────────── */
  Widget.prototype._submit = function (text) {
    if (!text || !text.trim()) return;

    /* First interaction: switch to "chat mode" */
    if (!this.started) {
      this.started = true;
      this.backBtn.classList.add('hkVisible');
      /* Remove quick-action cards from view (they stay in DOM but we hide) */
      var quick = this.chat.querySelector('.hkQuick');
      if (quick) {
        quick.style.opacity = '0';
        quick.style.transform = 'translateY(-6px)';
        quick.style.transition = 'opacity .2s, transform .2s';
        setTimeout(function () { if (quick.parentNode) quick.parentNode.removeChild(quick); }, 220);
      }
    }

    /* User message */
    this.chat.appendChild(makeUsrRow(text));
    this.inputEl.value = '';
    this._resize();
    this._scrollBottom();

    /* Bot reply */
    this._botReply(this._getResp());
  };

  /* ── Back to menu ─────────────────────────────────────────── */
  Widget.prototype._backToMenu = function () {
    this._loadMode(this.mode, false);
  };

  /* ── Scroll chat to bottom ────────────────────────────────── */
  Widget.prototype._scrollBottom = function () {
    this.chat.scrollTop = this.chat.scrollHeight;
  };

  /* ── Auto-resize textarea ─────────────────────────────────── */
  Widget.prototype._resize = function () {
    this.inputEl.style.height = 'auto';
    this.inputEl.style.height = Math.min(this.inputEl.scrollHeight, 96) + 'px';
  };

  /* ── Open ─────────────────────────────────────────────────── */
  Widget.prototype.open = function (preMsg) {
    this.isOpen = true;
    this.panel.classList.add('hkOpen');
    this.trigBtn.classList.add('hkOpen');
    this.trigBtn.setAttribute('aria-expanded', 'true');
    /* Dismiss proactive + badge */
    this._dismissProactive();
    if (preMsg) {
      var self = this;
      setTimeout(function () { self._submit(preMsg); }, 300);
    } else {
      this.inputEl.focus();
    }
  };

  /* ── Close ────────────────────────────────────────────────── */
  Widget.prototype.close = function () {
    this.isOpen = false;
    this.panel.classList.remove('hkOpen');
    this.trigBtn.classList.remove('hkOpen');
    this.trigBtn.setAttribute('aria-expanded', 'false');
  };

  Widget.prototype.toggle = function () { this.isOpen ? this.close() : this.open(); };

  /* ── Proactive popup ──────────────────────────────────────── */
  Widget.prototype._scheduleProactive = function () {
    var self = this;
    setTimeout(function () {
      if (self.isOpen || self.proShown) return;
      self._showProactive();
    }, 20000); /* 20 s */
  };

  Widget.prototype._showProactive = function () {
    if (this.proShown || this.isOpen) return;
    this.proShown = true;
    var self = this;

    var pop = document.createElement('div');
    pop.id = 'hkProactive';
    pop.innerHTML =
      '<button class="hkProClose" id="hkProX" aria-label="Dismiss">✕</button>' +
      '<img class="hkProAv" src="' + AVATAR + '" alt="Hoorak">' +
      '<div class="hkProMsg">👋 Looking for the perfect stone?</div>' +
      '<div class="hkProSub">I can recommend the right material for your kitchen, bathroom, or feature wall — in just a few questions.</div>' +
      '<button class="hkProBtn" id="hkProOpen">Get recommendations →</button>';

    this.root.insertBefore(pop, this.root.querySelector('#hkTrigRow'));

    /* Show notification badge */
    this.notif.classList.add('hkShow');
    /* Wobble trigger */
    this.trigBtn.style.animation = 'hkWobble .7s ease';
    var trig = this.trigBtn;
    setTimeout(function () { trig.style.animation = ''; }, 700);

    document.getElementById('hkProX').addEventListener('click', function () { self._dismissProactive(); });
    document.getElementById('hkProOpen').addEventListener('click', function () {
      self._dismissProactive();
      self.open('I\'m looking for stone recommendations for my project');
    });
  };

  Widget.prototype._dismissProactive = function () {
    var pop = document.getElementById('hkProactive');
    if (pop) {
      pop.style.opacity = '0'; pop.style.transform = 'translateY(8px)';
      pop.style.transition = 'opacity .2s, transform .2s';
      setTimeout(function () { if (pop.parentNode) pop.parentNode.removeChild(pop); }, 220);
    }
    this.notif.classList.remove('hkShow');
  };

  /* ── Event bindings ───────────────────────────────────────── */
  Widget.prototype._bind = function () {
    var self = this;

    this.trigBtn.addEventListener('click', function () { self.toggle(); });
    this.label.addEventListener('click',   function () { self.toggle(); });
    this.label.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); self.toggle(); }
    });

    this.closeBtn.addEventListener('click', function () { self.close(); });
    this.backBtn.addEventListener('click',  function () { self._backToMenu(); });

    this.sendBtn.addEventListener('click', function () { self._submit(self.inputEl.value.trim()); });
    this.inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); self._submit(self.inputEl.value.trim()); }
    });
    this.inputEl.addEventListener('input', function () { self._resize(); });

    /* Click outside to close */
    document.addEventListener('click', function (e) {
      if (self.isOpen && !self.root.contains(e.target)) self.close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && self.isOpen) self.close();
    });
  };

  /* ══════════════════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════════════ */
  function init() {
    if (document.getElementById('hkW')) return;
    W.HoorakWidget = new Widget();
  }

  /* Also expose a helper for product card buttons in index.html */
  W.hoorakQuickMsg = function (msg) {
    if (!W.HoorakWidget) return;
    if (!W.HoorakWidget.isOpen) W.HoorakWidget.open(msg);
    else W.HoorakWidget._submit(msg);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

}(window));
