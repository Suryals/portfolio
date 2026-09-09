/* ============================================================
   suryal.dev — shared interactions (home + article pages)
   Header border on scroll, mobile navigation, footer year.
   ============================================================ */
(() => {
    "use strict";

    /* ---------- Year ---------- */
    document.querySelectorAll("#year").forEach((el) => {
        el.textContent = String(new Date().getFullYear());
    });

    /* ---------- Header border once the page has scrolled ---------- */
    const topbar = document.getElementById("topbar");
    if (topbar) {
        const onScroll = () => topbar.classList.toggle("scrolled", window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ---------- Mobile navigation ---------- */
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (menuBtn && mobileMenu) {
        const setOpen = (open) => {
            mobileMenu.classList.toggle("open", open);
            menuBtn.classList.toggle("open", open);
            menuBtn.setAttribute("aria-expanded", String(open));
            mobileMenu.setAttribute("aria-hidden", String(!open));
        };
        menuBtn.addEventListener("click", () => setOpen(!mobileMenu.classList.contains("open")));
        mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
        window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
    }
})();
