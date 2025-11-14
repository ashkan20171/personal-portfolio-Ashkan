// Sticky header shrink
const headerEl = document.getElementById('siteHeader');
addEventListener('scroll', ()=> headerEl && (headerEl.style.padding = scrollY > 40 ? '6px 0' : '12px 0'));

// Drawer menu
const drawer = document.getElementById('drawer');
document.getElementById('menuToggle')?.addEventListener('click', ()=> drawer.classList.add('open'));
document.getElementById('drawerClose')?.addEventListener('click', ()=> drawer.classList.remove('open'));

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
  fa: { nav:{home:"خانه",about:"درباره",skills:"مهارت‌ها",projects:"پروژه‌ها",certs:"مدارک",contact:"تماس"},
        hero:{title:"سلام، من اشکان مطاعی هستم — تجربه‌های کاربریِ چشمگیر می‌سازم.",subtitle:"تمرکز روی React/Angular، Performance و دسترس‌پذیری.",ctaProjects:"مشاهده پروژه‌ها",ctaContact:"ارتباط"},
        home:{pitchTitle:"چی کار می‌کنم",pitchBody:"رابط‌های سریع، دسترس‌پذیر و سئوپسند می‌سازم.",point1:"دیزاین سیستم و UI پیکسل‌پرفکت",point2:"بهینه‌سازی سرعت، دسترس‌پذیری و چندزبانه",point3:"همکاری روان با تیم‌های جهانی",cardTitle:"هایلایت‌ها"},
        about:{title:"درباره من",body:"من توسعه‌دهندهٔ فرانت‌اند و کارشناس پشتیبانی/استقرار هستم. با React/Angular محصول تحویل داده‌ام و به UX، دسترس‌پذیری و کدنویسی تمیز اهمیت می‌دهم.",expTitle:"سوابق شغلی",eduTitle:"تحصیلات"},
        skills:{title:"مهارت‌ها"},
        projects:{title:"پروژه‌ها",filterAll:"همه",filterWeb:"وب",filterDashboard:"داشبورد",filterEcom:"فروشگاه",
          hr:"ثبت ساعات، مرخصی، حقوق، تقویم جلالی.", tourism:"سایت چندزبانه با رزرو و سئوی قوی.", shop:"فروشگاه سریع با فیلتر و سبد خرید.", landing:"سیستم طراحی و صفحات لندینگ."},
        certs:{title:"گواهی‌نامه‌ها"},
        contact:{title:"تماس",name:"نام / Name",email:"ایمیل / Email",message:"پیام / Message",send:"ارسال",whyTitle:"چرا من؟",why1:"UI پیکسل‌پرفکت",why2:"تمرکز روی Performance و SEO",why3:"تجربه همکاری جهانی"}
      },
  en: { nav:{home:"Home",about:"About",skills:"Skills",projects:"Projects",certs:"Certificates",contact:"Contact"},
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
  document.documentElement.lang = lang === 'fa' ? 'fa' : 'en';
  document.documentElement.dir  = lang === 'fa' ? 'rtl' : 'ltr';
  localStorage.setItem('lang', lang);
}
['switchFa','drawerFa'].forEach(id=> document.getElementById(id)?.addEventListener('click', ()=> applyI18n('fa')));
['switchEn','drawerEn'].forEach(id=> document.getElementById(id)?.addEventListener('click', ()=> applyI18n('en')));
applyI18n(localStorage.getItem('lang') || 'fa');

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

// Certificates from HTML (no JSON)
(function(){
  const wrap = document.getElementById('certList');
  if(!wrap) return;
  wrap.querySelectorAll('.card').forEach(card => tilt(card));
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
