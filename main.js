/* furqan.codes — theme, earlier-roles expander, token-stream background. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme ---------- */

  var toggle = document.getElementById("theme-toggle");

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("fc-theme", theme); } catch (e) {}
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setTheme(currentTheme() === "light" ? "dark" : "light");
    });
  }

  /* ---------- Earlier roles ---------- */

  var expander = document.getElementById("earlier-toggle");
  var earlier = document.getElementById("earlier-roles");

  if (expander && earlier) {
    expander.addEventListener("click", function () {
      var open = earlier.hasAttribute("hidden");
      if (open) {
        earlier.removeAttribute("hidden");
      } else {
        earlier.setAttribute("hidden", "");
      }
      expander.setAttribute("aria-expanded", String(open));
      expander.textContent = open ? "− Hide earlier roles" : "+ Earlier roles, 2011 — 2023";
    });
  }

  /* ---------- Analytics consent ---------- */

  // Consent Mode defaults are set in the <head>, above the GTM snippet, so
  // nothing is stored before a choice is made. This only records the choice
  // and tells Google about it.
  var consent = document.getElementById("consent");
  var accept = document.getElementById("consent-accept");
  var decline = document.getElementById("consent-decline");

  function storedConsent() {
    try { return localStorage.getItem("fc-consent"); } catch (e) { return null; }
  }

  function decide(choice) {
    try { localStorage.setItem("fc-consent", choice); } catch (e) {}
    if (typeof window.gtag === "function") {
      var state = choice === "granted" ? "granted" : "denied";
      window.gtag("consent", "update", {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state
      });
    }
    if (consent) consent.setAttribute("hidden", "");
  }

  if (consent && accept && decline) {
    if (!storedConsent()) consent.removeAttribute("hidden");
    accept.addEventListener("click", function () { decide("granted"); });
    decline.addEventListener("click", function () { decide("denied"); });
  }

  /* ---------- Token-stream background ---------- */

  // A slow vertical drift of tokenized-prompt fragments, a minority lit in the
  // accent, reading as inference passing through the page.
  var MOTION = "calm"; // "calm" | "lively"

  var VOCAB = ["def", "llm", "0.42", "token", "[MASK]", "attn", "embed", "->", "0.87",
    "infer", "ctx", "vec", "mcp", "prompt", "</s>", "logits", "0.13", "layer", "k,v",
    "softmax", "agent", "tool", "chunk", "1.0", "grad", "edge", "cache"];

  var canvas = document.getElementById("bg-canvas");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var raf = null;
  var ro = null;
  var onResize = null;
  var w = 0, h = 0;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var parts = [];

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var speed = MOTION === "lively" ? 1.9 : 1;

  function pal() {
    return currentTheme() === "light"
      ? { accent: [13, 129, 104], ink: [30, 31, 35], lit: 0.5, dim: 0.22 }
      : { accent: [122, 224, 198], ink: [240, 237, 230], lit: 0.42, dim: 0.17 };
  }

  function build() {
    var rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var colW = w < 640 ? 92 : 116;
    var n = Math.max(6, Math.round(w / colW));
    parts = [];
    for (var c = 0; c < n; c++) {
      var x = (c + 0.5) * (w / n) + (Math.random() - 0.5) * 18;
      var per = 3 + Math.round(Math.random() * 3);
      for (var i = 0; i < per; i++) {
        parts.push({
          x: x,
          y: Math.random() * (h + 200),
          v: 0.14 + Math.random() * 0.26,
          txt: VOCAB[(Math.random() * VOCAB.length) | 0],
          lit: Math.random() < 0.18,
          ph: Math.random() * Math.PI * 2
        });
      }
    }
  }

  function step(t) {
    // Reschedule first, so a throw below can never kill the loop.
    raf = requestAnimationFrame(safeStep);

    var r = canvas.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    if (Math.abs(r.width - w) > 1 || Math.abs(r.height - h) > 1) build();

    ctx.clearRect(0, 0, w, h);
    ctx.font = "13px 'IBM Plex Mono', ui-monospace, monospace";
    ctx.textBaseline = "middle";

    var P = pal();
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (!reduced) p.y -= p.v * speed;
      if (p.y < -30) {
        p.y = h + 30;
        p.txt = VOCAB[(Math.random() * VOCAB.length) | 0];
        p.lit = Math.random() < 0.18;
      }
      var edgeFade = Math.min(1, Math.min(p.y, h - p.y) / 140);
      var pulse = 0.6 + 0.4 * Math.sin(t / 2200 + p.ph);
      var rgb = p.lit ? P.accent : P.ink;
      var alpha = (p.lit ? P.lit : P.dim) * pulse * edgeFade;
      ctx.fillStyle = "rgba(" + rgb.join(",") + "," + alpha.toFixed(3) + ")";
      ctx.fillText(p.txt, p.x, p.y);
    }
  }

  function safeStep(t) {
    try { step(t); } catch (e) { /* keep the loop alive */ }
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    if (ro) { ro.disconnect(); ro = null; }
    if (onResize) { window.removeEventListener("resize", onResize); onResize = null; }
  }

  function start() {
    stop();
    build();
    onResize = function () { build(); };
    window.addEventListener("resize", onResize);
    if (window.ResizeObserver) {
      ro = new ResizeObserver(function () { build(); });
      ro.observe(canvas);
    }
    raf = requestAnimationFrame(safeStep);
  }

  start();
})();
