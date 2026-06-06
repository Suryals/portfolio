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

    /* ---------- Copy share text ---------- */
    const copyBtn = document.getElementById("copyBtn");
    const shareText = document.getElementById("shareText");
    if (copyBtn && shareText) {
        copyBtn.addEventListener("click", async () => {
            const text = shareText.textContent.trim();
            try {
                await navigator.clipboard.writeText(text);
            } catch {
                const r = document.createRange();
                r.selectNodeContents(shareText);
                const sel = window.getSelection();
                sel.removeAllRanges(); sel.addRange(r);
                try { document.execCommand("copy"); } catch {}
                sel.removeAllRanges();
            }
            const original = copyBtn.textContent;
            copyBtn.textContent = "Copied ✓";
            copyBtn.classList.add("done");
            setTimeout(() => { copyBtn.textContent = original; copyBtn.classList.remove("done"); }, 2000);
        });
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
