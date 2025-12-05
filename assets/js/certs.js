document.addEventListener("DOMContentLoaded", () => {

  const lang = localStorage.getItem("lang") || "fa";
  const list = document.getElementById("certList");
  const source = document.querySelector(`#certData [data-lang="${lang}"]`);

  if (!source) return;

  list.innerHTML = "";

  source.querySelectorAll(".cert").forEach(cert => {

    const title = cert.querySelector("h3")?.textContent || "No Title";
    const year  = cert.querySelector("small")?.textContent || "";
    const url   = cert.dataset.url?.trim();

    // Debug - اگر لینک اشتباه بود
    if (!url || url === "#" || url === "") {
      console.warn("⚠ لینک این مدرک خالی است:", title);
    }

    const linkButton = url && url !== "#"
      ? `<a href="${url}" target="_blank" rel="noopener" class="btn">مشاهده مدرک</a>`
      : `<p class="muted">❌ لینک موجود نیست</p>`;

    const card = document.createElement("div");
    card.className = "card glass tilt";

    card.innerHTML = `
      <h3>${title}</h3>
      <p class="muted">${year}</p>
      ${linkButton}
    `;

    list.appendChild(card);
  });

});
