import { defineBlock, f, type BlockProps } from "@ativa/cms-sdk";

export const richTextDef = defineBlock({
  type: "richText",
  label: "Rich text",
  category: "content",
  icon: "text",
  fields: {
    content: f.richText({ label: "Content", required: true }),
  },
});

export type RichTextBlockProps = BlockProps<typeof richTextDef>;
