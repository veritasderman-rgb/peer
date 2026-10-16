import { useEffect, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

/* Písma podle styleguide.pirati.cz: Bebas Neue (nadpisy, čísla), Roboto (text).
   TTF z Google Fonts leží v public/fonts/ (sdílené s Next.js). */
let ready: Promise<unknown> | null = null;
export function loadFonts() {
  if (!ready) {
    ready = Promise.all([
      loadFont({ family: "Bebas Neue", url: staticFile("fonts/BebasNeue-Regular.ttf"), weight: "400" }),
      loadFont({ family: "Roboto", url: staticFile("fonts/Roboto-Regular.ttf"), weight: "400" }),
      loadFont({ family: "Roboto", url: staticFile("fonts/Roboto-Bold.ttf"), weight: "700" }),
    ]);
  }
  return ready;
}

/** Vrátí true, až jsou písma načtená; do té doby drží render (delayRender), aby měření textu sedělo. */
export function useFontsReady(): boolean {
  const [ok, setOk] = useState(false);
  const [handle] = useState(() => delayRender("Načítám písma Bebas Neue a Roboto"));
  useEffect(() => {
    let alive = true;
    loadFonts().then(() => {
      if (alive) setOk(true);
      continueRender(handle);
    });
    return () => {
      alive = false;
    };
  }, [handle]);
  return ok;
}
