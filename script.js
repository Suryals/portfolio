/* ============================================================
   SURYAPRAKASH LAKSHMANAN — portfolio interactions
   ============================================================ */
(() => {
    "use strict";

    /* ---------- Year ---------- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Topbar border on scroll ---------- */
    const topbar = document.getElementById("topbar");
    const onScroll = () => topbar.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Mobile menu ---------- */
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const toggleMenu = (force) => {
        const open = force ?? !mobileMenu.classList.contains("open");
        mobileMenu.classList.toggle("open", open);
        menuBtn.classList.toggle("open", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        mobileMenu.setAttribute("aria-hidden", String(!open));
    };
    menuBtn?.addEventListener("click", () => toggleMenu());
    mobileMenu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

    /* ---------- Reveal on scroll (staggered per group) ---------- */
    const groups = new Map();
    document.querySelectorAll(".reveal").forEach((el) => {
        const parent = el.parentElement;
        const arr = groups.get(parent) || [];
        el.style.setProperty("--ri", arr.length);
        arr.push(el);
        groups.set(parent, arr);
    });
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    /* ---------- Project filtering ---------- */
    const filters = document.getElementById("filters");
    const items = Array.from(document.querySelectorAll(".work-item"));
    filters?.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter");
        if (!btn) return;
        filters.querySelector(".active")?.classList.remove("active");
        btn.classList.add("active");
        const f = btn.dataset.filter;
        items.forEach((it) => {
            it.classList.toggle("hidden", !(f === "all" || it.dataset.category === f));
        });
        let n = 0;
        items.forEach((it) => {
            if (!it.classList.contains("hidden")) {
                n++;
                const no = it.querySelector(".work-no");
                if (no) no.textContent = String(n).padStart(2, "0");
            }
        });
    });
})();
