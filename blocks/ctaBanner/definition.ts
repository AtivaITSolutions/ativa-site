import { defineBlock, f, type BlockProps } from "@ativa/cms-sdk";

export const ctaBannerDef = defineBlock({
  type: "ctaBanner",
  label: "CTA banner",
  category: "cta",
  icon: "megaphone",
  fields: {
    heading: f.text({ label: "Heading", required: true, max: 120 }),
    text: f.textarea({ label: "Text", max: 240 }),
    cta: f.link({ label: "Button", required: true }),
  },
  defaults: {
    heading: "Ready to get started?",
    cta: { label: "Contact us", href: "/contact-us/" },
  },
});

export type CtaBannerProps = BlockProps<typeof ctaBannerDef>;
