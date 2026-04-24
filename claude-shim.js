// Fallback for window.claude.complete — the design prototype was built for Claude
// artifacts, where this API exists natively. Outside that environment we stub it
// so the AI-powered features (chat widget, inline explanations, translation,
// conversation step) don't crash.
//
// To hook up a real backend, replace the implementation with a fetch() call to
// your own proxy (the browser can't talk to Anthropic directly because of CORS
// and the need to keep the API key server-side).
(function () {
  if (window.claude && typeof window.claude.complete === 'function') return;

  const demoAnswers = {
    default:
      "Ciao! Sono **Horangi** 🐯. In questa modalità demo non sono collegato a un vero modello AI, ma ecco un esempio di come risponderei:\n\n" +
      "Il coreano usa **particelle** per marcare il ruolo della parola nella frase. La più comune per il tema è **은/는** (*eun/neun*): si mette **dopo** il soggetto di cui stai parlando.\n\n" +
      "Per attivare le risposte AI vere, collega `window.claude.complete` a un backend che chiama l'API di Claude.",
    json:
      '{"ok": true, "score": 80, "feedback": "Buona risposta! In modalità demo non posso valutare davvero, ma la struttura sembra corretta.", "correction": "저는 루카입니다.", "kr": "네, 좋아요! 어디에서 왔어요?", "it": "Sì, bene! Da dove vieni?", "correction": null}',
  };

  window.claude = {
    complete: async (prompt) => {
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
      // Heuristic: callers that ask for JSON output parse the first {...} block.
      const wantsJson = /JSON\s+puro|json\s+puro|\{\s*"ok"|\{\s*"kr"/i.test(prompt);
      return wantsJson ? demoAnswers.json : demoAnswers.default;
    },
  };
})();
