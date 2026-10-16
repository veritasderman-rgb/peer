export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", marginTop: "4rem", padding: "2rem 0 3rem", color: "var(--muted)", fontSize: "var(--s-1)" }}>
      <div className="wrap" style={{ display: "grid", gap: "0.5rem" }}>
        <p>
          Hospodářskou strategii 2026–2035 zpracovala Pirátská expertní ekonomická rada (PEER) ve spolupráci s Institutem π a dalšími odborníky.
          Tento web ji převypráví pro běžné lidi; každé číslo má pod sebou zdroj a každá kapitola odkazuje na plné znění.
        </p>
        <p>
          <a href="https://peer.pirati.cz/hospodarska-strategie/" target="_blank" rel="noreferrer">Strategie na peer.pirati.cz</a>
          {" · "}
          <a href="https://majak.pirati.cz/documents/647/Piratska_Hospodarska_strategie.pdf" target="_blank" rel="noreferrer">Celé PDF (99 stran)</a>
          {" · "}
          <a href="https://www.pirati.cz/" target="_blank" rel="noreferrer">Česká pirátská strana</a>
        </p>
        <p>
          Modelové postavy na webu jsou ilustrační a složené z čísel ve studii. Strategii napsal tým PEER, web postavila AI pod lidským
          vedením: <a href="/jak-vznikl">jak vznikl tento web</a>.
        </p>
      </div>
    </footer>
  );
}
