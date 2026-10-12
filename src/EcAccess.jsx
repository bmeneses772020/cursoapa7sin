import React, { useState } from "react";
import { BookOpen, ArrowLeft, Lock } from "lucide-react";
import { COURSE_TITLE, HUB_URL } from "./ec.js";

const INK = "#0B3D42";
const PAPER = "#F6F1E7";
const PAPER_CARD = "#FCFAF4";
const GOLD = "#C98A2E";
const LINE = "#DDD3BE";
const WINE = "#7A2E3B";

export default function EcAccess({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  function submit(e) {
    e.preventDefault();
    setError(!onUnlock(code));
  }

  return (
    <div style={{ minHeight: "100vh", background: PAPER, color: "#29291F", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <header style={{ background: INK, color: "#fff", padding: "18px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <BookOpen size={22} strokeWidth={2} />
        <div>
          <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, fontSize: 18 }}>Cursos Educación Continua</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Programa de formación docente</div>
        </div>
      </header>
      <main style={{ maxWidth: 460, margin: "0 auto", padding: "56px 16px" }}>
        <div style={{ background: PAPER_CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: "32px 28px", boxShadow: "0 1px 2px rgba(0,0,0,.04)" }}>
          <div style={{ fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>Curso de la ruta</div>
          <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: INK, fontSize: 26, lineHeight: 1.25, margin: "8px 0 10px" }}>{COURSE_TITLE}</h1>
          <p style={{ margin: "0 0 22px", color: "#6b6b5f", fontSize: 14.5, lineHeight: 1.55 }}>
            Ingresa el código de acceso que te entregó tu facilitadora. Tu progreso se guarda automáticamente en este navegador.
          </p>
          <form onSubmit={submit}>
            <label htmlFor="ec-code" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Código de acceso</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: 12, top: 13, color: "#8a8a7c" }} />
              <input
                id="ec-code"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(false); }}
                autoComplete="off"
                style={{ width: "100%", boxSizing: "border-box", padding: "11px 12px 11px 36px", border: `1px solid ${error ? WINE : LINE}`, borderRadius: 8, fontSize: 15, background: "#fff" }}
              />
            </div>
            {error && <div role="alert" style={{ color: WINE, fontSize: 13, marginTop: 8 }}>Ese código no es válido. Revísalo o pídelo de nuevo a tu facilitadora.</div>}
            <button type="submit" style={{ marginTop: 16, width: "100%", background: INK, color: "#fff", border: 0, borderRadius: 8, padding: "12px 16px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Ingresar al curso
            </button>
          </form>
          <a href={HUB_URL} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 18, color: INK, fontSize: 13.5, textDecoration: "none" }}>
            <ArrowLeft size={15} /> Volver a Educación Continua
          </a>
        </div>
      </main>
    </div>
  );
}
