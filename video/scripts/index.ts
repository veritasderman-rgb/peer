import type { VideoScript } from "../../lib/topics";
import { script as bydleni } from "./bydleni";

/* Registr scénářů „Bobr za minutu“. Nové téma: video/scripts/<slug>.ts + import sem.
   Render: npm run video:render -- --only <slug> */
export const scripts: VideoScript[] = [bydleni];
