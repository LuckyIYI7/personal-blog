(() => {
  const article = document.querySelector("#single-post article");
  if (!article) return;

  const tables = Array.from(article.querySelectorAll("table"));
  for (const table of tables) {
    const parent = table.parentElement;
    if (parent && parent.classList.contains("table-scroll")) continue;

    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }
})();
