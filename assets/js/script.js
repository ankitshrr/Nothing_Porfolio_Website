// script.js
const themeBtn = document.getElementById("themeBtn");
const html = document.documentElement;

// Set initial button icon based on saved theme
if (html.getAttribute("data-theme") === "light") {
  themeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

// Footer stamps
const yearNow = document.getElementById("yearNow");
if (yearNow) yearNow.textContent = new Date().getFullYear();

const buildStamp = document.getElementById("buildStamp");
if (buildStamp) buildStamp.textContent = new Date().toISOString().slice(0, 10);

// Nav expand
const brandBtn = document.getElementById("brandBtn");
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");

// NAV_ONLY GLYPH EFFECT
function triggerNavGlyphs() {
  const segments = mainNav.querySelectorAll(".ng-segment");
  segments.forEach((seg) => {
    seg.classList.remove("active");
    void seg.offsetWidth;
    const randomDelay = Math.floor(Math.random() * 150);
    setTimeout(() => seg.classList.add("active"), randomDelay);
  });
}
window.triggerNavGlyphs = triggerNavGlyphs;

// Theme toggle
themeBtn.addEventListener("click", () => {
  html.classList.add('theme-transitioning');
  
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem('app-theme', newTheme);
  
  setTimeout(() => {
    html.classList.remove('theme-transitioning');
  }, 400);

  themeBtn.innerHTML =
    newTheme === "dark"
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  triggerNavGlyphs();
});

// Mini glyph trigger
function triggerGlyph(element) {
  const glyphs = element.querySelectorAll(".p-glyph");
  glyphs.forEach((glyph, i) => {
    glyph.classList.remove("triggered");
    void glyph.offsetWidth;
    setTimeout(() => glyph.classList.add("triggered"), i * 50);
    setTimeout(() => glyph.classList.remove("triggered"), 700);
  });
}
window.triggerGlyph = triggerGlyph;

// Smart Email Button Logic & Textarea Auto-resize
document.addEventListener('DOMContentLoaded', () => {
  const sendEmailBtn = document.getElementById('sendEmailBtn');
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'ankitprogressx@gmail.com';
      const subject = encodeURIComponent('Hello Ankit');
      const body = encodeURIComponent('Hi Ankit,\n\nI saw your portfolio and wanted to connect regarding an opportunity.');
      
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      } else {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // Textarea auto-resize
  const cfMessage = document.getElementById('cf-message');
  if (cfMessage) {
    cfMessage.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  }

  // ── Radar Skills ────────────────────────────────────────────────────────────
  const nodes      = document.querySelectorAll('.radar-node');
  const radarData  = document.getElementById('radarData');
  const rpStatus   = document.getElementById('rpStatus');

  // Bottom-sheet elements (mobile only)
  const skillSheet        = document.getElementById('skillSheet');
  const skillSheetOverlay = document.getElementById('skillSheetOverlay');
  const skillSheetBody    = document.getElementById('skillSheetBody');
  const skillSheetTitle   = document.getElementById('skillSheetTitle');
  const skillSheetClose   = document.getElementById('skillSheetClose');

  let lockedNode = null;

  function isMobileView() {
    return window.matchMedia('(max-width: 900px)').matches;
  }

  function buildDataHTML(skill, level, subsystem, desc, iconSrc) {
    return `
      <div class="rp-data-view active">
        <h3 class="rp-large-title">${iconSrc} ${skill}</h3>
        <div class="rp-stats-grid">
          <div class="rp-stat-box">
            <span class="rp-stat-label">SYS.LVL</span>
            <span class="rp-stat-val">${level}</span>
          </div>
          <div class="rp-stat-box">
            <span class="rp-stat-label">SUBSYSTEM</span>
            <span class="rp-stat-val">${subsystem}</span>
          </div>
        </div>
        <p class="rp-desc">${desc}</p>
      </div>
    `;
  }

  function showNodeData(node) {
    const skill     = node.getAttribute('data-skill');
    const level     = node.getAttribute('data-level');
    const subsystem = node.getAttribute('data-subsystem');
    const desc      = node.getAttribute('data-desc');
    const iconEl    = node.querySelector('img, svg');
    const iconSrc   = iconEl ? iconEl.outerHTML : '';

    if (isMobileView()) {
      // ── Bottom sheet (mobile) ──────────────────────────
      skillSheetTitle.textContent = `NODE: ${skill}`;
      skillSheetBody.innerHTML = buildDataHTML(skill, level, subsystem, desc, iconSrc);
      openSkillSheet();
    } else {
      // ── Static panel (desktop) ────────────────────────
      rpStatus.classList.remove('blinking');
      rpStatus.innerHTML = `NODE LOCKED: ${skill}`;
      rpStatus.style.color = 'var(--text-main)';
      radarData.innerHTML = buildDataHTML(skill, level, subsystem, desc, iconSrc);
    }
  }

  function resetStaticPanel() {
    if (rpStatus) {
      rpStatus.classList.add('blinking');
      rpStatus.innerHTML = 'AWAITING NODE';
      rpStatus.style.color = '';
    }
    if (radarData) {
      radarData.innerHTML = `
        <div class="rp-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <p style="margin-top: 16px; opacity: 0.6;">HOVER OVER A NODE ON THE RADAR TO EXTRACT DATA.</p>
        </div>
      `;
    }
  }

  // ── Bottom-sheet open / close ───────────────────────────────────────────────
  function openSkillSheet() {
    skillSheetOverlay.classList.add('open');
    skillSheet.classList.add('open');
    skillSheetOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeSkillSheet() {
    skillSheetOverlay.classList.remove('open');
    skillSheet.classList.remove('open');
    skillSheetOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Also deselect the node visually
    nodes.forEach(n => n.classList.remove('active'));
    lockedNode = null;
  }

  if (skillSheetClose)   skillSheetClose.addEventListener('click',   closeSkillSheet);
  if (skillSheetOverlay) skillSheetOverlay.addEventListener('click', closeSkillSheet);

  // Swipe-down to close the bottom sheet
  if (skillSheet) {
    let touchStartY = 0;
    skillSheet.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    skillSheet.addEventListener('touchend', e => {
      const delta = e.changedTouches[0].clientY - touchStartY;
      if (delta > 60) closeSkillSheet(); // swipe down ≥60px → close
    }, { passive: true });
  }

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && skillSheet && skillSheet.classList.contains('open')) {
      closeSkillSheet();
    }
  });

  // ── Node click / hover bindings ─────────────────────────────────────────────
  if (nodes.length > 0) {
    nodes.forEach(node => {
      node.addEventListener('click', (e) => {
        e.preventDefault();

        if (isMobileView()) {
          // Mobile: always open sheet (toggle off if same node)
          if (lockedNode === node) {
            closeSkillSheet();
          } else {
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            lockedNode = node;
            showNodeData(node);
          }
        } else {
          // Desktop: click-to-lock behaviour
          if (lockedNode === node) {
            lockedNode = null;
            node.classList.remove('active');
            resetStaticPanel();
          } else {
            lockedNode = node;
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            showNodeData(node);
          }
        }
      });

      // Hover preview (desktop only, doesn't override lock)
      node.addEventListener('mouseenter', () => {
        if (!isMobileView() && !lockedNode) {
          nodes.forEach(n => n.classList.remove('active'));
          node.classList.add('active');
          showNodeData(node);
        }
      });
    });

    // When mouse leaves the entire grid, revert to locked node or reset (desktop only)
    const radarGrid = document.getElementById('radarGrid');
    if (radarGrid) {
      radarGrid.addEventListener('mouseleave', () => {
        if (isMobileView()) return;
        if (lockedNode) {
          nodes.forEach(n => n.classList.remove('active'));
          lockedNode.classList.add('active');
          showNodeData(lockedNode);
        } else {
          nodes.forEach(n => n.classList.remove('active'));
          resetStaticPanel();
        }
      });
    }
  }
});

function handleContactForm(event) {
  event.preventDefault();

  const name = document.getElementById('cf-name')?.value?.trim() || '';
  const email = document.getElementById('cf-email')?.value?.trim() || '';
  const subject = document.getElementById('cf-subject')?.value?.trim() || 'Hello Ankit';
  const message = document.getElementById('cf-message')?.value?.trim() || '';
  const toast = document.getElementById('cfToast');
  const form = document.getElementById('contactForm');

  const mailto = `mailto:ankitprogressx@gmail.com?subject=${encodeURIComponent(`Portfolio inquiry: ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (toast) {
    toast.textContent = 'Opening your email app...';
    toast.style.opacity = '1';
  }

  if (isMobile) {
    window.location.href = mailto;
  } else {
    window.open(mailto, '_blank', 'noopener,noreferrer');
  }

  if (form) form.reset();

  setTimeout(() => {
    if (toast) {
      toast.textContent = 'Thanks for reaching out.';
      toast.style.opacity = '0';
    }
  }, 1800);
}
window.handleContactForm = handleContactForm;

// Hero glyph
function runGlyphSequence() {
  const segments = document.querySelectorAll(".glyph-segment");
  segments.forEach((seg, i) => {
    const delay = i === 0 ? 0 : i * 120 + Math.random() * 100;
    setTimeout(() => {
      seg.classList.add("active");
      setTimeout(() => seg.classList.remove("active"), 150);
      if (seg.classList.contains("gs-arc") || seg.classList.contains("gs-bottom-bar")) {
        setTimeout(() => {
          seg.classList.add("active");
          setTimeout(() => seg.classList.remove("active"), 100);
        }, 250);
      }
    }, delay);
  });
  setTimeout(() => segments.forEach((seg) => seg.classList.add("idle")), 1200);
}

function heroGlyphBurst() {
  const segments = document.querySelectorAll(".glyph-segment");
  segments.forEach((seg) => seg.classList.remove("idle", "active"));
  const sys = document.getElementById("glyphSystem") || document.querySelector(".hero-photo");
  if (sys) void sys.offsetWidth;
  runGlyphSequence();
}

let heroAutoTimer = null;
function startHeroAutoplay() {
  // Autoplay disabled by user request. Glyphs only trigger on hover or click.
}

brandBtn.addEventListener("click", () => heroGlyphBurst());

// Automation Terminal Animation (Dynamic)
const terminalCommands = [
  {
    cmd: "pytest portfolio.py",
    prompt: "$",
    output: [
      { text: "============================= test session starts ==============================" },
      { text: "platform linux -- Python 3.12, pytest-8.0.0" },
      { text: "collected 3 items" },
      { text: "<br>" },
      { text: "<span class='term-file'>test_ui.py</span> &nbsp; <span class='term-pass'>PASSED</span>" },
      { text: "<span class='term-file'>test_api.py</span> &nbsp; <span class='term-pass'>PASSED</span>" },
      { text: "<span class='term-file'>test_integration.py</span> &nbsp; <span class='term-pass'>PASSED</span>" },
      { text: "<br>" },
      { text: "<span class='term-pass-strong'>============================== 3 passed in 0.42s ===============================</span>" },
      { text: "<span class='term-prompt'>$</span> <span class='term-cursor'></span>", delay: 0 }
    ]
  },
  {
    cmd: "docker build -t qa-env .",
    prompt: "$",
    output: [
      { text: "Sending build context to Docker daemon  2.048kB" },
      { text: "Step 1/5 : FROM python:3.12-slim" },
      { text: "---> 7a46227b0c9f" },
      { text: "Step 2/5 : WORKDIR /app" },
      { text: "---> Using cache" },
      { text: "---> d1b4421b02b9" },
      { text: "Step 3/5 : COPY requirements.txt ." },
      { text: "---> 8a2f4c7b8d11" },
      { text: "Step 4/5 : RUN pip install -r requirements.txt", delay: 300 },
      { text: "---> <span class='term-pass'>Successfully installed pytest-8.0.0</span>" },
      { text: "<span class='term-pass-strong'>Successfully built 9f2e345a1b2c</span>" },
      { text: "<span class='term-pass'>Successfully tagged qa-env:latest</span>" },
      { text: "<span class='term-prompt'>$</span> <span class='term-cursor'></span>", delay: 0 }
    ]
  },
  {
    cmd: "npx cypress run",
    prompt: ">",
    output: [
      { text: "========================================" },
      { text: "  (Run Starting)" },
      { text: "  <span class='term-file'>┌────────────────────────────────────┐</span>" },
      { text: "  <span class='term-file'>│</span> Cypress: 13.6.0                    <span class='term-file'>│</span>" },
      { text: "  <span class='term-file'>│</span> Browser: Electron 114              <span class='term-file'>│</span>" },
      { text: "  <span class='term-file'>│</span> Specs:   1 found                   <span class='term-file'>│</span>" },
      { text: "  <span class='term-file'>└────────────────────────────────────┘</span>" },
      { text: "  Running: <span class='term-file'>portfolio_spec.cy.js</span>", delay: 600 },
      { text: "  <span class='term-pass'>✔</span>  Portfolio loads successfully (842ms)" },
      { text: "  <span class='term-pass'>✔</span>  Navigation links work (1205ms)" },
      { text: "  <span class='term-pass'>✔</span>  Contact form validates (950ms)" },
      { text: "  <span class='term-pass-strong'>All specs passed!</span>" },
      { text: "<span class='term-prompt'>></span> <span class='term-cursor'></span>", delay: 0 }
    ]
  }
];

let isTerminalRunning = false;

function runTerminalAnimation() {
  if (isTerminalRunning) return;
  isTerminalRunning = true;
  
  const termBody = document.getElementById("termBody");
  const termPrompt = document.getElementById("termPrompt");
  const termCommand = document.getElementById("termCommand");
  const typeCursor = document.getElementById("typeCursor");
  const termOutput = document.getElementById("termOutput");
  
  if (!termBody || !termCommand || !termOutput) {
    isTerminalRunning = false;
    return;
  }
  
  // Pick random command
  const randIndex = Math.floor(Math.random() * terminalCommands.length);
  const selected = terminalCommands[randIndex];
  
  // Reset
  termOutput.innerHTML = "";
  termCommand.textContent = "";
  termPrompt.textContent = selected.prompt;
  if (typeCursor) typeCursor.style.display = "inline-block";
  
  let charIndex = 0;
  
  // Type command
  function typeChar() {
    if (charIndex < selected.cmd.length) {
      termCommand.textContent += selected.cmd.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 30 + Math.random() * 50); // Realistic typing speed
    } else {
      // Finished typing, wait a beat then execute
      setTimeout(() => {
        if (typeCursor) typeCursor.style.display = "none";
        executeLines();
      }, 300);
    }
  }
  
  function executeLines() {
    let lineIndex = 0;
    
    function showNextLine() {
      if (lineIndex < selected.output.length) {
        const lineData = selected.output[lineIndex];
        
        const lineDiv = document.createElement("div");
        lineDiv.className = "term-line";
        lineDiv.innerHTML = lineData.text;
        termOutput.appendChild(lineDiv);
        
        // Auto-scroll to bottom
        termBody.scrollTop = termBody.scrollHeight;
        
        lineIndex++;
        
        let waitTime = lineData.delay !== undefined ? lineData.delay : (50 + Math.random() * 100);
        setTimeout(showNextLine, waitTime);
      } else {
        isTerminalRunning = false;
      }
    }
    
    showNextLine();
  }
  
  // Start typing after a short delay
  setTimeout(typeChar, 400);
}

// Run terminal animation on load
setTimeout(runTerminalAnimation, 500);

// Also re-run animation on click
const termBodyWrapper = document.getElementById("termBody");
if (termBodyWrapper) {
  termBodyWrapper.parentElement.addEventListener("click", () => {
    runTerminalAnimation();
  });
}

navToggle.addEventListener("click", () => {
  mainNav.classList.toggle("expanded");
  const expanded = mainNav.classList.contains("expanded");
  navToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
});

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    mainNav.classList.remove("expanded");
    navToggle.setAttribute("aria-expanded", "false");
    triggerNavGlyphs();
  }),
);

document.addEventListener("click", (e) => {
  if (!mainNav.contains(e.target)) {
    mainNav.classList.remove("expanded");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

mainNav.addEventListener("click", (e) => {
  if (e.target.closest("a") || e.target.closest("button")) return;
  triggerNavGlyphs();
});

// Active link on scroll
const sectionEls = Array.from(document.querySelectorAll("section.widget"));
function setActiveByScroll() {
  const y = window.scrollY + 140;
  let currentId = sectionEls[0]?.id || "home";
  for (const s of sectionEls) {
    if (s.offsetTop <= y) currentId = s.id;
  }
  document.querySelectorAll(".nav-link").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
  });

  // Scroll Progress Bar calculation
  const scrollProgress = document.getElementById("scrollProgress");
  if (scrollProgress) {
    const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollVal = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
    scrollProgress.style.width = scrollVal + "%";
  }
}
window.addEventListener("scroll", setActiveByScroll, { passive: true });


// Copy email
const copyBtn = document.getElementById("copyEmailBtn");
const copyToast = document.getElementById("copyToast");
if (copyBtn && copyToast) {
  copyBtn.addEventListener("click", async () => {
    const email = "ankitprogressx@gmail.com";
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const t = document.createElement("textarea");
        t.value = email;
        t.style.position = "fixed";
        t.style.left = "-9999px";
        document.body.appendChild(t);
        t.focus();
        t.select();
        document.execCommand("copy");
        document.body.removeChild(t);
      }

      copyToast.textContent = "Email copied";
      copyToast.classList.add("show");
      setTimeout(() => {
        copyToast.classList.remove("show");
      }, 1400);
    } catch {
      copyToast.textContent = "Copy failed — please email manually";
      copyToast.classList.add("show");
      setTimeout(() => {
        copyToast.classList.remove("show");
      }, 1400);
    }
  });
}

// =========================
// GITHUB TRACKER
// =========================
const GH_USERNAME = "ankitshrr";
const ghReposEl = document.getElementById("ghRepos");

const GH_CACHE_KEY = `gh_repos_cache_${GH_USERNAME}_v1`;
const GH_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h

const LANG_CACHE_KEY = "gh_lang_cache_v4";
const LANG_CACHE_TTL_MS = 60 * 60 * 1000;

function fmtDate(iso) {
  try {
    return new Date(iso).toISOString().slice(0, 10);
  } catch (e) {
    return "--";
  }
}

function safeText(s) {
  return (s ?? "")
    .toString()
    .replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]);
}

function ogRepoImage(owner, repo) {
  const buster = Date.now().toString(36);
  return `https://opengraph.githubassets.com/1/${buster}/${owner}/${repo}`;
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function loadRepoCache() {
  const obj = loadJSON(GH_CACHE_KEY, { ts: 0, user: null, repos: [] });
  const fresh = Date.now() - (obj.ts || 0) < GH_CACHE_TTL_MS;
  return { fresh, ...obj };
}
function saveRepoCache(user, repos) {
  saveJSON(GH_CACHE_KEY, { ts: Date.now(), user, repos });
}

function loadLangCache() {
  try {
    const raw = localStorage.getItem(LANG_CACHE_KEY);
    if (!raw) return { ts: 0, data: {} };
    const parsed = JSON.parse(raw);
    return { ts: parsed.ts || 0, data: parsed.data || {} };
  } catch (e) {
    return { ts: 0, data: {} };
  }
}

function saveLangCache(cache) {
  try {
    localStorage.setItem(LANG_CACHE_KEY, JSON.stringify(cache));
  } catch (e) {}
}

async function fetchRepoLanguages(owner, repo) {
  const key = `${owner}/${repo}`;
  const cache = loadLangCache();
  const fresh = Date.now() - (cache.ts || 0) < LANG_CACHE_TTL_MS;

  if (fresh && cache.data && Array.isArray(cache.data[key])) return cache.data[key];

  const url = `https://api.github.com/repos/${owner}/${repo}/languages`;
  const res = await fetch(url);
  if (!res.ok) return [];

  const obj = await res.json();
  const items = Object.entries(obj || {});
  items.sort((a, b) => (b[1] || 0) - (a[1] || 0));
  const langs = items.map(([name]) => name).slice(0, 3);

  const next = loadLangCache();
  next.ts = Date.now();
  next.data = next.data || {};
  next.data[key] = langs;
  saveLangCache(next);

  return langs;
}

function deviconName(lang) {
  const l = (lang || "").toLowerCase().trim();
  const map = {
    "c++": "cplusplus", "c#": "csharp", "f#": "fsharp",
    "vue": "vuejs", "react": "react", "react-native": "react",
    "next.js": "nextjs", "node.js": "nodejs",
    "jupyter notebook": "jupyter", "shell": "bash",
    "objective-c": "objectivec", "html": "html5",
    "css": "css3", "scss": "sass", "sass": "sass"
  };
  return map[l] || l;
}

function renderMinimalLangPills(langs, fallbackPrimary) {
  const list = Array.isArray(langs) ? langs.filter(Boolean) : [];
  const primary = (fallbackPrimary || "").trim();

  let final = list.length ? list.slice(0, 3) : primary ? [primary] : [];
  if (primary && !final.some((x) => x.toLowerCase() === primary.toLowerCase()) && final.length < 3) {
    final.push(primary);
  }
  
  if (!final.length) return "";

  const items = final.map(lang => {
    const icon = deviconName(lang);
    const url = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`;
    return `<span style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 11px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.15); background: transparent; color: var(--text-main); font-family: 'JetBrains Mono', monospace; line-height: 1;">
      <img src="${url}" width="14" height="14" style="object-fit: contain; filter: brightness(0) invert(1); opacity: 0.85;" onerror="this.style.display='none'" alt="" />
      ${safeText(lang)}
    </span>`;
  }).join("");

  return `<div style="display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">${items}</div>`;
}

const PROJECT_OVERRIDES = {
  "nothing-portfolio": {
    "title": "Portfolio Website",
    "image": "assets/img/projects/portfolio.webp",
    "demo": "",
    "pinned": true
  },
  "zhangjiajie-3d-parallax": {
    "title": "Altitude 3D Parallax",
    "image": "assets/img/projects/altitude.webp",
    "demo": "",
    "pinned": true
  },
  "python-lyric-sync": {
    "title": "Terminal Lyric Sync",
    "image": "assets/img/projects/terminal.webp",
    "demo": "",
    "pinned": true
  },
  "luxxtime-watch-store": {
    "title": "LuxxTime Watch Store",
    "image": "",
    "demo": "",
    "pinned": true
  }
};

function pickProjectTitle(repo) {
  const ov = PROJECT_OVERRIDES?.[repo.name];
  const t = (ov?.title || "").trim();
  return t ? t : repo.name; // fallback to repo name
}

function pickProjectImage(repo) {
  const ov = PROJECT_OVERRIDES?.[repo.name];
  const img = (ov?.image || "").trim();
  return img ? img : ogRepoImage(GH_USERNAME, repo.name); // fallback to GitHub OG
}

function pickProjectDemo(repo) {
  const ov = PROJECT_OVERRIDES?.[repo.name];
  const demo = (ov?.demo || "").trim();
  return demo ? demo : (repo.homepage || "").trim();
}

function isPinned(repoName) {
  return !!PROJECT_OVERRIDES?.[repoName]?.pinned;
}

function getProjectType(repo, langs) {
  const keywordsStr = ((repo.name || "") + " " + (repo.description || "") + " " + (langs || []).join(" ") + " " + (repo.language || "")).toLowerCase();
  
  const mobileKeywords = ['flutter', 'dart', 'react-native', 'swift', 'kotlin', 'ios', 'android'];
  const webKeywords = ['html', 'css', 'javascript', 'js', 'react', 'vue', 'next', 'node', 'django', 'flask', 'web', 'portfolio'];
  
  if (mobileKeywords.some(k => keywordsStr.includes(k))) return "Mobile App";
  if (webKeywords.some(k => keywordsStr.includes(k))) return "Web App";
  return "Other";
}

function repoCard(repo, langs) {
  const title = safeText(pickProjectTitle(repo));
  const desc = safeText(repo.description || "");
  const url = repo.html_url;

  const img = pickProjectImage(repo);
  const fallbackImg = ogRepoImage(GH_USERNAME, repo.name);

  const demo = pickProjectDemo(repo);
  const demoBtn = demo
    ? `<a href="${safeText(demo)}" target="_blank" rel="noopener" class="btn-system btn-tiny">Live Demo</a>`
    : "";

  const projectType = getProjectType(repo, langs);
  const langPillsHTML = renderMinimalLangPills(langs, repo.language);

  return `
    <div class="work-card-inner">
      <div class="work-list-header">
        <div class="work-title-group">
          <h3 class="work-list-title">${title}</h3>
          <span class="project-type-badge" style="margin-bottom: 0;">${projectType}</span>
        </div>
        <div class="work-expand-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>
      <div class="work-list-body">
        <div class="work-list-content">
          <div class="work-list-text">
            ${desc ? `<p class="card-desc" style="margin-bottom: 24px; font-size: 15px;">${desc}</p>` : ``}
            ${langPillsHTML}
            <div class="card-actions">
              ${demoBtn}
              <a href="${url}" target="_blank" rel="noopener" class="btn-system btn-ghost btn-tiny">GitHub Repo</a>
            </div>
          </div>
          <div class="work-list-img">
            <img src="${img}" alt="${title}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackImg}';" />
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Bind click-to-toggle on project accordion cards.
 * Needed because :hover doesn't fire on touch/mobile devices.
 */
function bindProjectCardTaps() {
  const container = document.getElementById('ghRepos');
  if (!container) return;

  container.querySelectorAll('.work-card-inner').forEach(card => {
    // Remove old listener if re-rendered
    card.removeEventListener('click', card._toggleHandler);

    card._toggleHandler = function(e) {
      // Don't intercept clicks on links / buttons inside the card
      if (e.target.closest('a') || e.target.closest('button')) return;
      const isActive = card.classList.contains('is-active');
      // Close all siblings first
      container.querySelectorAll('.work-card-inner.is-active').forEach(c => c.classList.remove('is-active'));
      if (!isActive) {
        card.classList.add('is-active');
        // On touch/tablet: scroll the card to just below the navbar
        // so expanded details are immediately visible — no manual scrolling needed
        const isTouchViewport = window.matchMedia('(max-width: 1024px)').matches;
        if (isTouchViewport) {
          setTimeout(() => {
            const navHeight = document.getElementById('mainNav')?.offsetHeight || 72;
            const cardTop = card.getBoundingClientRect().top + window.scrollY - navHeight - 12;
            window.scrollTo({ top: cardTop, behavior: 'smooth' });
          }, 60); // slight delay lets the DOM expand before measuring
        }
      }
    };

    card.addEventListener('click', card._toggleHandler);
  });
}

async function fetchGitHubLive() {
  const userUrl = `https://api.github.com/users/${GH_USERNAME}`;
  const reposUrl = `https://api.github.com/users/${GH_USERNAME}/repos?sort=updated&per_page=9`;
  const [userRes, reposRes] = await Promise.all([fetch(userUrl), fetch(reposUrl)]);
  if (!userRes.ok || !reposRes.ok) {
    const rateLimited = userRes.status === 403 || reposRes.status === 403;
    throw new Error(rateLimited ? "RATE_LIMIT" : "ERROR");
  }
  const user = await userRes.json();
  const repos = await reposRes.json();
  return { user, repos };
}


function applyWorkFilters(repos) {
  let list = (Array.isArray(repos) ? repos : []).filter((r) => !r.fork && r.language);

  list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  // pinned first
  list.sort((a, b) => (isPinned(b.name) ? 1 : 0) - (isPinned(a.name) ? 1 : 0));

  return list.slice(0, 9);
}

function renderGitHub(user, repos) {
  const visible = applyWorkFilters(repos);

  if (!visible.length) {
    ghReposEl.innerHTML = `
      <div class="work-card-inner" style="cursor:default">
        <span class="label">EMPTY</span>
        <h3>No repos found</h3>
        <p class="card-desc">Public projects will appear here automatically when repos are available.</p>
      </div>
    `;
    return;
  }

  // Render fast first (no langs)
  ghReposEl.innerHTML = visible.map((r) => repoCard(r, [])).join("");
  bindProjectCardTaps();

  // Then enhance with langs
  Promise.allSettled(visible.map((r) => fetchRepoLanguages(GH_USERNAME, r.name))).then((langResults) => {
    ghReposEl.innerHTML = visible
      .map((r, idx) => {
        const langs = langResults[idx] && langResults[idx].status === "fulfilled" ? langResults[idx].value : [];
        return repoCard(r, langs);
      })
      .join("");
    bindProjectCardTaps();
  });
}

async function loadGitHub() {
  // 1) Try cache first
  const cache = loadRepoCache();
  if (cache.user && Array.isArray(cache.repos) && cache.repos.length) {
    renderGitHub(cache.user, cache.repos);
  }

  // 2) Refresh live
  try {
    const { user, repos } = await fetchGitHubLive();
    saveRepoCache(user, repos);
    renderGitHub(user, repos);
  } catch (err) {
    const msg = (err && err.message) || "ERROR";
    const rateLimited = msg === "RATE_LIMIT";

    const cache2 = loadRepoCache();
    const hasCache = cache2.user && Array.isArray(cache2.repos) && cache2.repos.length;
    if (!hasCache) {
      ghReposEl.innerHTML = `
        <div class="work-card-inner" style="cursor:default">
          <span class="label">STATUS</span>
          <h3>GitHub data unavailable</h3>
          <p class="card-desc">${rateLimited ? "GitHub API rate limit hit. Refresh later." : "Could not fetch GitHub right now."}</p>
          <div class="card-actions">
            <a href="https://github.com/${GH_USERNAME}" target="_blank" rel="noopener" class="btn-system btn-ghost btn-tiny">Open GitHub</a>
          </div>
        </div>
      `;
    }
  }
}

// Typewriter removed

// Scroll Animation Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.widget').forEach(widget => {
  if (!widget.classList.contains('hero-widget')) {
    widget.classList.add('fade-in-section');
    observer.observe(widget);
    
    // Stagger inner elements within this widget
    const inners = widget.querySelectorAll('.timeline-item, .skill-category, .contact-card, .about-photo-container, .work-card-inner');
    inners.forEach((el, index) => {
      el.classList.add('fade-in-section');
      el.style.transitionDelay = `${(index + 1) * 0.12}s`;
      observer.observe(el);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add('loading');
  loadGitHub();
  setInterval(loadGitHub, 10 * 60 * 1000);
});

window.addEventListener("load", () => {
  const preloader = document.getElementById('preloader');
  
  setTimeout(() => {
    if (preloader) preloader.classList.add('hidden');
    document.body.classList.remove('loading');
    document.body.classList.add('page-loaded');
    
    runGlyphSequence();
    startHeroAutoplay();
    
    setActiveByScroll();
    setTimeout(triggerNavGlyphs, 500);
  }, 150); // Brief hold before fading out for smoother transition
});




// Work controls removed

// ==========================================
// BONUS TECHNIQUES: LERP, MAP RANGE, TEXT SPLITTING
// ==========================================

// 1. Lerp & Map Range for Smooth Scroll Progress
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

let currentScroll = 0;
let targetScroll = 0;

function renderSmoothScroll() {
  targetScroll = window.scrollY;
  // Lerp towards target scroll
  currentScroll = lerp(currentScroll, targetScroll, 0.08);
  
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  // Map range from scroll distance to 0-100 percentage
  let progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
  
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
  
  requestAnimationFrame(renderSmoothScroll);
}
requestAnimationFrame(renderSmoothScroll);


// ==========================================
// PAC-MAN CONTRIBUTION GRAPH
// ==========================================

async function initPacManGraph() {
  const GH_USER = 'ankitshrr';
  let contributions = [];

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) { const data = await res.json(); contributions = data.contributions || []; }
  } catch (_) {}

  if (!contributions.length) return; // Leave UI with default "—" placeholders

  // ── Streak counter ──────────────────────────────────────────────
  function prevDay(ds) { const d=new Date(ds); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10); }
  function calcStreak(cs) {
    const sorted=[...cs].sort((a,b)=>b.date.localeCompare(a.date));
    const todayStr=new Date().toISOString().slice(0,10);
    const yesterdayStr=prevDay(todayStr);
    let streak=0, expected=todayStr;
    
    // Check if there is a contribution today. If not, the streak might still be valid from yesterday.
    const todayData = sorted.find(c => c.date === todayStr);
    if (!todayData || (todayData.count || 0) === 0) {
      expected = yesterdayStr;
    }

    for(const c of sorted){
      if(c.date>expected) continue;
      if(c.date===expected){ if((c.count||0)>0){streak++;expected=prevDay(c.date);}else break; }
      else break;
    }
    return streak;
  }
  const streak=calcStreak(contributions);
  const streakEl=document.getElementById('pacStreak');
  const streakChip=document.getElementById('pacStreakChip');
  if(streakEl) streakEl.textContent = streak > 0 ? streak+'d' : '0d';
  if(streakChip && streak>0) streakChip.classList.add('streak-active');

  function calcLongestStreak(cs) {
    const sorted=[...cs].sort((a,b)=>a.date.localeCompare(b.date));
    let max=0, cur=0, prev=null;
    for(const c of sorted){
      if((c.count||0)>0){
        if(!prev) cur=1;
        else{
          const d=new Date(prev); d.setDate(d.getDate()+1);
          const exp=d.toISOString().slice(0,10);
          if(c.date===exp) cur++;
          else if(c.date>exp) cur=1;
        }
        if(cur>max) max=cur;
        prev=c.date;
      }
    }
    return max;
  }
  const longestStreak=calcLongestStreak(contributions);
  const longestStreakEl=document.getElementById('pacLongestStreak');
  const longestStreakChip=document.getElementById('pacLongestStreakChip');
  if(longestStreakEl) longestStreakEl.textContent = longestStreak > 0 ? longestStreak+'d' : '0d';
  if(longestStreakChip && longestStreak>0) longestStreakChip.classList.add('streak-active');

  // Stat chips
  const total = contributions.reduce((s,c)=>s+(c.count||0),0);
  const best  = contributions.reduce((m,c)=>c.count>m?c.count:m,0);
  const totalEl=document.getElementById('pacTotalContrib');
  const bestEl =document.getElementById('pacBestDay');
  if(totalEl) totalEl.textContent=total.toLocaleString();
  if(bestEl)  bestEl.textContent =best.toLocaleString();


}

// Kick off when page is loaded (called inside the existing load listener below)
document.addEventListener('DOMContentLoaded', () => {
  initPacManGraph();

  // Scroll Reveal Animation via Intersection Observer
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px', // Trigger slightly before the element hits the bottom of viewport
    threshold: 0.05  // Only require 5% visibility — works on mobile for tall widgets
  };

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // Only animate once
      }
    });
  }, revealObserverOptions);

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    revealObserver.observe(el);
  });
});

// Live KTM Time for Footer
function updateKtmTime() {
  const timeEl = document.getElementById("ktmTime");
  if (!timeEl) return;
  const now = new Date();
  const timeOpts = { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', hour12: true };
  const timeStr = new Intl.DateTimeFormat('en-US', timeOpts).format(now).toUpperCase();
  timeEl.textContent = `${timeStr} • KATHMANDU`;
}
setInterval(updateKtmTime, 1000);
updateKtmTime();
