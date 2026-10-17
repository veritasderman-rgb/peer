"use client";

/* Tlačítko „Vytisknout“: otevře tiskový dialog prohlížeče. Tiskový vzhled stránky řeší argumentar.module.css. */
export function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.print()}>
      Vytisknout
    </button>
  );
}
