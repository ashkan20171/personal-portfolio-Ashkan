document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "fa";

  document.querySelectorAll("[data-post]").forEach(section => {
    if (section.dataset.post === lang) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
});
