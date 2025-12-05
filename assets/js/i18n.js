function applyLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-fa]").forEach(el => {
        el.innerHTML = el.getAttribute(`data-${lang}`);
    });
}

// دکمه‌ها
document.addEventListener("click", (e) => {
    if (e.target.id === "switchFa" || e.target.id === "drawerFa") {
        applyLanguage("fa");
    }
    if (e.target.id === "switchEn" || e.target.id === "drawerEn") {
        applyLanguage("en");
    }
});

// بارگذاری اولیه
document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(localStorage.getItem("lang") || "fa");
});
