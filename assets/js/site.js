/* ============================
    1) Header Shrink on Scroll
============================ */
document.addEventListener("DOMContentLoaded", () => {

  const headerEl = document.querySelector("#header .site-header");

  if (headerEl) {
    addEventListener("scroll", () => {
      headerEl.style.padding = scrollY > 40 ? "6px 0" : "12px 0";
    });
  }

});



/* ============================
    2) Drawer Menu
============================ */
const drawer = document.getElementById('drawer');
document.getElementById('menuToggle')?.addEventListener('click', () => drawer.classList.add('open'));
document.getElementById('drawerClose')?.addEventListener('click', () => drawer.classList.remove('open'));


/* ============================
    3) Theme Toggle
============================ */
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeBtn?.setAttribute('aria-pressed', 'true');
}

themeBtn?.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeBtn?.setAttribute('aria-pressed', String(isLight));
});


/* ============================
    4) i18n (Translations)
============================ */
const i18n = {
  fa: {
    nav:{home:"خانه",about:"درباره",skills:"مهارت‌ها",projects:"پروژه‌ها",certs:"مدارک",contact:"تماس"},
    certs:{title:"گواهی‌نامه‌ها"},
  },
  en: {
    nav:{home:"Home",about:"About",skills:"Skills",projects:"Projects",certs:"Certificates",contact:"Contact"},
    certs:{title:"Certificates"},
  }
};

function applyI18n(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const path = el.getAttribute('data-i18n').split('.');
    let val = i18n[lang];
    path.forEach(k => val = val?.[k]);
    if (typeof val === 'string') el.textContent = val;
  });

  document.documentElement.lang = lang === 'fa' ? 'fa' : 'en';
  document.documentElement.dir  = lang === 'fa' ? 'rtl' : 'ltr';
  localStorage.setItem('lang', lang);
}

['switchFa','drawerFa'].forEach(id =>
  document.getElementById(id)?.addEventListener('click', () => applyI18n('fa'))
);

['switchEn','drawerEn'].forEach(id =>
  document.getElementById(id)?.addEventListener('click', () => applyI18n('en'))
);

applyI18n(localStorage.getItem('lang') || 'fa');


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


/* ============================
    7) Certificates JSON Loader
============================ */
(function() {
  const container = document.getElementById("certList");
  if (!container) return;

  const lang = localStorage.getItem("lang") || "fa";

  container.innerHTML = `
    <div class="card">
      <p class="muted">Loading…</p>
    </div>
  `;

  fetch("assets/data/certificates.json")
    .then(res => {
      if (!res.ok) throw new Error("JSON load failed");
      return res.json();
    })
    .then(data => {
      const list = data[lang] || [];
      container.innerHTML = "";

      list.forEach(item => {
        const card = document.createElement("div");
        card.className = "card tilt";

        card.innerHTML = `
          <h3>${item.title}</h3>
          <a href="${item.url}" target="_blank" class="btn">مشاهده مدرک</a>
        `;

        container.appendChild(card);
        tilt(card);
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `
        <div class="card">
          <p class="muted">خطا در بارگذاری مدارک</p>
        </div>
      `;
    });
})();


/* ============================
    8) Neon Background
============================ */
const neon = document.getElementById('neon');
if (neon) {
  const ctx = neon.getContext('2d');
  let W, H, t = 0;

  function size() {
    W = neon.width  = innerWidth;
    H = neon.height = innerHeight * 0.8;
  }

  addEventListener('resize', size);
  size();

  (function loop() {
    t += 0.01;
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < 4; i++) {
      const cx = W/2 + Math.sin(t+i) * W*.25;
      const cy = H/2 + Math.cos(t*.8+i) * H*.2;
      const r  = Math.sin(t*1.2+i)*140 + 260;

      const colors = [
        ['#22d3ee','#22d3ee00'],
        ['#7c3aed','#7c3aed00'],
        ['#ec4899','#ec489900'],
        ['#38bdf8','#38bdf800']
      ][i%4];

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, colors[0]);
      g.addColorStop(1, colors[1]);

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.fill();
    }

    requestAnimationFrame(loop);
  })();
}


/* ============================
    9) EmailJS Contact Form
============================ */
(function() {
  try { emailjs.init("G-ASHKAN1234"); } catch(e) {}

  const form = document.getElementById('contactForm');
  if (!form) return;

  const ok  = document.getElementById('contactOk');
  const err = document.getElementById('contactErr');

  ok.style.display  = 'none';
  err.style.display = 'none';

  form.addEventListener('submit', async e => {
    e.preventDefault();

    try {
      await emailjs.sendForm("service_y5ejkgc", "template_dgb6id1", form);
      ok.style.display  = 'block';
      err.style.display = 'none';
      form.reset();
    } catch (ex) {
      ok.style.display  = 'none';
      err.style.display = 'block';
    }
  });
})();
