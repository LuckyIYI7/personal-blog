(() => {
  const nodes = Array.from(document.querySelectorAll("pre code.language-mermaid"));
  if (!nodes.length || typeof window.mermaid === "undefined") return;

  const blocks = [];
  for (const code of nodes) {
    const pre = code.closest("pre");
    if (!pre || !pre.parentNode) continue;

    const holder = document.createElement("div");
    holder.className = "mermaid";
    holder.textContent = code.textContent || "";
    pre.parentNode.replaceChild(holder, pre);
    blocks.push(holder);
  }

  if (!blocks.length) return;

  window.mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "neutral",
  });
  window.mermaid.run({ nodes: blocks });
})();
