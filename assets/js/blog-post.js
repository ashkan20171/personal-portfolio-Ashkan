document.addEventListener("DOMContentLoaded", () => {

  // --- Get Post ID from URL ---
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  if (!id) return;

  const lang = localStorage.getItem("lang") || "fa";

  // Load source from blogData inside blog.html
  fetch("blog.html")
    .then(res => res.text())
    .then(html => {

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const source = doc.querySelector(`#blogData [data-lang="${lang}"] article[data-id="${id}"]`);

      if (!source) {
        document.getElementById("postPage").innerHTML =
          "<p class='muted'>پست یافت نشد.</p>";
        return;
      }

      const title = source.querySelector("h3").textContent;
      const date  = source.querySelector("small").textContent;
      const text  = source.querySelector("p").textContent;
      const img   = source.dataset.img;

      // Fill page
      document.getElementById("postTitle").textContent = title;
      document.getElementById("postDate").textContent  = date;
      document.getElementById("postImage").src = img;
      document.getElementById("postContent").innerHTML = `<p>${text}</p>`;

      // SEO Meta Update
      document.title = title + " | اشکان مطاعی";
      document.getElementById("postTitleTag").innerText = title;
      document.getElementById("postDescTag").content = text;

      document.getElementById("ogTitle").content = title;
      document.getElementById("ogDesc").content  = text;
      document.getElementById("ogImg").content   = img;

      document.getElementById("twTitle").content = title;
      document.getElementById("twDesc").content  = text;
    });
});
