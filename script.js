/* ============================================================
   SURYAPRAKASH LAKSHMANAN — portfolio interactions · CONTROL PLANE
   ============================================================ */
(() => {
    "use strict";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Year ---------- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- IST clock ---------- */
    const clockEl = document.getElementById("sysClock");
    if (clockEl) {
        const fmt = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Kolkata", hour12: false,
            hour: "2-digit", minute: "2-digit", second: "2-digit",
        });
        const tick = () => { clockEl.textContent = "IST " + fmt.format(new Date()); };
        tick();
        setInterval(tick, 1000);
    }

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

    /* ---------- Service registry filtering ---------- */
    const filters = document.getElementById("filters");
    const items = Array.from(document.querySelectorAll(".work-item"));
    filters?.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter");
        if (!btn) return;
        filters.querySelector(".active")?.classList.remove("active");
        btn.classList.add("active");
        const f = btn.dataset.filter;
        let n = 0;
        items.forEach((it) => {
            const show = f === "all" || it.dataset.category === f;
            it.classList.toggle("hidden", !show);
            if (!show) it.removeAttribute("open");
            else {
                n++;
                const no = it.querySelector(".work-no");
                if (no) no.textContent = String(n).padStart(2, "0");
            }
        });
    });

    /* ---------- Trace log — replay the governed call ---------- */
    const traceLog = document.getElementById("traceLog");
    if (traceLog && !reducedMotion) {
        const lines = Array.from(traceLog.querySelectorAll(".ln"));
        const nodes = Array.from(document.querySelectorAll(".flow .node"));
        let timer = null;
        let running = false;

        const setLine = (i) => {
            lines.forEach((ln, j) => { ln.style.opacity = j <= i ? "1" : "0"; });
            nodes.forEach((nd, j) => nd.classList.toggle("lit", j === Math.min(i, nodes.length - 1)));
            if (i < 0) nodes.forEach((nd) => nd.classList.remove("lit"));
        };

        const play = () => {
            let i = -1;
            setLine(i);
            timer = setInterval(() => {
                i++;
                if (i < lines.length) { setLine(i); return; }
                clearInterval(timer);
                // hold the completed trace, then replay
                timer = setTimeout(() => { if (running) play(); }, 4200);
            }, 620);
        };

        const traceIO = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting && !running) { running = true; play(); }
                else if (!e.isIntersecting && running) {
                    running = false;
                    clearInterval(timer); clearTimeout(timer);
                    setLine(lines.length - 1); // leave it complete
                }
            });
        }, { threshold: 0.35 });
        traceIO.observe(traceLog);
    }

    /* ---------- Resident agent ---------- */
    const agent = document.getElementById("agent");
    if (agent) {
        const bot = document.getElementById("agentBot");
        const textEl = document.getElementById("agentText");

        const sectionMsgs = [
            [".hero",        "agent online · monitoring suryal.dev"],
            [".schematic",   "tracing a governed tool call… guardrails holding"],
            ["#work",        "service registry: 7 entries · 1 still building"],
            ["#lab",         "lab status: exp-001 live · exp-002 queued"],
            ["#capabilities","subsystem scan complete · no drift detected"],
            ["#experience",  "uptime log: 13 years · still in prod"],
            ["#writing",     "new log entries found · reading recommended"],
            ["#contact",     "channel open · the human replies fast"],
        ];
        const quips = [
            "i'm a very small agent. the big ones live in prod.",
            "guardrail.check(visitor) … PASS",
            "fully governed · fully audited · mildly caffeinated",
            "tool-use request: say hello → suryal.k90@gmail.com",
            "this site is my only backend. it's enough.",
            "i would never bypass federated identity. probably.",
        ];

        let typeTimer = null, hideTimer = null, lastMsg = "";
        // show: set text immediately (streaming/progress). sticky = no auto-hide.
        const show = (msg, sticky) => {
            lastMsg = msg;
            clearInterval(typeTimer); clearTimeout(hideTimer);
            agent.classList.add("talk");
            textEl.textContent = msg;
            if (!sticky) hideTimer = setTimeout(() => agent.classList.remove("talk"), 6500);
        };
        // say: typewriter version for scripted lines.
        const say = (msg, sticky) => {
            if (msg === lastMsg && agent.classList.contains("talk")) return;
            if (reducedMotion) { show(msg, sticky); return; }
            lastMsg = msg;
            clearInterval(typeTimer); clearTimeout(hideTimer);
            agent.classList.add("talk");
            textEl.textContent = "";
            let i = 0;
            typeTimer = setInterval(() => {
                textEl.textContent = msg.slice(0, ++i);
                if (i >= msg.length) clearInterval(typeTimer);
            }, 22);
            if (!sticky) hideTimer = setTimeout(() => agent.classList.remove("talk"), 6500);
        };

        // Boot
        setTimeout(() => {
            agent.classList.add("on");
            say("agent.spawn() … ok");
        }, 1100);

        // Section-aware telemetry (fires when a section crosses mid-viewport)
        const watched = sectionMsgs
            .map(([sel, msg]) => ({ el: document.querySelector(sel), msg }))
            .filter((s) => s.el);
        const agentIO = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (!e.isIntersecting) return;
                const hit = watched.find((s) => s.el === e.target);
                if (hit) say(hit.msg);
            });
        }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
        watched.forEach((s) => agentIO.observe(s.el));

        // Click → quip
        let q = 0;
        bot.addEventListener("click", () => say(quips[q++ % quips.length]));

        /* ----- exp-003: optional real brain (local model via WebGPU) ----- */
        const brainBtn = document.getElementById("agentBrain");
        const chatForm = document.getElementById("agentChat");
        const chatInput = document.getElementById("agentInput");
        // Qwen3-style models may emit <think> blocks — never show them.
        const sanitize = (s) =>
            s.replace(/<think>[\s\S]*?<\/think>/g, "")
             .replace(/<think>[\s\S]*/g, "")
             .trim();
        let brain = null;

        // Offer the brain only where it can actually run.
        if (brainBtn && navigator.gpu) {
            setTimeout(() => { brainBtn.hidden = false; }, 2600);
        }

        const fmtETA = (s) => (s > 90 ? `~${Math.ceil(s / 60)}m` : `~${Math.ceil(s / 10) * 10}s`);

        brainBtn?.addEventListener("click", async () => {
            brainBtn.disabled = true;
            brainBtn.textContent = "[ booting … ]";
            // Be upfront on slow links before the long haul starts
            const downlink = navigator.connection?.downlink; // Mbps, where supported
            if (downlink && downlink < 5) {
                show(`heads up: slow link detected (~${downlink}Mbps) · the brain is a couple hundred MB · feel free to keep browsing, i'll ping when ready`, true);
            } else {
                show("fetching brain … you can keep browsing, i'll ping when ready", true);
            }
            agentIO.disconnect(); // section telemetry would stomp the progress readout
            try {
                const { initBrain } = await import("./agent-llm.js");
                brain = await initBrain((r) => {
                    const p = r.progress ?? 0;
                    if (p <= 0 || p >= 1) { show(p >= 1 ? "compiling shaders …" : "fetching brain …", true); return; }
                    const fetchedMB = Number((r.text || "").match(/(\d+)MB fetched/)?.[1]);
                    const speed = fetchedMB && r.timeElapsed ? ` · ${(fetchedMB / r.timeElapsed).toFixed(1)}MB/s` : "";
                    const eta = r.timeElapsed ? ` · eta ${fmtETA((r.timeElapsed * (1 - p)) / p)}` : "";
                    show(`loading brain … ${Math.round(p * 100)}%${speed}${eta} · one-time, cached`, true);
                });
                agent.classList.add("live");
                brainBtn.hidden = true;
                chatForm.hidden = false;
                show(`brain online · ${brain.modelId} · running on your gpu. ask me about surya.`, true);
                // suggest questions the small model can actually answer
                const hints = ["ask: what does surya do?", "ask: what is mlx-lab?", "ask: how do i contact him?", "ask the agent…"];
                let h = 0;
                setInterval(() => { if (!chatInput.value) chatInput.placeholder = hints[h++ % hints.length]; }, 4000);
                chatInput.focus();
            } catch (err) {
                console.error("[agent] brain load failed:", err);
                brainBtn.disabled = false;
                brainBtn.textContent = "[ load real brain · retry ]";
                watched.forEach((s) => agentIO.observe(s.el)); // resume scripted telemetry
                say("brain failed to load · staying scripted");
            }
        });

        // Known intents get deterministic answers — the model freestyles
        // only on the long tail. (A 0.5B model cannot be trusted with
        // identity facts; this is the same governed-path pattern the
        // site is about.)
        const WHO_IS_SURYA = "surya is the human — a staff ai platform & cloud engineer in chennai, thirteen years across cloud, data, and enterprise systems. i'm just the small model that lives on his site.";
        const canned = [
            [/\bwho('?s| is| was)?\s+(surya|he\b|him\b|this (guy|person))|about surya|made this site|built this (site|page)/i, WHO_IS_SURYA],
            [/contact|email|e-mail|reach (him|surya|out)|hire|mail\b/i,
             "email is the surest channel: suryal.k90@gmail.com. linkedin works too — he replies fast."],
            [/what (does|do) (surya|he) do|his (job|work|role)|what is he (doing|working on)/i,
             "he builds the platform layer that wires llms and agents into enterprise backends — mcp frameworks, tool-use sdks, federated identity, guardrails. aiops on top."],
            [/mlx[- ]?lab|benchmark|apple silicon|m5 max|local llm/i,
             "mlx-lab is his open benchmark harness for local llms on apple silicon — code at github.com/Suryals/mlx-lab, live dashboard in the articles. i am technically its cousin."],
            [/\b(who|what) (are|r) (you|u)\b|are you (an? )?(ai|model|bot|agent)|about yourself/i,
             "i'm the resident agent — a small local model running in your browser via webgpu. no server, nothing leaves your machine. surya is the human; i just work here."],
        ];
        const cannedFor = (q) => canned.find(([re]) => re.test(q))?.[1];
        // Output guardrail: catch "surya is ... a model/ai/webgpu" slips.
        const identitySlip = /\bsurya('s)?\b[^.!?]{0,80}\b(is|was|being)\b[^.!?]{0,60}\b(model|llm|\bai\b|bot|agent|webgpu|browser)/i;

        chatForm?.addEventListener("submit", async (e) => {
            e.preventDefault();
            const question = chatInput.value.trim();
            if (!question || !brain || chatInput.disabled) return;
            chatInput.value = "";

            // Governed path first: deterministic answer, no inference.
            const pre = cannedFor(question);
            if (pre) { say(pre, true); chatInput.focus(); return; }

            chatInput.disabled = true;
            show("…", true);
            try {
                let slipped = false;
                const answer = await brain.ask(question, (partial) => {
                    if (slipped) return;
                    const t = sanitize(partial);
                    if (!t) { if (partial.includes("<think>")) show("(thinking …)", true); return; }
                    if (identitySlip.test(t)) { slipped = true; show(WHO_IS_SURYA, true); return; }
                    show(t, true);
                });
                if (!slipped) {
                    const final = sanitize(answer);
                    if (!final) show("i've got nothing on that one — better to shoot the human a mail: suryal.k90@gmail.com", true);
                    else if (identitySlip.test(final)) show(WHO_IS_SURYA, true);
                }
            } catch (err) {
                console.error("[agent] inference failed:", err);
                show("inference hiccup · try again", true);
            }
            chatInput.disabled = false;
            chatInput.focus();
        });

        // Eyes track the cursor
        const pupils = agent.querySelectorAll(".agent-eye i");
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reducedMotion) {
            window.addEventListener("mousemove", (e) => {
                const r = bot.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2);
                const dy = e.clientY - (r.top + r.height / 2);
                const d = Math.max(Math.hypot(dx, dy), 1);
                const px = (dx / d) * 2.4, py = (dy / d) * 2.4;
                pupils.forEach((p) => { p.style.transform = `translate(${px}px, ${py}px)`; });
            }, { passive: true });
        }
    }

    /* ---------- Custom cursor (fine pointers only) ---------- */
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cursor = document.getElementById("cursor");
    if (cursor && fine) {
        let mx = window.innerWidth / 2, my = window.innerHeight / 2;   // target
        let cx = mx, cy = my;                                          // rendered (eased)
        let visible = false;
        let rafActive = false;

        const render = () => {
            cx += (mx - cx) * 0.18;
            cy += (my - cy) * 0.18;
            cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
            // stop the loop once settled; restart on next mousemove
            if (Math.abs(mx - cx) + Math.abs(my - cy) > 0.15) {
                requestAnimationFrame(render);
            } else {
                rafActive = false;
            }
        };
        const wake = () => {
            if (!rafActive) { rafActive = true; requestAnimationFrame(render); }
        };

        window.addEventListener("mousemove", (e) => {
            mx = e.clientX; my = e.clientY;
            if (!visible) { visible = true; cursor.style.opacity = "1"; }
            wake();
        }, { passive: true });

        document.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; });
        document.addEventListener("mouseenter", () => { cursor.style.opacity = "1"; });
        window.addEventListener("mousedown", () => cursor.classList.add("down"));
        window.addEventListener("mouseup", () => cursor.classList.remove("down"));

        // Grow over interactive elements — delegated, survives DOM changes
        const hoverSel = "a, button, summary, .filter, .menu-btn, .logo-chip, .post-card, [role='button']";
        document.addEventListener("mouseover", (e) => {
            cursor.classList.toggle("hover", Boolean(e.target.closest(hoverSel)));
        }, { passive: true });

        cursor.style.opacity = "0";
    }
})();
