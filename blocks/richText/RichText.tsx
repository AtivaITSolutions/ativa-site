import { Fragment, type ReactNode } from "react";
import type { RichTextBlockProps } from "./definition";

/**
 * Minimal, safe Tiptap-JSON -> React renderer. It renders a known allow-list of
 * nodes and marks; unknown nodes fall back to their text content. It NEVER uses
 * dangerouslySetInnerHTML, so stored rich text can't inject raw HTML.
 */
type Mark = { type?: string; attrs?: Record<string, unknown> };
type Node = {
  type?: string;
  text?: string;
  marks?: Mark[];
  attrs?: Record<string, unknown>;
  content?: Node[];
};

function applyMarks(text: string, marks: Mark[] | undefined, key: string): ReactNode {
  if (!marks || marks.length === 0) return text;
  return marks.reduce<ReactNode>((child, mark, i) => {
    const k = `${key}-m${i}`;
    switch (mark.type) {
      case "bold":
        return <strong key={k}>{child}</strong>;
      case "italic":
        return <em key={k}>{child}</em>;
      case "code":
        return <code key={k}>{child}</code>;
      case "link": {
        const href = typeof mark.attrs?.href === "string" ? mark.attrs.href : "#";
        return (
          <a key={k} href={href}>
            {child}
          </a>
        );
      }
      default:
        return <Fragment key={k}>{child}</Fragment>;
    }
  }, text);
}

function renderNodes(nodes: Node[] | undefined, keyPrefix: string): ReactNode[] {
  if (!nodes) return [];
  return nodes.map((node, i) => renderNode(node, `${keyPrefix}-${i}`));
}

function renderNode(node: Node, key: string): ReactNode {
  switch (node.type) {
    case "text":
      return <Fragment key={key}>{applyMarks(node.text ?? "", node.marks, key)}</Fragment>;
    case "paragraph":
      return <p key={key}>{renderNodes(node.content, key)}</p>;
    case "heading": {
      const level = typeof node.attrs?.level === "number" ? node.attrs.level : 2;
      const Tag = (`h${Math.min(Math.max(level, 1), 6)}` as "h1");
      return <Tag key={key}>{renderNodes(node.content, key)}</Tag>;
    }
    case "bulletList":
      return <ul key={key}>{renderNodes(node.content, key)}</ul>;
    case "orderedList":
      return <ol key={key}>{renderNodes(node.content, key)}</ol>;
    case "listItem":
      return <li key={key}>{renderNodes(node.content, key)}</li>;
    case "hardBreak":
      return <br key={key} />;
    default:
      // Unknown node: render its children (or nothing), never raw HTML.
      return <Fragment key={key}>{renderNodes(node.content, key)}</Fragment>;
  }
}

export function RichText({ content }: RichTextBlockProps & { variant?: string }) {
  const doc = content as Node;
  return (
    <div className="prose mx-auto max-w-3xl px-6 py-8">{renderNodes(doc.content, "rt")}</div>
  );
}
