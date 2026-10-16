"use client";

import { useState } from "react";
import s from "./RangeField.module.css";

export type RangeFieldProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  /** krok číselného pole (výchozí = step) */
  inputStep?: number;
  /** jednotka za číselným polem, např. „Kč“ */
  unit?: string;
  onChange: (v: number) => void;
};

/** Posuvník + číselné pole svázané na jednu hodnotu. Sdílí obě kalkulačky. */
export function RangeField({ id, label, value, min, max, step, inputStep, unit, onChange }: RangeFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div className={s.field}>
      <label className={s.label} htmlFor={`${id}-num`}>
        {label}
      </label>
      <div className={s.inputRow}>
        <input
          id={`${id}-num`}
          className={`${s.number} num`}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={inputStep ?? step}
          value={draft ?? String(value)}
          onChange={(e) => {
            setDraft(e.target.value);
            const n = e.currentTarget.valueAsNumber;
            if (Number.isFinite(n) && n >= min && n <= max) onChange(n);
          }}
          onBlur={() => {
            if (draft !== null) {
              const n = Number(draft);
              if (draft.trim() !== "" && Number.isFinite(n)) onChange(clamp(n));
            }
            setDraft(null);
          }}
        />
        {unit ? <span className={s.unit}>{unit}</span> : null}
      </div>
      <input
        id={`${id}-range`}
        className={s.range}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={`${label} (posuvník)`}
        onChange={(e) => {
          setDraft(null);
          onChange(Number(e.target.value));
        }}
      />
      <div className={`${s.bounds} num`} aria-hidden="true">
        <span>{new Intl.NumberFormat("cs-CZ").format(min)}</span>
        <span>{new Intl.NumberFormat("cs-CZ").format(max)}</span>
      </div>
    </div>
  );
}
