"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Text, který se zkopíruje do schránky. */
  text: string;
  /** Popisek tlačítka (výchozí „Kopírovat“). */
  label?: string;
  /** Doplňující třída, např. z CSS modulu stránky. */
  className?: string;
  /** Přístupný název, např. „Kopírovat text pro Facebook“. */
  ariaLabel?: string;
};

/* Záložní cesta pro prohlížeče bez Clipboard API (nebo bez HTTPS): dočasné textarea + execCommand. */
function copyFallback(text: string): boolean {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function KopirovatText({ text, label = "Kopírovat", className, ariaLabel }: Props) {
  const [stav, setStav] = useState<"idle" | "ok" | "chyba">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function kopiruj() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = copyFallback(text);
    }
    setStav(ok ? "ok" : "chyba");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStav("idle"), 2000);
  }

  return (
    <button
      type="button"
      className={["btn secondary", className].filter(Boolean).join(" ")}
      onClick={kopiruj}
      aria-label={ariaLabel}
      aria-live="polite"
    >
      {stav === "ok" ? "Zkopírováno" : stav === "chyba" ? "Nepovedlo se, označ ručně" : label}
    </button>
  );
}

export default KopirovatText;
