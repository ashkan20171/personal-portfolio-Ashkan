document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "fa";
  const postsContainer = document.getElementById("blogPosts");
  const block = document.querySelector(`#blogData [data-lang="${lang}"]`);
  if (!block) return;

  const articles = block.querySelectorAll("article");
  postsContainer.innerHTML = "";

  articles.forEach(a => {
    const id = a.dataset.id;
    const img = a.dataset.img;
    const title = a.querySelector("h3").textContent;
    const date = a.querySelector("small").textContent;
    const text = a.querySelector("p").textContent;

    postsContainer.innerHTML += `
      <a class="card blog-card tilt" href="post${id}.html">
        <img src="${img}" alt="">
        <h3>${title}</h3>
        <small>${date}</small>
        <p>${text}</p>
      </a>
    `;
  });
});
