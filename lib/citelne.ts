/* Komentář ve scénáři je psaný pro hlas: zkratky foneticky („dépéhá“), aby je syntéza přečetla správně.
   Všude, kde se ten text zobrazuje (přepis pod videem, titulky), se vrací na běžný zápis. */
const NAHRADY: [RegExp, string][] = [[/dépéhá/gi, "DPH"]];

export function citelne(text: string): string {
  return NAHRADY.reduce((t, [re, za]) => t.replace(re, za), text);
}
