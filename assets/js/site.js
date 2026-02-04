'use strict';

// ===== Helpers =====
function getLang(){
  return (localStorage.getItem('lang') || 'en').toLowerCase().startsWith('fa') ? 'fa' : 'en';
}
function escapeHTML(str){
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// ===== Offline-safe JSON loader (works even if fetch is blocked on file://) =====
const __FALLBACK_CERTS__ = {"certificates": [{"title": {"en": "ICDL", "fa": "ICDL"}, "issuer": "", "date": "", "url": "https://www.daneshjooyar.com/cf/PBf8SU1dEe/"}, {"title": {"en": "HTML & CSS", "fa": "HTML & CSS"}, "issuer": "", "date": "", "url": "https://www.daneshjooyar.com/cf/bDq8J7Wi9M/"}, {"title": {"en": "JavaScript", "fa": "JavaScript"}, "issuer": "", "date": "", "url": "https://www.daneshjooyar.com/cf/inU1LjgqWM/"}, {"title": {"en": "Bootstrap 5", "fa": "Bootstrap 5"}, "issuer": "", "date": "", "url": "https://www.daneshjooyar.com/cf/zUlePVnp82/"}, {"title": {"en": "Figma Learning", "fa": "Figma"}, "issuer": "", "date": "", "url": "https://www.daneshjooyar.com/cf/5YPmUVX42g/"}]};
const __FALLBACK_BLOG__  = {"posts": [{"slug": "welcome", "date": "2026-02-04", "title": {"fa": "شروع وبلاگ اشکان", "en": "Welcome to Ashkan’s Blog"}, "excerpt": {"fa": "اینجا درباره پروژه‌ها، تکنولوژی و تجربه‌های کاری می‌نویسم.", "en": "Here I write about projects, tech and engineering experience."}, "content": {"fa": "<p>سلام! این اولین پست وبلاگ من است. به‌زودی درباره پروژه‌ها، نکات فنی و تجربه‌های کاری می‌نویسم.</p>", "en": "<p>Hi! This is my first blog post. Soon I’ll share projects, technical notes, and engineering experience.</p>"}}]};
const __FALLBACK_KB__    = {"pairs": [{"q": {"en": "resume", "fa": "رزومه"}, "a": {"en": "You can download my resume here: <a href='resume.pdf'>Resume</a>", "fa": "می‌تونی رزومه من رو از این لینک ببینی: <a href='resume.pdf'>دانلود رزومه</a>"}}, {"q": {"en": "projects", "fa": "پروژه ها"}, "a": {"en": "See my work on <a href='projects.html'>Projects</a>.", "fa": "برای دیدن پروژه‌ها به صفحه <a href='projects.html'>پروژه‌ها</a> برو."}}, {"q": {"en": "contact", "fa": "تماس"}, "a": {"en": "Reach me via <a href='contact.html'>Contact</a>.", "fa": "برای ارتباط، صفحه <a href='contact.html'>تماس</a> رو ببین."}}, {"q": {"en": "blog", "fa": "وبلاگ"}, "a": {"en": "My blog is here: <a href='blog.html'>Blog</a>.", "fa": "وبلاگ من اینجاست: <a href='blog.html'>وبلاگ</a>."}}]};

async function safeFetchJson(path, fallback){
  try{
    const res = await fetch(path, { cache: 'force-cache' });
    if(!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  }catch(e){
    return fallback;
  }
}

// Sticky header shrink
const headerEl = document.getElementById('siteHeader');
addEventListener('scroll', ()=> headerEl && (headerEl.style.padding = scrollY > 40 ? '6px 0' : '12px 0'), { passive:true });

// Drawer menu
const drawerBackdrop = document.getElementById('drawerBackdrop');
const openDrawer = () => { drawer?.classList.add('open'); drawerBackdrop?.classList.add('open'); };
const closeDrawer = () => { drawer?.classList.remove('open'); drawerBackdrop?.classList.remove('open'); };

const drawer = document.getElementById('drawer');
document.getElementById('menuToggle')?.addEventListener('click', openDrawer);
document.getElementById('drawerClose')?.addEventListener('click', closeDrawer);
drawerBackdrop?.addEventListener('click', closeDrawer);

// ===== 🌗 THEME TOGGLE (Fixed with localStorage) =====
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

// 🌍 Language Switch
const i18n = {
  fa: { nav:{home:"خانه",about:"درباره",skills:"مهارت‌ها",projects:"پروژه‌ها",certs:"مدارک",contact:"تماس",blog:"وبلاگ"},
        chat:{title:"چت",placeholder:"پیامت را بنویس...",send:"ارسال"},
        hero:{title:"سلام، من اشکان مطاعی هستم — تجربه‌های کاربریِ چشمگیر می‌سازم.",subtitle:"تمرکز روی React/Angular، Performance و دسترس‌پذیری.",ctaProjects:"مشاهده پروژه‌ها",ctaContact:"ارتباط"},
        home:{pitchTitle:"چی کار می‌کنم",pitchBody:"رابط‌های سریع، دسترس‌پذیر و سئوپسند می‌سازم.",point1:"دیزاین سیستم و UI پیکسل‌پرفکت",point2:"بهینه‌سازی سرعت، دسترس‌پذیری و چندزبانه",point3:"همکاری روان با تیم‌های جهانی",cardTitle:"هایلایت‌ها"},
        about:{title:"درباره من",body:"من توسعه‌دهندهٔ فرانت‌اند و کارشناس پشتیبانی/استقرار هستم. با React/Angular محصول تحویل داده‌ام و به UX، دسترس‌پذیری و کدنویسی تمیز اهمیت می‌دهم.",expTitle:"سوابق شغلی",eduTitle:"تحصیلات"},
        skills:{title:"مهارت‌ها"},
        projects:{title:"پروژه‌ها",filterAll:"همه",filterWeb:"وب",filterDashboard:"داشبورد",filterEcom:"فروشگاه",
          hr:"ثبت ساعات، مرخصی، حقوق، تقویم جلالی.", tourism:"سایت چندزبانه با رزرو و سئوی قوی.", shop:"فروشگاه سریع با فیلتر و سبد خرید.", landing:"سیستم طراحی و صفحات لندینگ."},
        certs:{title:"گواهی‌نامه‌ها"},
        contact:{title:"تماس",name:"نام / Name",email:"ایمیل / Email",message:"پیام / Message",send:"ارسال",whyTitle:"چرا من؟",why1:"UI پیکسل‌پرفکت",why2:"تمرکز روی Performance و SEO",why3:"تجربه همکاری جهانی"}
      },
  en: { nav:{home:"Home",about:"About",skills:"Skills",projects:"Projects",certs:"Certificates",contact:"Contact",blog:"Blog"},
        chat:{title:"Chat",placeholder:"Type your message...",send:"Send"},
        hero:{title:"Hi, I’m Ashkan — I craft delightful user experiences.",subtitle:"Focused on React/Angular, performance and accessibility.",ctaProjects:"View Projects",ctaContact:"Contact"},
        home:{pitchTitle:"What I do",pitchBody:"I build fast, accessible, SEO-friendly interfaces.",point1:"Design systems & pixel-perfect UI",point2:"Performance, a11y, internationalization",point3:"Smooth collaboration with global teams",cardTitle:"Recent highlights"},
        about:{title:"About Me",body:"I’m a frontend developer and software support/deployment specialist. I ship with React/Angular and care about UX, a11y and clean code.",expTitle:"Experience",eduTitle:"Education"},
        skills:{title:"Skills"},
        projects:{title:"Projects",filterAll:"All",filterWeb:"Web",filterDashboard:"Dashboard",filterEcom:"E-commerce",
          hr:"Time tracking, leave, payroll, Jalali calendar.", tourism:"Bilingual booking site with strong SEO.", shop:"Fast storefront with filters & cart.", landing:"Design system & landing pages."},
        certs:{title:"Certificates"},
        contact:{title:"Contact",name:"Name / نام",email:"Email / ایمیل",message:"Message / پیام",send:"Send",whyTitle:"Why me?",why1:"Pixel-perfect UI",why2:"Performance & SEO focused",why3:"Global collaboration"}
      }
};

function applyI18n(lang){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const path = el.getAttribute('data-i18n').split('.');
    let val = i18n[lang]; path.forEach(k=> val = val?.[k]);
    if(typeof val === 'string') el.textContent = val;
  });
  // Placeholder translations (e.g. chatbot input)
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const path = el.getAttribute('data-i18n-placeholder').split('.');
    let val = i18n[lang];
    path.forEach(k=> val = val?.[k]);
    if(typeof val === 'string') el.setAttribute('placeholder', val);
  });
  document.documentElement.lang = lang === 'fa' ? 'fa' : 'en';
  document.documentElement.dir  = lang === 'fa' ? 'rtl' : 'ltr';
  localStorage.setItem('lang', lang);
}
['switchFa','drawerFa'].forEach(id=> document.getElementById(id)?.addEventListener('click', ()=> applyI18n('fa')));
['switchEn','drawerEn'].forEach(id=> document.getElementById(id)?.addEventListener('click', ()=> applyI18n('en')));
applyI18n(localStorage.getItem('lang') || 'en');

// Reveal animation
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} })
},{threshold:0.2});
document.querySelectorAll('[data-anim]').forEach(el=> io.observe(el));

// Tilt effect
function tilt(el){ const r=10;
  el.addEventListener('mousemove', e=>{ const b=el.getBoundingClientRect(), x=(e.clientX-b.left)/b.width*2-1, y=(e.clientY-b.top)/b.height*2-1; el.style.transform=`rotateX(${(-y*r).toFixed(2)}deg) rotateY(${(x*r).toFixed(2)}deg)`; });
  el.addEventListener('mouseleave', ()=> el.style.transform='rotateX(0) rotateY(0)');
}
document.querySelectorAll('.tilt').forEach(tilt);

// Certificates rendering (from JSON with offline fallback)
(async function(){
  const wrap = document.getElementById('certList');
  if(!wrap) return;

  const lang = getLang();
  const data = await safeFetchJson('assets/data/certificates.json', __FALLBACK_CERTS__);
  const items = (data && data.certificates) ? data.certificates : [];
  if(!items.length){
    wrap.innerHTML = '<div class="card"><p class="muted">No certificates yet.</p></div>';
    return;
  }

  wrap.innerHTML = items.map(c => {
    const title = (c.title && (c.title[lang] || c.title.en || c.title.fa)) || '';
    const issuer = c.issuer ? `<div class="muted">${escapeHTML(c.issuer)}</div>` : '';
    const date = c.date ? `<div class="muted">${escapeHTML(c.date)}</div>` : '';
    const link = c.url ? `<a class="btn small" href="${escapeHTML(c.url)}" target="_blank" rel="noopener">View</a>` : '';
    return `<article class="card glass">
      <h3>${escapeHTML(title)}</h3>
      ${issuer}
      ${date}
      <div style="margin-top:10px">${link}</div>
    </article>`;
  }).join('');
})();


// Neon background
const neon=document.getElementById('neon');
if(neon){
  const ctx=neon.getContext('2d'); let W,H,t=0;
  function size(){ W=neon.width=innerWidth; H=neon.height=innerHeight*0.8; } addEventListener('resize', size); size();
  (function loop(){ t+=0.01; ctx.clearRect(0,0,W,H);
    for(let i=0;i<4;i++){ const cx=W/2+Math.sin(t+i)*W*.25, cy=H/2+Math.cos(t*.8+i)*H*.2, r=Math.sin(t*1.2+i)*140+260;
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r), cs=[['#22d3ee','#22d3ee00'],['#7c3aed','#7c3aed00'],['#ec4899','#ec489900'],['#38bdf8','#38bdf800']][i%4];
      g.addColorStop(0, cs[0]); g.addColorStop(1, cs[1]); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill(); }
    requestAnimationFrame(loop);
  })();
}

// EmailJS integration
(function(){
  try{ emailjs.init("G-ASHKAN1234"); }catch(e){}
  const form=document.getElementById('contactForm'); if(!form) return;
  const ok=document.getElementById('contactOk'), err=document.getElementById('contactErr');
  ok.style.display='none'; err.style.display='none';
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    try{
      await emailjs.sendForm("service_y5ejkgc","template_dgb6id1", form);
      ok.style.display='block'; err.style.display='none'; form.reset();
    }catch(ex){ ok.style.display='none'; err.style.display='block'; }
  });
})();


// Blog rendering
async function loadBlog(){
  const list = document.getElementById('blogList');
  const postTitle = document.getElementById('postTitle');
  if(!list && !postTitle) return;

  const lang = getLang();
    const data = await safeFetchJson('assets/data/blog.json', __FALLBACK_BLOG__);
  const posts = (data && data.posts) ? data.posts : [];

  const bySlug = Object.fromEntries(posts.map(p=>[p.slug,p]));
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');

  if(postTitle){
    const p = bySlug[slug] || posts[0];
    if(!p) return;
    postTitle.textContent = (p.title && p.title[lang]) || (p.title && p.title.fa) || 'Post';
    const meta = document.getElementById('postMeta');
    if(meta) meta.textContent = p.date || '';
    const body = document.getElementById('postBody');
    if(body) body.innerHTML = (p.content && (p.content[lang] || p.content.fa)) || '';
    // set document title
    document.title = postTitle.textContent + ' | Ashkan';
    return;
  }

  // list mode
  list.innerHTML = posts.map(p=>{
    const title = (p.title && (p.title[lang] || p.title.fa)) || p.slug;
    const excerpt = (p.excerpt && (p.excerpt[lang] || p.excerpt.fa)) || '';
    return `<article class="card" style="padding:16px">
      <h3 style="margin:0 0 8px 0">${title}</h3>
      <p class="muted" style="margin:0 0 12px 0">${excerpt}</p>
      <a class="btn" href="blog-post.html?slug=${encodeURIComponent(p.slug)}">${lang==='fa'?'ادامه':'Read'}</a>
    </article>`;
  }).join('');
}
loadBlog().catch(()=>{});


// Chatbot (AI-first with safe fallback)
async function initChatbot(){
  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const log = document.getElementById('chatLog');
  if(!fab || !panel || !form || !input || !log) return;

  const lang = getLang();

  const kbData = await safeFetchJson('assets/data/chatbot_kb.json', __FALLBACK_KB__);
  const pairs = (kbData && kbData.pairs) ? kbData.pairs : [];

  const addMsg = (role, html) => {
    const div = document.createElement('div');
    // Match CSS naming (.chatbot-msg.user/.chatbot-msg.bot)
    div.className = 'chatbot-msg ' + role;
    div.innerHTML = html;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  };

  const toggle = (open) => {
    panel.classList.toggle('open', open);
    fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    if(open) input.focus();
  };

  fab.addEventListener('click', () => toggle(!panel.classList.contains('open')));
  closeBtn && closeBtn.addEventListener('click', () => toggle(false));

  // simple KB match
  function kbAnswer(text){
    const t = String(text||'').toLowerCase();
    let best=null, score=0;
    for(const p of pairs){
      const q = (p.q && (p.q[lang] || p.q.en || p.q.fa)) || '';
      const ql = q.toLowerCase().trim();
      if(!ql) continue;
      // basic token overlap
      const toks = ql.split(/\s+/).filter(Boolean);
      const s = toks.reduce((acc, w)=> acc + (t.includes(w)?1:0), 0);
      if(s>score){ score=s; best=p; }
    }
    if(!best || score===0) return null;
    return (best.a && (best.a[lang] || best.a.en || best.a.fa)) || null;
  }

  async function aiAnswer(userText){
    // Netlify Functions endpoint (recommended). You can change this path if you deploy elsewhere.
    const endpoint = '/.netlify/functions/chat';
    const payload = {
      lang,
      message: userText,
      // Optional: you can pass a short page context for better answers
      page: location.pathname
    };
    const r = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if(!r.ok) throw new Error('ai_failed');
    const out = await r.json();
    if(!out || !out.reply) throw new Error('ai_empty');
    return out.reply;
  }

  // greet once
  if(!log.dataset.greeted){
    log.dataset.greeted = '1';
    addMsg('bot', lang==='fa'
      ? 'سلام! من دستیار سایت اشکان هستم. چی می‌خوای بدونی؟'
      : 'Hi! I’m Ashkan’s site assistant. What can I help with?'
    );
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = (input.value || '').trim();
    if(!text) return;
    input.value = '';
    addMsg('user', escapeHTML(text));

    // Try AI first
    addMsg('bot', '<span class="muted">…</span>');
    const pending = log.lastElementChild;

    try{
      const reply = await aiAnswer(text);
      pending.innerHTML = reply; // server returns safe HTML (we control prompt)
      return;
    }catch(_){
      // fallback to KB
      const kb = kbAnswer(text);
      pending.innerHTML = kb ? kb : (lang==='fa'
        ? 'متوجه نشدم. می‌تونی دقیق‌تر بپرسی؟'
        : 'I didn’t catch that. Could you rephrase?');
    }
  });
}
initChatbot().catch(()=>{});

