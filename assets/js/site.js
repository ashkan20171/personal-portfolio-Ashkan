/* site.js — Stable, defensive, and i18n-ready (Oct 2025)
   - Works with data-i18n keys (like your current index.html)
   - Safe guards everywhere: no element -> no error
   - Language + Theme toggles fixed
   - Optional: Blog & Certificates read from HTML if present
   - Optional: Chatbot auto-injected (toggle flag below)
*/

(() => {
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  /* ===== Config flags ===== */
  const ENABLE_CHATBOT = true;   // اگر فعلاً چت‌بات نخواستی، false کن
  const ENABLE_NEON    = true;   // پس‌زمینه نئونی قهرمان

  /* ===== i18n dictionary (keys used by your HTMLs with data-i18n) ===== */
 const i18n = {
  fa: {
    nav:{home:"خانه",about:"درباره",skills:"مهارت‌ها",projects:"پروژه‌ها",certs:"مدارک",contact:"تماس",blog:"وبلاگ"},
    hero:{
      title:"سلام، من اشکان مطاعی هستم — تجربه‌های کاربریِ چشمگیر می‌سازم.",
      subtitle:"توسعه‌دهنده فرانت‌اند با تمرکز بر React/Angular، عملکرد و دسترس‌پذیری.",
      ctaProjects:"مشاهده پروژه‌ها", ctaContact:"تماس"
    },
    home:{
      pitchTitle:"چی کار می‌کنم",
      pitchBody:"رابط‌های سریع، دسترس‌پذیر و سئوپسند می‌سازم و به تیم‌ها کمک می‌کنم مطمئن تحویل بدهند.",
      point1:"دیزاین سیستم و UI پیکسل‌پرفکت",
      point2:"Performance، Accessibility و i18n",
      point3:"همکاری حرفه‌ای با تیم‌های جهانی",
      cardTitle:"هایلایت‌ها",
      hl1:"پرتال منابع انسانی (Angular + ASP.NET)",
      hl2:"سایت گردشگری دوزبانه (React)",
      hl3:"فروشگاه اینترنتی (Vue)"
    },
    projects:{
      title:"پروژه‌ها",
      filterAll:"همه",
      filterWeb:"وب",
      filterDashboard:"داشبورد",
      filterEcom:"فروشگاهی",
      hr:"پیگیری حضور، مرخصی، حقوق، تقویم جلالی",
      tourism:"رزرو، چندزبانه و سئو",
      shop:"فروشگاه سریع با فیلتر و سبد خرید",
      landing:"سیستم طراحی و لندینگ"
    },
    about: {
  title: "درباره من",
  body: "من توسعه‌دهنده فرانت‌اند و متخصص پیاده‌سازی و پشتیبانی نرم‌افزار هستم. با React و Angular کار می‌کنم و روی UX، عملکرد و دسترس‌پذیری تمرکز دارم.",
  expTitle: "تجربه",
  eduTitle: "تحصیلات",

  exp1Role: "مهندس پشتیبانی",
  exp1Company: "ارقام نگار",
  exp1Date: "1404/06 – اکنون",

  exp2Role: "نصب و پشتیبانی",
  exp2Company: "رایانه افزار افلاک",
  exp2Date: "1401/12 – 1404/06",

  exp3Role: "کارآموز (نرم‌افزار حسابداری)",
  exp3Company: "نوسا",
  exp3Date: "1401/06 – 1401/07",

  exp4Role: "پشتیبان نرم‌افزار",
  exp4Company: "گروه GISP",
  exp4Date: "1400/11 – 1401/03",

  edu1: "کارشناسی فناوری نرم‌افزار — موسسه الوند (1395–1397)",
  edu2: "کاردانی نرم‌افزار — دانشگاه آزاد همدان (1393–1395)"
},

    skills:{title:"مهارت‌ها"},
    blog:{title:"وبلاگ",read:"ادامه مطلب",back:"بازگشت",empty:"هیچ پستی موجود نیست."},
    certs:{title:"گواهی‌نامه‌ها",view:"مشاهده مدرک"},
    contact:{name:"نام", email:"ایمیل", message:"پیام", send:"ارسال"},
    footer:{copyright:"© 2025 اشکان مطاعی"},
    chat:{title:"چت با AshkanBot",placeholder:"پیام خود را بنویس...",typing:"در حال تایپ..."}
  },

  en: {
    nav:{home:"Home",about:"About",skills:"Skills",projects:"Projects",certs:"Certificates",contact:"Contact",blog:"Blog"},
    hero:{
      title:"Hi, I’m Ashkan — I craft delightful user experiences.",
      subtitle:"Frontend developer focused on React/Angular, performance and accessibility.",
      ctaProjects:"View Projects", ctaContact:"Contact"
    },
    home:{
      pitchTitle:"What I do",
      pitchBody:"I build fast, accessible, SEO-friendly interfaces and help teams ship confidently.",
      point1:"Design systems & pixel-perfect UI",
      point2:"Performance, accessibility, i18n",
      point3:"Great communication with global teams",
      cardTitle:"Recent highlights",
      hl1:"HR Portal (Angular + ASP.NET)",
      hl2:"Bilingual Tourism Site (React)",
      hl3:"E-commerce Storefront (Vue)"
    },
    projects:{
      title:"Projects",
      filterAll:"All",
      filterWeb:"Web",
      filterDashboard:"Dashboard",
      filterEcom:"E-commerce",
      hr:"Time tracking, leave, payroll, Jalali calendar.",
      tourism:"Bilingual & SEO-optimized booking.",
      shop:"Fast storefront with filters & cart.",
      landing:"Design system & landing pages."
    },
    about: {
  title: "About Me",
  body: "I am a frontend developer and software deployment/support specialist. I work with React and Angular, focusing on user experience, performance, and accessibility.",
  expTitle: "Experience",
  eduTitle: "Education",

  exp1Role: "Support Engineer",
  exp1Company: "Arqam Negar",
  exp1Date: "2025 – Present",

  exp2Role: "Support & Deployment",
  exp2Company: "SDS R.Aflak",
  exp2Date: "2023 – 2025",

  exp3Role: "Intern (Accounting Software)",
  exp3Company: "Nosa",
  exp3Date: "2022",

  exp4Role: "Support Technician",
  exp4Company: "GISP Group",
  exp4Date: "2021",

  edu1: "BSc in Software Technology — Alvand Institute (2016–2018)",
  edu2: "Associate in Software — IAU Hamedan (2014–2016)"
},

    skills:{title:"Skills"},
    blog:{title:"Blog",read:"Read More",back:"Back",empty:"No posts found."},
    certs:{title:"Certificates",view:"View Certificate"},
    contact:{name:"Name", email:"Email", message:"Message", send:"Send"
},
    footer:{copyright:"© 2025 Ashkan Mataee"},
    chat:{title:"Chat with AshkanBot",placeholder:"Type a message...",typing:"typing..."}
  }
};


  /* ===== Safe helpers ===== */
  const getLang = () => localStorage.getItem('lang') || 'en';
  const setLang = (l) => localStorage.setItem('lang', l);
  const t = (lang, path) => {
    try{
      return path.split('.').reduce((o,k)=> o?.[k], i18n[lang]) || '';
    }catch{return '';}
  };

  /* ===== Apply i18n to elements with data-i18n (text) & data-i18n-placeholder ===== */
  function applyI18n(lang){
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'fa' ? 'rtl' : 'ltr';
    setLang(lang);

    $$('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const val = t(lang, key);
      if (val) el.textContent = val;
    });
    $$('[data-i18n-placeholder]').forEach(el=>{
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(lang, key);
      if (val) el.placeholder = val;
    });

    // Footer (اگر data-i18n براش ست نشده)
    const foot = $('.footer small.muted, .footer small');
    if (foot && !foot.hasAttribute('data-i18n')) {
      foot.textContent = t(lang, 'footer.copyright') || foot.textContent;
    }

    // صفحه وبلاگ/مدارک اگر وجود داشت
    renderBlog(lang);
    renderCertificates(lang);

    // چت‌بات
    updateChatLang(lang);
  }

  /* ===== Theme toggle (safe) ===== */
  function initTheme(){
    const themeBtn = $('#themeToggle');
    const saved = localStorage.getItem('theme');
    if (saved === 'light') document.body.classList.add('light');
    themeBtn?.setAttribute('aria-pressed', saved === 'light' ? 'true' : 'false');
    themeBtn?.addEventListener('click', ()=>{
      const isLight = document.body.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn?.setAttribute('aria-pressed', String(isLight));
    });
  }

  /* ===== Drawer (safe) ===== */
  function initDrawer(){
    $('#menuToggle')?.addEventListener('click', ()=> $('#drawer')?.classList.add('open'));
    $('#drawerClose')?.addEventListener('click', ()=> $('#drawer')?.classList.remove('open'));
  }

  /* ===== Sticky header shrink (safe) ===== */
  function initHeaderShrink(){
    const headerEl = $('#siteHeader');
    if (!headerEl) return;
    addEventListener('scroll', ()=> {
      headerEl.style.padding = scrollY > 40 ? '6px 0' : '12px 0';
    });
  }

  /* ===== Reveal animations (safe) ===== */
  function initReveal(){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    },{threshold:0.2});
    $$('[data-anim]').forEach(el=> io.observe(el));
  }

  /* ===== Neon background (index only) ===== */
  function initNeon(){
    if (!ENABLE_NEON) return;
    const neon = $('#neon');
    if(!neon) return;
    const ctx = neon.getContext('2d'); let W,H,tv=0;
    function size(){ W=neon.width=innerWidth; H=neon.height=innerHeight*0.8; }
    addEventListener('resize', size); size();
    (function loop(){ tv+=0.01; ctx.clearRect(0,0,W,H);
      for(let i=0;i<4;i++){
        const cx=W/2+Math.sin(tv+i)*W*.25, cy=H/2+Math.cos(tv*.8+i)*H*.2, r=Math.sin(tv*1.2+i)*140+260;
        const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
        const cs=[['#22d3ee','#22d3ee00'],['#7c3aed','#7c3aed00'],['#ec4899','#ec489900'],['#38bdf8','#38bdf800']][i%4];
        g.addColorStop(0, cs[0]); g.addColorStop(1, cs[1]); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ===== Certificates from HTML (supports bilingual via data-lang) ===== */
  function renderCertificates(lang){
    const wrap = $('#certList');
    const dataWrap = $('#certData');
    if(!wrap || !dataWrap) return;
    wrap.innerHTML = '';
    // اولویت: ساختار دوزبانه
    let entries = $(`[data-lang="${lang}"]`, dataWrap)?.querySelectorAll('a');
    entries = entries && entries.length ? Array.from(entries) : Array.from(dataWrap.querySelectorAll('a'));
    if(entries.length === 0){
      wrap.innerHTML = `<div class="card"><p class="muted">${t(lang,'blog.empty') || 'Nothing here.'}</p></div>`;
      return;
    }
    entries.forEach(a=>{
      const title = a.dataset.title || a.textContent.trim() || (lang==='fa'?'مدرک':'Certificate');
      const href  = a.getAttribute('href') || '#';
      const card  = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <i>🏅</i>
        <h4>${title}</h4>
        <p style="margin-top:8px;">
          <a href="${href}" target="_blank" rel="noopener"
             style="display:inline-block;padding:6px 12px;background:rgba(255,255,255,.05);
                    border-radius:8px;text-decoration:none;font-weight:600;color:inherit">
            ${t(lang,'certs.view') || (lang==='fa'?'مشاهده مدرک':'View Certificate')}
          </a>
        </p>`;
      wrap.appendChild(card);
    });
  }

  /* ===== Blog from HTML (no JSON) ===== */
  function renderBlog(lang){
    const list = $('#blogPosts');
    const dataWrap = $('#blogData');
    if(!list || !dataWrap) return;
    list.innerHTML='';
    const section = $(`[data-lang="${lang}"]`, dataWrap);
    const posts = section ? Array.from(section.querySelectorAll('article')) : [];
    if(posts.length === 0){
      list.innerHTML = `<p class="muted">${t(lang,'blog.empty') || 'No posts.'}</p>`;
      return;
    }
    posts.forEach(p=>{
      const title = p.querySelector('h3')?.textContent || '';
      const date  = p.querySelector('small')?.textContent || '';
      const body  = p.querySelector('p')?.textContent || '';
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${title}</h3><small>${date}</small><p>${body}</p>`;
      list.appendChild(card);
    });
  }

  /* ===== Chatbot (auto-inject, safe) ===== */
  function initChatbot(){
    if(!ENABLE_CHATBOT) return;
    if($('#chatbot') || $('#chat-btn')) return;
    const lang = getLang();
    const html = `
      <button id="chat-btn" class="chat-btn">💬</button>
      <div id="chatbot" class="chatbot glass" style="display:none">
        <div id="chat-header" style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">
          <span data-i18n="chat.title">${t(lang,'chat.title')||'Chat'}</span>
          <button id="chat-close" class="btn ghost" style="padding:4px 8px">✕</button>
        </div>
        <div id="chat-body" style="padding:10px;max-height:300px;overflow:auto"></div>
        <div id="chat-input" style="display:flex;gap:8px;align-items:center;padding:10px;border-top:1px solid rgba(255,255,255,.08)">
          <input id="chat-text" type="text" data-i18n-placeholder="chat.placeholder" placeholder="${t(lang,'chat.placeholder')||'Type...'}" class="input" style="flex:1">
          <button id="chat-send" class="btn">➤</button>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', html);

    const btn = $('#chat-btn'), box=$('#chatbot'), body=$('#chat-body'),
          close=$('#chat-close'), input=$('#chat-text'), send=$('#chat-send');

    btn?.addEventListener('click', ()=> { if(box) box.style.display = (box.style.display==='none' || !box.style.display)?'flex':'none'; });
    close?.addEventListener('click', ()=> { if(box) box.style.display='none'; });

    function append(txt, cls, typing=false){
      const div=document.createElement('div');
      div.className=`message ${cls}`;
      div.style.margin='6px 0'; div.style.padding='8px 10px'; div.style.borderRadius='10px';
      div.style.background = cls==='user' ? 'rgba(255,255,255,.10)' : 'rgba(124,58,237,.25)';
      body?.appendChild(div);
      if(typing){
        let i=0; const int=setInterval(()=>{
          div.textContent += txt[i++] || '';
          if(i>txt.length){ clearInterval(int); }
          body.scrollTop = body.scrollHeight;
        }, 30);
      }else{ div.textContent = txt; body.scrollTop = body.scrollHeight; }
    }
    function reply(userText){
      const L=getLang(); const q=userText.toLowerCase();
      let r;
      if(L==='fa'){
        if(q.includes('سلام')) r='سلام! خوش اومدی 🌸';
        else if(q.includes('پروژه')) r='پروژه‌ها در صفحه «پروژه‌ها» هستن.';
        else if(q.includes('رزومه')) r='رزومه در صفحه «درباره» قرار داره.';
        else r='متوجه نشدم، ولی خوشحال می‌شم راهنمایی‌ت کنم 🤝';
      } else {
        if(q.includes('hello')) r='Hi there! 👋';
        else if(q.includes('project')) r='You can view my projects on the Projects page.';
        else if(q.includes('resume')) r='My resume is on the About page.';
        else r='I didn’t catch that, but I’d love to help 🤝';
      }
      append(t(L,'chat.typing') || (L==='fa'?'در حال تایپ...':'typing...'), 'bot');
      setTimeout(()=>{
        // remove last "typing" bubble
        const last = body?.lastElementChild;
        if(last) last.remove();
        append(r, 'bot', true);
      }, 700);
    }
    function sendMsg(){
      const txt=input?.value.trim(); if(!txt) return;
      append(txt,'user'); if(input) input.value='';
      setTimeout(()=> reply(txt), 400);
    }
    send?.addEventListener('click', sendMsg);
    input?.addEventListener('keydown', e=>{ if(e.key==='Enter') sendMsg(); });

    // زبان اولیه چت‌بات
    updateChatLang(lang);
  }

  function updateChatLang(lang){
    const ttl = $('[data-i18n="chat.title"]');
    if(ttl) ttl.textContent = t(lang,'chat.title') || ttl.textContent;
    const ph = $('[data-i18n-placeholder="chat.placeholder"]');
    if(ph) ph.placeholder = t(lang,'chat.placeholder') || ph.placeholder;
  }

  /* ===== Init ===== */
  document.addEventListener('DOMContentLoaded', ()=>{
    try{
      initTheme();
      initDrawer();
      initHeaderShrink();
      initReveal();
      initNeon();

      // زبان
      const lang = getLang();
      applyI18n(lang);

      // سوییچ زبان (دکمه‌های هدر و دراور)
      ['switchFa','drawerFa'].forEach(id => $('#'+id)?.addEventListener('click', ()=> applyI18n('fa')));
      ['switchEn','drawerEn'].forEach(id => $('#'+id)?.addEventListener('click', ()=> applyI18n('en')));

      // چت‌بات
      initChatbot();
    }catch(err){
      console.error('Init error:', err);
    }
  });
})();
/* ===== Blog Listing + Post Details ===== */
document.addEventListener('DOMContentLoaded', () => {
  const blogPosts = document.getElementById('blogPosts');
  const blogData = document.getElementById('blogData');
  const postPage = document.getElementById('postContent');

  const lang = localStorage.getItem('lang') || 'fa';

  // صفحه وبلاگ (لیست)
  if (blogPosts && blogData) {
    const articles = Array.from(blogData.querySelectorAll(`[data-lang="${lang}"] article`));
    blogPosts.innerHTML = '';

    articles.forEach(a => {
      const id = a.dataset.id;
      const img = a.dataset.img || 'assets/img/default.jpg';
      const title = a.querySelector('h3').textContent;
      const date = a.querySelector('small').textContent;
      const excerpt = a.querySelector('p').textContent;

      const card = document.createElement('div');
      card.className = 'card tilt';
      card.innerHTML = `
        <img src="${img}" alt="${title}" style="width:100%;border-radius:10px;margin-bottom:10px;">
        <h3>${title}</h3>
        <small class="muted">${date}</small>
        <p>${excerpt}</p>
        <button class="btn ghost" data-id="${id}">${lang === 'fa' ? 'ادامه مطلب' : 'Read More'}</button>
      `;
      blogPosts.appendChild(card);
      tilt(card);
    });

    blogPosts.addEventListener('click', e => {
      const btn = e.target.closest('button[data-id]');
      if (!btn) return;
      const id = btn.dataset.id;
      localStorage.setItem('selectedPost', id);
      location.href = 'post.html';
    });
  }

  // صفحه پست تکی
  if (postPage && blogData) {
    const id = localStorage.getItem('selectedPost');
    const article = blogData.querySelector(`[data-lang="${lang}"] article[data-id="${id}"]`);
    if (!article) return;

    const img = article.dataset.img || 'assets/img/default.jpg';
    const title = article.querySelector('h3').textContent;
    const date = article.querySelector('small').textContent;
    const body = article.querySelector('p').textContent;

    postPage.innerHTML = `
      <img src="${img}" alt="${title}" style="width:100%;border-radius:12px;margin-bottom:20px;">
      <h2>${title}</h2>
      <small class="muted">${date}</small>
      <p style="margin-top:16px;line-height:1.8;">${body}</p>
    `;
    document.title = title;
  }
});
/* ===== Contact Form (EmailJS) ===== */
document.addEventListener("DOMContentLoaded", () => {

  emailjs.init("eIFLMnft4drU-dBDv"); // PUBLIC KEY شما

  const form = document.getElementById("contactForm");
  const ok = document.getElementById("contactOk");
  const err = document.getElementById("contactErr");

  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      ok.style.display = "none";
      err.style.display = "none";

      emailjs.sendForm(
        "service_2ve5x3n",      // SERVICE ID
        "template_ln3pd5s",    // TEMPLATE ID
        this
      ).then(() => {
        ok.style.display = "block";
        form.reset();
      }).catch(() => {
        err.style.display = "block";
      });
    });
  }
});

// === Neon Background Parallax ===
const certsBg = document.getElementById("certsBg");
if (certsBg) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    // حرکت نرم و ظریف با نسبت پایین برای عمق سه‌بعدی
    certsBg.style.transform = `translateY(${scrollY * 0.1}px) scale(1.05)`;
  });
  
}
