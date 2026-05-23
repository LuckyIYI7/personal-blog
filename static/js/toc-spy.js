(() => {
  const links = Array.from(document.querySelectorAll(".toc nav a, .toc-mobile nav a"));
  if (!links.length) return;

  const idToLinks = new Map();
  const headings = [];

  for (const link of links) {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) continue;
    const id = decodeURIComponent(href.slice(1));
    const el = document.getElementById(id);
    if (!el) continue;

    if (!idToLinks.has(id)) {
      idToLinks.set(id, []);
      headings.push(el);
    }
    idToLinks.get(id).push(link);
  }

  if (!headings.length) return;

  function getOffset() {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--anchor-offset")
      .trim();
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 110;
  }

  function setActive(id) {
    links.forEach((a) => {
      a.classList.remove("is-active");
      a.removeAttribute("aria-current");
    });
    (idToLinks.get(id) || []).forEach((a) => {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "true");
    });
  }

  function pickActiveId() {
    const offset = getOffset();
    let current = headings[0].id;
    for (const h of headings) {
      if (h.getBoundingClientRect().top - offset <= 0) current = h.id;
      else break;
    }
    return current;
  }

  let ticking = false;
  function update() {
    setActive(pickActiveId());
    ticking = false;
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();
