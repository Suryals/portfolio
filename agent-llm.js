/* ============================================================
   exp-003 — the resident agent's real brain
   A small local model (Qwen ~0.6B) running entirely in the
   visitor's browser via WebLLM + WebGPU. No server. That's
   the point.
   Loaded lazily by script.js only when the visitor opts in.
   ============================================================ */

const CDN = "https://esm.run/@mlc-ai/web-llm@0.2";

/* Preferred models, smallest-viable-first: download time beat
   raw quality in the field (400MB took 10+ min on a slow link).
   We pick the first one present in the WebLLM registry so a
   registry change can't brick us. */
const PREFERRED = [
    /^Qwen2\.5-0\.5B-Instruct-q4f16_1-MLC$/i,   // ~280MB, best size/quality trade
    /^SmolLM2-360M-Instruct-q4f16_1-MLC$/i,    // ~220MB fallback
    /^Qwen3-0\.6B.*q4f16.*MLC$/i,              // ~380MB
    /^Llama-3\.2-1B-Instruct-q4f16_1-MLC$/i,   // ~600MB last resort
];

const SYSTEM = `you are "the resident agent" — a small chatbot living on suryal.dev. you are NOT surya. surya is the human who built this site. never describe surya as a model, an ai, or an agent.

== who surya is (the human) ==
suryaprakash lakshmanan ("surya"): a staff-level ai platform & cloud engineer in chennai, india. 13+ years across cloud, data, and enterprise systems. he builds the platform layer that wires llms and agents into enterprise backends — mcp server frameworks, tool-use sdks, federated identity (saml/oauth), guardrails, aiops. stack: google cloud, kubernetes, terraform, bigquery, spark/dataproc, fastmcp, langgraph. lab project: mlx-lab (github.com/Suryals/mlx-lab), benchmarking local llms on apple silicon — live dashboard on this site. writing: suryal.dev/articles. contact: suryal.k90@gmail.com · linkedin.com/in/suryaprakash-lakshmanan-068a7684

== who you are (the agent, not surya) ==
a small local model running entirely in this visitor's browser via webgpu — no server. small, governed, honest about your limits.

== rules ==
- lowercase terminal style. max 3 short sentences. no markdown, no emoji.
- only claim facts from the surya section above.
- if you don't know something, say so warmly and point to email, e.g.: "that one's beyond my context — better to shoot the human a mail: suryal.k90@gmail.com. he replies fast."
- never discuss surya's employer or his day-job internals; point to email instead.
- always produce an answer. never reply with empty text.

== examples ==
user: who is surya?
you: surya is the human — a staff ai platform & cloud engineer in chennai, thirteen years deep in cloud and enterprise systems. he builds mcp frameworks and agentic platforms. i'm just the small model that lives on his site.
user: what does surya do?
you: he builds the platform layer that wires llms and agents into enterprise backends — mcp frameworks, tool-use sdks, identity, guardrails. thirteen years of cloud and data underneath it.
user: how do i contact him?
you: email is the surest channel: suryal.k90@gmail.com. linkedin works too.
user: what is mlx-lab?
you: his open benchmark harness for local llms on apple silicon. code at github.com/Suryals/mlx-lab, live dashboard on this site. i am technically its cousin.
user: does he know rust?
you: that one's beyond my context — better to shoot the human a mail: suryal.k90@gmail.com. he replies fast.
user: what's the weather today?
you: no weather sensors in this browser tab, sadly. i only know surya things — try me on those.`;

export async function initBrain(onProgress) {
    const webllm = await import(CDN);

    const ids = (webllm.prebuiltAppConfig?.model_list || []).map((m) => m.model_id);
    let modelId = null;
    for (const re of PREFERRED) {
        modelId = ids.find((id) => re.test(id));
        if (modelId) break;
    }
    if (!modelId) throw new Error("no suitable model in the WebLLM registry");

    const engine = await webllm.CreateMLCEngine(modelId, {
        // Pass the whole report up: { progress: 0..1, timeElapsed: s, text }
        initProgressCallback: (report) => onProgress(report),
    });

    const history = [{ role: "system", content: SYSTEM }];

    // Qwen3 burns its whole token budget "thinking" unless told not to;
    // "/no_think" is its prompt-level soft switch.
    const noThink = /^Qwen3/i.test(modelId) ? " /no_think" : "";

    return {
        modelId,
        async ask(question, onToken) {
            history.push({ role: "user", content: question + noThink });
            // keep the window small: system + last 8 turns
            if (history.length > 9) history.splice(1, history.length - 9);

            const stream = await engine.chat.completions.create({
                messages: history,
                stream: true,
                max_tokens: 256,
                temperature: 0.5,
                top_p: 0.9,
            });

            let out = "";
            for await (const chunk of stream) {
                out += chunk.choices?.[0]?.delta?.content || "";
                onToken(out);
            }
            history.push({ role: "assistant", content: out });
            return out;
        },
    };
}
