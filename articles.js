/* ============================================================
   ARTICLES — reading progress, copy-to-clipboard, category filter
   (script.js handles cursor, mobile menu, topbar, reveals)
   ============================================================ */
(() => {
    "use strict";

    /* ---------- Year ---------- */
    document.querySelectorAll("#year").forEach((el) => { el.textContent = new Date().getFullYear(); });

    /* ---------- Reading progress bar ---------- */
    const bar = document.getElementById("progress");
    if (bar) {
        const update = () => {
            const h = document.documentElement;
            const max = h.scrollHeight - h.clientHeight;
            const pct = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
            bar.style.width = (pct * 100).toFixed(2) + "%";
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
    }

    /* ---------- Category filter (listing page) ---------- */
    const filters = document.getElementById("filters");
    const rows = Array.from(document.querySelectorAll(".art-row"));
    const empty = document.getElementById("artEmpty");
    if (filters && rows.length) {
        filters.addEventListener("click", (e) => {
            const btn = e.target.closest(".filter");
            if (!btn) return;
            filters.querySelector(".active")?.classList.remove("active");
            btn.classList.add("active");
            const f = btn.dataset.filter;
            let shown = 0;
            rows.forEach((row) => {
                const match = f === "all" || row.dataset.category === f;
                row.style.display = match ? "" : "none";
                if (match) shown++;
            });
            if (empty) empty.hidden = shown !== 0;
        });
    }
})();
