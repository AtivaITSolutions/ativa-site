import type { BlockRegistry } from "@ativa/cms-sdk/react";
import { heroDef } from "./hero/definition";
import { Hero } from "./hero/Hero";
import { richTextDef } from "./richText/definition";
import { RichText } from "./richText/RichText";
import { ctaBannerDef } from "./ctaBanner/definition";
import { CtaBanner } from "./ctaBanner/CtaBanner";

/** The site's block registry, consumed by the SDK's PageRenderer. */
export const registry: BlockRegistry = {
  hero: { definition: heroDef, component: Hero },
  richText: { definition: richTextDef, component: RichText },
  ctaBanner: { definition: ctaBannerDef, component: CtaBanner },
};
