document.addEventListener("DOMContentLoaded", () => {

  const lang = localStorage.getItem("lang") || "fa";
  const container = document.getElementById("blogPosts");
  const block = document.querySelector(`#blogData [data-lang="${lang}"]`);

  if (!block) return;

  container.innerHTML = "";

  block.querySelectorAll(".blog-item").forEach(item => {

    const title = item.querySelector("h3").textContent;
    const date = item.querySelector("small").textContent;
    const text = item.querySelector("p").textContent;

    const img = item.dataset.img;
    const url = item.dataset.url;

    const card = document.createElement("a");
    card.href = url;
    card.className = "blog-card card glass tilt";
    card.innerHTML = `
      <div class="thumb"><img src="${img}" loading="lazy"></div>
      <h3>${title}</h3>
      <small>${date}</small>
      <p>${text}</p>
    `;

    container.appendChild(card);
  });

});
