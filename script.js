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

    /* ---------- Custom cursor (fine pointers only) ---------- */
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cursor = document.getElementById("cursor");
    if (cursor && fine) {
        let mx = window.innerWidth / 2, my = window.innerHeight / 2;   // target
        let cx = mx, cy = my;                                          // rendered (eased)
        let visible = false;

        window.addEventListener("mousemove", (e) => {
            mx = e.clientX; my = e.clientY;
            if (!visible) { visible = true; cursor.style.opacity = "1"; }
        }, { passive: true });

        document.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; });
        document.addEventListener("mouseenter", () => { cursor.style.opacity = "1"; });
        window.addEventListener("mousedown", () => cursor.classList.add("down"));
        window.addEventListener("mouseup", () => cursor.classList.remove("down"));

        // Grow over interactive elements
        const hoverSel = "a, button, .filter, .menu-btn, .logo-chip, .work-item, .post-card, [role='button']";
        document.querySelectorAll(hoverSel).forEach((el) => {
            el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
        });

        const render = () => {
            cx += (mx - cx) * 0.18;
            cy += (my - cy) * 0.18;
            cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
            requestAnimationFrame(render);
        };
        cursor.style.opacity = "0";
        requestAnimationFrame(render);
    }
})();
