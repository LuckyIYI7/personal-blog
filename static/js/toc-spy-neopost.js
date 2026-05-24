(() => {
  const links = Array.from(document.querySelectorAll(".table-of-contents nav a[href*='#']"));
  if (!links.length) return;

  const idToLinks = new Map();
  const headings = [];
  const seen = new Set();

  function getIdFromHref(href) {
    try {
      return decodeURIComponent(new URL(href, window.location.href).hash.replace(/^#/, ""));
    } catch {
      return "";
    }
  }

  for (const link of links) {
    const id = getIdFromHref(link.getAttribute("href") || "");
    if (!id) continue;

    const heading = document.getElementById(id);
    if (!heading) continue;

    if (!idToLinks.has(id)) idToLinks.set(id, []);
    idToLinks.get(id).push(link);

    if (!seen.has(id)) {
      seen.add(id);
      headings.push(heading);
    }
  }

  if (!headings.length) return;

  function getOffset() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--anchor-offset").trim();
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 20;
  }

  function setActive(id) {
    for (const link of links) {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    }

    for (const link of idToLinks.get(id) || []) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "true");
    }
  }

  function pickActiveId() {
    const offset = getOffset();
    let currentId = headings[0].id;
    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4;

    if (nearBottom) return headings[headings.length - 1].id;

    for (const heading of headings) {
      if (heading.getBoundingClientRect().top - offset <= 0) currentId = heading.id;
      else break;
    }

    return currentId;
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

  for (const link of links) {
    link.addEventListener("click", (event) => {
      const id = getIdFromHref(link.getAttribute("href") || "");
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      event.preventDefault();
      const offset = getOffset();
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });

      const hash = `#${encodeURIComponent(id)}`;
      if (window.location.hash !== hash) {
        history.replaceState(null, "", hash);
      }

      setActive(id);
    });
  }

  onScroll();
})();
