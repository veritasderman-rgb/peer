import s from "./BigNumber.module.css";

export type BigNumberProps = {
  value: number;
  decimals?: number;
  unit?: string;
  prefix?: string;
  label?: string;
};

/**
 * Obří číslo. Záměrně bez odpočítávání od nuly: snímek obrazovky pořízený během animace
 * by ukázal špatné číslo (např. 13,5 místo 15,1 ročních platů) a takový obrázek se pak sdílí dál.
 */
export function BigNumber({ value, decimals = 0, unit, prefix, label }: BigNumberProps) {
  const fmt = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const final = fmt.format(value);

  return (
    <div className={s.root}>
      <p className={s.figure}>
        <span className={s.sr}>
          {prefix}
          {final}
          {unit ? ` ${unit}` : ""}
        </span>
        <span aria-hidden="true" className={`${s.value} num`}>
          {prefix ? <span className={s.prefix}>{prefix}</span> : null}
          {final}
          {unit ? <span className={s.unit}>{unit}</span> : null}
        </span>
      </p>
      {label ? <p className={s.label}>{label}</p> : null}
    </div>
  );
}
