import type { ChartSpec } from "@/lib/topics";
import { BarChart } from "@/components/BarChart";
import { Donut } from "@/components/Donut";
import { IndexChart } from "@/components/IndexChart";
import { BigNumber } from "@/components/BigNumber";
import styles from "./Chart.module.css";

/* Jeden vstupní bod pro grafy z konfigurace tématu. */
export function Chart({ spec }: { spec: ChartSpec }) {
  switch (spec.typ) {
    case "bar":
      return <BarChart title={spec.title} unit={spec.unit} max={spec.max} items={spec.items} goal={spec.goal} source={spec.source} />;
    case "donut":
      return <Donut title={spec.title} parts={spec.parts} centerValue={spec.centerValue} centerLabel={spec.centerLabel} source={spec.source} />;
    case "index":
      return <IndexChart title={spec.title} source={spec.source} series={spec.series} startYear={spec.startYear} endYear={spec.endYear} />;
    case "bignumber":
      return (
        <figure className={`card ${styles.big}`}>
          <BigNumber value={spec.value} decimals={spec.decimals} unit={spec.unit} prefix={spec.prefix} label={spec.label} />
          {spec.source && <figcaption className="src">{spec.source}</figcaption>}
        </figure>
      );
    case "compare":
      return (
        <figure className={`card ${styles.compare}`}>
          <figcaption className={styles.title}>{spec.title}</figcaption>
          <div className={styles.pair}>
            <div>
              <span className={styles.lbl}>{spec.left.label}</span>
              <span className={`num ${styles.val}`}>{spec.left.value}</span>
              {spec.left.sub && <span className={styles.lbl}>{spec.left.sub}</span>}
            </div>
            <div className={styles.hi}>
              <span className={styles.lbl}>{spec.right.label}</span>
              <span className={`num ${styles.val}`}>{spec.right.value}</span>
              {spec.right.sub && <span className={styles.lbl}>{spec.right.sub}</span>}
            </div>
          </div>
          {spec.diff && <p className={`display ${styles.diff}`}>{spec.diff}</p>}
          {spec.source && <figcaption className="src">{spec.source}</figcaption>}
        </figure>
      );
  }
}
