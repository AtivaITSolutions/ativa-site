import type { BlockDefinition } from "@ativa/cms-sdk";
import { heroDef } from "./hero/definition";
import { richTextDef } from "./richText/definition";
import { ctaBannerDef } from "./ctaBanner/definition";

/**
 * The JSON-serializable half of every block, with no React imports, so the
 * `cms:push` script can load and send them under a plain Node (tsx) runner
 * without pulling in `.tsx` component code. Keep in sync with `blocks/index.ts`.
 */
export const blockDefinitions: BlockDefinition[] = [heroDef, richTextDef, ctaBannerDef];
