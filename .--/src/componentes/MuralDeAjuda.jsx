import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "agrotech.muralProblemas.v1";

function safeParseJson(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function newId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

function normalizeWhatsappLink(value) {
  const digits = digitsOnly(value);
  if (!digits) return null;

  const withCountry =
    digits.startsWith("55") || digits.length > 11 ? digits : `55${digits}`;

  return `https://wa.me/${withCountry}`;
}

function isValidEmail(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

function isValidWhatsapp(value) {
  const d = digitsOnly(value);
  if (!d) return true;
  return d.length >= 10 && d.length <= 15;
}

export default function MuralDeAjuda() {
  const [form, setForm] = useState({
    titulo: "",
    problema: "",
    whatsapp: "",
    email: "",
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [problemas, setProblemas] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = safeParseJson(raw, []);
    setProblemas(Array.isArray(parsed) ? parsed : []);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(problemas));
  }, [problemas]);

  const errors = useMemo(() => {
    const titulo = !form.titulo.trim();
    const problema = !form.problema.trim();
    const contatoObrigatorio = !form.whatsapp.trim() && !form.email.trim();
    const whatsapp = !isValidWhatsapp(form.whatsapp);
    const email = !isValidEmail(form.email);

    return { titulo, problema, contatoObrigatorio, whatsapp, email };
  }, [form.email, form.problema, form.titulo, form.whatsapp]);

  const hasErrors =
    errors.titulo ||
    errors.problema ||
    errors.contatoObrigatorio ||
    errors.whatsapp ||
    errors.email;

  return (
    <section className="mural" id="mural">
      <h1>MURAL DE AJUDA</h1>
      <h3>
        Publique um problema e inclua um contato (WhatsApp e/ou e-mail) para
        receber ajuda.
      </h3>

      <div className="mural-grid">
        <form
          className="mural-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitAttempted(true);
            if (hasErrors) return;

            const now = new Date().toISOString();
            const item = {
              id: newId(),
              titulo: form.titulo.trim(),
              problema: form.problema.trim(),
              whatsapp: form.whatsapp.trim(),
              email: form.email.trim(),
              createdAt: now,
            };

            setProblemas((prev) => [item, ...prev]);
            setForm({ titulo: "", problema: "", whatsapp: "", email: "" });
            setSubmitAttempted(false);
          }}
        >
          <label className="mural-label">
            Título
            <input
              value={form.titulo}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, titulo: e.target.value }))
              }
              placeholder="Ex: Falha no sensor de umidade"
              className={submitAttempted && errors.titulo ? "input-error" : ""}
            />
          </label>

          <label className="mural-label">
            Problema
            <textarea
              value={form.problema}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, problema: e.target.value }))
              }
              placeholder="Descreva o que está acontecendo, quando ocorre e o que você já tentou."
              rows={6}
              className={
                submitAttempted && errors.problema ? "input-error" : ""
              }
            />
          </label>

          <div className="mural-row">
            <label className="mural-label">
              WhatsApp
              <input
                value={form.whatsapp}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    whatsapp: digitsOnly(e.target.value).slice(0, 15),
                  }))
                }
                onPaste={(e) => {
                  e.preventDefault();
                  const text = e.clipboardData?.getData("text") ?? "";
                  const next = digitsOnly(text).slice(0, 15);
                  setForm((prev) => ({ ...prev, whatsapp: next }));
                }}
                placeholder="(DDD) 9xxxx-xxxx"
                inputMode="numeric"
                pattern="[0-9]*"
                className={
                  submitAttempted &&
                  (errors.contatoObrigatorio || errors.whatsapp)
                    ? "input-error"
                    : ""
                }
              />
              {submitAttempted && errors.whatsapp ? (
                <small className="mural-hint">
                  WhatsApp inválido. Use apenas números (10 a 15 dígitos).
                </small>
              ) : null}
            </label>

            <label className="mural-label">
              E-mail
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="seuemail@exemplo.com"
                className={
                  submitAttempted && (errors.contatoObrigatorio || errors.email)
                    ? "input-error"
                    : ""
                }
              />
              {submitAttempted && errors.email ? (
                <small className="mural-hint">E-mail inválido.</small>
              ) : null}
            </label>
          </div>

          {submitAttempted && errors.contatoObrigatorio ? (
            <p className="mural-hint" style={{ marginTop: 0 }}>
              Informe pelo menos um contato (WhatsApp ou e-mail).
            </p>
          ) : null}

          <button type="submit" className="buttonLearnMore">
            Publicar
          </button>
          <p className="textoPequeno">
            Seus dados ficam salvos no nosso site para que outras pessoas possam
            ajudar você.
          </p>
        </form>

        <div className="mural-list" aria-live="polite">
          {problemas.length === 0 ? (
            <div className="mural-empty">
              <h2>Nenhum problema publicado</h2>
              <p>Seja o primeiro a publicar um problema.</p>
            </div>
          ) : (
            problemas.map((p) => {
              const whatsappLink = normalizeWhatsappLink(p.whatsapp);
              const hasContacts = Boolean(p.email || whatsappLink);

              return (
                <article key={p.id} className="mural-card">
                  <h2>{p.titulo}</h2>
                  <p className="mural-problema">{p.problema}</p>

                  {hasContacts ? (
                    <div className="mural-contatos">
                      {whatsappLink ? (
                        <a
                          className="mural-link"
                          href={whatsappLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          WhatsApp
                        </a>
                      ) : null}
                      {p.email ? (
                        <a
                          className="mural-link"
                          href={`mailto:${p.email}?subject=${encodeURIComponent(
                            `Ajuda: ${p.titulo}`,
                          )}`}
                        >
                          E-mail
                        </a>
                      ) : null}
                    </div>
                  ) : null}

                  <small className="mural-meta">
                    Publicado em{" "}
                    {new Date(p.createdAt || Date.now()).toLocaleString()}
                  </small>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
