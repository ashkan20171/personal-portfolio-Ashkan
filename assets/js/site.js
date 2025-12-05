/* ============================
   Wait for header to be injected
============================ */
function initHeaderEvents() {

  const headerEl = document.querySelector("#header .site-header");
  const drawer   = document.querySelector("#header #drawer");
  const menuBtn  = document.querySelector("#header #menuToggle");
  const closeBtn = document.querySelector("#header #drawerClose");
  const themeBtn = document.querySelector("#header #themeToggle");

  if (!headerEl) return;

  /* ========== 1) Header Shrink ========== */
  addEventListener("scroll", () => {
    headerEl.style.padding = scrollY > 40 ? "6px 0" : "12px 0";
  });

  /* ========== 2) Drawer Menu ========== */
  menuBtn?.addEventListener("click", () => drawer.classList.add("open"));
  closeBtn?.addEventListener("click", () => drawer.classList.remove("open"));

  /* ========== 3) Theme Toggle ========== */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") document.body.classList.add("light");

  themeBtn?.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  console.log("Header events initialized ✔");
}

/* ============================
   Watch header container
============================ */
let obs = new MutationObserver(() => {
  if (document.querySelector("#header .site-header")) {
    initHeaderEvents();
    obs.disconnect();
  }
});

obs.observe(document.getElementById("header"), { childList: true });


/* ============================
   4) i18n (Translations)
============================ */
const i18n = {
  fa: {
    nav:{home:"خانه",about:"درباره",skills:"مهارت‌ها",projects:"پروژه‌ها",certs:"مدارک",contact:"تماس"},
    certs:{title:"گواهی‌نامه‌ها"}
  },
  en: {
    nav:{home:"Home",about:"About",skills:"Skills",projects:"Projects",certs:"Certificates",contact:"Contact"},
    certs:{title:"Certificates"}
  }
};

function applyI18n(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keys = el.getAttribute("data-i18n").split(".");
    let text = i18n[lang];
    keys.forEach(k => text = text?.[k]);
    if (typeof text === "string") el.textContent = text;
  });

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  localStorage.setItem("lang", lang);
}

document.addEventListener("click", e => {
  if (e.target.id === "switchFa" || e.target.id === "drawerFa") applyI18n("fa");
  if (e.target.id === "switchEn" || e.target.id === "drawerEn") applyI18n("en");
});

applyI18n(localStorage.getItem("lang") || "fa");


/* ============================
    5) Reveal Animations
============================ */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('[data-anim]').forEach(el => io.observe(el));


/* ============================
    6) Card Tilt Effect
============================ */
function tilt(el) {
  const r = 10;
  el.addEventListener('mousemove', e => {
    const b = el.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width * 2 - 1;
    const y = (e.clientY - b.top) / b.height * 2 - 1;
    el.style.transform = `rotateX(${(-y*r).toFixed(2)}deg) rotateY(${(x*r).toFixed(2)}deg)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = 'rotateX(0) rotateY(0)');
}
