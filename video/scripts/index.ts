import type { VideoScript } from "../../lib/topics";
import { script as bydleni } from "./bydleni";
import { script as vzdelanost } from "./vzdelanost";
import { script as prace } from "./prace";
import { script as zeny } from "./zeny";
import { script as exekuce } from "./exekuce";
import { script as zdravi } from "./zdravi";
import { script as oligarchie } from "./oligarchie";
import { script as euro } from "./euro";
import { script as kapital } from "./kapital";
import { script as prumysl } from "./prumysl";
import { script as energie } from "./energie";
import { script as inovace } from "./inovace";
import { script as regiony } from "./regiony";
import { script as stat } from "./stat";
import { script as uvod } from "./uvod";

/* Registr scénářů „Strategie za minutu“. Nové téma: video/scripts/<slug>.ts + import sem.
   Render: npm run video:render -- --only <slug> */
export const scripts: VideoScript[] = [
  uvod, bydleni, vzdelanost, prace, zeny, exekuce, zdravi, oligarchie, euro, kapital, prumysl, energie, inovace, regiony, stat,
];
