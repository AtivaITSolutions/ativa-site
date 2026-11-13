// Example block definition (Phase 1): proves the SDK contract type-checks in the
// site. The React component (Hero.tsx) and the block registry land in Phase 2.
import { defineBlock, f, type BlockProps } from "@ativa/cms-sdk";

export const heroDef = defineBlock({
  type: "hero",
  label: "Hero",
  category: "hero",
  icon: "layout",
  variants: ["image-right", "image-left"],
  fields: {
    heading: f.text({ label: "Heading", required: true, max: 90 }),
    subheading: f.textarea({ label: "Subheading", max: 220 }),
    image: f.image({ label: "Image", required: true }),
    cta: f.link({ label: "Button" }),
  },
  defaults: {
    heading: "Your heading",
    subheading: "",
    cta: { label: "Get a quote", href: "/contact-us/" },
  },
});

export type HeroProps = BlockProps<typeof heroDef>;
